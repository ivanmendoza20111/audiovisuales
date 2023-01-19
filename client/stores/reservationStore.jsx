import {
  addReservation,
  editReservation,
  getAllReservationsFullInformation,
} from '@/api/reservation';
import { FILTER_TYPES, NEXT_IN_MINUTES, RESERVATION_ERROR_MESSAGE } from '@/utils/constant';
import { getReservationDateRange } from '@/utils/getReservationDateRange.js';
import { swalBadRequest, swalError, swalSuccess } from '@/utils/swal';
import HttpStatus from 'http-status-codes';
import moment from 'moment';
import create from 'zustand';

const handleResponse = async (response) => {
  switch (response.status) {
    case HttpStatus.OK:
      await swalSuccess();
      break;
    case HttpStatus.BAD_REQUEST:
      console.log(response);
      // eslint-disable-next-line no-case-declarations
      const [{ message }] = response.data.details;
      await swalBadRequest(message);
      break;
    default:
      await swalError(RESERVATION_ERROR_MESSAGE);
  }
};

const useReservationStore = create((set, get) => ({
  reservations: [],
  filteredRes: [],
  error: null,
  currentFilter: FILTER_TYPES.NONE,
  isLoading: true,
  store: async (data) => {
    try {
      const {
        requester,
        scheduleDay,
        equipment,
        career,
        name,
        code,
        email,
        phone,
        professor = null,
        proffesorCode = null,
      } = data;
      const { subject, startHour: start, endHour: end, classroom } = data.schedule;
      const { startHour, endHour } = getReservationDateRange({
        date: scheduleDay,
        startHour: start,
        endHour: end,
      });
      const response = await addReservation({
        userCode: code,
        userName: name,
        email,
        phone,
        career,
        subject,
        classroom,
        equipment,
        requester,
        startHour,
        endHour,
        profName: professor,
        profCode: proffesorCode,
      });
      await handleResponse(response);
    } catch (error) {
      await handleResponse(error.response);
      set((state) => ({
        ...state,
        error: error.message,
      }));
    }
  },
  update: async (data, id) => {
    try {
      await editReservation(
        {
          isActive: data.isActive,
          assistantId: data.assistantId,
        },
        id
      );
    } catch (error) {
      set((state) => ({
        ...state,
        error: error.message,
      }));
    }
  },
  fetchAllReservations: async () => {
    try {
      if (get().reservations.length) return;

      if (!get().isLoading) set((state) => ({ ...state, isLoading: true }));

      const response = await getAllReservationsFullInformation();
      const result =
        response.data.data
          .map((res) => {
            const fromDate = moment(res.fromDate);
            const toDate = moment(res.toDate);

            if (fromDate.isValid() && toDate.isValid()) {
              return {
                ...res,
                fromDate: fromDate,
                toDate: toDate,
              };
            } else {
              return false;
            }
          })
          .filter(Boolean) || [];
      set({
        reservations: result,
        filteredRes: result,
        error: null,
        isLoading: false,
      });
    } catch (error) {
      set((state) => ({
        ...state,
        error: error.message,
        isLoading: false,
      }));
    }
  },
  filterRes: (type, data = null) => {
    const currentDate = moment();
    let filteredRes = null;
    switch (type) {
      case FILTER_TYPES.FINISHED:
        filteredRes = get().reservations.filter(
          (res) => res.isActive && moment(res.toDate).isBefore(currentDate)
        );

        break;
      case FILTER_TYPES.NEXT:
        filteredRes = get().reservations.filter(
          ({ fromDate, toDate, isActive }) =>
            isActive &&
            currentDate.isBetween(fromDate, toDate) &&
            moment(toDate).subtract(NEXT_IN_MINUTES, 'm').isBefore(currentDate)
        );

        break;
      case FILTER_TYPES.IN_PROGRESS:
        filteredRes = get().reservations.filter(
          ({ fromDate, toDate, isActive }) => isActive && currentDate.isBetween(fromDate, toDate)
        );

        break;
      case FILTER_TYPES.REJECTED:
        filteredRes = get().reservations.filter((res) => !res.isActive);

        break;
      case FILTER_TYPES.NONE:
        filteredRes = get().reservations;

        break;
      case FILTER_TYPES.DATE:
        if (data) {
          filteredRes = get().reservations.filter(({ fromDate }) =>
            moment(fromDate).isBetween(data.startDate, data.endDate, 'days', '[]')
          );
        }

        break;
      default:
        console.error('Invalid filter.');

        return;
    }

    if (filteredRes !== null) {
      set((state) => ({ ...state, currentFilter: type, filteredRes }));
    }
  },
  getReservationIdxById: (id) => {
    return get().filteredRes.findIndex(({ id: resId }) => id === resId);
  },
  setFilteredRes: (newFilteredRes) => set((state) => ({ ...state, filteredRes: newFilteredRes })),
}));

useReservationStore.subscribe(console.log);

export default useReservationStore;

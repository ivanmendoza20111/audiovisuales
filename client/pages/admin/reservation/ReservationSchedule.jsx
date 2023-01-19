import Filters from '@/components/reservation/Filters';
import Appointment from '@/components/schedule/Appointment';
import AppointmentTooltip from '@/components/schedule/AppointmentTooltip';
import useAssistantStore from '@/stores/assistantStore';
import useReservationStore from '@/stores/reservationStore';
import {
  FILTER_TYPES,
  RESERVATION_ACTIVE_COLOR,
  RESERVATION_PROGRESS_COLOR,
  RESERVATION_REJECTED_COLOR,
} from '@/utils/constant';
import CircularProgress from '@material-ui/core/CircularProgress';
import Scheduler, { Resource } from 'devextreme-react/scheduler';
import { useEffect, useRef } from 'react';

import 'devextreme/dist/css/dx.light.css';

const currentDate = new Date();
const views = ['day', 'timelineDay', 'week'];
const status = [
  {
    text: 'Inactive',
    id: 0,
    color: RESERVATION_REJECTED_COLOR,
  },
  {
    text: 'Active',
    id: 1,
    color: RESERVATION_ACTIVE_COLOR,
  },
  {
    text: 'Progress',
    id: 2,
    color: RESERVATION_PROGRESS_COLOR,
  },
];

const localeAndDataConfig = {
  startDateExpr: 'fromDate',
  endDateExpr: 'toDate',
  descriptionExpr: 'descripción',
  noDataText: 'No hay datos para mostrar.',
};

const ReservationSchedule = () => {
  const {
    filteredRes,
    currentFilter,
    isLoading,
    update: updateReservation,
    fetchAllReservations,
  } = useReservationStore((state) => state);
  const scheduleRef = useRef(null);
  const { assistants, getAssistantById, fetchAllAssistants, getFullName } = useAssistantStore(
    (state) => state
  );
  const { innerWidth: width } = window;

  useEffect(() => {
    fetchAllReservations();
    fetchAllAssistants();
  }, []);

  useEffect(() => {
    if (currentFilter !== FILTER_TYPES.FINISHED) {
      scheduleRef.current && scheduleRef.current.instance.scrollTo(new Date());
    }
  }, [currentFilter]);

  const cancelAppointment = (data) => {
    scheduleRef.current &&
      scheduleRef.current.instance.updateAppointment(data, { ...data, isActive: 0 });
  };

  const onAppointmentUpdating = async (e) => {
    try {
      await updateReservation(e.newData, e.oldData.id);
    } catch (error) {
      e.cancel = true;
      console.log('Error updating appointment', error.message);
    }
  };

  const onAppointmentFormOpening = (e) => {
    const { form } = e;
    let { assistantId, productsFormatted } = e.appointmentData;
    const assistant = getAssistantById(assistantId);

    form.option('items', [
      {
        label: {
          text: 'Auxiliar',
        },
        editorType: 'dxSelectBox',
        dataField: 'assistantId',
        editorOptions: {
          items: [{ userId: null, username: 'No asignar' }, ...assistants],
          displayExpr: 'username',
          valueExpr: 'userId',
          onValueChanged(args) {
            const newAssistant = getAssistantById(args.value);

            form.updateData('fullName', getFullName(newAssistant));
            // TODO: is available
          },
        },
      },
      {
        label: {
          text: 'Nombre completo del auxiliar',
        },
        dataField: 'fullName',
        editorOptions: {
          value: assistant ? getFullName(assistant) : 'No asignado.',
          readOnly: true,
        },
      },
      {
        label: {
          text: 'Hora inicial',
        },
        name: 'fromDate',
        dataField: 'fromDate',
        editorType: 'dxDateBox',
        editorOptions: {
          width: '100%',
          type: 'datetime',
          readOnly: true,
        },
      },
      {
        label: {
          text: 'Hora final',
        },
        name: 'toDate',
        dataField: 'toDate',
        editorType: 'dxDateBox',
        editorOptions: {
          width: '100%',
          type: 'datetime',
          readOnly: true,
        },
      },
      {
        label: {
          text: 'Aula',
        },
        name: 'userClassroom',
        dataField: 'userClassroom',
        editorType: 'dxTextBox',
        editorOptions: {
          readOnly: true,
        },
      },
      {
        label: {
          text: 'Productos',
        },
        name: 'products',
        editorType: 'dxTextArea',
        editorOptions: {
          value: productsFormatted.join(', '),
          readOnly: true,
        },
      },
      {
        label: {
          text: 'Solicitante',
        },
        name: 'userName',
        dataField: 'userName',
        editorType: 'dxTextBox',
        editorOptions: {
          readOnly: true,
        },
      },
    ]);
  };

  return isLoading ? (
    <CircularProgress />
  ) : (
    <>
      <Filters />
      <div className="dx-viewport" style={{ maxWidth: '95vw' }}>
        <Scheduler
          timeZone="America/Santo_Domingo"
          dataSource={filteredRes}
          views={views}
          ref={scheduleRef}
          defaultCurrentDate={currentDate}
          height={900}
          editing={{
            allowAdding: false,
            allowDeleting: false,
            allowDragging: false,
            allowUpdating: true,
          }}
          firstDayOfWeek={0}
          showCurrentTimeIndicator={true}
          onAppointmentUpdating={onAppointmentUpdating}
          startDayHour={7}
          endDayHour={22}
          showAllDayPanel={false}
          crossScrollingEnabled={true}
          indicatorUpdateInterval={60000}
          adaptivityEnabled={width < 500}
          cellDuration={22.5}
          appointmentComponent={Appointment}
          appointmentTooltipComponent={(props) => (
            <AppointmentTooltip
              {...props}
              scheduleRef={scheduleRef}
              cancelAppointment={cancelAppointment}
            />
          )}
          onAppointmentFormOpening={onAppointmentFormOpening}
          {...localeAndDataConfig}
        >
          <Resource dataSource={status} fieldExpr="isActive" label="Status" useColorAsDefault />
        </Scheduler>
      </div>
    </>
  );
};

export default ReservationSchedule;

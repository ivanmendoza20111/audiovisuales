import { getDataById } from '@/api/get';
import { generateAvailableDateToReservate } from '@/utils/generateAvailableDateToReservate';
import { getScheduleBySubject } from '@/utils/getScheduleBySubject';
import { swalError } from '@/utils/swal';
import create from 'zustand';

const defaultValues = {
  requester: 'Estudiante',
  scheduleDay: generateAvailableDateToReservate(),
  equipment: {
    Projector: false,
    Laptop: false,
    Sound: false,
  },
  career: '',
  subject: '',
  classroom: '',
  name: '',
  code: '',
  email: '',
  phone: '',
  terms: false,
  schedule: {},
  professor: '',
  proffesorCode: '',
};

const useUserDataStore = create((set) => ({
  userData: {
    ...defaultValues,
  },
  error: null,
  fetchUserData: async (credentials) => {
    try {
      const response = await getDataById(credentials);
      const userData = response.data;
      set({
        userData: {
          ...defaultValues,
          ...userData,
          phone: `+1${userData.phone}`,
          schedule: getScheduleBySubject(userData.subject),
          subject: '',
        },
        error: null,
      });
    } catch (error) {
      await swalError();
      set((state) => ({
        ...state,
        error: error.message,
        userData: {
          schedule: [],
        },
      }));
    }
  },
}));

useUserDataStore.subscribe(console.log);

export default useUserDataStore;

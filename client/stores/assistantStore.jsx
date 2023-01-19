import { getUserByRoleId } from '@/api/user';
import { AUXILIAR_ROLE_ID } from '@/utils/constant';
import create from 'zustand';

const useAssistantStore = create((set, get) => ({
  assistants: [],
  error: null,
  fetchAllAssistants: async () => {
    try {
      if (get().assistants.length) return;
      const response = await getUserByRoleId(AUXILIAR_ROLE_ID);
      set({
        assistants: response.data.data,
        error: null,
      });
    } catch (error) {
      set((state) => ({
        ...state,
        error: error.message,
      }));
    }
  },
  getAssistantById: (assistantId) => {
    return get().assistants.filter(({ userId }) => userId === assistantId)[0];
  },
  getFullName: (assistant) => (assistant ? `${assistant.name} ${assistant.surname}` : ''),
}));

useAssistantStore.subscribe(console.log);

export default useAssistantStore;

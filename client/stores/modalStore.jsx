import create from 'zustand';

const useModalStore = create((set, get) => ({
  openModal: true,
  toggleModal: () => {
    set(() => ({ openModal: !get().openModal }));
  },
}));

useModalStore.subscribe(console.log);

export default useModalStore;

import { create } from 'zustand'

type ModalState = {
  open: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

type ModalStore = {
  modals: Record<string, ModalState>
  openModal: (id: string, state?: Omit<ModalState, 'open'>) => void
  closeModal: (id: string) => void
  toggleModal: (id: string) => void
}

const useModalStore = create<ModalStore>((set) => ({
  modals: {},

  openModal: (id: string, state = {}) =>
    set((prev) => ({
      modals: {
        ...prev.modals,
        [id]: { open: true, ...state },
      },
    })),

  closeModal: (id: string) =>
    set((prev) => ({
      modals: {
        ...prev.modals,
        [id]: { ...prev.modals[id], open: false },
      },
    })),

  toggleModal: (id: string) =>
    set((prev) => ({
      modals: {
        ...prev.modals,
        [id]: { ...prev.modals[id], open: !prev.modals[id]?.open },
      },
    })),
}))

export default useModalStore

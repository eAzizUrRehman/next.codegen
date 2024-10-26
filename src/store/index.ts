import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist } from 'zustand/middleware';
import { Store } from '../types/questionnaire.d';

const useStore = create<Store>()(
  persist(
    immer((set) => ({
      _isHydrated: false,
      setHydrated: () => set({ _isHydrated: true }),
      // activateHeaderLink: (id) =>
      //   set((state) => ({
      //     headerLinks: state.headerLinks.map((link) =>
      //       link.id === id
      //         ? { ...link, isActive: true }
      //         : { ...link, isActive: false }
      //     ),
      //   })),
    })),
    {
      name: 'header-store',
      onRehydrateStorage() {
        return (state, error) => {
          if (!error) state?.setHydrated();
          else console.log('Failed to rehydrate header-store');
        };
      },
    }
  )
);

export default useStore;

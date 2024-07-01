import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useAuth = create(
  persist(
    (set, get) => ({
      data: {
        number: '',
        token: '',
        loggedIn: false,
        role: 'guest',
        firstName: '',
        lastName: '',
        location: '',
      },
      setData: (data) => set({ data: {...get().data, ...data} }),
    }),
    {
      name: 'auth-data', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
  ),
)
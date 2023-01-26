import { StateCreator } from 'zustand';

import { axiosInstance } from '../../helpers/axios';

export type AuthInterface = {
  isLoggedIn: boolean | undefined;
  user: {
    firstName: string;
    lastName: string;
    email: string;
    avatar: string;
    role: string;
  };
  login: () => void;
  logout: () => void;
  checkAuth: () => void;
  setUser: (user: {
    firstName: string;
    lastName: string;
    email: string;
    avatar: string;
    role: string;
  }) => void;
  deleteAvatar: () => void;
};

type authCheckResponse = {
  isAuth: boolean;
  user: {
    firstName: string;
    lastName: string;
    email: string;
    avatar: string;
    role: string;
  };
};

export const createAuthSlice: StateCreator<AuthInterface> = (set, get) => ({
  isLoggedIn: undefined,
  user: {
    firstName: '',
    lastName: '',
    email: '',
    avatar: '',
    role: '',
  },
  login: () => set(() => ({ isLoggedIn: true })),
  logout: () => set(() => ({ isLoggedIn: false })),
  setUser: (user) => set(() => ({ user })),
  deleteAvatar: () => set(() => ({ user: { ...get().user, avatar: '' } })),
  checkAuth: async () => {
    try {
      const { data } = await axiosInstance.get<authCheckResponse>('/auth', {
        withCredentials: true,
      });
      if (data.isAuth === true) {
        set(() => ({
          isLoggedIn: true,
          user: {
            firstName: data.user.firstName,
            lastName: data.user.lastName,
            email: data.user.email,
            avatar: data.user.avatar,
            role: data.user.role,
          },
        }));
        // return data.isLoggedIn;
      } else {
        set(() => ({ isLoggedIn: false }));
        // return false;
      }
    } catch (error) {
      set(() => ({ isLoggedIn: false }));
      // return false;
    }
  },
});

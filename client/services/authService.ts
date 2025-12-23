import {
  UserChangePassword,
  UserOTP,
} from "./../../shared/src/types/ResetPasswordOTP";
import {
  ForgetPasswordRequest,
  RegisterRequest,
  SignRequest,
} from "../../shared/src/types";
import { api } from "@/config/axios.config";
import API_ROUTES from "../../shared/src/api";
import { useAuthStore } from "@/store/auth.store";

export const authService = {
  signUp: async (user: RegisterRequest) => {
    const res = await api.post(API_ROUTES.auth.createAccount, user, {
      withCredentials: true, // cho phép trình duyệt gửi & nhận COOKIE khi gọi API ở domain khác
    });
    return res.data;
  },

  signIn: async (user: SignRequest) => {
    try {
      const res = await api.post(API_ROUTES.auth.signIn, user, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  },

  forgetPassword: async (user: ForgetPasswordRequest) => {
    try {
      const res = await api.post(API_ROUTES.auth.forgetPassword, user, {
        withCredentials: true, // cho phép trình duyệt gửi & nhận COOKIE khi gọi API ở domain khác
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  },

  verifyOTP: async (user: UserOTP) => {
    try {
      const res = await api.post(API_ROUTES.auth.verifyOTP, user, {
        withCredentials: true, // cho phép trình duyệt gửi & nhận COOKIE khi gọi API ở domain khác
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  },

  signOut: async () => {
    return api.post(API_ROUTES.auth.signOut, {}, { withCredentials: true });
  },

  fetchMe: async () => {
    const res = await api.get(API_ROUTES.user.fetchMe, {
      withCredentials: true,
    });
    return res.data.user;
  },

  refresh: async () => {
    const res = await api.post(
      API_ROUTES.auth.refresh,
      {},
      {
        withCredentials: true,
      }
    );
    return res.data.accessToken;
  },

  resetPassword: async (user: UserChangePassword, resetToken: string | null) => {
    const res = await api.post(API_ROUTES.auth.resetPassword, user, {
      headers: {
        Authorization: `Bearer ${resetToken}`,
      },
    });

    return res.data;
  },
};

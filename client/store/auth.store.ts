import {
  UserOTP,
  UserResetPassword,
} from "./../../shared/src/types/ResetPasswordOTP";
import { create } from "zustand";
import {
  ForgetPasswordRequest,
  RegisterRequest,
  ResetPasswordRequest,
  SignRequest,
} from "../../shared/src/types";
import { authService } from "@/services/authService";
import { AuthState } from "@/types/store";

//  state đại diện cho toàn bộ store hiện tại
// set(): Dùng để GHI (cậ  nhật/thay đổi) state (chỉ dùng bên trong store).
// get(): Dùng để ĐỌC (lấy) giá trị hiện tại của state (chỉ dùng bên trong store)
export const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: null,
  user: null,
  loading: false,
  forgetUserId: null,

  resetToken: null,

  setAccessToken: (accessToken: string) => {
    set({ accessToken });
  },

  setResetToken: (resetToken: string) => {
    set({ resetToken });
  },

  clearState: () => {
    set({ accessToken: null, user: null, loading: false });
  },

  signUp: async (user: RegisterRequest) => {
    try {
      set({ loading: true });
      // goi api

      await authService.signUp(user);
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },

  signIn: async (user: SignRequest) => {
    try {
      set({ loading: true });

      // Khi đăng nhập thành công thì lấy accessToken của user đó
      const { accessToken } = await authService.signIn(user);
      get().setAccessToken(accessToken);

      // Lấy thông tin về user đang đăng nhập và lưu thông tin user vào trong store
      await get().fetchMe();
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },

  forgetPassword: async (user: ForgetPasswordRequest) => {
    try {
      set({ loading: true });

      const data = await authService.forgetPassword(user);
      console.log("this is data: ", data);
      set({ forgetUserId: data.userId });
      console.log(data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  signOut: async () => {
    try {
      get().clearState();
      await authService.signOut();
    } catch (error) {
      console.log(error);
    }
  },

  fetchMe: async () => {
    try {
      set({ loading: true });
      const user = await authService.fetchMe();

      set({ user });
    } catch (error) {
      console.log(error);
      set({ user: null, accessToken: null });
    } finally {
      set({ loading: false });
    }
  },

  refresh: async () => {
    try {
      set({ loading: true });
      const { user, fetchMe, setAccessToken } = get();
      // Check nếu refreshToken hợp lệ và còn hạn --> sinh ra accessToken mới
      const accessToken = await authService.refresh();
      setAccessToken(accessToken);
      if (!user) {
        await fetchMe();
      }
    } catch (error) {
      console.log(error);
      get().clearState();
    } finally {
      set({ loading: false });
    }
  },

  verifyOTP: async (user: UserOTP) => {
    try {
      set({ loading: true });
      const { resetToken } = await authService.verifyOTP(user);
      console.log("gia tri reset token: ", resetToken);
      get().setResetToken(resetToken);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  resetPassword: async (user: ResetPasswordRequest) => {
    try {
      const resetToken = get().resetToken;
      set({ loading: true });
      const data = await authService.resetPassword(user, resetToken);
      console.log("this is reset: ", data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
}));

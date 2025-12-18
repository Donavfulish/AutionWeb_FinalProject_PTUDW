import {
  RegisterRequest,
  SignRequest,
  UserEntity,
} from "../../shared/src/types";

export interface AuthState {
  /**
   * Access token (JWT) dùng cho các request cần xác thực
   */
  accessToken: string | null;
   /**
   * Thông tin người dùng hiện tại
   */
  user: UserEntity | null;
   /**
   * Trạng thái loading 
   */
  loading: boolean;

    /**
   * Cập nhật access token vào store
   *
   * @param accessToken JWT access token
   */
  setAccessToken: (accessToken: string) => void;
  /**
   * Xoá toàn bộ trạng thái xác thực
   *
   * @description
   * - Dùng khi đăng xuất
   * - Hoặc khi refresh token thất bại
   */
  clearState: () => void;

   /**
   * Đăng ký tài khoản mới và lưu vào db 
   *
   * @param user Dữ liệu đăng ký (email, password, ...)
   *
   * @description
   * - Gửi request đăng ký lên server
   * - Không tự động đăng nhập sau khi đăng ký
   */
  signUp: (user: RegisterRequest) => Promise<void>;

    /**
   * Đăng nhập hệ thống và lưu accessToken + user vào store nếu thông tin đăng nhập là hợp lệ
   *
   * @param user Thông tin đăng nhập (email, password)
   *
   * @description
   * - Gọi API signIn để lấy access token
   * - Lưu access token vào store
   * - Fetch thông tin user ngay sau khi đăng nhập
   */
  signIn: (user: SignRequest) => Promise<void>;

   /**
   * Đăng xuất khỏi hệ thống , xoá thông tin trong store + xoá refreshToken trong db 
   *
   * @description
   * - Xoá toàn bộ auth state ở client
   * - Gọi API signOut để server xoá refresh token (nếu có)
   */
  signOut: () => Promise<void>;

    /**
   * Lấy thông tin người dùng hiện tại và lưu user vào store 
   *
   * @description
   * - Gọi API GET /auth/me
   * - Yêu cầu access token hợp lệ trong header Authorization
   * - Lưu thông tin user vào store
   */
  fetchMe: () => Promise<void>;

    /**
   * Tạo accessToken mới nếu refreshToken còn hạn và lưu accessToken + user vào store
   *
   * @description
   * - Gửi request refresh token (qua httpOnly cookie)
   * - Nhận access token mới từ server
   * - Tự động fetch user nếu chưa có thông tin user
   *
   * @note
   * - Được gọi khi reload trang (F5)
   * - Hoặc khi access token hết hạn
   */
  refresh: () => Promise<void>;
}

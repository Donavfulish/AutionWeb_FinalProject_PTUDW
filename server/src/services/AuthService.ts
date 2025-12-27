import {
  CreateUser,
  UserEntity,
  CreateRefreshToken,
  RefreshToken,
  CreateTempUser,
} from "../../../shared/src/types";
import {
  CreateResetPasswordOTP,
  UserOTP,
} from "../../../shared/src/types/ResetPasswordOTP";
import { BaseService } from "./BaseService";
export class AuthService extends BaseService {
  private static instance: AuthService;

  private constructor() {
    super();
  }

  static getInstance() {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async getUserByUserName(userName: string): Promise<UserEntity | undefined> {
    const sql = `
              SELECT 
                u.id,
                u.name,
                u.user_name,
                u.email,
                u.role,
                u.password_hash
              FROM admin.users u
              WHERE user_name = $1
              `;
    const params = [userName];
    const profile: UserEntity[] = await this.safeQuery(sql, params);

    return profile[0];
  }

  async getUserByEmail(email: string): Promise<UserEntity | undefined> {
    const sql = `
              SELECT 
                u.id,
                u.name,
                u.user_name,
                u.email,
                u.password_hash
              FROM admin.users u
              WHERE email = $1
              `;
    const params = [email];
    const profile: UserEntity[] = await this.safeQuery(sql, params);

    return profile[0];
  }

  async getUserByUserNameAndEmail(
    userName: string,
    email: string
  ): Promise<UserEntity | undefined> {
    const sql = `
              SELECT 
                u.id,
                u.name,
                u.user_name,
                u.email,
                u.password_hash
              FROM admin.users u
              WHERE user_name = $1 and email = $2
              `;
    const params = [userName, email];
    const profile: UserEntity[] = await this.safeQuery(sql, params);

    return profile[0];
  }

  async getUserById(userId: number): Promise<UserEntity | undefined> {
    const sql = `
   SELECT 
      u.id,
      u.email,
      u.name,
      u.role,
      u.password_hash,
      u.positive_points,
      u.negative_points
    FROM admin.users u
    WHERE id = $1
    `;
    const params = [userId];
    const profile: UserEntity[] = await this.safeQuery(sql, params);

    return profile[0];
  }

   async getAllUserById(userId: number): Promise<UserEntity | undefined> {
    const sql = `
   SELECT *
    FROM admin.users u
    WHERE id = $1
    `;
    const params = [userId];
    const profile: UserEntity[] = await this.safeQuery(sql, params);

    return profile[0];
  }

  async createUser(user: CreateUser) {
    const sql = `
      INSERT INTO admin.users (
      name,
      email,
      password_hash,
      user_name,
      role,
      created_at,
      updated_at
      )
      VALUES ($1, $2, $3, $4, 'bidder', NOW(), NOW())
      RETURNING *
      `;
    await this.safeQuery(sql, [
      user.name,
      user.email,
      user.password_hash,
      user.username,
    ]);
  }

  async deletePendingUserOTPByEmail(email: string) {
    const sql = `
    DELETE FROM admin.pending_users 
    WHERE email = $1
    `;
    await this.safeQuery(sql, [email]);
  }

  async deleteResetPasswordOTPByUserId(userId: number) {
    const sql = `
    DELETE FROM admin.reset_password_otp 
    WHERE user_id = $1
    `;
    await this.safeQuery(sql, [userId]);
  }

  async createTempUser(user: CreateTempUser) {
    const sql = `
      INSERT INTO admin.pending_users (
      name,
      email,
      password_hash,
      user_name,
      expired_at,
      otp_hash 
      )
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
      `;
    await this.safeQuery(sql, [
      user.name,
      user.email,
      user.password_hash,
      user.username,
      user.expired_at,
      user.otp_hash,
    ]);
  }
  async createRefreshToken(refreshToken: CreateRefreshToken) {
    const sql = `
      INSERT INTO admin.refresh_tokens (
      user_id,
      token,
      expired_at,
      created_at
      )
      VALUES ($1, $2, $3, NOW())
      RETURNING *
      `;
    await this.safeQuery(sql, [
      refreshToken.user_id,
      refreshToken.token,
      refreshToken.expired_at,
    ]);
  }

  async deleteRefreshToken(token: string) {
    const sql = `
    DELETE FROM admin.refresh_tokens WHERE token = $1
    `;

    await this.safeQuery(sql, [token]);
  }

  async getRefreshTokenByToken(
    token: string
  ): Promise<RefreshToken | undefined> {
    const sql = `
    SELECT 
      id,
      user_id,
      token,
      created_at,
      expired_at
    FROM admin.refresh_tokens
    WHERE token = $1 
    `;

    const result: RefreshToken[] = await this.safeQuery(sql, [token]);
    return result[0];
  }

  async createResetPasswordOTP(resetPasswordOTP: CreateResetPasswordOTP) {
    const sql = `
      INSERT INTO admin.reset_password_otp (
      user_id,
      OTP_hash,
      expired_at
      )
      VALUES ($1, $2, $3)
      RETURNING *
      `;
    await this.safeQuery(sql, [
      resetPasswordOTP.user_id,
      resetPasswordOTP.otp_hash,
      resetPasswordOTP.expired_at,
    ]);
  }

  async getResetPasswordOTPById(OTPid: string): Promise<UserOTP | undefined> {
    const sql = `
    SELECT 
    user_id,
    otp_hash,
    is_verified, 
    expired_at
    FROM admin.reset_password_otp
    WHERE user_id = $1
      `;
    const res: UserOTP[] = await this.safeQuery(sql, [OTPid]);
    return res[0];
  }

  async getPendingUserOTPByEmail(email: string): Promise<UserOTP | undefined> {
    const sql = `
      SELECT 
      id as user_id, 
      email,
      password_hash,
      name,
      address,
      day_of_birth,
      otp_hash, 
      is_verified, 
      user_name,
      expired_at
      FROM admin.pending_users
      WHERE email = $1
        AND is_verified = FALSE
       AND expired_at > NOW();
      `;
    const res: UserOTP[] = await this.safeQuery(sql, [email]);
    return res[0];
  }
  async updateHashPassword(userId: number, passwordHash: string) {
    const sql = `
      UPDATE admin.users
      SET password_hash = $1
      WHERE id = $2;
      `;
    await this.safeQuery(sql, [passwordHash, userId]);
  }
  async updateResetPasswordOTP(userId: number) {
    const sql = `
      UPDATE admin.reset_password_otp
      SET is_verified = true
      WHERE user_id = $1;
      `;
    await this.safeQuery(sql, [userId]);
  }

  async updatePendingUserOTP(userId: number) {
    const sql = `
      UPDATE admin.pending_users
      SET is_verified = true
      WHERE user_id = $1;
      `;
    await this.safeQuery(sql, [userId]);
  }

  async cleanupOTP(userId: number) {
    const sql = `
      DELETE FROM admin.reset_password_otp
      WHERE user_id = $1
      `;
    await this.safeQuery(sql, [userId]);
  }

  async updateHashOTPPendingUserById(id: number, otpHash: string) {
    const sql = `
    UPDATE  admin.pending_users 
    SET otp_hash = $1
    WHERE id = $2
    `;
    await this.safeQuery(sql, [otpHash, id]);
  }

  async updateHashOTPResetPasswordByUserId(id: number, otpHash: string) {
    const sql = `
    UPDATE  admin.reset_password_otp
    SET otp_hash = $1
    WHERE user_id = $2
    `;
    await this.safeQuery(sql, [otpHash, id]);
  }

  // async updatePasswordUser()
}

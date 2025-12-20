import {
  CreateUser,
  UserEntity,
  CreateRefreshToken,
  RefreshToken,
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
                u.password_hash
              FROM admin.users u
              WHERE user_name = $1
              `;
    const params = [userName];
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
      u.name,
      u.role
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

  async getResetPasswordOTPById(userId: number): Promise<UserOTP | undefined> {
    const sql = `
      SELECT user_id, otp_hash, is_verified, expired_at
      FROM admin.reset_password_otp
      WHERE user_id = $1
        AND is_verified = FALSE
       AND expired_at > NOW();
      `;
    const res: UserOTP[] = await this.safeQuery(sql, [userId]);
    return res[0];
  }
  async updateHashPassword(userId: number, passwordHash: string){
    const sql = `
      UPDATE admin.users
      SET password_hash = $1
      WHERE user_id = $2;
      `;
    await this.safeQuery(sql, [passwordHash, userId]);
  }
  async updateResetPasswordOTP(userId: number){
     const sql = `
      UPDATE admin.reset_password_otp
      SET is_verified = true
      WHERE user_id = $1;
      `;
    await this.safeQuery(sql, [userId]);
  }

  async cleanupOTP(userId: number){
       const sql = `
      DELETE  admin.reset_password_otp
      WHERE user_id = $1;
      `;
    await this.safeQuery(sql, [userId]);

  }

  // async updatePasswordUser()
}

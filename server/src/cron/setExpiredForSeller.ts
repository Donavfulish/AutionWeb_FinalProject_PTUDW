import cron from "node-cron";
import Database from "../config/db";

const pool = Database.getInstance();

export const deleteExpiredTokensJob = () => {
  // Mỗi ngày lúc 00:00
  cron.schedule("0 0 * * *", async () => {
    try {
      const res = await pool.query(
        `
        UPDATE admin.user_upgrade_requests
        SET status = 'expired'
        WHERE expired_at < NOW()
          AND status = 'approved';
        `
      );
      console.log("Đã cập nhật:", res.rowCount, "yêu cầu seller hết hạn");
    } catch (err) {
      console.error("Cron job error:", err);
    }
  });

  // Mỗi giờ
  cron.schedule("0 * * * *", async () => {
    try {
      const res = await pool.query(
        `
        UPDATE admin.users
        SET role = 'bidder'
        WHERE seller_expired_at < NOW()
          AND role = 'seller';
        `
      );
      console.log("Đã cập nhật:", res.rowCount, "quyền seller hết hạn");
    } catch (err) {
      console.error("Cron job error:", err);
    }
  });

  console.log("Cron job: setExpiredForSeller đã khởi động.");
};

import cron from "node-cron";
import Database from "../config/db";

const pool = Database.getInstance();

export const deleteExpiredTokensJob = () => {
  cron.schedule("0 0 * * *", async () => {
    try {
      const res = await pool.query(
        `DELETE FROM admin.refresh_tokens WHERE expired_at < NOW();`
      );
      console.log("Đã xoá:", res.rowCount, "token hết hạn");
    } catch (err) {
      console.error("Cron job error:", err);
    }
  });

  console.log("Cron job: deleteExpiredTokensJob đã khởi động.");
};

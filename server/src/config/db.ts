import { Pool } from "pg";

// 👇 Global type để tránh TypeScript báo lỗi
declare global {
  // eslint-disable-next-line no-var
  var _pgPool: Pool | undefined;
}

class Database {
  private constructor() {}

  public static getInstance(): Pool {
    if (!global._pgPool) {
      global._pgPool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
      });
    }
    return global._pgPool;
  }
}

export default Database;

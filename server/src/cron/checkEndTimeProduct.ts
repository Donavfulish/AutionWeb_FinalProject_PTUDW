import cron from "node-cron";
import Database from "../config/db";

const pool = Database.getInstance();

export const checkEndTimeProduct = () => {
  cron.schedule("* * * * *", async () => {
    try {
      await pool.query("BEGIN");

      let sql = `
            SELECT p.id 
            FROM product.products as p
            WHERE p.end_time <= NOW() AND p.is_end = FALSE
            `;
      const res = await pool.query(sql);
      const productIds: { id: number }[] = res.rows;
      if (productIds.length != 0) {
        const idsInOrders = new Set<number>();
        sql = `
            SELECT o.product_id as id
            FROM auction.orders as o
            WHERE o.status != $1
        `;
        const rs2 = await pool.query(sql, ["cancelled"]);
        const productIdsInOreders: { id: number }[] = rs2.rows;
        productIdsInOreders.map((item) => idsInOrders.add(item.id));

        await Promise.all([
          productIds.forEach(async (item) => {
            if (!idsInOrders.has(item.id)) {
              sql = `
                SELECT p.top_bidder_id
                FROM product.products as p
                WHERE p.id = $1
                `;
              const params = [item.id];
              const rs3 = await pool.query(sql, params);
              const topBidderId: { top_bidder_id: number } = rs3.rows[0];
              if (topBidderId.top_bidder_id != null) {
                sql = `
                    SELECT p.price
                    FROM auction.bid_logs as p
                    WHERE p.product_id = $1 AND p.user_id = $2
                    ORDER BY p.created_at DESC
                    LIMIT 1
                    `;
                const params = [item.id, topBidderId.top_bidder_id];
                const rs4 = await pool.query(sql, params);
                const maxPrice = rs4.rows[0].price;
                sql = `
                    INSERT INTO auction.orders (product_id, status, created_at, updated_at, buyer_id, price ) VALUES( $1,$2,NOW(),NOW(),$3,$4)
                `;
                const paramsInsert = [
                  item.id,
                  "pending",
                  topBidderId.top_bidder_id,
                  maxPrice,
                ];
                await pool.query(sql, paramsInsert);
              }
              sql = `
                UPDATE product.products
                SET is_end = true
                WHERE id = $1 AND is_end = false
                `;
              await pool.query(sql, [item.id]);
            }
          }),
        ]);
      }
      await pool.query("COMMIT");
    } catch (err) {
      await pool.query("ROLLBACK");

      console.error("Cron job error:", err);
    }
  });
};

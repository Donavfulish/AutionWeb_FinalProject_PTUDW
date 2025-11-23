import { Product } from './../../../shared/src/types/Product';
import Database from '../config/db';
export const getProductColumns = async () => {
    const pool = Database.getInstance();
  const sql = `
    SELECT column_name
    FROM information_schema.columns
    WHERE table_schema = 'product'
      AND table_name = 'products'
      AND column_name <> 'id'
      AND column_name <> 'created_at'
      AND column_name <> 'updated_at'
    ORDER BY ordinal_position;
  `;

  const result = await pool.query(sql);
  return result.rows.map(r => r.column_name);
};

export const getProductValue = (data: Product) => {
  const  {
    slug, 
    seller,
    category_id,
    main_image,
    extra_images,
    name,
    initial_price, 
    buy_now_price,
    top_bidder,
    end_time,
    description,
    auto_extend, 
    price_increment
  } = data

  return [
    slug, 
    seller?.id, 
    category_id, 
    main_image,
    extra_images, 
    name, 
    initial_price,
    buy_now_price, 
    top_bidder?.id, 
    end_time,
    description,
    auto_extend, 
    price_increment
]
};
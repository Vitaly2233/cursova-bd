export interface IOrder {
  id: number;
  date: Date;
  wish: string;
  consultant_id: number;
  customer_id: number;
  goods_id: number;
}

export const orderFields = [
  "id",
  "date",
  "wish",
  "consultant_id",
  "customer_id",
  "goods_id",
  "total_price",
];

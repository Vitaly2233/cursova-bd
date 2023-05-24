export interface IOrderDetail {
  order_id: number;
  date: string;
  wish: string;
  consultant_first_name: string;
  consultant_last_name: string;
  customer_first_name: string;
  customer_last_name: string;
  goods_name: string;
}

export const orderDetailFields = [
  "order_id",
  "date",
  "wish",
  "consultant_first_name",
  "consultant_last_name",
  "customer_first_name",
  "customer_last_name",
  "goods_name",
];

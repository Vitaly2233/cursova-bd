import { CommentFields } from "../entities/Comment";
import { commentDetailFields } from "../entities/CommentDetail";
import { consultantFields } from "../entities/Consultant";
import { customerFields } from "../entities/Customer";
import { goodsFields } from "../entities/Goods";
import { orderFields } from "../entities/Order";
import { orderDetailFields } from "../entities/OrderDetail";

export const entityFieldsByType = (type: string) => {
  const obj: Record<string, string[]> = {
    comments: CommentFields,
    consultants: consultantFields,
    customers: customerFields,
    goods: goodsFields,
    orders: orderFields,
    orderDetails: orderDetailFields,
    commentDetails: commentDetailFields,
    customerOrders: [
      "consultant_id",
      "goods_id",
      "order_date",
      "order_id",
      "wish",
    ],
  };

  return obj[type];
};

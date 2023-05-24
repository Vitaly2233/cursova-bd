export interface ICommentDetail {
  comment_id: number;
  content: string;
  date: string;
  stars: number;
  customer_first_name: string;
  customer_last_name: string;
  goods_name: string;
}

export const commentDetailFields = [
  "comment_id",
  "content",
  "date",
  "stars",
  "customer_first_name",
  "customer_last_name",
  "goods_name",
];

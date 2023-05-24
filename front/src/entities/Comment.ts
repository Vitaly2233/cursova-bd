export interface IComment {
  id: number;
  content: string;
  date: string;
  stars: number;
  customer_id: number;
  goods_id: number;
}

export const CommentFields = [
  "id",
  "content",
  "date",
  "stars",
  "customer_id",
  "goods_id",
];

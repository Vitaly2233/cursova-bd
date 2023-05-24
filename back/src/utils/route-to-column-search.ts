const obj = {
  order: ["wish"],
  comment: ["content"],
  consultant: ["first_name", "last_name", "gender"],
  customers: ["first_name", "last_name"],
  goods: ["description", "name"],
  "comment/details": [
    "content",
    "customer_first_name",
    "customer_last_name",
    "goods_name",
  ],
  "order/details": [
    "wish",
    "consultant_first_name",
    "consultant_last_name",
    "customer_first_name",
    "customer_last_name",
    "goods_name",
  ],
};

export const routeToColumnSearch = (routeName: string) => {
  return obj[routeName];
}
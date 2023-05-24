export const entityTypeToRouteName = (type: string) => {
  const obj: Record<string, string> = {
    comments: "comment",
    consultants: "consultant",
    customers: "customer",
    goods: "goods",
    orders: "order",
    commentDetails: "comment/details",
    orderDetails: "order/details",
    customerOrders: "customerOrders"
  };
  return obj[type];
};

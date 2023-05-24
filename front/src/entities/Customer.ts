export interface ICustomer {
  id: number;
  first_name: string;
  last_name: string;
  age: number;
  invited_by: number;
}

export const customerFields = ["id", "first_name", "last_name", "age", "invited_by"];

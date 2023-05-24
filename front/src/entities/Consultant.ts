export interface IConsultant {
  id: number;
  first_name: string;
  last_name: string;
  age: number;
  gender: string;
  working_per_day_in_min: number;
}

export const consultantFields = [
  "id",
  "first_name",
  "last_name",
  "age",
  "gender",
  "working_per_day_in_min",
];

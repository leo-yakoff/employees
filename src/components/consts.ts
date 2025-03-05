export const enum Actions {
  setEmployees = "SET_EMPLOYEES",
}

export const ROLES = [
  { role: "cook", displayValue: "Повар" },
  { role: "waiter", displayValue: "Официант" },
  { role: "driver", displayValue: "Водитель" },
];

export const sortOptions = [
  { id: 0, value: "без сортировки" },
  { id: 1, value: "по имени" },
  { id: 2, value: "по дате рождения" },
];

export const PHONE_PLACEHOLDER = "+7 (999) 999-9999";
export const PHONE_TEMPLATE = "+d (ddd) ddd-dddd";

export const enum Fields {
  name = "name",
  phone = "phone",
  birthday = "birthday",
  role = "role",
}

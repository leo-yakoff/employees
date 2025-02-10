import "../employees.json";
import { ROLES } from "./consts";
import { Employee } from "./types";

export const getEmployees = async (): Promise<{
  error?: string;
  employees?: Employee[];
}> => {
  try {
    const response = await fetch("/employees.json");
    if (!response.ok) {
      return { error: `Response status: ${response.status}` };
    }
    const json = await response.json();
    return { employees: json };
  } catch (error) {
    return { error: error.message };
  }
};

export const getRoleDisplayValue = (role: string) =>
  ROLES.find((elem) => elem.role === role)?.displayValue;

export const getDateForSort = (date: string) =>
  date.substring(6) + date.substring(3, 5) + date.substring(0, 2);

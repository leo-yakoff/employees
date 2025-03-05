import { Dispatch } from "@reduxjs/toolkit";

import "../employees.json";
import { ROLES } from "./consts";
import { setEmloyeesAction } from "./store";
import { Employee, EmployeeAction } from "./types";

export const getEmployees = async (
  dispatch: Dispatch<EmployeeAction>,
  callback?: (employeeList: Employee[]) => void
) => {
  try {
    const response = await fetch("/employees.json");
    if (!response.ok) {
      console.error(`Response status: ${response.status}`);
      return;
    }
    const employees = await response.json();
    callback?.(employees);
    dispatch(setEmloyeesAction(employees));
  } catch (error) {
    console.error(error.message);
  }
};

export const getRoleDisplayValue = (role: string) =>
  ROLES.find((elem) => elem.role === role)?.displayValue;

export const getDateForSort = (date: string) =>
  date.substring(6) + date.substring(3, 5) + date.substring(0, 2);

export const getClassName = (errorMessage: string) =>
  errorMessage ? "not-valid" : "";

export const getFieldId = (type: string) => `employee-${type}`;

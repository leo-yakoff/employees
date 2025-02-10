import { Action } from "@reduxjs/toolkit";

export interface Employee {
  id: number;
  name: string;
  isArchive: boolean;
  role: string;
  phone: string;
  birthday: string;
}

export interface Filters {
  role: string;
  isArchive: boolean;
}

export interface Errors {
  name: string;
  phone: string;
  birthday: string;
  role: string;
}

export interface AppState {
  employees: Employee[];
}

export interface EmployeeAction extends Action {
  employees: Employee[];
}

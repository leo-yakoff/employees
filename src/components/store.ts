import { configureStore } from "@reduxjs/toolkit";

import { Actions } from "./consts";
import { AppState, Employee, EmployeeAction } from "./types";

const initialState: AppState = { employees: [] };

export const setEmloyeesAction = (employees: Employee[]): EmployeeAction => ({
  type: Actions.setEmployees,
  employees,
});

function setEmployeesReducer(
  state = initialState,
  action: EmployeeAction
): AppState {
  if (action.type === Actions.setEmployees) {
    const newState = { ...state, employees: action.employees };
    return newState;
  } else {
    return state;
  }
}

const store = configureStore({
  reducer: setEmployeesReducer,
});

export default store;

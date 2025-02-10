import * as React from "react";
import { createRoot } from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./components/App";
import EmployeeForm from "./components/EmployeeForm";
import store from "./components/store";

createRoot(document.getElementById("app-container")).render(
  <ReduxProvider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="employee" element={<EmployeeForm />} />
        <Route path="employee/:employeeId" element={<EmployeeForm />} />
      </Routes>
    </BrowserRouter>
  </ReduxProvider>
);

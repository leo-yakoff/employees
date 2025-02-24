import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { Dispatch } from "@reduxjs/toolkit";

import "../styles/App.scss";
import { ROLES, sortOptions } from "./consts";
import { AppState, Employee, EmployeeAction, Filters } from "./types";
import { getEmployees, getDateForSort, getRoleDisplayValue } from "./utils";

const App: React.FC = () => {
  const dispatch = useDispatch<Dispatch<EmployeeAction>>();

  const [employees, setEmployees] = React.useState<Employee[]>([]);
  const [sortOption, setSortOption] = React.useState(0);
  const [filters, setFilters] = React.useState<Filters>({
    role: "",
    isArchive: false,
  });

  const allEmployees = useSelector((state: AppState) => state.employees);

  const checkRole = (role: string) => !filters.role || role === filters.role;

  const checkIsArchive = (isArchive: boolean) =>
    filters.isArchive || !isArchive;

  const sortEmployees = (employeeList: Employee[]) => {
    if (!sortOption) {
      return employeeList;
    }

    const sortFunc =
      sortOption === 1
        ? (s1: Employee, s2: Employee) => s1.name.localeCompare(s2.name)
        : (s1: Employee, s2: Employee) =>
            getDateForSort(s1.birthday).localeCompare(
              getDateForSort(s2.birthday)
            );

    return employeeList.sort(sortFunc);
  };

  const filterEmployees = (employeeList: Employee[]) =>
    employeeList.filter(
      (elem) => checkRole(elem.role) && checkIsArchive(elem.isArchive)
    );

  const resetSorting = () => setEmployees(filterEmployees(allEmployees));

  React.useEffect(() => {
    const callback = (employeeList: Employee[]) =>
      setEmployees(filterEmployees(employeeList));

    !allEmployees.length && getEmployees(dispatch, callback);
  }, []);

  React.useEffect(
    () =>
      sortOption ? setEmployees(sortEmployees([...employees])) : resetSorting(),
    [sortOption]
  );

  React.useEffect(() => {
    const filteredEmployees = filterEmployees(allEmployees);
    setEmployees(
      sortOption ? sortEmployees(filteredEmployees) : filteredEmployees
    );
  }, [filters]);

  const navigate = useNavigate();

  const goToEditForm = (employeeId: number) => {
    navigate(`employee/${employeeId}`);
  };

  const renderSortOptions = sortOptions.map((item) => {
    return (
      <option key={item.id} value={item.id}>
        {item.value}
      </option>
    );
  });

  const renderRoleOptions = () => {
    const roles = [
      <option key="empty" value="">
        не выбрана
      </option>,
    ];

    ROLES.forEach((item) => {
      roles.push(
        <option key={item.role} value={item.role}>
          {item.displayValue}
        </option>
      );
    });

    return roles;
  };

  const renderEmployees = employees.map((item) => (
    <tr key={item.id} onClick={() => goToEditForm(item.id)}>
      <td>{item.name}</td>
      <td>{getRoleDisplayValue(item.role) ?? "-"}</td>
      <td>{item.phone}</td>
    </tr>
  ));

  return (
    <>
      <header>
        <h1>Сотрудники компании</h1>
        <section className="sort-container flex">
          <label htmlFor="sort">Сортировка:</label>
          <select
            id="sort"
            value={sortOption}
            onChange={(event) => setSortOption(Number(event.target.value))}
          >
            {renderSortOptions}
          </select>
        </section>
        <section className="filter-container flex">
          <fieldset>
            <legend>Фильтры</legend>

            <div className="filters flex">
              <div className="filter-role flex">
                <label htmlFor="filter-role">Должность:</label>
                <select
                  id="filter-role"
                  value={filters.role}
                  onChange={(event) =>
                    setFilters({ ...filters, role: event.target.value })
                  }
                >
                  {renderRoleOptions()}
                </select>
              </div>

              <div className="filter-archive flex">
                <input
                  type="checkbox"
                  id="filter-archive"
                  checked={filters.isArchive}
                  onChange={() =>
                    setFilters({ ...filters, isArchive: !filters.isArchive })
                  }
                />
                <label htmlFor="filter-archive">в архиве</label>
              </div>
            </div>
          </fieldset>
        </section>
        <section className="add-employee flex">
          <Link to="/employee">Добавить сотрудника</Link>
        </section>
      </header>
      <main role="main" className="main-container flex">
        <table>
          <thead>
            <tr>
              <th>Имя</th>
              <th>Должность</th>
              <th>Телефон</th>
            </tr>
          </thead>
          <tbody>{renderEmployees}</tbody>
        </table>
      </main>
    </>
  );
};

export default App;

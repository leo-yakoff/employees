import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { Dispatch } from "@reduxjs/toolkit";

import "../styles/EmployeeForm.scss";
import { Fields, PHONE_PLACEHOLDER, PHONE_TEMPLATE, ROLES } from "./consts";
import { setEmloyeesAction } from "./store";
import { AppState, Employee, EmployeeAction, Errors } from "./types";
import { getClassName } from "./utils";

interface Field {
  type: string;
  label: string;
  error: string;
  tag: React.JSX.Element;
}

const EmployeeForm: React.FC = () => {
  const dispatch = useDispatch<Dispatch<EmployeeAction>>();

  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [birthday, setBirthday] = React.useState("");
  const [role, setRole] = React.useState("");
  const [isArchive, setIsArchive] = React.useState(false);
  const [errors, setErrors] = React.useState<Errors>({
    name: "",
    phone: "",
    birthday: "",
    role: "",
  });

  const employees = useSelector((state: AppState) => state.employees);

  const params = useParams();

  const employeeId = params.employeeId ? Number(params.employeeId) : 0;

  React.useEffect(() => {
    if (!employeeId) {
      return;
    }

    const employee = employees.find((elem) => elem.id === employeeId);
    if (employee) {
      setName(employee.name);
      setPhone(employee.phone);
      setBirthday(
        `${employee.birthday.substring(6)}-${employee.birthday.substring(
          3,
          5
        )}-${employee.birthday.substring(0, 2)}`
      );
      setRole(employee.role);
      setIsArchive(employee.isArchive);
    }
  }, []);

  const getDate = (difference: number) => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - difference);
    return date;
  };

  const getDateString = (date: Date) => date.toISOString().substring(0, 10);

  const minDate = getDate(80);
  const minDateStr = getDateString(minDate);

  const maxDate = getDate(14);
  const maxDateStr = getDateString(maxDate);

  const handleNameChange = (value: string) => {
    setName(value);
    setErrors({ ...errors, name: "" });
  };

  const handlePhoneChange = (value: string) => {
    let isValid = true;
    let newPhone = "";

    if (value.length) {
      let i = 0; // порядковый номер символа введённого значения
      let j = 0; // порядковый номер символа шаблона
      let wrongCharCnt = 0;
      const addChar = () => {
        newPhone += value[i];
        i++;
        j++;
      };
      while (i < value.length && j < PHONE_TEMPLATE.length) {
        if (PHONE_TEMPLATE[j] === "d") {
          if (/\d/.test(value[i])) {
            wrongCharCnt = 0;
            addChar();
          } else {
            newPhone = newPhone.substring(0, newPhone.length - wrongCharCnt);
            isValid = false;
            break;
          }
        } else {
          if (value[i] === PHONE_TEMPLATE[j]) {
            addChar();
          } else {
            wrongCharCnt++;
            newPhone += PHONE_TEMPLATE[j];
            j++;
          }
        }
      }
    }
    setPhone(newPhone);

    if (isValid) {
      errors.phone && setErrors({ ...errors, phone: "" });
    } else {
      newPhone &&
        !errors.phone &&
        setErrors({
          ...errors,
          phone: `используйте формат: ${PHONE_PLACEHOLDER}`,
        });
    }
  };

  const handleBirthdayChange = (value: string) => {
    setBirthday(value);
    setErrors({ ...errors, birthday: "" });
  };

  const handleRoleChange = (value: string) => {
    setRole(value);
    setErrors({ ...errors, role: "" });
  };

  const renderRoleOptions = () => {
    const roles = [
      <option key="empty" value="" disabled>
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

  const getFieldId = (type: string) => `employee-${type}`;

  const getContainer = (field: Field) => {
    const id = getFieldId(field.type);

    return (
      <>
        <label htmlFor={id} className="justify-right">
          {field.label}
        </label>
        <div className={id}>
          {field.tag}
          <div className="error">{field.error}</div>
        </div>
      </>
    );
  };

  const fieldList = {
    name: {
      type: Fields.name,
      label: "Имя:",
      error: errors.name,
      tag: (
        <input
          type="text"
          id={getFieldId(Fields.name)}
          value={name}
          placeholder="Иван Иванов"
          onChange={(event) => handleNameChange(event.target.value)}
          className={getClassName(errors.name)}
        />
      ),
    },
    phone: {
      type: Fields.phone,
      label: "Телефон:",
      error: errors.phone,
      tag: (
        <input
          type="tel"
          id={getFieldId(Fields.phone)}
          value={phone}
          placeholder={PHONE_PLACEHOLDER}
          onChange={(event) => handlePhoneChange(event.target.value)}
          className={getClassName(errors.phone)}
        />
      ),
    },
    birthday: {
      type: Fields.birthday,
      label: "Дата рождения:",
      error: errors.birthday,
      tag: (
        <input
          type="date"
          id={getFieldId(Fields.birthday)}
          value={birthday}
          min={minDateStr}
          max={maxDateStr}
          onChange={(event) => handleBirthdayChange(event.target.value)}
          className={getClassName(errors.birthday)}
        />
      ),
    },
    role: {
      type: Fields.role,
      label: "Должность:",
      error: errors.role,
      tag: (
        <select
          id={getFieldId(Fields.role)}
          value={role}
          onChange={(event) => handleRoleChange(event.target.value)}
          className={getClassName(errors.role)}
        >
          {renderRoleOptions()}
        </select>
      ),
    },
  };

  const navigate = useNavigate();

  const goHome = () => navigate("/");

  const getBirthdayError = () => {
    if (!birthday) {
      return "заполните дату рождения!";
    }

    if (birthday < minDateStr) {
      return `минимальная дата: ${minDate.toLocaleDateString()}!`;
    }

    if (birthday > maxDateStr) {
      return `максимальная дата: ${maxDate.toLocaleDateString()}!`;
    }

    return "";
  };

  const handleSave = () => {
    const birthdayError = getBirthdayError();

    const newErrors: Errors = { ...errors };

    newErrors.name = name ? "" : "заполните имя!";
    newErrors.phone =
      phone.length < PHONE_TEMPLATE.length ? "заполните телефон!" : "";
    newErrors.birthday = birthdayError ? birthdayError : "";
    newErrors.role = role ? "" : "выберите должность!";

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((elem) => !!elem);
    if (!hasErrors) {
      const id = employeeId ? employeeId : employees.length + 1;

      const employee = {
        id,
        name,
        phone,
        birthday: `${birthday.substring(8)}.${birthday.substring(
          5,
          7
        )}.${birthday.substring(0, 4)}`,
        role,
        isArchive,
      };

      const saveChanges = (list: Employee[]) => {
        dispatch(setEmloyeesAction(list));
        goHome();
      };

      if (employeeId) {
        const newEmployeeList = [...employees];
        const index = newEmployeeList.findIndex(
          (elem) => elem.id === employeeId
        );
        if (index > -1) {
          newEmployeeList[index] = employee;
          saveChanges(newEmployeeList);
        } else {
          console.error(
            `Не удалось найти идентификатор сотрудника: ${employeeId}!`
          );
        }
      } else {
        saveChanges([...employees, employee]);
      }
    }
  };

  return (
    <>
      <header>
        <h1>Сотрудник компании</h1>
      </header>
      <main className="employee">
        {getContainer(fieldList.name)}
        {getContainer(fieldList.phone)}
        {getContainer(fieldList.birthday)}
        {getContainer(fieldList.role)}

        <div className="employee-archive flex">
          <input
            type="checkbox"
            id="employee-archive"
            checked={isArchive}
            onChange={() => setIsArchive(!isArchive)}
          />
          <label htmlFor="employee-archive">в архиве</label>
        </div>
      </main>
      <footer className="flex">
        <button onClick={handleSave}>Сохранить</button>
        <button onClick={goHome}>Отмена</button>
      </footer>
    </>
  );
};

export default EmployeeForm;

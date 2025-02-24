import React from "react";
import { Link } from "react-router";

import "../styles/ErrorPage404.scss";

const ErrorPage404: React.FC = () => {
  return (
    <main className="error-page">
      <p>Запрашиваемая страница не найдена!</p>
      <Link to="/">На главную</Link>
    </main>
  );
};

export default ErrorPage404;

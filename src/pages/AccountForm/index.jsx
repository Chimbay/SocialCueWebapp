import React from "react";
import style from "./index.module.css";
import { useParams } from "react-router-dom";

export default function AccountForm() {
  const { formStatus } = useParams();

  function handleSubmit(e) {
    e.preventDefault();
    const username = e.target[0].value;
    const password = e.target[1].value;
    let confirmPassword = null;
    if (formStatus == "signup") confirmPassword = e.target[2].value;

    if (formStatus == "signup") {
      console.log(
        `Username: ${username}\nPassword: ${password}\nConfirm Password: ${confirmPassword}`,
      );
    } else {
      console.log(`Username: ${username}\nPassword: ${password}\n`);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <h1>oh yeah we signing up</h1>
      <input type="text" placeholder="Username" className={style.input} />
      <input type="password" placeholder="Password" className={style.input} />
      {formStatus == "signup" && (
        <input
          type="password"
          placeholder="Confirm Password"
          className={style.input}
        />
      )}
      <button type="submit" className={style.submitButton}>
        Login!
      </button>
    </form>
  );
}

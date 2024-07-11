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
        `Username: ${username}\nPassword: ${password}\nConfirm Password: ${confirmPassword}`
      );
    } else if (formStatus == "login") {
      console.log(`Username: ${username}\nPassword: ${password}\n`);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <h1>
        {formStatus == "signup"
          ? "Sign up to make your account!"
          : "Log in to your account!"}
      </h1>
      {formStatus == "signup" && (
        <>
          <div className={style.typeButtonContainer}>
            <a className={style.accountType}>Parents/Gaurdians</a>
            <a className={style.accountType}>Kids</a>
          </div>
          <label className={style.label}>
            First Name
            <input type="password" className={style.input} />
          </label>
          <label className={style.label}>
            Last Name
            <input type="password" className={style.input} />
          </label>
        </>
      )}
      <label className={style.label}>
        Email Address
        <input type="text" className={style.input} />
      </label>
      <label className={style.label}>
        Your Password
        <input type="password" className={style.input} />
      </label>
      <label className={style.label}>
        Confirm Your Password
        <input type="password" className={style.input} />
      </label>
      <button type="submit" className={style.submitButton}>
        {formStatus == "signup" ? "Sign Up" : "Log In"}
      </button>
    </form>
  );
}

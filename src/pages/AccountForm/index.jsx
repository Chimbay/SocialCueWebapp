import React from "react";
import style from "./index.module.css";
import { Link, useParams } from "react-router-dom";

export default function AccountForm() {
  const { formStatus } = useParams();

  function handleSubmit(e) {
    e.preventDefault();

    if (formStatus == "signup") console.log(e.target[0].value);
  }

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <h1 className={style.heading}>Welcome to Cue</h1>
      <h2>
        {formStatus == "signup"
          ? "Sign up to make your account!"
          : "Log in to your account!"}
      </h2>
      {formStatus == "signup" && (
        <>
          <div className={style.typeButtonContainer}>
            <button className={style.accountType}>Parents/Gaurdians</button>
            <button className={style.accountType}>Kids</button>
          </div>
          <label className={style.label}>
            First Name
            <input type="text" className={style.input} />
          </label>
          <label className={style.label}>
            Last Name
            <input type="text" className={style.input} />
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
      {formStatus == "signup" && (
        <label className={style.label}>
          Confirm Your Password
          <input type="password" className={style.input} />
        </label>
      )}
      <button type="submit" className={style.submitButton}>
        {formStatus == "signup" ? "Sign Up" : "Log In"}
      </button>
      <p className={style.rerouteHeading}>
        {formStatus == "signup"
          ? "Already have an account?"
          : "Don't have an account?"}
      </p>
      <Link
        className={style.rerouteButton}
        to={
          formStatus == "signup" ? "/AccountForm/login" : "/AccountForm/signup"
        }
      >
        {formStatus == "signup" ? "Log in!" : "Sign up!"}
      </Link>
    </form>
  );
}

import React from "react";
import style from "./index.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function AccountForm() {
  const { formStatus } = useParams();
  const nav = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.target));

    if (!data.accountType) {
      console.log(`Email: ${data.email}`);
      console.log(`Password: ${data.password}`);
    } else {
      console.log(`Account Type: ${data.accountType}`);
      console.log(`First Name: ${data.firstName}`);
      console.log(`Last Name: ${data.lastName}`);
      console.log(`Email: ${data.email}`);
      console.log(`Password: ${data.password}`);
    }

    nav("/");
    e.target.reset();
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
            <input
              className={style.accountTypeRadio}
              id="parent/gaurdian"
              required
              name="accountType"
              type="radio"
              value="parent/gaurdian"
            />
            <label className={style.accountTypeLabel} htmlFor="parent/gaurdian">
              Parent/Gaurdian
            </label>
            <input
              className={style.accountTypeRadio}
              id="kids"
              required
              name="accountType"
              type="radio"
              value="kids"
            />
            <label className={style.accountTypeLabel} htmlFor="kids">
              Kids
            </label>
          </div>
          <label className={style.label}>
            First Name
            <input
              required
              name="firstName"
              type="text"
              className={style.input}
            />
          </label>
          <label className={style.label}>
            Last Name
            <input
              required
              name="lastName"
              type="text"
              className={style.input}
            />
          </label>
        </>
      )}
      <label className={style.label}>
        Email Address
        <input required name="email" type="text" className={style.input} />
      </label>
      <label className={style.label}>
        Your Password
        <input
          required
          name="password"
          type="password"
          className={style.input}
        />
      </label>
      {formStatus == "signup" && (
        <label className={style.label}>
          Confirm Your Password
          <input
            required
            name="confirmPassword"
            type="password"
            className={style.input}
          />
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

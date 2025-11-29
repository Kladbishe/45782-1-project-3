import { useForm } from "react-hook-form";
import "./Login.css";
import type LoginModel from "../../../models/login";
import type UserRegister from "../../../models/userRegister";
import { useContext, useState } from "react";
import axios from "axios";
import authService from "../../../services/auth";
import AuthContext from "../auth/AuthContext";
import logo from "../../../assets/logo.svg";

export default function Login() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [mode, setMode] = useState<"login" | "register">("login");


  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm<LoginModel>();

 
  const {
    register: registerRegister,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerErrors },
    setError: setRegisterError, 
  } = useForm<UserRegister>();

  const authContext = useContext(AuthContext);




  async function submitLogin(login: LoginModel) {
    try {
      setIsSubmitting(true);
      setErrorMessage(null);
      setSuccessMessage(null);

      const { token } = await authService.login(login);
      authContext?.newToken(token);
    } catch (err) {
      console.log(err);
      setErrorMessage("Login failed. Please check your email and password.");
    } finally {
      setIsSubmitting(false);
    }
  }


  

  async function submitRegister(user: UserRegister) {
    try {
      setIsSubmitting(true);
      setErrorMessage(null);
      setSuccessMessage(null);

      await authService.register(user);

      setSuccessMessage("Account created. You can now log in.");
      setMode("login");
    } catch (err) {         
      console.log(err);

      if (axios.isAxiosError(err) && err.response?.status === 409) {

        setRegisterError("email", {
          type: "server",
          message: "This email is already registered",
        });
      } else {
        setErrorMessage("Registration failed. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }





  return (
    <div className="Login">
      <header className="Login-header">
        <img src={logo} alt="App logo" className="Login-logo" />
      </header>

      <main className="Login-main">
        {mode === "login" && (
          <form noValidate onSubmit={handleLoginSubmit(submitLogin)}>
            {successMessage && (
              <div className="Login-successMessage">{successMessage}</div>
            )}

            {errorMessage && (
              <div className="Login-errorMessage">{errorMessage}</div>
            )}

            <h2 className="Login-title">Welcome back</h2>
            <p className="Login-subtitle">
              Please sign in to see your vacations.
            </p>

            <input
              placeholder="Email"
              {...loginRegister("email", {
                required: "Email is required",
              })}
            />
            {loginErrors.email && (
              <div className="Login-fieldError">
                {loginErrors.email.message}
              </div>
            )}

            <input
              placeholder="Password"
              type="password"
              {...loginRegister("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {loginErrors.password && (
              <div className="Login-fieldError">
                {loginErrors.password.message}
              </div>
            )}

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Logging in..." : "Login"}
            </button>

            <div className="Login-register">
              <span>Don’t have an account?</span>
              <button
                type="button"
                onClick={() => {
                  setErrorMessage(null);
                  setSuccessMessage(null);
                  setMode("register");
                }}
              >
                Create account
              </button>
            </div>
          </form>
        )}

        {mode === "register" && (
          <form noValidate onSubmit={handleRegisterSubmit(submitRegister)}>
            {errorMessage && (
              <div className="Login-errorMessage">{errorMessage}</div>
            )}

            <h2 className="Login-title">Create account</h2>
            <p className="Login-subtitle">
              Fill in your details to get started.
            </p>

            <input
              placeholder="First name"
              {...registerRegister("firstName", {
                required: "First name is required",
                minLength: {
                  value: 2,
                  message: "First name must be at least 2 characters",
                },
              })}
            />
            {registerErrors.firstName && (
              <div className="Login-fieldError">
                {registerErrors.firstName.message}
              </div>
            )}

            <input
              placeholder="Last name"
              {...registerRegister("lastName", {
                required: "Last name is required",
                minLength: {
                  value: 2,
                  message: "Last name must be at least 2 characters",
                },
              })}
            />
            {registerErrors.lastName && (
              <div className="Login-fieldError">
                {registerErrors.lastName.message}
              </div>
            )}

            <input
              placeholder="Email"
              {...registerRegister("email", {
                required: "Email is required",
              })}
            />
            {registerErrors.email && (
              <div className="Login-fieldError">
                {registerErrors.email.message}
              </div>
            )}

            <input
              placeholder="Password"
              type="password"
              {...registerRegister("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {registerErrors.password && (
              <div className="Login-fieldError">
                {registerErrors.password.message}
              </div>
            )}

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Register"}
            </button>

            <div className="Login-register">
              <span>Already have an account?</span>
              <button
                type="button"
                onClick={() => {
                  setErrorMessage(null);
                  setSuccessMessage(null);
                  setMode("login");
                }}
              >
                Back to login
              </button>
            </div>
          </form>
        )}
      </main>

      <footer className="Login-footer">
        (c) copyrights Dream Vacations | Server address:{" "}
        {import.meta.env.VITE_REST_SERVER_URL}
      </footer>
    </div>
  );
}

import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const formSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Must enter email"),
    password: yup.string().required("Must enter a password"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: formSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.post(
          "http://127.0.0.1:5555/auth/login",
          values
        );
        const data = response.data;
        if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("refresh_token", data.refresh_token);
          alert("Login successful!");
          resetForm();
          navigate("/home");
        } else {
          alert(data.msg);
        }
      } catch (error) {
        console.error("Error during login:", error);
        alert("Login failed. Please try again.");
      }
    },
  });

  return (
    <div className="Login">
      <h2>Login</h2>
      <form onSubmit={formik.handleSubmit} id="login-form-cs">
        <label htmlFor="email">Email Address</label>
        <br />
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />{" "}
        <br />
        {formik.touched.email && formik.errors.email ? (
          <p className="error-message">{formik.errors.email}</p>
        ) : null}
        <label htmlFor="password">Password</label>
        <br />
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />{" "}
        <br />
        {formik.touched.password && formik.errors.password ? (
          <p className="error-message">{formik.errors.password}</p>
        ) : null}
        <div className="login-links">
          <div style={{ color: "white" }}>
            Don't have an account?{" "}
            <Link to="/register" style={{ color: "yellow" }}>
              Register here
            </Link>
          </div>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

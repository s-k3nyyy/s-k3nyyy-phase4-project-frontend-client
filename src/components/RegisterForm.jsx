import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./RegisterForm.css";

const RegisterForm = () => {
  const navigate = useNavigate();

  const formSchema = yup.object().shape({
    username: yup.string().required("Must enter a username"),
    email: yup.string().email("Invalid email").required("Must enter email"),
    password: yup
      .string()
      .required("Must enter a password")
      .min(6, "Password must be at least 6 characters long"),
    password2: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Must confirm password"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      password2: "",
    },
    validationSchema: formSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await fetch("http://127.0.0.1:5555/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        const data = await response.json();
        if (data.msg === "User registration Successful") {
          alert("Registration successful!");
          navigate("/home");
          resetForm();
        } else {
          alert(data.msg);
        }
      } catch (error) {
        console.error("Error during registration:", error);
        alert("Registration failed. Please try again.");
      }
    },
  });

  return (
    <div className="RegisterForm" id="reg-form">
      <h2 className="title">Register</h2>
      <form onSubmit={formik.handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.username && formik.errors.username ? (
            <div className="error-message">{formik.errors.username}</div>
          ) : null}
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="error-message">{formik.errors.email}</div>
          ) : null}
        </label>

        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="error-message">{formik.errors.password}</div>
          ) : null}
        </label>

        <label>
          Confirm Password:
          <input
            type="password"
            name="password2"
            value={formik.values.password2}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.password2 && formik.errors.password2 ? (
            <div className="error-message">{formik.errors.password2}</div>
          ) : null}
        </label>

        <div className="login-link">
          Already have an account?{" "}
          <Link to="/" style={{ color: "yellow" }}>
            Login here
          </Link>
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;

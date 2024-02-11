import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Initialize useNavigate
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:3001/Login",
        formData
      );

      if (response.data === "success") {
        navigate("/home");
      } else {
        console.error("Login failed:", response.data);
      }
    } catch (error) {
      // Handle errors, such as network issues or server errors
      console.error("Login failed:", error.message);
    }
  };

  return (
    <section
      className="vh-100 bg-image"
      style={{
        backgroundImage:
          "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')",
      }}
    >
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6">
              <div className="card" style={{ borderRadius: "15px" }}>
                <div className="card-body p-4">
                  <h2 className="text-uppercase text-center mb-4">Login</h2>

                  <form onSubmit={handleSubmit}>
                    <div className="form-outline mb-4">
                      <input
                        type="email"
                        id="email"
                        className="form-control form-control-lg"
                        value={formData.email}
                        onChange={handleChange}
                      />
                      <label className="form-label" htmlFor="email">
                        Your Email
                      </label>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        id="password"
                        className="form-control form-control-lg"
                        value={formData.password}
                        onChange={handleChange}
                      />
                      <label className="form-label" htmlFor="password">
                        Password
                      </label>
                    </div>

                    <div className="d-grid mb-4">
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg gradient-custom-4 text-body"
                      >
                        Login
                      </button>
                    </div>
                  </form>

                  <p className="text-center text-muted mt-3 mb-0">
                    Don't have an account?{" "}
                    <Link to="/register" className="fw-bold text-body">
                      <u>Register here</u>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;

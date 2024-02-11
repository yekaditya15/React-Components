// Signup.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
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
        "http://localhost:3001/register",
        formData
      );

      // Handle the response
      console.log("Signup successful:", response.data);

      // Use navigate to redirect to /login page on successful signup
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.status === 409) {
        // User with the same email already exists
        console.error("Signup failed:", error.response.data);
        // Display a message to the user or update the UI accordingly
      } else {
        // Handle other errors
        console.error("Signup failed:", error.message);
      }
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
                  <h2 className="text-uppercase text-center mb-4">Sign Up</h2>

                  <form onSubmit={handleSubmit}>
                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        id="name"
                        className="form-control form-control-lg"
                        value={formData.name}
                        onChange={handleChange}
                      />
                      <label className="form-label" htmlFor="name">
                        Your Name
                      </label>
                    </div>

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
                        className="btn btn-success btn-lg gradient-custom-4 text-body"
                      >
                        Register
                      </button>
                    </div>
                  </form>

                  <p className="text-center text-muted mt-3 mb-0">
                    Already have an account?{" "}
                    <Link to="/login" className="fw-bold text-body">
                      <u>Login here</u>
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

export default Signup;

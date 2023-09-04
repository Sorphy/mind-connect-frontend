import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Registration.css";
import { FaLock } from "react-icons/fa";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  state: string;
  password: string;
  confirmPassword: string;
  mentalCondition: string;
  gender: string;
}

export const Registration = () => {

  const navigate = useNavigate();

  const handleLinkNavigation = () => {
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    state: "",
    password: "",
    confirmPassword: "",
    mentalCondition: "",
    gender: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Here!");

    try {
      const response = await axios.post(
        "http://localhost:4000/user/register",
        formData
      );
      if (response.status === 201) {
        const { userDetails } = response.data;
        const { token } = userDetails; // Extract the token from the response data
        console.log("User registered:", userDetails);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        navigate("/verify-otp");

        // Store the token in local storage or any other desired storage mechanism
        localStorage.setItem("token", token);

        // Set the Authorization header for subsequent requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        // Reset the form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          country: "",
          state: "",
          password: "",
          confirmPassword: "",
          mentalCondition: "",
          gender: "",
        });

        toast.success("User registered successfully"); // Display success notification
      } else {
        console.log("Registration failed", response.data);
      }
    } catch (error) {
      console.log("Error occurred:", error);
      toast.error("User already exists in the database"); // Display error notification
    }
  };


  return (
    <div className="body">
     
      <form onSubmit={handleSubmit}>
        <div className="background">
          <div className="Frame1">
            <div className="Frame2">
              <div className="mind-connect">
                <div className="mind-connect-text">MindConnect</div>
                <div className="Frame6"></div>
              </div>
            </div>
            <div className="parentFrame3">
              <div className="Frame3">
                
                  <div className="parentForm">
                    <div className="Frame4">
                      <div className="Frame5">
                        <div>
                          <div className="registration">Registration</div>
                        </div>
                        <div className="Frame6"></div>
                      </div>
                      <div className="Frame7">
                        <div className="Frame8">
                          <div className="form-group1">
                            <label
                              className="form-group-box"
                              htmlFor="firstName"
                            >
                              Firstname
                            </label>

                            <input
                              type="text"
                              name="firstName"
                              placeholder="Enter FirstName"
                              value={formData.firstName}
                              onChange={handleChange}
                              required
                            />
                          </div>
                          <div className="form-group1">
                            <label
                              className="form-group-box"
                              htmlFor="lastName"
                            >
                              Lastname
                            </label>

                            <input
                              type="text"
                              name="lastName"
                              placeholder="Enter LastName"
                              value={formData.lastName}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="Frame9">
                          <div className="form-group1">
                            <div className="form-label">
                              <label className="form-group-box" htmlFor="email">
                                Email
                              </label>
                            </div>
                            <input
                              type="email"
                              name="email"
                              placeholder="Enter email address"
                              value={formData.email}
                              onChange={handleChange}
                              required
                            />
                          </div>
                          <div className="form-group1">
                            <label
                              className="form-group-box"
                              htmlFor="mentalCondition"
                            >
                              Mental Condition{" "}
                              <span id="option">(Optional)</span>
                            </label>
                            <select
                              name="mentalCondition"
                              value={formData.mentalCondition}
                              onChange={handleChange}
                              title="select"
                            >
                              <option value="" className="placeholder-option">
                                Please select
                              </option>
                              <option value="anxiety_disorder">Anxiety disorder</option>
                              <option value="eating_disorder">Eating disorder</option>
                              <option value="mood_disorder">Mood disorder</option>
                              <option value="personaity_disorder">Personaity disorder</option>
                              <option value="psychatic_disorder">Psychatic disorder</option>
                              <option value="trauma_and_stress_related_disorder">Trauma and stress-related disorder</option>
                              <option value="undiagnosed">Undiagnosed</option>
                            </select>
                          </div>
                        </div>
                        <div className="Frame10">
                          <div className="form-group1">
                            <div className="form-label">
                              <label
                                className="form-group-box"
                                htmlFor="country"
                              >
                                Country
                              </label>
                            </div>
                            <input
                              type="text"
                              name="country"
                              placeholder="Enter Country"
                              value={formData.country}
                              onChange={handleChange}
                              required
                            />
                          </div>
                          <div className="form-group1">
                            <div className="form-label">
                              <label
                                className="form-group-box"
                                htmlFor="stateProvince"
                              >
                                State/Province
                              </label>
                            </div>
                            <input
                              type="text"
                              name="state"
                              placeholder="Enter your State/Province of residence"
                              value={formData.state}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="Frame11">
                          <div className="form-group1">
                            <div className="form-label">
                              <label
                                className="form-group-box"
                                htmlFor="password"
                              >
                                Password
                              </label>
                            </div>

                            <div className="password-input">
                              <FaLock className="lock-icon" />
                              <input
                                id="input-password"
                                type="password"
                                name="password"
                                required
                                placeholder="Enter password"
                                value={formData.password}
                                onChange={handleChange}
                              />
                            </div>
                          </div>

                          <div className="form-group1">
                            <div className="form-label">
                              <label
                                className="form-group-box"
                                htmlFor="confrimPassword"
                              >
                                Confrim Password
                              </label>
                            </div>
                            <div className="password-input">
                              <FaLock className="lock-icon" />
                              <input
                                id="input-confirmPassword"
                                type="password"
                                name="confirmPassword"
                                required
                                placeholder="Enter password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="Frame12">
                          <div className="Frame13">
                            <label className="Frame14">Gender</label>
                          </div>
                          <div className="frame15">
                            <div className="form-check1">
                              <input
                                type="radio"
                                name="gender"
                                id="male"
                                value="male"
                                checked={formData.gender === 'male'}
                                onChange={handleChange}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="male"
                              >
                                Male
                              </label>
                            </div>
                            <div className="form-check1">
                              <input
                                type="radio"
                                name="gender"
                                id="female"
                                value="female"
                                checked={formData.gender === 'female'}
                                onChange={handleChange}
                              />

                              <label
                                className="form-check-label"
                                htmlFor="female"
                              >
                                Female
                              </label>
                            </div>
                            <div className="form-check1">
                              <input
                                type="radio"
                                name="gender"
                                id="other"
                                value="other"
                                checked={formData.gender === 'other'}
                                onChange={handleChange}
                              />

                              <label
                                className="form-check-label"
                                htmlFor="other"
                              >
                                Other
                              </label>
                            </div>
                            <div className="form-check1">
                              <input
                                type="radio"
                                name="gender"
                                id="prefer-not-to-say"
                                value="prefer-not-to-say"
                                checked={formData.gender === 'prefer-not-to-say'}
                                onChange={handleChange}
                              />

                              <label
                                className="form-check-label"
                                htmlFor="prefer-not-to-say"
                              >
                                Prefer not to say
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="frame16">
                      <div className="frame17">
                        <div>
                          <button type="submit" className="btn-btn-primary">
                            <span className="create-account-button">
                              Create account
                            </span>
                          </button>
                        </div>
                        <div className="form-group-text-center">
                          <p>
                            Already have an account?{" "}
                            <Link to="/login" className="no-underline" onClick={handleLinkNavigation}>
                              Sign in
                            </Link>
                          </p>
                        </div>
                      </div>
                      <div className="form-group-text-center-bottom">
                        <p className="break-line">
                          By creating an account you agree to our{" "}
                          <Link to="#" className="no-underline">
                            Privacy Policies
                          </Link>{" "}
                          and{" "}
                          <Link to="#" className="no-underline">
                            Terms
                          </Link>
                          .
                        </p>
                      </div>
                    </div>
                  </div>
                
              </div>
            </div>
          </div>
        </div>
        </form>
  
    </div>
  );
};

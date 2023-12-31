import React from "react";
import { useNavigate } from "react-router-dom";
import "./CreateDoctor.css";
import { useState } from "react";
import UserService from "../Service/UserService";
import { RoutesPath } from "../helper";
import { MenuItem, Select, TextField, Box, Button } from "@mui/material";

function CreateDoctor() {

  const [formValue, setFormValue] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    age: "",
    specialization: "",
    experience: "",
    city: "",
    state: "",
    fees: "",
    pinCode: "",
  });

  function changeGenderValues(event) {
    const newGenderValue = event.target.value;
    setFormValue((prevState) => ({
      ...prevState,
      gender: newGenderValue,
    }));
  }

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { id, value } = event.target;

    setFormValue({ ...formValue, [event.target.id]: event.target.value });

    const newErrors = { ...errors };

    if (id == "firstName") {
      if (!value) {
        newErrors.firstName = "First name is required";
      } else if (!/^[A-Z]{1}[a-zA-Z\\s]{2,}$/.test(value)) {
        newErrors.firstName = "First name is invalid";
      } else {
        newErrors.firstName = "";
      }
    }

    if (id == "lastName") {
      if (!value) {
        newErrors.lastName = "Last name is required";
      } else if (!/^[A-Z]{1}[a-zA-Z\\s]{2,}$/.test(value)) {
        newErrors.lastName = "Last name is invalid";
      } else {
        newErrors.lastName = "";
      }
    }

    if (id == "email") {
      if (!value) {
        newErrors.email = "Email is required";
      } else if (!/^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/.test(value)) {
        newErrors.email = "Email is invalid";
      } else {
        newErrors.email = "";
      }
    }

    if (id == "password") {
      if (!value) {
        newErrors.password = "Password is required";
      } else if (
        !/^(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$&])[A-Za-z0-9@#$&]{8,}$/.test(value)
      ) {
        newErrors.password = "Password is invalid";
      } else {
        newErrors.password = "";
      }
    }

    if (id == "confirmPassword") {
      if (!value) {
        newErrors.confirmPassword = "Password is required";
      } else if (
        !/^(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$&])[A-Za-z0-9@#$&]{8,}$/.test(value) || value != formValue.password
      ) {
        newErrors.confirmPassword = "Password is not matching";
      } else {
        newErrors.confirmPassword = "";
      }
    }

    if (id == "gender") {
      if (!value) {
        newErrors.gender = "Gender is required";
      } else {
        newErrors.gender = "";
      }
    }

    if (id == "age") {
      if (!value) {
        newErrors.age = "Age is required";
      } else if (!/^(?:1[0-4]\d|150|[1-9]\d|\d)$/.test(value)) {
        newErrors.age = "Age is invalid";
      } else {
        newErrors.age = "";
      }
    }

    if (id == "specialization") {
      if (!value) {
        newErrors.specialization = "Specialization is required";
      } else {
        newErrors.specialization = "";
      }
    }

    if (id == "experience") {
      if (!value) {
        newErrors.experience = "Exp is required";
      } else if (!/^(0?[0-9]|[1-3][0-9]|40)$/.test(value)) {
        newErrors.experience = "Exp is invalid";
      } else {
        newErrors.experience = "";
      }
    }

    if (id == "city") {
      if (!value) {
        newErrors.city = "City is required";
      } else {
        newErrors.city = "";
      }
    }

    if (id == "state") {
      if (!value) {
        newErrors.state = "State is required";
      } else {
        newErrors.state = "";
      }
    }

    if (id == "pinCode") {
      if (!value) {
        newErrors.pinCode = "Pin Code is required";
      } else if (!/^[1-9][0-9]{5}$/.test(value)) {
        newErrors.pinCode = "Pin Code is invalid";
      } else {
        newErrors.pinCode = "";
      }
    }

    if (id == "fees") {
      if (!value) {
        newErrors.fees = "Fees is required";
      } else if (!/^(5000|500[0-9]|[1-4][0-9]{3}|[5-9][0-9]{2}|[1-9][0-9])$/.test(value)) {
        newErrors.fees = "Fees is invalid";
      } else {
        newErrors.fees = "";
      }
    }

    setErrors(newErrors);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let doctor = {
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      email: formValue.email,
      password: formValue.password,
      gender: formValue.gender,
      age: formValue.age,
      specialization: formValue.specialization,
      experience: formValue.experience,
      city: formValue.city,
      state: formValue.state,
      pinCode: formValue.pinCode,
      fees: formValue.fees,
      user: "doctor",
    };
    console.log(doctor);

    const validationErrors = {};
    if (!doctor.firstName.trim()) {
      validationErrors.firstName = "First name is required";
    }

    if (!doctor.lastName.trim()) {
      validationErrors.lastName = "Last name is required";
    }

    if (!doctor.email.trim()) {
      validationErrors.email = "Email is required";
    }

    if (!doctor.password.trim()) {
      validationErrors.password = "Password is required";
    }

    if (!doctor.gender.trim()) {
      validationErrors.gender = "Gender is required";
    }

    if (!doctor.age.trim()) {
      validationErrors.age = "Age is required";
    }

    if (!doctor.specialization.trim()) {
      validationErrors.specialization = "Specialization is required";
    }

    if (!doctor.experience.trim()) {
      validationErrors.experience = "Exp is required";
    }

    if (!doctor.city.trim()) {
      validationErrors.city = "City is required";
    }

    if (!doctor.state.trim()) {
      validationErrors.state = "State is required";
    }

    if (!doctor.pinCode.trim()) {
      validationErrors.pinCode = "Pin Code is required";
    }

    if (!doctor.fees.trim()) {
      validationErrors.fees = "Fees is required";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length == 0) {
      try {
        const response = await UserService.createUser(doctor);
        if (response.data.code === "200") {
          alert("Doctor addess successfully!!");
          navigate(RoutesPath.SHOW_DOCTOR);
        } else {
          alert(response.data.payload);
        }
      } catch (error) {
        console.error("Error adding doctor:", error);
      }
    } else {
      alert('Please enter correct details!!!');
    }
  };

  return (
    <div>
      <div>
        <div className="form-content">
          <div className="form">
            <div className="form-head">Add Doctor</div>
            <div style={{ display: "flex" }}>
              <label className="label text">First Name :</label>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { maxWidth: "500px", width: "55ch", m: 1 },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="firstName"
                  name="fistName"
                  variant="outlined"
                  required
                  value={formValue.firstName}
                  size="small"
                  onChange={handleChange}
                  helperText={errors.firstName ? errors.firstName : ""} // Display the validation error message
                  error={Boolean(errors.firstName)}
                />
              </Box>
            </div>
            <div style={{ display: "flex" }}>
              <label className="label text">Last Name :</label>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { maxWidth: "500px", width: "55ch", m: 1 },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="lastName"
                  name="lastName"
                  variant="outlined"
                  required
                  value={formValue.lastName}
                  size="small"
                  onChange={handleChange}
                  helperText={errors.lastName ? errors.lastName : ""} // Display the validation error message
                  error={Boolean(errors.lastName)}
                />
              </Box>
            </div>
            <div style={{ display: "flex" }}>
              <label className="label text">Email :</label>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { maxWidth: "500px", width: "55ch", m: 1 },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="email"
                  name="email"
                  variant="outlined"
                  required
                  value={formValue.email}
                  size="small"
                  onChange={handleChange}
                  helperText={errors.email ? errors.email : ""} // Display the validation error message
                  error={Boolean(errors.email)}
                />
              </Box>
            </div>
            <div style={{ display: "flex" }}>
              <label className="label text">Password :</label>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { maxWidth: "500px", width: "55ch", m: 1 },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="password"
                  name="password"
                  variant="outlined"
                  required
                  type="password"
                  value={formValue.password}
                  size="small"
                  onChange={handleChange}
                  helperText={errors.password ? errors.password : ""} // Display the validation error message
                  error={Boolean(errors.password)}
                />
              </Box>
            </div>
            <div style={{ display: "flex" }}>
              <label className="label text">Confirm Password :</label>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { maxWidth: "500px", width: "55ch", m: 1 },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="confirmPassword"
                  name="confirmPassword"
                  variant="outlined"
                  required
                  value={formValue.confirmPassword}
                  size="small"
                  onChange={handleChange}
                  helperText={errors.confirmPassword ? errors.confirmPassword : ""} // Display the validation error message
                  error={Boolean(errors.confirmPassword)}
                />
              </Box>
            </div>
            {/* ============================= Gender & age ================================== */}
            <div style={{ display: "flex" }}>
              <div style={{ display: "flex" }}>
                <label className="label text">Gender :</label>
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": {
                      maxWidth: "200px",
                      width: "19ch",
                      m: 1,
                    },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <Select
                    id="gender"
                    value={formValue.gender}
                    size="small"
                    required
                    onChange={changeGenderValues}
                    helperText={errors.gender ? errors.gender : ""} // Display the validation error message
                    error={Boolean(errors.gender)}
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Others">Others</MenuItem>
                  </Select>
                  <error-output className="text-error"></error-output>
                </Box>
              </div>
              <div style={{ display: "flex" }}>
                <label className="label text">Age :</label>
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": {
                      maxWidth: "200px",
                      width: "15ch",
                      mt: 1,
                    },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="age"
                    name="age"
                    variant="outlined"
                    required
                    value={formValue.age}
                    size="small"
                    onChange={handleChange}
                    helperText={errors.age ? errors.age : ""} // Display the validation error message
                    error={Boolean(errors.age)}
                  />
                </Box>
              </div>
            </div>
            {/* ============================= Specialization & Experience ================================== */}
            <div style={{ display: "flex" }}>
              <div style={{ display: "flex" }}>
                <label className="label text">Specialization :</label>
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": {
                      maxWidth: "200px",
                      width: "20ch",
                      m: 1,
                    },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="specialization"
                    name="specialization"
                    variant="outlined"
                    required
                    value={formValue.specialization}
                    size="small"
                    onChange={handleChange}
                    helperText={
                      errors.specialization ? errors.specialization : ""
                    } // Display the validation error message
                    error={Boolean(errors.specialization)}
                  />
                  <error-output className="text-error"></error-output>
                </Box>
              </div>
              <div style={{ display: "flex" }}>
                <label className="label text">Experience :</label>
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": {
                      maxWidth: "200px",
                      width: "15ch",
                      mt: 1,
                    },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="experience"
                    name="experience"
                    variant="outlined"
                    required
                    value={formValue.experience}
                    size="small"
                    onChange={handleChange}
                    helperText={errors.experience ? errors.experience : ""} // Display the validation error message
                    error={Boolean(errors.experience)}
                  />
                  <error-output className="text-error"></error-output>
                </Box>
              </div>
            </div>
            {/* ============================= Specialization & Experience ================================== */}
            {/* ============================= City & State ================================== */}
            <div style={{ display: "flex" }}>
              <div style={{ display: "flex" }}>
                <label className="label text">City :</label>
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": {
                      maxWidth: "200px",
                      width: "20ch",
                      m: 1,
                    },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="city"
                    name="city"
                    variant="outlined"
                    required
                    value={formValue.city}
                    size="small"
                    onChange={handleChange}
                    helperText={errors.city ? errors.city : ""} // Display the validation error message
                    error={Boolean(errors.city)}
                  />
                  <error-output className="text-error"></error-output>
                </Box>
              </div>
              <div style={{ display: "flex" }}>
                <label className="label text">State :</label>
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": {
                      maxWidth: "200px",
                      width: "15ch",
                      mt: 1,
                    },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="state"
                    name="state"
                    variant="outlined"
                    required
                    value={formValue.state}
                    size="small"
                    onChange={handleChange}
                    helperText={errors.state ? errors.state : ""} // Display the validation error message
                    error={Boolean(errors.state)}
                  />
                  <error-output className="text-error"></error-output>
                </Box>
              </div>
            </div>
            {/* ============================= City & State ================================== */}
            {/* ============================= Pincode & Fees ================================== */}
            <div style={{ display: "flex" }}>
              <div style={{ display: "flex" }}>
                <label className="label text">Pin code :</label>
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": {
                      maxWidth: "200px",
                      width: "20ch",
                      m: 1,
                    },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="pinCode"
                    name="pinCode"
                    variant="outlined"
                    required
                    value={formValue.pinCode}
                    size="small"
                    onChange={handleChange}
                    helperText={errors.pinCode ? errors.pinCode : ""} // Display the validation error message
                    error={Boolean(errors.pinCode)}
                  />
                  <error-output className="text-error"></error-output>
                </Box>
              </div>
              <div style={{ display: "flex" }}>
                <label className="label text">Fees :</label>
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": {
                      maxWidth: "200px",
                      width: "15ch",
                      mt: 1,
                    },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="fees"
                    name="fees"
                    variant="outlined"
                    required
                    value={formValue.fees}
                    size="small"
                    onChange={handleChange}
                    helperText={errors.fees ? errors.fees : ""} // Display the validation error message
                    error={Boolean(errors.fees)}
                  />
                  <error-output className="text-error"></error-output>
                </Box>
              </div>
            </div>
            {/* ============================= Pincode & Fees ================================== */}

            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                paddingTop: "10px",
              }}
            >
              <Button variant="contained" size="large" onClick={handleSubmit}>
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateDoctor;

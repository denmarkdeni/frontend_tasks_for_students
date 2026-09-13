import { useState } from "react";
import "./Task4.css";

const NAME_REGEX = /^[A-Za-z ]+$/;
const USERNAME_REGEX = /^[A-Za-z0-9_.-]+$/;
const EMAIL_REGEX = /^[A-Za-z0-9_.-]+@gmail\.com$/;
const PHONE_REGEX = /^[0-9+\-\s]+$/;

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const INITIAL_VALUES = {
  name: "",
  age: "",
  email: "",
  phone: "",
  address: "",
  gender: "",
  qualification: "",
  bloodGroup: "",
  dob: "",
  profile: null,
  username: "",
  password: "",
  terms: false,
};

function getPasswordStrength(password) {
  if (!password) return { types: 0, label: "" };
  let types = 0;
  if (/[a-z]/.test(password)) types += 1;
  if (/[A-Z]/.test(password)) types += 1;
  if (/[0-9]/.test(password)) types += 1;
  if (/[^A-Za-z0-9]/.test(password)) types += 1;
  const labels = { 1: "Weak", 2: "Normal", 3: "Good", 4: "Strong" };
  return { types, label: labels[types] || "Weak" };
}

function validateField(name, value) {
  switch (name) {
    case "name":
      if (!value.trim()) return "Enter your full name.";
      if (!NAME_REGEX.test(value)) return "Letters and spaces only.";
      return "";
    case "age": {
      if (!value.trim()) return "Enter your age.";
      if (!/^[0-9]+$/.test(value)) return "Age must be a number.";
      const n = Number(value);
      if (n < 1 || n > 100) return "Age must be between 1 and 100.";
      return "";
    }
    case "email":
      if (!value.trim()) return "Enter your email.";
      if (!EMAIL_REGEX.test(value)) return "Use a gmail address, like name@gmail.com.";
      return "";
    case "phone": {
      if (!value.trim()) return "Enter your phone number.";
      if (!PHONE_REGEX.test(value)) return "Use digits, spaces, + or - only.";
      if (value.length < 10 || value.length > 15) return "Must be 10 to 15 characters.";
      return "";
    }
    case "address":
      if (!value.trim()) return "Enter your address.";
      return "";
    case "gender":
      if (!value) return "Select a gender.";
      return "";
    case "qualification":
      if (!value) return "Select a qualification.";
      return "";
    case "bloodGroup":
      if (!value) return "Select a blood group.";
      return "";
    case "dob": {
      if (!value) return "Enter your date of birth.";
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (new Date(value) >= today) return "Date of birth must be before today.";
      return "";
    }
    case "profile":
      if (!value) return "Upload a profile photo.";
      return "";
    case "username":
      if (!value.trim()) return "Enter a username.";
      if (!USERNAME_REGEX.test(value)) return "Use letters, numbers, and _ . - only.";
      return "";
    case "password": {
      if (!value) return "Enter a password.";
      if (value.length < 6) return "Use at least 6 characters.";
      if (getPasswordStrength(value).types < 2) return "Mix in more character types.";
      return "";
    }
    case "terms":
      if (!value) return "You must accept the terms and conditions.";
      return "";
    default:
      return "";
  }
}

function validateAll(values) {
  const errors = {};
  Object.keys(INITIAL_VALUES).forEach((field) => {
    const message = validateField(field, values[field]);
    if (message) errors[field] = message;
  });
  return errors;
}

export default function Task4() {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [fileName, setFileName] = useState("");
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const strength = getPasswordStrength(values.password);

  function handleChange(e) {
    const { name, type, value, checked, files } = e.target;
    let nextValue = value;
    if (type === "checkbox") nextValue = checked;
    if (type === "file") {
      nextValue = files && files[0] ? files[0] : null;
      setFileName(files && files[0] ? files[0].name : "");
    }

    const nextValues = { ...values, [name]: nextValue };
    setValues(nextValues);

    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, nextValue) }));
    }
  }

  function handleBlur(e) {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, values[name]) }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const allErrors = validateAll(values);
    setErrors(allErrors);
    setTouched(
      Object.keys(INITIAL_VALUES).reduce((acc, key) => ({ ...acc, [key]: true }), {})
    );

    if (Object.keys(allErrors).length === 0) {
      setSubmitted(true);
    } else {
      setSubmitted(false);
    }
  }

  function handleReset() {
    setValues(INITIAL_VALUES);
    setFileName("");
    setErrors({});
    setTouched({});
    setSubmitted(false);
  }

  const err = (field) => touched[field] && errors[field];

  if (submitted) {
    return (
      <div className="ledger">
        <div className="ledger-success">
          <h1>You're registered</h1>
          <p>
            Welcome, {values.name}. Your details have been recorded for{" "}
            {values.qualification.toUpperCase()} admission.
          </p>
          <button type="button" className="btn-secondary" onClick={handleReset}>
            Register another student
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="ledger">
      <header className="ledger-header">
        <h1>Student registration</h1>
        <p>Fill in every field below to complete your enrollment.</p>
      </header>

      <form className="ledger-form" onSubmit={handleSubmit} noValidate>
        <section className="ledger-section">
          <h2>Personal details</h2>

          <div className="field">
            <label htmlFor="name">Full name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Jane Doe"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={err("name") ? "invalid" : ""}
            />
            {err("name") && <span className="error">{errors.name}</span>}
          </div>

          <div className="field-row">
            <div className="field">
              <label htmlFor="age">Age</label>
              <input
                id="age"
                name="age"
                type="text"
                inputMode="numeric"
                placeholder="21"
                value={values.age}
                onChange={handleChange}
                onBlur={handleBlur}
                className={err("age") ? "invalid" : ""}
              />
              {err("age") && <span className="error">{errors.age}</span>}
            </div>

            <div className="field">
              <label htmlFor="dob">Date of birth</label>
              <input
                id="dob"
                name="dob"
                type="date"
                value={values.dob}
                onChange={handleChange}
                onBlur={handleBlur}
                className={err("dob") ? "invalid" : ""}
              />
              {err("dob") && <span className="error">{errors.dob}</span>}
            </div>
          </div>

          <div className="field">
            <span className="group-label">Gender</span>
            <div className="radio-row" onBlur={handleBlur}>
              <label className="radio-option">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={values.gender === "male"}
                  onChange={handleChange}
                />
                Male
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={values.gender === "female"}
                  onChange={handleChange}
                />
                Female
              </label>
            </div>
            {err("gender") && <span className="error">{errors.gender}</span>}
          </div>

          <div className="field">
            <label htmlFor="address">Address</label>
            <textarea
              id="address"
              name="address"
              placeholder="Street, city, state, PIN code"
              value={values.address}
              onChange={handleChange}
              onBlur={handleBlur}
              className={err("address") ? "invalid" : ""}
            />
            {err("address") && <span className="error">{errors.address}</span>}
          </div>
        </section>

        <section className="ledger-section">
          <h2>Academic and contact</h2>

          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="text"
              placeholder="name@gmail.com"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={err("email") ? "invalid" : ""}
            />
            {err("email") && <span className="error">{errors.email}</span>}
          </div>

          <div className="field">
            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              name="phone"
              type="text"
              placeholder="+91 98765 43210"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              className={err("phone") ? "invalid" : ""}
            />
            {err("phone") && <span className="error">{errors.phone}</span>}
          </div>

          <div className="field-row">
            <div className="field">
              <label htmlFor="qualification">Qualification</label>
              <select
                id="qualification"
                name="qualification"
                value={values.qualification}
                onChange={handleChange}
                onBlur={handleBlur}
                className={err("qualification") ? "invalid" : ""}
              >
                <option value="">Choose your qualification</option>
                <option value="sslc">SSLC</option>
                <option value="hsc">HSC</option>
                <option value="diploma">Diploma</option>
                <option value="bachelor">Bachelor</option>
                <option value="master">Master</option>
              </select>
              {err("qualification") && <span className="error">{errors.qualification}</span>}
            </div>

            <div className="field">
              <label htmlFor="bloodGroup">Blood group</label>
              <select
                id="bloodGroup"
                name="bloodGroup"
                value={values.bloodGroup}
                onChange={handleChange}
                onBlur={handleBlur}
                className={err("bloodGroup") ? "invalid" : ""}
              >
                <option value="">Choose your blood group</option>
                {BLOOD_GROUPS.map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>
              {err("bloodGroup") && <span className="error">{errors.bloodGroup}</span>}
            </div>
          </div>
        </section>

        <section className="ledger-section">
          <h2>Account</h2>

          <div className="field">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="jane.doe_21"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              className={err("username") ? "invalid" : ""}
            />
            {err("username") && <span className="error">{errors.username}</span>}
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="At least 6 characters"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={err("password") ? "invalid" : ""}
            />
            {values.password && (
              <div className="strength">
                <div className="strength-bar">
                  {[1, 2, 3, 4].map((i) => (
                    <span
                      key={i}
                      className={`strength-segment strength-${strength.types}`}
                      data-filled={i <= strength.types}
                    />
                  ))}
                </div>
                <span className={`strength-label strength-text-${strength.types}`}>
                  {strength.label}
                </span>
              </div>
            )}
            {err("password") && <span className="error">{errors.password}</span>}
          </div>

          <div className="field">
            <label htmlFor="profile">Profile photo</label>
            <div className="file-row">
              <label htmlFor="profile" className="file-button">
                Choose file
              </label>
              <span className="file-name">{fileName || "No file selected"}</span>
              <input
                id="profile"
                name="profile"
                type="file"
                accept="image/*"
                onChange={handleChange}
                onBlur={handleBlur}
                className="file-input"
              />
            </div>
            {err("profile") && <span className="error">{errors.profile}</span>}
          </div>
        </section>

        <div className="field terms-field">
          <label className="checkbox-option">
            <input
              type="checkbox"
              name="terms"
              checked={values.terms}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            I agree to the terms and conditions.
          </label>
          {err("terms") && <span className="error">{errors.terms}</span>}
        </div>

        <button type="submit" className="btn-primary">
          Submit registration
        </button>
      </form>
    </div>
  );
}
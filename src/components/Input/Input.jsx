import React from "react";
import "./Input.css";

function Input({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  error,
  required = true,
}) {
  return (
    <label className="form__input-title" htmlFor={name}>
      {label}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`form__input ${error ? "form__input_error" : ""}`}
      />
      {error && <span className="form__input-error">{error}</span>}
    </label>
  );
}

export default Input;

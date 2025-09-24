// import React from "react";
// import "../Input/Input.css";

// export const Input = ({  label,
//   type = "text",
//   name,
//   value,
//   onChange,
//   placeholder,
//   error,
//   required = true}){
//     return (
//         <label className="form__label" htmlFor={name}>
//         {label}<input className="form__input" id={name} name={name} type={type} placeholder={placeholder} value={value} onChange={onChange} required={required}/>
//         {error && <span className="form__input-error">{error}</span>}
//         </label>
//     )
//   };

// import React from "react";
// import PropTypes from "prop-types";
// import "../Input/Input.css";

// const Input = ({
//   label,
//   type = "text",
//   name,
//   value,
//   onChange,
//   placeholder,
//   error,
//   required = true,
// }) => (
//   <div className="form">
//     <label className="form__label" htmlFor={name}>
//       {label}
//     </label>
//     <input
//       className="form__input"
//       id={name}
//       name={name}
//       type={type}
//       placeholder={placeholder}
//       value={value}
//       onChange={onChange}
//       required={required}
//       aria-describedby={error ? `${name}-error` : undefined}
//     />
//     {error && (
//       <span className="form__input-error" id={`${name}-error`}>
//         {error}
//       </span>
//     )}
//   </div>
// );

// Input.propTypes = {
//   label: PropTypes.string.isRequired,
//   type: PropTypes.string,
//   name: PropTypes.string.isRequired,
//   value: PropTypes.string.isRequired,
//   onChange: PropTypes.func.isRequired,
//   placeholder: PropTypes.string,
//   error: PropTypes.string,
//   required: PropTypes.bool,
// };

// export default Input;
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
    <label className="form__label" htmlFor={name}>
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

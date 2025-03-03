// frontend/src/components/FormField.js
import React from 'react';
import { input, label } from '../styles';

const FormField = ({ type = 'text', name, value, onChange, labelText, required = false, options = null, placeholder = '' }) => {
  return (
    <div>
      <label className={label}>{labelText}</label>
      {options ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          className={input}
          required={required}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className={input}
          required={required}
          placeholder={placeholder}
        />
      )}
    </div>
  );
};

export default FormField;
import { useState } from "react";

export const useForm = (callback, inititialState = {}) => {
  const [values, setValues] = useState(inititialState);
  const [errors, seterrors] = useState({});
  function onChange(e) {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    const newErrors = delete errors[name];
    seterrors(newErrors);
  }
  const onSubmit = (e) => {
    e.preventDefault();
    callback();
  };
  return { onChange, onSubmit, values, setValues, errors, seterrors };
};

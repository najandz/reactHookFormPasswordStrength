import React, { useCallback, useMemo } from "react";
import useForm from "react-hook-form";
import PasswordStrengthIndicator from "./PasswordStrengthIndicator.jsx";
import { isStrongPassword, ValidatePassword } from "./passwordStrength";

import "./Form.css";

export default function Form() {
  const { register, watch, errors, handleSubmit } = useForm({
    defaultValues: {
      password: ""
    }
  });

  const password = watch("password");
  const passwordStrength = useMemo(() => ValidatePassword(password), [
    password
  ]);

  const onSubmit = useCallback((data) => {
    console.log("Submitted:", data);
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="email" placeholder="bluebill1049@hotmail.com">
          Password:
          {errors.password && (
            <span role="alert" className="spanError">
              {errors.password.message}
            </span>
          )}
        </label>

        <input
          name="password"
          type="password"
          ref={register({
            required: "Password is required",
            pattern: {
              value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,15}$/,
              message: "Follow the password structure."
            }
          })}
        />
        <PasswordStrengthIndicator passwordStrength={passwordStrength} />
      </div>
      <button type="submit">Send</button>
    </form>
  );
}

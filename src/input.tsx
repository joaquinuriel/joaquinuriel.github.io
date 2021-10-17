import { motion } from "framer-motion";
import { At, Key } from "phosphor-react";
import * as react from "react";
import { InputHandler, Props } from "./types";

export function Input({ type, placeholder, value, onChange }: Props) {
  const email = type === "email";
  const check = (pattern: RegExp) =>
    value ? (value.match(pattern) ? "valid" : "invalid") : "empty";
  return (
    <motion.div
      className={"input " + check(email ? /\S+@\S+\.[a-z]{2,}/gi : /\S{6,}/gi)}
      layout
    >
      <motion.input
        layout
        layoutId={"input" + type}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {type === "email" ? (
        <At weight="bold" />
      ) : type === "password" ? (
        <Key weight="bold" />
      ) : null}
    </motion.div>
  );
}

export function withInput(
  placeholder: string,
  type = placeholder === "correo electronico"
    ? "email"
    : "contraseña"
    ? "password"
    : "text"
) {
  const [value, set] = react.useState("");
  const onChange: InputHandler = (e) => set(e.target.value);
  return {
    placeholder,
    type,
    value,
    onChange,
  };
}

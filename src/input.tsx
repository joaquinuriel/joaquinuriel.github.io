import { motion } from "framer-motion";
import { At, Key, MagnifyingGlass } from "phosphor-react";
import * as react from "react";
import { InputHandler, Props } from "./types";

export function Input(props: Props) {
  const { placeholder, type, value } = props;
  const email = type === "email";
  const password = type === "password";
  const check = (pattern: RegExp) =>
    value ? (value.match(pattern) ? "valid" : "invalid") : "empty";
  return (
    <motion.div
      className={"input " + check(email ? /\S+@\S+\.[a-z]{2,}/gi : /\S{6,}/gi)}
      layout
    >
      <motion.input
        {...props}
        autoComplete="on"
        layout
        layoutId={"input" + type}
        initial={{ visibility: "hidden", opacity: 0 }}
        animate={{ visibility: "visible", opacity: 1 }}
      />
      {email ? (
        <At weight="bold" />
      ) : password ? (
        <Key weight="bold" />
      ) : placeholder === "buscar" ? (
        <MagnifyingGlass />
      ) : null}
    </motion.div>
  );
}

export function withInput(
  placeholder: string,
  type = placeholder === "correo electronico"
    ? "email"
    : placeholder === "contraseña"
    ? "password"
    : "text"
) {
  const [value, set] = react.useState("");
  const onChange: InputHandler = (e) => set(e.target.value);
  return {
    placeholder,
    type,
    value,
    set,
    onChange,
  };
}

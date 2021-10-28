import { motion } from "framer-motion";
import { At, Key, MagnifyingGlass } from "phosphor-react";
import * as react from "react";
import { InputHandler, Props } from "./types";
import { auth } from "./app";
import { fetchSignInMethodsForEmail } from "@firebase/auth";

export function Input(props: Props) {
  const { placeholder, type, value } = props;
  const email = type === "email";
  const password = type === "password";
  const pattern = email ? /\S+@\S+\.[a-z]{2,}/gi : /\S{6,}/gi;
  const cn = value ? (pattern.test(value) ? "valid" : "invalid") : "empty";

  return (
    <motion.div className={"input " + cn} layout>
      <motion.input
        {...props}
        autoComplete="on"
        layout
        layoutId={"input" + type}
        initial={{ visibility: "hidden" }}
        animate={{ visibility: "visible" }}
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

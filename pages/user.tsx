import { motion } from "framer-motion";
import { useState } from "react";
import { auth } from "src/app";
import Btn from "src/components/btn";
import { Input, withInput } from "src/input";
import Layout from "src/layout";

export default function Account() {
  const { currentUser } = auth;
  auth.onAuthStateChanged(console.log);

  const email = withInput("correo electronico");
  const password = withInput("contraseña");
  const username = withInput("username");

  const regex = /\S{6,}/gi;
  const eregex = /\S+@\S+\.[a-z]{2,}/gi;

  const [willSignUp, setWillSignUp] = useState(!currentUser);
  const [willSignIn, setWillSignIn] = useState(false);
  const [signingUp, setSigningUp] = useState(false);
  const [signingIn, setSigningIn] = useState(false);

  return willSignUp ? (
    signingUp ? (
      <Layout>
        <motion.h1>Sign Up</motion.h1>
        <Input {...username} />
        <motion.div className="box">
          <Btn id="btn1" onClick={() => setSigningUp(false)}>
            Atras
          </Btn>
          <Btn id="btn2">Crear Cuenta</Btn>
        </motion.div>
      </Layout>
    ) : (
      <Layout>
        <motion.h1>Sign Up</motion.h1>
        <Input {...email} />
        <Input {...password} />
        <motion.div className="box">
          <Btn
            id="btn1"
            onClick={() =>
              eregex.test(email.value)
                ? regex.test(password.value)
                  ? setSigningUp(true)
                  : alert("invalid password")
                : alert("invalid email")
            }
          >
            Siguiente
          </Btn>
          <Btn id="btn2">Google</Btn>
        </motion.div>
        <motion.p
          layout
          layoutId="p"
          onClick={() => {
            setWillSignUp(false);
            setWillSignIn(true);
          }}
        >
          Iniciar sesion
        </motion.p>
      </Layout>
    )
  ) : willSignIn ? (
    signingIn ? (
      <Layout>
        <h1>Sign In</h1>
        <Input {...password} />
        <div className="box">
          <Btn id="btn1">Atras</Btn>
          <Btn id="btn2">Entrar</Btn>
        </div>
        <motion.p layout layoutId="p">
          Olvide mi contraseña
        </motion.p>
      </Layout>
    ) : (
      <Layout>
        <h1>Sign In</h1>
        <Input {...email} />
        <div className="box">
          <Btn id="btn1">Siguiente</Btn>
          <Btn id="btn2">Google</Btn>
        </div>
        <motion.p
          layout
          layoutId="p"
          onClick={() => {
            setWillSignIn(false);
            setWillSignUp(true);
          }}
        >
          Crear Cuenta
        </motion.p>
      </Layout>
    )
  ) : (
    <Layout>
      <motion.h1>Account</motion.h1>
      <motion.p>{currentUser!.email}</motion.p>
      <Btn id="btn1">Cerrar sesion</Btn>
    </Layout>
  );
}

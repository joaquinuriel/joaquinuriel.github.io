import {
  createUserWithEmailAndPassword as signUp,
  sendPasswordResetEmail as sendEmail,
  signInWithEmailAndPassword as signIn,
  updateProfile,
} from "firebase/auth";
import { motion } from "framer-motion";
import { useState } from "react";
import { auth } from "src/app";
import Btn from "src/components/btn";
import { Input, withInput } from "src/input";
import Layout from "src/layout";
import { handle } from "src/utils";

export default function Account() {
  const { currentUser } = auth;

  const email = withInput("correo electronico");
  const password = withInput("contraseña");
  const username = withInput("username");

  const regex = /\S{6,}/gi;
  const eregex = /\S+@\S+\.[a-z]{2,}/gi;

  const [willSignUp, setWillSignUp] = useState(!currentUser);
  const [willSignIn, setWillSignIn] = useState(false);
  const [signingUp, setSigningUp] = useState(false);
  const [signingIn, setSigningIn] = useState(false);
  const [willReset, setWillReset] = useState(false);
  const [hasReset, setHasReset] = useState(false);

  const signUpHandler = regex.test(username.value)
    ? async () => {
        const [res, err] = await handle(
          signUp(auth, email.value, password.value)
        );
        res
          ? updateProfile(res.user, { displayName: username.value })
          : console.log(err);
      }
    : () => alert("invalid username");

  const signInHandler = async () => {
    const [res, err] = await handle(signIn(auth, email.value, password.value));
    res ? console.log(res.user.displayName) : alert(err.code);
  };

  return willSignUp ? (
    signingUp ? (
      // Sign Up with username
      <Layout>
        <motion.h1>Sign Up</motion.h1>
        <Input {...username} />
        <motion.div className="box">
          <Btn id="btn1" onClick={() => setSigningUp(false)}>
            Atras
          </Btn>
          <Btn id="btn2" onClick={signUpHandler}>
            Crear Cuenta
          </Btn>
        </motion.div>
      </Layout>
    ) : (
      // Sign Up with Email and Password
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
    hasReset ? (
      <Layout>
        <h1>Email Sent</h1>
        <motion.div className="box">
          <Btn id="btn1" onClick={() => setHasReset(false)}>
            Return
          </Btn>
        </motion.div>
      </Layout>
    ) : willReset ? (
      <Layout>
        <h1>Recover Password</h1>
        <Input {...email} />
        <motion.div className="box">
          <Btn id="btn1" onClick={() => setWillReset(false)}>
            Cancelar
          </Btn>
          <Btn
            id="btn2"
            onClick={async () => {
              const [, err] = await handle(sendEmail(auth, email.value));
              err
                ? alert(err.code)
                : (() => {
                    setWillReset(false);
                    setHasReset(true);
                  })();
            }}
          >
            Enviar email
          </Btn>
        </motion.div>
      </Layout>
    ) : signingIn ? (
      // Sign In with Password
      <Layout>
        <h1>Sign In</h1>
        <Input {...password} />
        <motion.div className="box">
          <Btn id="btn1" onClick={() => setSigningIn(false)}>
            Atras
          </Btn>
          <Btn id="btn2" onClick={signInHandler}>
            Entrar
          </Btn>
        </motion.div>
        <motion.p layout layoutId="p" onClick={() => setWillReset(true)}>
          Olvide mi contraseña
        </motion.p>
      </Layout>
    ) : (
      // Sign In with Email
      <Layout>
        <h1>Sign In</h1>
        <Input {...email} />
        <motion.div className="box">
          <Btn id="btn1" onClick={() => setSigningIn(true)}>
            Siguiente
          </Btn>
          <Btn id="btn2">Google</Btn>
        </motion.div>
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
    // Signed In
    <Layout>
      <motion.h1>Account</motion.h1>
      <motion.p>{currentUser!.email}</motion.p>
      <Btn id="btn1">Cerrar sesion</Btn>
    </Layout>
  );
}

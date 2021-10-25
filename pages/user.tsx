import {
  createUserWithEmailAndPassword as signUp,
  GoogleAuthProvider as google,
  sendPasswordResetEmail as sendEmail,
  signInWithEmailAndPassword as signIn,
  signInWithPopup as popUp,
  signOut,
  updateProfile
} from "firebase/auth";
import { motion } from "framer-motion";
import { useState } from "react";
import { auth } from "src/app";
import Btn from "src/components/btn";
import { Input, withInput } from "src/input";
import Layout from "src/layout";
import { handle } from "src/utils";

const Box = ({ children }: any) => (
  <motion.div className="box" layout layoutId="box">
    {children}
  </motion.div>
);

export default function Account() {
  const { currentUser } = auth;
  const [user, updateUser] = useState(currentUser);
  auth.onAuthStateChanged(updateUser);

  const email = withInput("correo electronico");
  const password = withInput("contraseña");
  const username = withInput("username");

  console.log(user, email, password);

  const regex = /\S{6,}/gi;
  const eregex = /\S+@\S+\.[a-z]{2,}/gi;

  const [willSignUp, setWillSignUp] = useState(!user);
  const [willSignIn, setWillSignIn] = useState(false);
  const [signingUp, setSigningUp] = useState(false);
  const [signingIn, setSigningIn] = useState(false);
  const [willReset, setWillReset] = useState(false);
  const [hasReset, setHasReset] = useState(false);

  console.log(willSignUp, signingUp, willSignIn, signingIn);

  const signUpHandler = () => {
    if (!eregex.test(email.value)) {
      // email.setState("invalid");
      alert("invalid email");
    } else if (!regex.test(password.value)) {
      // email.setState("invalid");
      alert("invalid password");
    } else setSigningUp(true);
  };

  const signingUpHandler = async () => {
    if (!regex.test(username.value)) return alert("invalid username");
    const [res, err] = await handle(signUp(auth, email.value, password.value));
    if (err) return alert(err.code);
    await updateProfile(res!.user, { displayName: username.value });
    setWillSignUp(false);
    setSigningUp(false);
  };

  const signInHandler = async () => {
    const [res, err] = await handle(signIn(auth, email.value, password.value));
    if (err) return alert(err.code);
    setWillSignIn(false);
    setSigningIn(false);
  };

  return willSignUp ? (
    signingUp ? (
      // Sign Up with username
      <Layout>
        <motion.h1>Sign Up</motion.h1>
        <Input {...username} />
        <Box>
          <Btn
            id="btn1"
            onClick={() => {
              setSigningUp(false);
              email.set(email.value);
              password.set(password.value);
            }}
          >
            Atras
          </Btn>
          <Btn id="btn2" onClick={signingUpHandler}>
            Crear Cuenta
          </Btn>
        </Box>
      </Layout>
    ) : (
      // Sign Up with Email and Password
      <Layout>
        <motion.h1>Sign Up</motion.h1>
        <form>
          <fieldset>
            <Input {...email} />
            <Input {...password} />
          </fieldset>
        </form>
        <Box>
          <Btn id="btn1" onClick={signUpHandler}>
            Siguiente
          </Btn>
          {/* <Btn
            onClick={async () => {
              const [res, err] = await handle(popUp(auth, new google()));
              res ? setWillSignUp(false) : alert(err.code);
              console.log(res, err);
            }}
            id="btn2"
          >
            Google
          </Btn> */}
        </Box>
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
        <Box>
          <Btn
            cn="golden"
            id="btn2"
            onClick={async () => {
              const [res, err] = await handle(popUp(auth, new google()));
              res ? setWillSignUp(false) : alert(err.code);
              console.log(res, err);
            }}
          >
            Google
          </Btn>
        </Box>
      </Layout>
    )
  ) : willSignIn ? (
    hasReset ? (
      <Layout>
        <motion.h1>Email Sent</motion.h1>
        <Box>
          <Btn id="btn1" onClick={() => setHasReset(false)}>
            Return
          </Btn>
        </Box>
      </Layout>
    ) : willReset ? (
      <Layout>
        <motion.h1>Reset Password</motion.h1>
        <Input {...email} />
        <Box>
          <Btn id="btn1" onClick={() => setWillReset(false)}>
            Cancelar
          </Btn>
          <Btn
            id="btn2"
            onClick={async () => {
              const [, err] = await handle(sendEmail(auth, email.value));
              if (err) return alert(err.code);
              setWillReset(false);
              setHasReset(true);
            }}
          >
            Enviar email
          </Btn>
        </Box>
      </Layout>
    ) : signingIn ? (
      // Sign In with Password
      <Layout>
        <motion.h1>Sign In</motion.h1>
        <Input {...password} />
        <Box>
          <Btn id="btn1" onClick={() => setSigningIn(false)}>
            Atras
          </Btn>
          <Btn id="btn2" onClick={signInHandler}>
            Entrar
          </Btn>
        </Box>
        <motion.p layout layoutId="p" onClick={() => setWillReset(true)}>
          Olvide mi contraseña
        </motion.p>
      </Layout>
    ) : (
      // Sign In with Email
      <Layout>
        <motion.h1>Sign In</motion.h1>
        <Input {...email} />
        <Box>
          <Btn id="btn1" onClick={() => setSigningIn(true)}>
            Siguiente
          </Btn>
          {/* <Btn
            onClick={async () => {
              const [res, err] = await handle(popUp(auth, new google()));
              console.log(res, err);
              res ? setWillSignIn(false) : alert(err.code);
            }}
            id="btn2"
          >
            Google
          </Btn> */}
        </Box>
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
        <Box>
          <Btn
            onClick={async () => {
              const [res, err] = await handle(popUp(auth, new google()));
              console.log(res, err);
              res ? setWillSignIn(false) : alert(err.code);
            }}
            id="btn2"
          >
            Google
          </Btn>
        </Box>
      </Layout>
    )
  ) : (
    // Signed In
    <Layout>
      <motion.h1>Account</motion.h1>
      <motion.h2>{user!.displayName}</motion.h2>
      <motion.p>{user!.email}</motion.p>
      <Box>
            <Btn id="btn1" onClick={() => {
              setWillSignIn(true)
               signOut(auth);
            }}>
          Cerrar sesion
        </Btn>
      </Box>
    </Layout>
  );
}

import Header from "../../UI/Header/Header";
import Footer from "../../UI/Footer/Footer";
import { useEffect, useRef, useState } from "react";
import { loginBool } from "../../GlobalVar/LoginBool";
import { Redirect, useHistory } from "react-router";
import { loginPassword } from "../../GlobalVar/LoginPassword";
import {
  getPasswordAdmin,
  getPasswordLogin,
} from "../../services/AdminServices";
import { Input, TextField, Button } from "@material-ui/core";
import "./LoginStyles.css";
import "./../../App.css";
import { adminBool } from "../../GlobalVar/AdminBool";

function Login() {
  const history = useHistory();
  const [display, setDisplay] = useState("displayNone");
  const [toAdmin, setToAdmin] = useState(false);
  const [number, setNumber] = useState(0);
  const refEmail = useRef();
  const refPassword = useRef();

  function redirect(param) {
    history.push(param);
  }
  useEffect(() => {
    try {
      async function checkBoolAndPassword() {
        const bool = loginBool();
        const passwordFromLogin = loginPassword();
        const password = await getPasswordLogin();
        if (!bool) {
          redirect("/home");
          setDisplay("");

          return;
        }
        if (passwordFromLogin !== password) {
          redirect("/home");
          setDisplay("");

          return;
        }
      }
      checkBoolAndPassword();
    } catch (error) {
      console.log("error: ", error);
    }
  }, []);

  async function clickLogIn() {
    try {
      const result = await getPasswordAdmin();
      if (result !== null) {
        const emailValue = refEmail.current.value;
        const passwordValue = refPassword.current.value;
        if (toAdmin) {
          console.log("Iopta");
          if (
            emailValue === result[0].email &&
            passwordValue === result[0]._id
          ) {
            loginBool();
            redirect("/admin");
            return;
          }
          // redirect("/home");
          // return;
        }
        // redirect("/home");
        // return;
      }
    } catch (error) {
      console.log("error: ", error);
    }
  }
  function setBoolAdmin() {
    if (number === 6) {
      const bool = adminBool();
      console.log(bool);
      setToAdmin(bool);
    }
    setNumber(0);
    return;
  }

  function setNumberAdmin() {
    console.log(number);
    setNumber((prev) => {
      return prev + 1;
    });
  }
  return (
    <div className={`${display}`}>
      <Header />
      <br />

      <br />
      <h1 className="center blackColor" onClick={setNumberAdmin}>
        LOGIN PAGE
      </h1>
      <h4 className="center">
        Plese If You Are Not The Admin PLease Leave This Page{" "}
      </h4>
      <br />
      <br />
      <h5 className="center" onClick={setBoolAdmin}>
        Log In
      </h5>
      <br />
      <div className="box">
        <div className="grid">
          <input
            ref={refEmail}
            type="email"
            className="form-control borderInputs"
            placeholder="Email"
          />
          <br />
          <input
            ref={refPassword}
            type="password"
            className="form-control borderInputs"
            placeholder="Password"
          />
          <br />
          <Button variant="contained" onClick={clickLogIn}>
            Log In
          </Button>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </div>
  );
}

export default Login;

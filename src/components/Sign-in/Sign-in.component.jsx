import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  signInWithGooglePopup,
  signInAuthWithEmailAndPassword,
} from "../../utils/Firebase/firebase.utils";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import "./Sign-in.style.scss";

import FormInput from "../form-input/form-input.component";

import { emailSignInStart, googleSignInStart } from "../../store/user/user.action";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignIn = () => {


  const dispatch = useDispatch()
  const [formFields, setformFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setformFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    // await signInWithGooglePopup();
    dispatch(googleSignInStart())
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // await signInAuthWithEmailAndPassword(email, password);
      dispatch(emailSignInStart(email,password))

      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("Incorrect password");
          break;
        case "auth/user-not-found":
          alert("no user associated with this email");
          break;
        default:
          console.log(error);
      }
    }

    return;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your Email and Password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          inputOptions={{
            type: "email",
            required: true,
            name: "email",
            value: email,
            onChange: handleChange,
          }}
        />

        <FormInput
          label="Password"
          inputOptions={{
            type: "password",
            required: true,
            name: "password",
            value: password,
            onChange: handleChange,
          }}
        />

        <div className="buttons-container">
          {" "}
          <Button type="submit">Sign In</Button>
          <Button
            type="button"
            onClick={signInWithGoogle}
            buttonType={BUTTON_TYPE_CLASSES.google}
          >
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;

import React, { useState } from "react";
import AuthPresenter from "./AuthPresenter";
import useInput from "../../Hooks/useInput";
import { LOG_IN, CREAT_ACCOUNT } from "./AuthQueries";
import { useMutation } from "react-apollo-hooks";
import { toast } from "react-toastify";

export default () => {
  const [action, setAction] = useState("logIn");

  const email = useInput("");
  const username = useInput("");
  const firstname = useInput("");
  const lastname = useInput("");
  // const password = useInput("");

  const requestSecret = useMutation(LOG_IN, {
    update: (_, data) => {
      const { requestSec } = data;
      if (!requestSec) {
        toast.error("You don't have an account yet, create one");
        setTimeout(() => setAction("signUp"), 5000);
      }
    },
    variables: { email: email.value }
  });
  const createAccount = useMutation(CREAT_ACCOUNT, {
    variables: {
      email: email.value,
      username: username.value,
      firstname: firstname.value,
      lastname: lastname.value
    }
  });

  const onSubmit = e => {
    e.preventDefault();
    if (action === "logIn") {
      if (email !== "") {
        requestSecret();
      } else {
        toast.error("Email is required");
      }
    } else if (action === "signUp") {
      if (
        email.value !== "" &&
        username.value !== "" &&
        firstname.value !== "" &&
        lastname.value !== ""
      ) {
        createAccount();
      } else {
        toast.error("All fields are required");
      }
    }
  };

  console.log(email, username, firstname, lastname);

  return (
    <AuthPresenter
      action={action}
      setAction={setAction}
      email={email}
      username={username}
      firstname={firstname}
      lastname={lastname}
      // password={password}
      onSubmit={onSubmit}
    />
  );
};

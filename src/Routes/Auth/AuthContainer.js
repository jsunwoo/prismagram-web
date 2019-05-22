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

  const requestSecretMutation = useMutation(LOG_IN, {
    variables: { email: email.value }
  });
  const createAccountMutation = useMutation(CREAT_ACCOUNT, {
    variables: {
      email: email.value,
      username: username.value,
      firstname: firstname.value,
      lastname: lastname.value
    }
  });

  const onSubmit = async e => {
    e.preventDefault();
    if (action === "logIn") {
      if (email.value !== "") {
        try {
          const {
            data: { requestSecret }
          } = await requestSecretMutation();
          console.log(requestSecret);
          if (!requestSecret) {
            toast.error("You don't have an account yet, create one");
            setTimeout(() => setAction("signUp"), 5000);
          }
        } catch {
          toast.error("Can't request secret, try again");
        }
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
        try {
          const { data } = await createAccountMutation();
          if (!data) {
            toast.error("Can't create account");
          } else {
            toast.success("Account created! Log In now");
            setTimeout(() => setAction("logIn"), 5000);
          }
        } catch (e) {
          toast.error(e.message);
        }
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

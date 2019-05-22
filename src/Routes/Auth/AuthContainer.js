import React, { useState } from "react";
import AuthPresenter from "./AuthPresenter";
import useInput from "../../Hooks/useInput";
import { LOG_IN } from "./AuthQueries";
import { useMutation } from "react-apollo-hooks";

export default () => {
  const [action, setAction] = useState("logIn");
  const userid = useInput("");
  const username = useInput("");
  const fullname = useInput("");
  // const password = useInput("");
  const requestSecret = useMutation(LOG_IN, {
    variables: { email: userid.value }
  });

  const onLogin = e => {
    e.preventDefault();
    if (userid !== "") {
      requestSecret();
    }
  };

  console.log(userid, username, fullname);

  return (
    <AuthPresenter
      action={action}
      setAction={setAction}
      userid={userid}
      username={username}
      fullname={fullname}
      // password={password}
      onLogin={onLogin}
    />
  );
};

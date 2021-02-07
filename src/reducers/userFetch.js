import { users } from "./users";
import { MESSAGE_URL } from ".././urls";

const SIGNUP_URL = "http://localhost:8080/users";
const LOGIN_URL = "http://localhost:8080/sessions";

export const signUpFetch = (user) => {
  return (dispatch) => {
    const handleSignUpSuccess = () => {
      console.log(`User ${user.firstName} ${user.lastName} was created.`);
      dispatch(
        users.actions.setStatusMessage({
          statusMessage: "User account created",
        })
      );
    };
    const handleSignUpFailed = (signUpError) => {
      dispatch(users.actions.setStatusMessage({ statusMessage: signUpError }));
    };

    fetch(SIGNUP_URL, {
      method: "POST",
      headers: { "Content-Type": "application/JSON" },
      body: JSON.stringify({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw "Signup failed";
        }
        return res.json();
      })
      .then((json) => handleSignUpSuccess())
      .catch((err) => handleSignUpFailed(err));
  };
};

export const logInFetch = (user) => {
  return (dispatch) => {
    const handleLogInSuccess = (logInResponse) => {
      dispatch(users.actions.logIn(logInResponse));
    };
    const handleLogInFailed = (logInError) => {
      dispatch(users.actions.setStatusMessage({ statusMessage: logInError }));
    };

    fetch(LOGIN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/JSON" },
      body: JSON.stringify({
        email: user.email,
        password: user.password,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw "Log in failed";
        }
        return res.json();
      })
      .then((json) => handleLogInSuccess(json))
      .catch((err) => handleLogInFailed(err));
  };
};

export const updateFetch = (user) => {
  return (dispatch) => {
    const handleUpdateSuccess = (updateResponse) => {
      console.log({updateResponse})
      dispatch(users.actions.update(updateResponse));
    };
    const handleUpdateFailed = (updateError) => {
      console.log("in handleUpdateFailed")
      dispatch(users.actions.setStatusMessage({ statusMessage: updateError }));
    };

    fetch(`http://localhost:8080/${user.id}/user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/JSON",
        Authorization: user.accessToken,
      },
      body: JSON.stringify({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw "Could not update user";
        }
        return res.json();
      })
      .then((json) => handleUpdateSuccess(json))
      .catch((err) => handleUpdateFailed(err));
  };
};

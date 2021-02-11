import { users } from "./users";
import { SIGNUP_URL, LOGIN_URL } from ".././urls";

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
          throw "Kunde inte logga in, kontrollera dina användaruppgifter.";
        }
        return res.json();
      })
      .then((json) => handleLogInSuccess(json))
      .catch((err) => handleLogInFailed(err));
  };
};

export const updateUserFetch = (user) => {
  console.log("Tar emot: " + JSON.stringify(user))

  return (dispatch) => {
    const handleUpdateSuccess = () => {
      dispatch(users.actions.updateUser(user));
    };
    const handleUpdateFailed = (updateError) => {
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
        favourites: user.favourites,
        // password: user.password,
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

// export const updateFavouritesFetch = (user) => {
//   return (dispatch) => {
//     const handleUpdateSuccess = () => {
//       dispatch(users.actions.updateFavourites(user));
//     };
//     const handleUpdateFailed = (updateError) => {
//       dispatch(users.actions.setStatusMessage({ statusMessage: updateError }));
//     };

//     fetch(`http://localhost:8080/${user.id}/user`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/JSON",
//         Authorization: user.accessToken,
//       },
//       body: JSON.stringify({
//         favourites: user.favourites,
//       }),
//     })
//       .then((res) => {
//         if (!res.ok) {
//           throw "Could not update favourites";
//         }
//         return res.json();
//       })
//       .then((json) => handleUpdateSuccess(json))
//       .catch((err) => handleUpdateFailed(err));
//   };
// };

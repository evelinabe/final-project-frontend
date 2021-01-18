import React from "react";
import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { users } from "./reducers/users";
import { SignUpForm } from "./components/SignUpForm";

const reducer = combineReducers({
  users: users.reducer,
});

const store = configureStore({ reducer });

export const App = () => {
  return (
    <Provider store={store}>
      <SignUpForm />
    </Provider>
  );
};

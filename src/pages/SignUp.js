import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components/macro";

import { manageUserFetch } from "../reducers/userFetch";

export const SignUp = () => {
  const [user, setUser] = useState({ firstname: "", lastname: "", email: "", password: "" });
  const dispatch = useDispatch();
  const endpoint = "users";

  const createUser = (user) => {
    console.log("In createUser function!");
    dispatch(manageUserFetch(user, endpoint));
  };

  const handleSubmit = (event) => {
    console.log("In signup handleSubmit function!");
    console.log({ user });
    event.preventDefault();
    createUser(user);
    setUser({ firstname: "", lastname: "", email: "", password: "" });
  };

  return (
    <SignUpForm onSubmit={handleSubmit}>
      <label>
        <UserInput
          type="text"
          required
          placeholder="Förnamn"
          value={user.firstname}
          onChange={(event) => setUser({ ...user, firstname: event.target.value })}
        ></UserInput>
      </label>
      <label>
        <UserInput
          type="text"
          required
          placeholder="Efternamn"
          value={user.lastname}
          onChange={(event) => setUser({ ...user, lastname: event.target.value })}
        ></UserInput>
      </label>
      <label>
        <UserInput
          type="email"
          required
          placeholder="E-post"
          value={user.email}
          onChange={(event) => setUser({ ...user, email: event.target.value })}
        ></UserInput>
      </label>
      <label>
        <UserInput
          type="password"
          required
          placeholder="Lösenord"
          value={user.password}
          onChange={(event) =>
            setUser({ ...user, password: event.target.value })
          }
        ></UserInput>
      </label>
      <Button type="submit">Skapa konto</Button>
    </SignUpForm>
  );
};

const SignUpForm = styled.form`
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UserInput = styled.input`
  margin: 5px;
  padding: 10px;
  width: 250px;
  font-family: "Open Sans", sans-serif;
  font-size: 16px;
  color: #697181;
`;

const Button = styled.button`
  margin: 10px;
  background: #29354b;
  padding: 10px 20px 13px 20px;
  border-radius: 25px;
  font-family: "Open Sans", sans-serif;
  font-size: 16px;
  color: #fff;
  outline: none;
`;

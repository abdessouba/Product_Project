import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { login } from "../features/test";
const Test = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  return (
    <div>
      <div>{user.name}</div>
      <div>{user.age}</div>
      <div>{user.email}</div>
      <button
        onClick={() => {
          dispatch(login({ name: "abdessamad", age: 20, email: "abde@gmail.com" }));
        }}
      >
        change
      </button>
    </div>
  );
};

export default Test;

"use client";

import { useState } from "react";
import { Login } from "./Login";
import { Register } from "./Register";

export const Auth = () => {
  const [showRegister, setShowRegister] = useState(false);

  return showRegister ? (
    <Register setShowRegister={setShowRegister} />
  ) : (
    <Login setShowRegister={setShowRegister} />
  );
};

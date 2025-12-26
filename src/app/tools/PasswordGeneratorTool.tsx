"use client";
import { useState } from "react";

export default function PasswordGeneratorTool() {
  const [password, setPassword] = useState("");

  const generate = () => {
    setPassword(Math.random().toString(36).slice(-12));
  };

  return (
    <div className="space-y-4">
      <button onClick={generate} className="btn-primary">Generate Password</button>
      {password && <div className="output">{password}</div>}
    </div>
  );
}

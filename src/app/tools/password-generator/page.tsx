// @ts-nocheck
"use client";

import { useState } from "react";

function generatePassword(length: number, useUpper: boolean, useLower: boolean, useDigits: boolean, useSymbols: boolean) {
  let chars = "";
  if (useUpper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (useLower) chars += "abcdefghijklmnopqrstuvwxyz";
  if (useDigits) chars += "0123456789";
  if (useSymbols) chars += "!@#$%^&*()-_=+[]{};:,.<>?";

  if (!chars) return "";

  let pwd = "";
  const array = new Uint32Array(length);
  crypto.getRandomValues(array);
  for (let i = 0; i < length; i++) {
    const idx = array[i] % chars.length;
    pwd += chars[idx];
  }
  return pwd;
}

export default function PasswordGeneratorPage() {
  const [length, setLength] = useState(16);
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useDigits, setUseDigits] = useState(true);
  const [useSymbols, setUseSymbols] = useState(false);
  const [password, setPassword] = useState("");

  const run = () => {
    const pwd = generatePassword(length, useUpper, useLower, useDigits, useSymbols);
    setPassword(pwd);
  };

  const copy = async () => {
    if (!password) return;
    try {
      await navigator.clipboard.writeText(password);
      alert("Password copied!");
    } catch {
      alert("Unable to copy, please copy manually.");
    }
  };

  return (
    <main className="container" style={{ marginTop: 20, marginBottom: 20 }}>
      <div className="card">
        <h1 className="section-title">Password Generator</h1>
        <p className="section-sub" style={{ marginTop: 4 }}>
          Generate strong random passwords in your browser. Nothing is sent anywhere.
        </p>

        <div
          style={{
            marginTop: 12,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 10,
          }}
        >
          <div>
            <label style={{ fontSize: 12 }}>Length</label>
            <input
              type="number"
              min={6}
              max={64}
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value || "16", 10))}
              style={{
                width: "100%",
                marginTop: 4,
                borderRadius: 10,
                border: "1px solid #2b3140",
                background: "#0b0c10",
                padding: "4px 6px",
                fontSize: 13,
                color: "#e9eef2",
                outline: "none",
              }}
            />
          </div>
          <div style={{ fontSize: 12 }}>
            <label style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <input
                type="checkbox"
                checked={useUpper}
                onChange={(e) => setUseUpper(e.target.checked)}
              />
              Uppercase letters
            </label>
            <label style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <input
                type="checkbox"
                checked={useLower}
                onChange={(e) => setUseLower(e.target.checked)}
              />
              Lowercase letters
            </label>
            <label style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <input
                type="checkbox"
                checked={useDigits}
                onChange={(e) => setUseDigits(e.target.checked)}
              />
              Numbers
            </label>
            <label style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <input
                type="checkbox"
                checked={useSymbols}
                onChange={(e) => setUseSymbols(e.target.checked)}
              />
              Symbols
            </label>
          </div>
        </div>

        <div style={{ marginTop: 12 }}>
          <label style={{ fontSize: 12 }}>Generated password</label>
          <input
            type="text"
            readOnly
            value={password}
            style={{
              width: "100%",
              marginTop: 4,
              borderRadius: 10,
              border: "1px solid #2b3140",
              background: "#020617",
              padding: "8px 10px",
              fontSize: 13,
              color: "#e9eef2",
              outline: "none",
            }}
          />
        </div>

        <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
          <button className="btn btn-primary" type="button" onClick={run}>
            Generate
          </button>
          <button className="btn" type="button" onClick={copy} disabled={!password}>
            Copy
          </button>
        </div>
      </div>
    </main>
  );
}

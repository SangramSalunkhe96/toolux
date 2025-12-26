"use client";
import { useState } from "react";

export default function GSTInvoiceGenerator() {
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState("");

  const generate = () => {
    const base = Number(amount);
    if (!base) return;

    const gst = base * 0.18;
    const total = base + gst;

    setResult(
`Invoice Amount: ₹${base.toFixed(2)}
GST (18%): ₹${gst.toFixed(2)}
Total Payable: ₹${total.toFixed(2)}`
    );
  };

  return (
    <div className="space-y-4">
      <input
        className="tool-input"
        placeholder="Enter amount (₹)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button className="btn-primary" onClick={generate}>
        Generate Invoice
      </button>

      {result && <textarea className="tool-output" readOnly value={result} />}
    </div>
  );
}

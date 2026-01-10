"use client";
import { useState } from "react";

const countries = [
  { code: "91", label: "🇮🇳 India (+91)" },
  { code: "1", label: "🇺🇸 USA (+1)" },
  { code: "44", label: "🇬🇧 UK (+44)" },
  { code: "971", label: "🇦🇪 UAE (+971)" },
  { code: "61", label: "🇦🇺 Australia (+61)" },
];

export default function WhatsAppLinkGeneratorTool() {
  const [country, setCountry] = useState("91");
  const [phone, setPhone] = useState("");
  const [msg, setMsg] = useState("");
  const [link, setLink] = useState("");

  const generate = () => {
    if (!phone) return;
    const encoded = encodeURIComponent(msg);
    const fullNumber = `${country}${phone}`;
    const url = `https://wa.me/${fullNumber}?text=${encoded}`;
    setLink(url);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(link);
    alert("WhatsApp link copied!");
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-xl">

      <h1 className="text-2xl font-bold text-center mb-1">
        WhatsApp Link Generator
      </h1>

      <p className="text-sm text-gray-600 text-center mb-6">
        Create direct WhatsApp chat links to share with customers & friends.
      </p>

      {/* PHONE INPUT */}
      <div className="mb-4">
        <label className="text-sm font-medium block mb-1">Phone Number</label>

        <div className="flex gap-2">
          <select
            className="border rounded-lg px-3 py-2 text-sm bg-white"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            {countries.map((c) => (
              <option key={c.code} value={c.code}>
                {c.label}
              </option>
            ))}
          </select>

          <input
            className="flex-1 border rounded-lg px-4 py-2"
            placeholder="Enter phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
          />
        </div>
      </div>

      {/* MESSAGE */}
      <div className="mb-4">
        <label className="text-sm font-medium block mb-1">
          Optional Message
        </label>

        <textarea
          className="w-full-second border rounded-lg px-4 py-2"
          placeholder="Hi, I want to know more about your service..."
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
      </div>

      {/* GENERATE */}
      <button
        onClick={generate}
        className="w-full-one bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
      >
        Generate WhatsApp Link
      </button>

      {/* RESULT */}
      {link && (
        <div className="mt-5 bg-gray-100 p-4 rounded-xl space-y-3">

          <p className="text-sm font-medium text-gray-700">Your WhatsApp Link</p>

          <p className="text-sm text-blue-700 break-all bg-white p-2 rounded-md border">
            {link}
          </p>

          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={copyLink}
              className="bg-blue-600 text-white py-2 rounded-md text-sm hover:bg-blue-700"
            >
              Copy
            </button>

            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                link
              )}`}
              target="_blank"
              className="bg-green-700 text-white py-2 rounded-md text-sm text-center hover:bg-green-800"
            >
              Share
            </a>

            <a
              href={link}
              target="_blank"
              className="bg-emerald-600 text-white py-2 rounded-md text-sm text-center hover:bg-emerald-700"
            >
              Open
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

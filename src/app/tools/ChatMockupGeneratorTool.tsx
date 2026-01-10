"use client";
import { useState } from "react";

export default function ChatMockupGeneratorTool() {
  const [name1, setName1] = useState("You");
  const [name2, setName2] = useState("Friend");
  const [msg1, setMsg1] = useState("Hello!");
  const [msg2, setMsg2] = useState("Hi, how are you?");

  const downloadImage = () => {
    const node = document.getElementById("chat-preview");
    if (!node) return;

    const win = window.open("", "", "width=500,height=600");
    if (!win) return;

    win.document.write(`
      <html>
        <head>
          <style>
            body { font-family: Arial; padding:20px; }
          </style>
        </head>
        <body>${node.innerHTML}</body>
      </html>
    `);
    win.document.close();
    win.focus();
    win.print();
  };

  return (
    <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">

      {/* FORM */}
      <div className="bg-white p-6 rounded-xl shadow-lg space-y-4">

        <h1 className="text-xl font-bold">Chat Mockup Generator</h1>

        <input className="border rounded px-3 py-2 w-full" value={name1} onChange={(e)=>setName1(e.target.value)} />
        <textarea className="border rounded px-3 py-2 w-full" value={msg1} onChange={(e)=>setMsg1(e.target.value)} />

        <input className="border rounded px-3 py-2 w-full" value={name2} onChange={(e)=>setName2(e.target.value)} />
        <textarea className="border rounded px-3 py-2 w-full" value={msg2} onChange={(e)=>setMsg2(e.target.value)} />

        <button
          onClick={downloadImage}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg"
        >
          Download Chat Image
        </button>

      </div>

      {/* PREVIEW */}
      <div className="bg-gray-200 p-4 rounded-xl">

        <div id="chat-preview" className="bg-white p-4 rounded-lg w-[320px] mx-auto">

          <p className="text-sm font-semibold mb-2">{name2}</p>

          <div className="bg-gray-300 rounded-lg px-3 py-2 mb-2 text-sm w-fit">
            {msg2}
          </div>

          <div className="bg-green-500 text-white rounded-lg px-3 py-2 mb-2 text-sm w-fit ml-auto">
            {msg1}
          </div>

        </div>

      </div>

    </div>
  );
}

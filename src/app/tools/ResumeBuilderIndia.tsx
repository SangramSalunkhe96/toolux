"use client";

import { useState } from "react";

export default function ResumeBuilderIndia() {
  const [photo, setPhoto] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    title: "",
    email: "",
    phone: "",
    experience: "",
    skills: "",
    company: "",
    role: "",
    achievements: "",
    education: "",
    projects: "",
    certifications: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ PHOTO UPLOAD
  const handlePhoto = (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result as string);
    reader.readAsDataURL(file);
  };

  // ✅ PRINT → SAVE AS PDF (WORKING)
  const downloadPDF = () => {
    const printContent = document.getElementById("resume-preview");
    if (!printContent) return;

    const win = window.open("", "", "width=900,height=650");
    if (!win) return;

    win.document.write(`
      <html>
        <head>
          <title>Resume</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            img { border-radius: 6px; }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
        </body>
      </html>
    `);

    win.document.close();
    win.focus();
    win.print();
  };

  const input =
    "w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white";

  const sectionLine = "border-t border-gray-300 my-4";

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      <h1 className="text-3xl font-bold mb-8 text-center">
        Professional Resume Builder (India)
      </h1>

      <div className="grid lg:grid-cols-2 gap-10 items-start">

        {/* ================= FORM ================= */}
        <div className="bg-white rounded-xl shadow-xl p-6 space-y-5">

          <h2 className="text-lg font-semibold">Personal Details</h2>

          {/* PHOTO UPLOAD */}
          <div>
            <label className="text-sm font-medium mb-1 block">Profile Photo</label>

            <label className="inline-block cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700">
              Upload Photo
              <input type="file" accept="image/*" onChange={handlePhoto} className="hidden" />
            </label>
          </div>

          {/* ALIGNED GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input className={input} name="name" placeholder="Full Name" onChange={handleChange} />
            <input className={input} name="title" placeholder="Job Title" onChange={handleChange} />
            <input className={input} name="email" placeholder="Email" onChange={handleChange} />
            <input className={input} name="phone" placeholder="Phone" onChange={handleChange} />
          </div>

          <h2 className="text-lg font-semibold">Professional Info</h2>

          <input className={input} name="experience" placeholder="Experience (eg: 2 Years)" onChange={handleChange} />
          <input className={input} name="skills" placeholder="Skills (React, Node, Excel)" onChange={handleChange} />

          <div className="grid md:grid-cols-2 gap-4">
            <input className={input} name="company" placeholder="Company" onChange={handleChange} />
            <input className={input} name="role" placeholder="Role" onChange={handleChange} />
          </div>

          <textarea
            className={`${input} h-24`}
            name="achievements"
            placeholder="Achievements"
            onChange={handleChange}
          />

          <input className={input} name="education" placeholder="Education" onChange={handleChange} />

          <h2 className="text-lg font-semibold">Extra (Optional)</h2>

          <textarea className={`${input} h-20`} name="projects" placeholder="Projects" onChange={handleChange} />
          <textarea className={`${input} h-20`} name="certifications" placeholder="Certifications" onChange={handleChange} />

          <button
            onClick={downloadPDF}
            className="w-full-one mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Download Resume PDF
          </button>

        </div>

        {/* ================= PREVIEW ================= */}
        <div className="bg-gray-200 rounded-xl shadow-inner p-5">

          <div
            id="resume-preview"
            className="bg-white min-h-[1050px] p-8 rounded-md text-gray-900"
          >

            {/* HEADER WITH PHOTO ON RIGHT */}
            <div className="flex justify-between items-start mb-4">

              <div>
                <h2 className="text-2xl font-bold">{form.name || "Your Name"}</h2>
                <p className="text-blue-700 font-medium">{form.title || "Job Title"}</p>
                <p className="text-sm text-gray-600">
                  {(form.email || "email@example.com") + " | " + (form.phone || "0000000000")}
                </p>
              </div>

              {photo && (
                <img
                  src={photo}
                  alt="Profile"
                  className="w-28 h-36 object-cover border"
                />
              )}

            </div>

            <div className={sectionLine} />

            {/* SUMMARY */}
            <section className="mb-4">
              <h3 className="font-semibold text-lg mb-1">Professional Summary</h3>
              <p className="text-sm">
                {(form.title || "Professional")} with {(form.experience || "some")} experience,
                skilled in {(form.skills || "various technologies")}. Proven ability to deliver
                quality results and work effectively in team environments.
              </p>
            </section>

            <div className={sectionLine} />

            {/* EXPERIENCE */}
            <section className="mb-4">
              <h3 className="font-semibold text-lg mb-1">Experience</h3>
              <p className="font-medium">{(form.role || "Role")} — {(form.company || "Company")}</p>
              <p className="text-sm">{form.achievements || "Your achievements"}</p>
            </section>

            <div className={sectionLine} />

            {/* SKILLS */}
            <section className="mb-4">
              <h3 className="font-semibold text-lg mb-1">Skills</h3>
              <p className="text-sm">{form.skills || "Your skills"}</p>
            </section>

            <div className={sectionLine} />

            {/* EDUCATION */}
            <section className="mb-4">
              <h3 className="font-semibold text-lg mb-1">Education</h3>
              <p className="text-sm">{form.education || "Your education"}</p>
            </section>

            {form.projects && (
              <>
                <div className={sectionLine} />
                <section className="mb-4">
                  <h3 className="font-semibold text-lg mb-1">Projects</h3>
                  <p className="text-sm">{form.projects}</p>
                </section>
              </>
            )}

            {form.certifications && (
              <>
                <div className={sectionLine} />
                <section>
                  <h3 className="font-semibold text-lg mb-1">Certifications</h3>
                  <p className="text-sm">{form.certifications}</p>
                </section>
              </>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}

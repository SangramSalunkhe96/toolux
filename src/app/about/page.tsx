export default function About() {
  return (
    <main className="container" style={{ marginTop: 20, marginBottom: 20 }}>
      <div className="card">
        <h1 className="section-title">About Toolux</h1>

        <p className="section-sub" style={{ marginTop: 10 }}>
          Toolux is a modern privacy-first platform offering fast, simple, and useful
          tools for students, professionals and creators.
        </p>

        <h2 className="section-title" style={{ marginTop: 20 }}>
          Our Mission
        </h2>
        <p className="section-sub">Make productivity tools fast, free and accessible without requiring accounts or uploads.</p>

        <h2 className="section-title" style={{ marginTop: 20 }}>
          Why Toolux?
        </h2>
        <p className="section-sub">
          Unlike many online services that upload your files to a remote server,
          Toolux processes most files directly in the browser — ensuring privacy and speed.
        </p>

        <h2 className="section-title" style={{ marginTop: 20 }}>
          Contact
        </h2>
        <p className="section-sub">snstudio@toolux.in</p>
      </div>
    </main>
  );
}

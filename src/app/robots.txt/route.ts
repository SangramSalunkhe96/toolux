import { NextResponse } from "next/server";

export function GET() {
  const content = `
User-agent: *
Allow: /

Sitemap: https://toolux.in/sitemap.xml
  `.trim();

  return new NextResponse(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  });
}

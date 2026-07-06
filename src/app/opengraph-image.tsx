import { SITE_TAGLINE } from "@/lib/site";
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const runtime = "nodejs";
export const alt = "Joshua Hu portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const fontsDir = join(
    process.cwd(),
    "node_modules/geist/dist/fonts/geist-sans",
  );

  const [regular, semibold] = await Promise.all([
    readFile(join(fontsDir, "Geist-Regular.ttf")),
    readFile(join(fontsDir, "Geist-SemiBold.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#0a0a0a",
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.12) 1.5px, transparent 1.5px)",
          backgroundSize: "28px 28px",
        }}
      >
        <div
          style={{
            fontSize: 30,
            color: "#a1a1a1",
            fontFamily: "Geist",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          joshua.hu
        </div>
        <div
          style={{
            fontSize: 92,
            color: "#f2f2f2",
            fontFamily: "Geist",
            fontWeight: 600,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
          }}
        >
          Joshua Hu
        </div>
        <div
          style={{
            fontSize: 34,
            color: "#a1a1a1",
            fontFamily: "Geist",
            marginTop: 24,
            maxWidth: 900,
          }}
        >
          {SITE_TAGLINE}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: regular, style: "normal", weight: 400 },
        { name: "Geist", data: semibold, style: "normal", weight: 600 },
      ],
    },
  );
}

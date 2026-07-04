import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site";

export const alt = siteConfig.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 96,
          background: "#0c0817",
          backgroundImage:
            "radial-gradient(circle at 15% 20%, rgba(167,139,250,0.35), transparent 50%), radial-gradient(circle at 85% 15%, rgba(244,114,182,0.35), transparent 50%), radial-gradient(circle at 50% 100%, rgba(56,189,248,0.25), transparent 50%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 28,
            color: "#38BDF8",
            fontWeight: 600,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          Portfolio — Développeuse Full Stack
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 96,
            fontWeight: 700,
            color: "#f6f3fc",
            letterSpacing: -2,
          }}
        >
          Mayssae Bentayeb
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 34,
            color: "#b6abd6",
            maxWidth: 820,
          }}
        >
          React · Node.js · TypeScript · Laravel — en recherche d&apos;une
          alternance dès septembre 2026
        </div>
      </div>
    ),
    { ...size }
  );
}

import { ImageResponse } from "next/og";
import { brand } from "@/lib/brand";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#15202b",
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              width: "10px",
              height: "36px",
              backgroundColor: "#1f7a6c",
            }}
          />
          <span
            style={{
              fontSize: "28px",
              fontWeight: 600,
              color: "#1f7a6c",
              letterSpacing: "0.02em",
            }}
          >
            {brand.company}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <span
            style={{
              fontSize: "56px",
              fontWeight: 700,
              color: "#f7f9fb",
              lineHeight: 1.15,
              maxWidth: "900px",
            }}
          >
            {brand.tagline}
          </span>
          <span
            style={{
              fontSize: "24px",
              color: "#8b96a3",
            }}
          >
            {brand.location}
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}

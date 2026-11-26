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
            gap: "16px",
          }}
        >
          <svg
            width="44"
            height="44"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M31.2 24.8C47.9 11.4 72.3 13.8 86.1 30.3C92.3 37.7 95.6 46.8 96.0 56.2C92.7 38.6 77.3 25.3 58.7 25.3C47.8 25.3 37.9 29.9 31.0 37.3C30.4 33.1 30.5 28.9 31.2 24.8Z"
              fill="#f7f9fb"
            />
            <path
              d="M82.4 43.2C87.4 64.6 74.2 86.1 52.8 91.1C43.4 93.3 33.7 92.0 25.3 87.7C42.4 93.1 61.2 85.8 70.5 69.8C76.0 60.4 76.9 49.5 73.8 39.8C77.0 40.7 79.8 41.8 82.4 43.2Z"
              fill="#f7f9fb"
            />
            <path
              d="M40.8 78.6C19.7 72.2 7.8 49.9 14.2 28.8C17.0 19.6 22.9 11.9 30.8 6.9C17.6 19.1 14.6 39.1 23.9 55.1C29.4 64.5 38.4 70.8 48.3 72.9C45.8 75.1 43.3 77.0 40.8 78.6Z"
              fill="#f7f9fb"
            />
          </svg>
          <span
            style={{
              fontSize: "28px",
              fontWeight: 600,
              color: "#f7f9fb",
              letterSpacing: "0.04em",
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

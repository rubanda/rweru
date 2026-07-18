import { ImageResponse } from "next/og";
import { blogPosts } from "@/lib/blog-data";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  const title = post?.title ?? "RweruSynapse";

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
            RweruSynapse
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span
            style={{
              fontSize: "64px",
              fontWeight: 700,
              color: "#f7f9fb",
              lineHeight: 1.15,
            }}
          >
            {title}
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

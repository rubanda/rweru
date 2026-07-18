import type { BlogPost } from "@/lib/blog-data";

const roleBios: Record<string, string> = {
  Engineering:
    "Writes about shipping production software for connectivity- and cost-constrained markets.",
  "Product Research":
    "Researches how product decisions should change for African infrastructure and user contexts.",
  Design: "Writes about interface and language design for multilingual African audiences.",
  Community: "Runs RweruSynapse's workshops, ship nights, and learning paths in Kigali.",
  Platforms: "Builds the multi-tenant platforms behind Masata and its connected sites.",
};

export function AuthorBio({ author }: { author: BlogPost["author"] }) {
  const bio =
    roleBios[author.role] ??
    "Part of the team building software, research, and community for Africa at RweruSynapse.";

  return (
    <div className="flex items-center gap-4 rounded-2xl bg-oat p-5">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={author.avatar}
        alt={author.name}
        width={48}
        height={48}
        className="size-12 shrink-0 rounded-full bg-ivory"
      />
      <div>
        <p className="font-sans text-sm font-semibold text-slate">{author.name}</p>
        <p className="text-meta mt-0.5">{author.role}</p>
        <p className="mt-1.5 max-w-[46ch] text-sm leading-relaxed text-slate-medium">{bio}</p>
      </div>
    </div>
  );
}

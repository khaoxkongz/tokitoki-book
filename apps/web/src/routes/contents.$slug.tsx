import { Markdown } from "#/components/markdown";
import { ScrollProgress } from "#/components/ui/scroll-progress";
import { cn } from "#/lib/utils";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { allPosts } from "content-collections";
import * as React from "react";

export const Route = createFileRoute("/contents/$slug")({
  head: ({ params }) => ({
    meta: [{ title: params.slug }],
  }),
  loader: ({ params }) => {
    const post = allPosts.find((p) => p.slug === params.slug);
    if (!post) {
      throw notFound();
    }
    return { post };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { post } = Route.useLoaderData();
  const [scrollFade, setScrollFade] = React.useState({ top: false, bottom: false });

  React.useEffect(() => {
    const updateScrollFade = () => {
      const scrollTop = window.scrollY;
      const maxScrollTop = Math.max(document.documentElement.scrollHeight - window.innerHeight, 0);
      const nextScrollFade = {
        top: scrollTop > 1,
        bottom: scrollTop < maxScrollTop - 1,
      };

      setScrollFade((currentScrollFade) =>
        currentScrollFade.top === nextScrollFade.top && currentScrollFade.bottom === nextScrollFade.bottom
          ? currentScrollFade
          : nextScrollFade,
      );
    };

    updateScrollFade();
    window.addEventListener("scroll", updateScrollFade, { passive: true });
    window.addEventListener("resize", updateScrollFade);

    const resizeObserver = new ResizeObserver(updateScrollFade);
    resizeObserver.observe(document.documentElement);

    return () => {
      window.removeEventListener("scroll", updateScrollFade);
      window.removeEventListener("resize", updateScrollFade);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="relative">
      <article className="typeset typeset-docs mx-auto max-w-[75ch] rounded-xl border border-[oklch(0.9816_0.0026_106.45/10%)] bg-[oklch(0.499_0.0031_106.51/25%)] p-[clamp(1rem,3vw,1.75rem)] text-[oklch(0.9816_0.0026_106.45)] transition-[border-color] hover:border-[oklch(0.9816_0.0026_106.45/25%)]">
        <Markdown content={post.content} />
      </article>

      <div
        className={cn(
          "pointer-events-none fixed top-0 right-0 left-0 z-10 h-[25vh] bg-linear-to-b from-[oklch(0.2964_0.0036_106.61)] transition-opacity",
          scrollFade.top ? "opacity-100" : "opacity-0",
        )}
        aria-hidden="true"
      />
      <div
        className={cn(
          "pointer-events-none fixed right-0 bottom-0 left-0 z-10 h-[25vh] bg-linear-to-t from-[oklch(0.2964_0.0036_106.61)] transition-opacity",
          scrollFade.bottom ? "opacity-100" : "opacity-0",
        )}
        aria-hidden="true"
      />

      <ScrollProgress />
    </div>
  );
}

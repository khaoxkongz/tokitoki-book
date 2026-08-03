import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "#/components/ui/accordion";
import { Button } from "#/components/ui/button";
import { createFileRoute, Link } from "@tanstack/react-router";
import { allPosts } from "content-collections";

export const Route = createFileRoute("/")({
  loader: () => {
    return { posts: allPosts };
  },
  component: Home,
});

const EPISODES_PER_GROUP = 50;

function getEpisodeNumber(title: string) {
  const match = title.match(/\d+/);

  return match ? Number.parseInt(match[0], 10) : 0;
}

function Home() {
  const { posts } = Route.useLoaderData();

  const episodeGroups = posts
    .sort((firstPost, secondPost) => getEpisodeNumber(firstPost.title) - getEpisodeNumber(secondPost.title))
    .reduce<Map<number, (typeof allPosts)[number][]>>((groups, post) => {
      const groupStart = Math.floor((getEpisodeNumber(post.title) - 1) / EPISODES_PER_GROUP) * EPISODES_PER_GROUP + 1;
      const posts = groups.get(groupStart) ?? [];

      groups.set(groupStart, [...posts, post]);

      return groups;
    }, new Map());

  const latestGroupStart = [...episodeGroups.keys()].at(-1);

  return (
    <main className="mx-auto w-full max-w-2xl rounded-xl bg-[oklch(0.499_0.0031_106.51/25%)] px-4 py-6 sm:px-8">
      <Accordion defaultValue={latestGroupStart ? [`episodes-${latestGroupStart}`] : []} multiple>
        {[...episodeGroups].map(([groupStart, posts]) => {
          const groupEnd = groupStart + EPISODES_PER_GROUP - 1;

          return (
            <AccordionItem key={groupStart} value={`episodes-${groupStart}`}>
              <AccordionTrigger className="text-base">
                ตอนที่ {groupStart}–{groupEnd}
              </AccordionTrigger>
              <AccordionContent>
                <ul className="grid grid-cols-2 gap-1">
                  {posts.map((post) => (
                    <li key={post.slug}>
                      <Button
                        className="h-auto w-full justify-start px-2 py-1.5 text-left whitespace-normal"
                        variant="link"
                        nativeButton={false}
                        render={<Link to="/contents/$slug" params={{ slug: post.slug }} />}
                      >
                        {post.title}
                      </Button>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </main>
  );
}

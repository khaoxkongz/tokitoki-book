import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router";

import { ThemeProvider } from "#/components/theme-provider";

import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "TanStack Start Starter",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
  notFoundComponent: () => (
    <main className="grid min-h-screen items-center justify-center">
      <h1 className="text-3xl font-bold">404 - Not Found</h1>
    </main>
  ),
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="th"
      suppressHydrationWarning
    >
      <head>
        <HeadContent />
      </head>
      <body className="min-h-dvh bg-[oklch(0.2964_0.0036_106.61)] p-4 antialiased">
        <ThemeProvider
          defaultTheme="system"
          storageKey="theme"
        >
          {children}
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  );
}

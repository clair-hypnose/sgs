import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, HeadContent, Link, Scripts } from "@tanstack/react-router";
import { ThemeProvider } from "@/components/theme";
import { Toaster } from "@/components/ui/sonner";
import "@fontsource/lilita-one";
import appCss from "../styles.css?url";
import { Header } from "./__root.header";

// ROUTE -----------------------------------------------------------------------------------------------------------------------------------
export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [{ charSet: "utf-8" }, { name: "viewport", content: "width=device-width, initial-scale=1" }, { title: "TanStack Start Starter" }],
    links: [{ rel: "stylesheet", href: appCss }],
  }),

  shellComponent: RootLayout,
});

// ROOT LAYOUT -----------------------------------------------------------------------------------------------------------------------------
function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <ThemeProvider>
          <div className="container relative mx-auto flex flex-col px-4 pt-28 pb-8 md:px-8">
            <Header />
            {children}
          </div>
          <div className="flex w-full items-center bg-secondary px-8 py-4 text-secondary-foreground">
            <Link to="/">Mentions légales</Link>
          </div>
          <Toaster position="bottom-center" />
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  );
}

// TYPES -----------------------------------------------------------------------------------------------------------------------------------
type MyRouterContext = {
  queryClient: QueryClient;
};

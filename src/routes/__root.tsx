// import type { QueryClient } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRootRouteWithContext, HeadContent, Scripts } from "@tanstack/react-router";
import { ThemeProvider } from "@/components/theme";
import appCss from "../styles.css?url";
import { SiteHeader } from "./__root.header";

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
          <div className="container mx-auto flex flex-col p-4">
            <SiteHeader />
            {children}
          </div>
        </ThemeProvider>
        {/* <ReactQueryDevtools buttonPosition="bottom-left" /> */}
        <Scripts />
      </body>
    </html>
  );
}

// TYPES -----------------------------------------------------------------------------------------------------------------------------------
type MyRouterContext = {
  // queryClient: QueryClient;
};

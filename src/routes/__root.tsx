import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, HeadContent, Scripts } from "@tanstack/react-router";
import { ThemeProvider } from "@/components/theme";
import { Toaster } from "@/components/ui/sonner";
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
          <div className="container mx-auto flex flex-col px-4 py-4 md:px-8">
            <SiteHeader />
            {children}
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

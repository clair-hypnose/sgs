import { Link } from "@tanstack/react-router";
import { useTheme } from "@/components/theme";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// MAIN ------------------------------------------------------------------------------------------------------------------------------------
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background">
      <div className="container-wrapper 3xl:fixed:px-0 px-6">
        <div className="**:data-[slot=separator]:!h-4 3xl:fixed:container flex h-(--header-height) items-center">
          <Button asChild className="hidden size-8 lg:flex" size="icon" variant="ghost">
            <Link to="/">SGS</Link>
          </Button>
          <div className="ml-auto flex items-center gap-2 md:flex-1 md:justify-end">
            <Separator orientation="vertical" />
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
}

// THEME SWITCHER --------------------------------------------------------------------------------------------------------------------------
export function ThemeSwitcher() {
  const { appTheme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(appTheme === "light" ? "dark" : "light");
  };

  return (
    <Button className="group/toggle extend-touch-target size-8" onClick={toggleTheme} size="icon" title="Toggle theme" variant="ghost">
      <svg
        className="size-4.5"
        fill="none"
        height="24"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Theme switcher</title>
        <path d="M0 0h24v24H0z" fill="none" stroke="none" />
        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
        <path d="M12 3l0 18" />
        <path d="M12 9l4.65 -4.65" />
        <path d="M12 14.3l7.37 -7.37" />
        <path d="M12 19.6l8.85 -8.85" />
      </svg>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

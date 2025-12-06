import { Link } from "@tanstack/react-router";
import { useStore } from "@tanstack/react-store";
import { motion, type Transition, useMotionValueEvent, useScroll } from "motion/react";
import { type PropsWithChildren, useCallback } from "react";
import { tv } from "tailwind-variants";
import { Logo } from "@/components/logo";
import { useTheme } from "@/components/theme";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { readRootLayout } from "@/lib/data";
import { setHeaderHoveredId, setIsScrolled, store } from "@/lib/store";

// STYLES ----------------------------------------------------------------------------------------------------------------------------------
const headerStyles = tv({
  slots: {
    base: "fixed inset-x-0 top-0 z-50",
    burger: `relative p-2 
    sm:hidden`,
    content: `relative mx-auto flex w-full items-center justify-between rounded-xl bg-transparent px-4 py-2 
    transition-[box-shadow,background-color] duration-1000
    xl:container`,
    icon: "flex size-7",
    icons: "flex",
    logo: "relative h-10 w-16 cursor-pointer",
    logoContent: `top-4 absolute w-24 
    sm:w-30 
    md:w-48`,
    nav: "relative cursor-pointer px-4 py-2",
    navs: `hidden items-center justify-center gap-2 font-bold text-black 
    sm:flex`,
    social: "relative p-2",
    socials: "flex items-center",
    stain: "absolute inset-0 size-full rounded-full",
    stainContent: "relative z-10",
    theme: "relative size-11 cursor-pointer text-foreground",
  },
  variants: {
    isScrolled: {
      true: {
        base: `inset-x-4 top-5 
        md:inset-x-20`,
        content: "bg-background/95 shadow-header",
        logoContent: `top-0 w-16 
        sm:w-16 
        md:w-16`,
      },
    },
    intent: {
      primary: { stain: "bg-primary" },
      secondary: { stain: "bg-accent" },
    },
  },
  defaultVariants: { intent: "secondary" },
});
export const HEADER = headerStyles();

// TRANSITIONS -----------------------------------------------------------------------------------------------------------------------------
const defaultTransition: Transition = { type: "spring", stiffness: 200, damping: 50 };
export const HEADER_T = { base: defaultTransition, content: defaultTransition, logoContent: defaultTransition };

// ROOT ------------------------------------------------------------------------------------------------------------------------------------
export function Header() {
  const { socials } = readRootLayout();
  const { scrollY } = useScroll();
  const isScrolled = useStore(store, (state) => state.isScrolled);

  useMotionValueEvent(scrollY, "change", (latest) => setIsScrolled(latest > 1));

  const handleOnMouseLeave = useCallback(() => setHeaderHoveredId(), []);

  return (
    <motion.header className={HEADER.base({ isScrolled })} layoutRoot transition={HEADER_T.base}>
      <motion.div className={HEADER.content({ isScrolled })} layout onMouseLeave={handleOnMouseLeave} transition={HEADER_T.content}>
        <Link to="/">
          <HeaderLogo>
            <Logo className="fill-foreground" />
          </HeaderLogo>
        </Link>
        <div className={HEADER.icons()}>
          <div className={HEADER.socials()}>
            {socials.map((social) => (
              <HeaderSocial key={social.key} social={social} />
            ))}
            <Separator className="mx-2" orientation="vertical" />
            <ThemeSwitcher />
          </div>
        </div>
      </motion.div>
    </motion.header>
  );
}
export type HeaderProps = {
  image: { height: number; width: number; alt: string; src: string };
  navs: { href: string; key: string; text: string }[];
  socials: { href: string; icon: string; key: string; text: string }[];
};

// LOGO ------------------------------------------------------------------------------------------------------------------------------------
export function HeaderLogo({ children }: HeaderLogoProps) {
  const isScrolled = useStore(store, (state) => state.isScrolled);

  return (
    <button className={HEADER.logo()} type="button">
      <motion.div className={HEADER.logoContent({ isScrolled })} layout transition={HEADER_T.logoContent}>
        {children}
      </motion.div>
    </button>
  );
}
export type HeaderLogoProps = PropsWithChildren;

// SOCIAL ----------------------------------------------------------------------------------------------------------------------------------
export function HeaderSocial({ social }: HeaderSocialProps) {
  const { href, icon, key, text } = social;
  const isHovered = useStore(store, ({ headerHoveredId }) => headerHoveredId === key);

  const handleOnMouseEnter = useCallback(() => setHeaderHoveredId(key), [key]);

  return (
    <a aria-label={text} className={HEADER.social()} href={href} key={key} onMouseEnter={handleOnMouseEnter} target="_blank">
      {isHovered && <motion.div className={HEADER.stain({ intent: "primary" })} layoutId="hovered" />}
      <span className={HEADER.stainContent()}>
        <span className={HEADER.icon({ className: icon })} />
      </span>
    </a>
  );
}
export type HeaderSocialProps = { social: { href: string; icon: string; key: string; text: string } };

// THEME SWITCHER --------------------------------------------------------------------------------------------------------------------------
export function ThemeSwitcher() {
  const { appTheme, setTheme } = useTheme();
  const isHovered = useStore(store, ({ headerHoveredId }) => headerHoveredId === "theme");

  const handleOnMouseEnter = useCallback(() => setHeaderHoveredId("theme"), []);

  const toggleTheme = () => {
    setTheme(appTheme === "light" ? "dark" : "light");
  };

  return (
    <Button
      className={HEADER.theme()}
      onClick={toggleTheme}
      onMouseEnter={handleOnMouseEnter}
      size="icon-lg"
      title="Toggle theme"
      variant="link"
    >
      {isHovered && <motion.div className={HEADER.stain({ intent: "primary" })} layoutId="hovered" />}
      <span className={HEADER.stainContent()}>
        <svg
          className={HEADER.icon()}
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
      </span>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

import { cn } from "@/lib/utils";

export function Header({ className, children, ...props }: React.ComponentProps<"section">) {
  return (
    <section className={cn("border-grid", className)} {...props}>
      <div className="container-wrapper">
        <div className="container flex flex-col items-center gap-2 py-8 text-center md:py-16 lg:py-20 xl:gap-4">{children}</div>
      </div>
    </section>
  );
}

export function HeaderHeading({ className, ...props }: React.ComponentProps<"h1">) {
  return (
    <h1
      className={cn(
        "max-w-2xl text-balance font-semibold text-4xl text-primary leading-tighter tracking-tight lg:font-semibold lg:leading-[1.1] xl:text-5xl xl:tracking-tighter",
        className
      )}
      {...props}
    />
  );
}

export function HeaderDescription({ className, ...props }: React.ComponentProps<"p">) {
  return <p className={cn("max-w-3xl text-balance text-base text-foreground sm:text-lg", className)} {...props} />;
}

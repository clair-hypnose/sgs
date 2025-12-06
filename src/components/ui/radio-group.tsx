import { Indicator, Item, Root } from "@radix-ui/react-radio-group";
import { CircleIcon } from "lucide-react";
import type * as React from "react";
import { tv } from "tailwind-variants";

// STYLES ----------------------------------------------------------------------------------------------------------------------------------
export const RADIO = tv({
  slots: {
    group: "grid gap-3",
    icon: "-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 size-2 fill-white",
    indicator: "relative flex items-center justify-center",
    item: `aspect-square size-4 shrink-0 rounded-full border border-input text-primary shadow-xs outline-none transition-[color,box-shadow] 
    focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 
    disabled:cursor-not-allowed disabled:opacity-50 
    aria-invalid:border-destructive aria-invalid:ring-destructive/20 
    dark:bg-input/30 dark:aria-invalid:ring-destructive/40`,
  },
})();

// MAIN ------------------------------------------------------------------------------------------------------------------------------------
function RadioGroup({ className, ...props }: React.ComponentProps<typeof Root>) {
  return <Root className={RADIO.group({ className })} data-slot="radio-group" {...props} />;
}

// ITEM ------------------------------------------------------------------------------------------------------------------------------------
function RadioGroupItem({ className, ...props }: React.ComponentProps<typeof Item>) {
  return (
    <Item className={RADIO.item({ className })} data-slot="radio-group-item" {...props}>
      <Indicator className={RADIO.indicator()} data-slot="radio-group-indicator">
        <CircleIcon className={RADIO.icon()} />
      </Indicator>
    </Item>
  );
}

export { RadioGroup, RadioGroupItem };

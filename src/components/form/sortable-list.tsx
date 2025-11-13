import { RestrictToVerticalAxis } from "@dnd-kit/abstract/modifiers";
import { move } from "@dnd-kit/helpers";
import { DragDropProvider } from "@dnd-kit/react";
import { useSortable } from "@dnd-kit/react/sortable";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { Item, ItemActions, ItemContent, ItemTitle } from "@/components/ui/item";
import { Button } from "../ui/button";
import { ButtonGroup } from "../ui/button-group";
import type { SurveyItem } from "./utils";

// MAIN ------------------------------------------------------------------------------------------------------------------------------------
export function SortableList({ items, onValueChange, value }: SortableListProps) {
  return (
    <DragDropProvider
      //@ts-expect-error
      modifiers={[RestrictToVerticalAxis]}
      onDragEnd={(event) => {
        onValueChange(move(value, event));
      }}
    >
      <div className="inline-flex flex-col gap-2">
        {items.map(({ id, label }, index) => (
          <Sortable id={id} index={index} key={id} label={label} />
        ))}
      </div>
    </DragDropProvider>
  );
}
type SortableListProps = {
  items: readonly SurveyItem[];
  onValueChange: (value: string[]) => void;
  value: string[];
};

// ITEM ------------------------------------------------------------------------------------------------------------------------------------
function Sortable({ id, index, label }: { id: string; index: number; label: string }) {
  const { ref } = useSortable({ id, index });

  return (
    <Item ref={ref} variant="outline">
      <ItemContent>
        <ItemTitle>{label}</ItemTitle>
      </ItemContent>
      <ItemActions>
        <ButtonGroup>
          <Button aria-label="Plus important" className="cursor-pointer" size="icon-sm" type="button" variant="outline">
            <ArrowUpIcon />
          </Button>
          <Button aria-label="Moins Important" className="cursor-pointer" size="icon-sm" type="button" variant="outline">
            <ArrowDownIcon />
          </Button>
        </ButtonGroup>
      </ItemActions>
    </Item>
  );
}

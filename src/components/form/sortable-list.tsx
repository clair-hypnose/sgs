import { RestrictToVerticalAxis } from "@dnd-kit/abstract/modifiers";
import { arrayMove, move } from "@dnd-kit/helpers";
import { DragDropProvider } from "@dnd-kit/react";
import { useSortable } from "@dnd-kit/react/sortable";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item";
import { Button } from "../ui/button";
import { ButtonGroup } from "../ui/button-group";
import { Input } from "../ui/input";
import type { SurveyItem } from "./utils";

// MAIN ------------------------------------------------------------------------------------------------------------------------------------
export function SortableList({ onValueChange, value }: SortableListProps) {
  return (
    <DragDropProvider
      //@ts-expect-error
      modifiers={[RestrictToVerticalAxis]}
      onDragEnd={(event) => onValueChange(move(value, event))}
    >
      <div className="inline-flex flex-col gap-2">
        {value.map(({ id, label }, index) => (
          <SortableItem id={id} index={index} key={id} label={label} onValueChange={onValueChange} value={value} />
        ))}
      </div>
    </DragDropProvider>
  );
}
type SortableListProps = {
  onValueChange: (value: SurveyItem[]) => void;
  value: SurveyItem[];
};

// ITEM ------------------------------------------------------------------------------------------------------------------------------------
function SortableItem({ id, index, label, onValueChange, value }: SortableItemProps) {
  const { ref } = useSortable({ id, index });

  const handleClickUp = () => {
    if (index > 0) onValueChange(arrayMove(value, index, index - 1));
  };

  const handleClickDown = () => {
    if (index < value.length - 1) onValueChange(arrayMove(value, index, index + 1));
  };

  return (
    <Item ref={ref} variant="outline">
      <ItemContent>
        <ItemTitle>
          {index + 1} - {label}
        </ItemTitle>
        <ItemDescription>{id === "autre" && <Input className="max-w-3xs bg-background" />}</ItemDescription>
      </ItemContent>
      <ItemActions>
        <ButtonGroup>
          <Button
            aria-label="Plus important"
            className="cursor-pointer"
            disabled={index === 0}
            onClick={handleClickUp}
            size="icon-sm"
            type="button"
            variant="outline"
          >
            <ArrowUpIcon />
          </Button>
          <Button
            aria-label="Moins Important"
            className="cursor-pointer"
            disabled={index === value.length - 1}
            onClick={handleClickDown}
            size="icon-sm"
            type="button"
            variant="outline"
          >
            <ArrowDownIcon />
          </Button>
        </ButtonGroup>
      </ItemActions>
    </Item>
  );
}
type SortableItemProps = SurveyItem & {
  index: number;
  onValueChange: (value: SurveyItem[]) => void;
  value: SurveyItem[];
};

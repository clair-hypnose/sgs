import { RestrictToVerticalAxis } from "@dnd-kit/abstract/modifiers";
import { arrayMove, move } from "@dnd-kit/helpers";
import { DragDropProvider } from "@dnd-kit/react";
import { useSortable } from "@dnd-kit/react/sortable";
import { ArrowDownIcon, ArrowUpIcon, PlusCircleIcon, Trash2Icon } from "lucide-react";
import { Item, ItemActions, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ButtonGroup } from "../ui/button-group";
import { Input } from "../ui/input";
import type { SurveyEditableItem } from "./utils";

// MAIN ------------------------------------------------------------------------------------------------------------------------------------
export function SortableList({ onValueChange, value }: SortableListProps) {
  const addEditableItem = () => {
    onValueChange([...value, { editable: true, id: `extra${value.length}`, label: "" }]);
  };

  return (
    <div className="flex flex-col gap-2">
      <DragDropProvider
        //@ts-expect-error
        modifiers={[RestrictToVerticalAxis]}
        onDragEnd={(event) => onValueChange(move(value, event))}
      >
        <div className="inline-flex flex-col gap-2">
          {value.map((item, index) => (
            <SortableItem index={index} key={item.id} {...item} onValueChange={onValueChange} value={value} />
          ))}
        </div>
      </DragDropProvider>
      <Button className="cursor-pointer" onClick={addEditableItem} size="sm" type="button" variant="secondary">
        <PlusCircleIcon /> Ajouter une réponse
      </Button>
    </div>
  );
}
type SortableListProps = {
  onValueChange: (value: SurveyEditableItem[]) => void;
  value: SurveyEditableItem[];
};

// ITEM ------------------------------------------------------------------------------------------------------------------------------------
function SortableItem({ editable, id, index, label, onValueChange, value }: SortableItemProps) {
  const { ref } = useSortable({ id, index });

  const handleClickUp = () => {
    if (index > 0) onValueChange(arrayMove(value, index, index - 1));
  };

  const handleClickDown = () => {
    if (index < value.length - 1) onValueChange(arrayMove(value, index, index + 1));
  };

  const handleClickRemove = () => {
    onValueChange(value.filter((_, i) => i !== index));
  };

  return (
    <Item ref={ref} variant="muted">
      <ItemMedia>
        <Badge className="size-5 rounded-full px-1 font-mono tabular-nums" variant="secondary">
          {index + 1}
        </Badge>
      </ItemMedia>
      <ItemContent>
        <ItemTitle className="w-full">
          {editable ? (
            <Input
              className="flex-1 bg-white dark:bg-input"
              onChange={(e) =>
                onValueChange([...value.slice(0, index), { editable: true, id, label: e.target.value }, ...value.slice(index + 1)])
              }
              placeholder="Veuillez préciser"
              value={label}
            />
          ) : (
            label
          )}
        </ItemTitle>
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
          {editable && (
            <Button
              aria-label="Retirer"
              className="cursor-pointer"
              onClick={handleClickRemove}
              size="icon-sm"
              type="button"
              variant="outline"
            >
              <Trash2Icon />
            </Button>
          )}
        </ButtonGroup>
      </ItemActions>
    </Item>
  );
}
type SortableItemProps = SurveyEditableItem & {
  index: number;
  onValueChange: (value: SurveyEditableItem[]) => void;
  value: SurveyEditableItem[];
};

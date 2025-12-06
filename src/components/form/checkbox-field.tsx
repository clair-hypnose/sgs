import { PlusCircleIcon, Trash2Icon } from "lucide-react";
import { type Dispatch, type SetStateAction, useState } from "react";
import { type ControllerRenderProps, type FieldPath, type FieldValues, useController } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "../ui/input-group";
import { FieldError } from "./field-error";
import type { FieldProps, SurveyEditableItem } from "./utils";

// STYLES ----------------------------------------------------------------------------------------------------------------------------------
const CHECKBOX = {
  checkbox: () => "cursor-pointer",
  field: () => `cursor-pointer rounded-md border border-transparent border-dashed px-2 
  hover:border-foreground 
  has-[>[data-slot=field-content]]:items-center has-[>[data-state=checked]]:bg-muted`,
  group: () => "data-[slot=checkbox-group]:gap-2",
  label: () => "w-full cursor-pointer flex-col items-start py-1 gap-1",
};

// MAIN ------------------------------------------------------------------------------------------------------------------------------------
export function CheckboxesField<V extends FieldValues, N extends FieldPath<V>>(props: CheckboxesFieldProps<V, N>) {
  const { description, index, legend, ...rest } = props;
  const { field, fieldState } = useController(rest);
  const [items, setItems] = useState([...props.items]);
  const { onChange, value } = field;
  const { invalid } = fieldState;

  const addEditableItem = () => {
    const newItem = { editable: true, id: `extra${items.length}`, label: "" };
    setItems([...items, newItem]);
    onChange([...value, newItem]);
  };

  return (
    <FieldSet data-invalid={invalid}>
      <FieldLegend className="flex items-start gap-2">
        <Badge className="mt-0.5 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">{index}</Badge>
        {legend}
      </FieldLegend>
      {description && <FieldDescription>{description}</FieldDescription>}
      <FieldGroup className={CHECKBOX.group()} data-slot="checkbox-group">
        {items.map((item) => (
          <CheckboxField field={field} item={item} items={items} key={item.id} setItems={setItems} />
        ))}
        <Button className="cursor-pointer" onClick={addEditableItem} size="sm" type="button" variant="secondary">
          <PlusCircleIcon /> Ajouter une réponse
        </Button>
        <FieldError {...fieldState} />
      </FieldGroup>
    </FieldSet>
  );
}
export type CheckboxesFieldProps<V extends FieldValues, N extends FieldPath<V>> = FieldProps<V, N> & {
  description?: string;
  index: number;
  items: readonly SurveyEditableItem[];
};

// ITEM ------------------------------------------------------------------------------------------------------------------------------------
export function CheckboxField<V extends FieldValues, N extends FieldPath<V>>({ field, item, items, setItems }: CheckboxFieldProps<V, N>) {
  const { name, onBlur, onChange, value } = field;

  const changeChecked = (checked: boolean) => {
    const newValue = checked ? [...value, item] : value.filter(({ id }: SurveyEditableItem) => item.id !== id);
    onChange(newValue);
    onBlur();
  };

  const changeEditable = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newItem = { ...item, label: e.target.value };
    setItems(items.map((it) => (it.id === item.id ? newItem : it)));
    if (value.some(({ id }: SurveyEditableItem) => id === item.id)) {
      onChange(value.map((it: SurveyEditableItem) => (it.id === item.id ? newItem : it)));
      onBlur();
    }
  };

  const remove = () => {
    setItems(items.filter(({ id }) => item.id !== id));
    if (value.some(({ id }: SurveyEditableItem) => id === item.id)) {
      onChange(value.filter(({ id }: SurveyEditableItem) => item.id !== id));
      onBlur();
    }
  };

  return (
    <Field className={CHECKBOX.field()} orientation="horizontal">
      <Checkbox
        checked={value.some(({ id }: SurveyEditableItem) => id === item.id)}
        className={CHECKBOX.checkbox()}
        id={`${name}_${item.id}`}
        name={name}
        onCheckedChange={changeChecked}
      />
      <FieldLabel className={CHECKBOX.label()} htmlFor={`${name}_${item.id}`}>
        {item.editable ? (
          <InputGroup className="max-w-2xs bg-background dark:bg-input">
            <InputGroupInput
              className="bg-transparent dark:bg-transparent"
              onChange={changeEditable}
              placeholder="Veuillez préciser"
              value={item.label}
            />
            <InputGroupAddon align="inline-end">
              <InputGroupButton aria-label="Retirer" className="cursor-pointer" onClick={remove} size="icon-xs" title="Retirer">
                {<Trash2Icon />}
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        ) : (
          item.label
        )}
      </FieldLabel>
    </Field>
  );
}
export type CheckboxFieldProps<V extends FieldValues, N extends FieldPath<V>> = {
  field: ControllerRenderProps<V, N>;
  item: SurveyEditableItem;
  items: SurveyEditableItem[];
  setItems: Dispatch<SetStateAction<SurveyEditableItem[]>>;
};

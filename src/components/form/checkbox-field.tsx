import { CircleAlertIcon } from "lucide-react";
import { type FieldPath, type FieldValues, useController } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field";
import { Input } from "../ui/input";
import type { FieldProps, SurveyItem } from "./utils";

// STYLES ----------------------------------------------------------------------------------------------------------------------------------
const CHECKBOX = {
  checkbox: () => "cursor-pointer",
  error: () => "flex items-center gap-2 rounded-md bg-destructive/10 p-2",
  field: () => `cursor-pointer rounded-md border border-transparent border-dashed px-2 
  hover:border-foreground 
  has-[>[data-slot=field-content]]:items-center has-[>[data-state=checked]]:bg-muted`,
  group: () => "data-[slot=checkbox-group]:gap-2",
  label: () => "w-full cursor-pointer flex-col items-start py-1 gap-1",
};

// MAIN ------------------------------------------------------------------------------------------------------------------------------------
export function CheckboxField<V extends FieldValues, N extends FieldPath<V>>(props: CheckboxFieldProps<V, N>) {
  const { description, items, legend, ...rest } = props;
  const { field, fieldState } = useController(rest);
  const { error, invalid } = fieldState;
  const { name, onBlur, onChange, value } = field;

  const handleCheckedChange = (id: string) => (checked: boolean) => {
    const newItems = checked ? [...value.items, id] : value.items.filter((item: string) => item !== id);
    onChange({ items: newItems, other: value.other });
    onBlur();
  };

  const handleOtherChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...value, other: e.target.value });
    onBlur();
  };

  return (
    <FieldSet data-invalid={invalid}>
      <FieldLegend>{legend}</FieldLegend>
      {description && <FieldDescription>{description}</FieldDescription>}
      <FieldGroup className={CHECKBOX.group()} data-slot="checkbox-group">
        {items.map(({ id, label }) => (
          <Field className={CHECKBOX.field()} key={`${name}_${id}`} orientation="horizontal">
            <Checkbox
              checked={value.items.includes(id)}
              className={CHECKBOX.checkbox()}
              id={`${name}_${id}`}
              name={`${name}.items`}
              onCheckedChange={handleCheckedChange(id)}
            />
            <FieldLabel className={CHECKBOX.label()} htmlFor={`${name}_${id}`}>
              <span className="flex-none">{label}</span>
              {id === "autre" && (
                <Input className="max-w-3xs bg-background" name={`${name}.other`} onChange={handleOtherChange} value={value.other} />
              )}
            </FieldLabel>
          </Field>
        ))}
        {invalid && (
          <FieldError className={CHECKBOX.error()} errors={[error]}>
            <CircleAlertIcon className="size-4" />
            {error?.message}
          </FieldError>
        )}
      </FieldGroup>
    </FieldSet>
  );
}
export type CheckboxFieldProps<V extends FieldValues, N extends FieldPath<V>> = FieldProps<V, N> & {
  description?: string;
  items: readonly SurveyItem[];
};

import { type FieldPath, type FieldValues, useController } from "react-hook-form";
import { Field, FieldDescription, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FieldError } from "./field-error";
import type { FieldProps, SurveyItem } from "./utils";

// STYLES ----------------------------------------------------------------------------------------------------------------------------------
const RADIO = {
  field: () => `cursor-pointer rounded-md border border-transparent border-dashed px-2 
  hover:border-foreground 
  has-[>[data-slot=field-content]]:items-center has-[>[data-state=checked]]:bg-muted`,
  group: () => "gap-1",
  label: () => "w-full cursor-pointer py-1 font-normal",
  radio: () => "cursor-pointer bg-background",
};

// MAIN ------------------------------------------------------------------------------------------------------------------------------------
export function RadioField<V extends FieldValues, N extends FieldPath<V>>(props: RadioFieldProps<V, N>) {
  const { description, items, legend, ...rest } = props;
  const { field, fieldState } = useController(rest);
  const { invalid } = fieldState;
  const { name, onChange, value } = field;
  return (
    <FieldSet data-invalid={invalid}>
      <FieldLegend>{legend}</FieldLegend>
      {description && <FieldDescription>{description}</FieldDescription>}
      <RadioGroup aria-invalid={invalid} className={RADIO.group()} name={name} onValueChange={onChange} value={value}>
        {items.map(({ id, label }) => (
          <Field className={RADIO.field()} key={`${name}_${id}`} orientation="horizontal">
            <RadioGroupItem className={RADIO.radio()} id={`${name}_${id}`} value={id} />
            <FieldLabel className={RADIO.label()} htmlFor={`${name}_${id}`}>
              {label}
            </FieldLabel>
          </Field>
        ))}
      </RadioGroup>
      <FieldError {...fieldState} />
    </FieldSet>
  );
}
export type RadioFieldProps<V extends FieldValues, N extends FieldPath<V>> = FieldProps<V, N> & {
  description?: string;
  items: readonly SurveyItem[];
};

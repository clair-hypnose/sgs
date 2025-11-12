import { type FieldPath, type FieldValues, useController } from "react-hook-form";
import { Field, FieldDescription, FieldError, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { FieldProps, SurveyItem } from "./utils";

// MAIN ------------------------------------------------------------------------------------------------------------------------------------
export function RadioField<V extends FieldValues, N extends FieldPath<V>>(props: RadioFieldProps<V, N>) {
  const { description, items, legend, ...rest } = props;
  const { field, fieldState } = useController(rest);
  const isInvalid = fieldState.invalid;
  return (
    <FieldSet data-invalid={isInvalid}>
      <FieldLegend>{legend}</FieldLegend>
      {description && <FieldDescription>{description}</FieldDescription>}
      <RadioGroup aria-invalid={isInvalid} name={field.name} onValueChange={field.onChange} value={field.value}>
        {items.map((item) => (
          <Field key={item.id} orientation="horizontal">
            <RadioGroupItem id={item.id} value={item.id} />
            <FieldLabel className="font-normal" htmlFor={item.id}>
              {item.label}
            </FieldLabel>
          </Field>
        ))}
      </RadioGroup>
      {isInvalid && <FieldError errors={[fieldState.error]} />}
    </FieldSet>
  );
}
export type RadioFieldProps<V extends FieldValues, N extends FieldPath<V>> = FieldProps<V, N> & {
  description?: string;
  items: readonly SurveyItem[];
};

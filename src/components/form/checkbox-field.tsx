import { type FieldPath, type FieldValues, useController } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field";
import type { FieldProps, SurveyItem } from "./utils";

// MAIN ------------------------------------------------------------------------------------------------------------------------------------
export function CheckboxField<V extends FieldValues, N extends FieldPath<V>>(props: CheckboxFieldProps<V, N>) {
  const { items, legend, ...rest } = props;
  const { field, fieldState } = useController(rest);
  const isInvalid = fieldState.invalid;
  return (
    <FieldSet data-invalid={isInvalid}>
      <FieldLegend>{legend}</FieldLegend>
      <FieldDescription>(Plusieurs réponses possibles)</FieldDescription>
      <FieldGroup data-slot="checkbox-group">
        {items.map((item) => (
          <Field data-invalid={fieldState.invalid} key={item.id} orientation="horizontal">
            <Checkbox
              aria-invalid={fieldState.invalid}
              checked={field.value.includes(item.id)}
              id={`form-rhf-complex-${item.id}`}
              name={field.name}
              onCheckedChange={(checked) => {
                const newValue = checked ? [...field.value, item.id] : field.value.filter((value: string) => value !== item.id);
                field.onChange(newValue);
                field.onBlur();
              }}
            />
            <FieldContent>
              <FieldLabel htmlFor={`form-rhf-complex-${item.id}`}>{item.label}</FieldLabel>
            </FieldContent>
          </Field>
        ))}
      </FieldGroup>
      {isInvalid && <FieldError errors={[fieldState.error]} />}
    </FieldSet>
  );
}
export type CheckboxFieldProps<V extends FieldValues, N extends FieldPath<V>> = FieldProps<V, N> & {
  items: readonly SurveyItem[];
};

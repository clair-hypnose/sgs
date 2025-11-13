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
      <FieldGroup className="data-[slot=checkbox-group]:gap-1" data-slot="checkbox-group">
        {items.map((item) => (
          <Field
            className="cursor-pointer border border-transparent border-dashed px-1 hover:border-foreground has-[>[data-slot=field-content]]:items-center has-[>[data-state=checked]]:border-primary has-[>[data-state=checked]]:border-solid"
            data-invalid={fieldState.invalid}
            key={item.id}
            orientation="horizontal"
          >
            <Checkbox
              aria-invalid={fieldState.invalid}
              checked={field.value.includes(item.id)}
              className="cursor-pointer"
              id={`form-rhf-complex-${item.id}`}
              name={field.name}
              onCheckedChange={(checked) => {
                const newValue = checked ? [...field.value, item.id] : field.value.filter((value: string) => value !== item.id);
                field.onChange(newValue);
                field.onBlur();
              }}
            />
            <FieldContent>
              <FieldLabel className="w-full cursor-pointer py-1" htmlFor={`form-rhf-complex-${item.id}`}>
                {item.label}
              </FieldLabel>
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

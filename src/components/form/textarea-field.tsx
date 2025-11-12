import { type FieldPath, type FieldValues, useController } from "react-hook-form";
import { Field, FieldDescription, FieldError, FieldLegend, FieldSet } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import type { FieldProps } from "./utils";

// MAIN ------------------------------------------------------------------------------------------------------------------------------------
export function TextareaField<V extends FieldValues, N extends FieldPath<V>>({ legend, ...props }: TextareaFieldProps<V, N>) {
  const { field, fieldState } = useController(props);
  return (
    <FieldSet>
      <FieldLegend>{legend}</FieldLegend>
      <FieldDescription>(Déplacez les réponses du plus important au moins important)</FieldDescription>
      <Field data-invalid={fieldState.invalid} orientation="horizontal">
        <Textarea {...field} />
      </Field>
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </FieldSet>
  );
}
export type TextareaFieldProps<V extends FieldValues, N extends FieldPath<V>> = FieldProps<V, N>;

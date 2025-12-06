import { type FieldPath, type FieldValues, useController } from "react-hook-form";
import { Field, FieldLegend, FieldSet } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "../ui/badge";
import { FieldError } from "./field-error";
import type { FieldProps } from "./utils";

// MAIN ------------------------------------------------------------------------------------------------------------------------------------
export function TextareaField<V extends FieldValues, N extends FieldPath<V>>({ index, legend, ...props }: TextareaFieldProps<V, N>) {
  const { field, fieldState } = useController(props);
  return (
    <FieldSet className="gap-2">
      <FieldLegend className="flex items-start gap-2">
        <Badge className="mt-0.5 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">{index}</Badge>
        {legend}
      </FieldLegend>
      <Field data-invalid={fieldState.invalid} orientation="horizontal">
        <Textarea {...field} />
      </Field>
      <FieldError {...fieldState} />
    </FieldSet>
  );
}
export type TextareaFieldProps<V extends FieldValues, N extends FieldPath<V>> = { index: number } & FieldProps<V, N>;

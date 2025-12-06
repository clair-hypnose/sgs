import { type FieldPath, type FieldValues, useController } from "react-hook-form";
import { Field, FieldDescription, FieldLegend, FieldSet } from "@/components/ui/field";
import { Badge } from "../ui/badge";
import { FieldError } from "./field-error";
import { SortableList } from "./sortable-list";
import type { FieldProps } from "./utils";

// MAIN ------------------------------------------------------------------------------------------------------------------------------------
export function SortableField<V extends FieldValues, N extends FieldPath<V>>({ index, legend, ...props }: SortableFieldProps<V, N>) {
  const { field, fieldState } = useController(props);
  const { onChange, value } = field;
  return (
    <FieldSet>
      <FieldLegend className="flex items-start gap-2">
        <Badge className="mt-0.5 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">{index}</Badge>
        {legend}
      </FieldLegend>
      <FieldDescription>(Déplacez les réponses du plus important au moins important)</FieldDescription>
      <Field orientation="horizontal">
        <SortableList onValueChange={onChange} value={value} />
      </Field>
      <FieldError {...fieldState} />
    </FieldSet>
  );
}
export type SortableFieldProps<V extends FieldValues, N extends FieldPath<V>> = { index: number } & FieldProps<V, N>;

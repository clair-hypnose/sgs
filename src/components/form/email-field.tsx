import { CircleAlertIcon, MailIcon } from "lucide-react";
import { type FieldPath, type FieldValues, useController } from "react-hook-form";
import { Field, FieldError, FieldLegend, FieldSet } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group";
import type { FieldProps } from "./utils";

// MAIN ------------------------------------------------------------------------------------------------------------------------------------
export function EmailField<V extends FieldValues, N extends FieldPath<V>>({ legend, ...props }: EmailFieldProps<V, N>) {
  const { field, fieldState } = useController(props);
  return (
    <FieldSet className="gap-2">
      <FieldLegend>{legend}</FieldLegend>
      <Field data-invalid={fieldState.invalid} orientation="horizontal">
        <InputGroup>
          <InputGroupInput type="email" {...field} />
          <InputGroupAddon>
            <MailIcon />
          </InputGroupAddon>
        </InputGroup>
      </Field>
      {fieldState.invalid && (
        <FieldError className="flex items-center gap-2 rounded-md bg-destructive/10 p-2" errors={[fieldState.error]}>
          <CircleAlertIcon className="size-4" />
          {fieldState.error?.message}
        </FieldError>
      )}
    </FieldSet>
  );
}
export type EmailFieldProps<V extends FieldValues, N extends FieldPath<V>> = FieldProps<V, N>;

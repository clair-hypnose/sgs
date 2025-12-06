import { MailIcon } from "lucide-react";
import { type FieldPath, type FieldValues, useController } from "react-hook-form";
import { Field, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group";
import { FieldError } from "./field-error";
import type { FieldProps } from "./utils";

// MAIN ------------------------------------------------------------------------------------------------------------------------------------
export function EmailField<V extends FieldValues, N extends FieldPath<V>>({ legend, ...props }: EmailFieldProps<V, N>) {
  const { field, fieldState } = useController(props);
  const { name } = field;
  const { invalid } = fieldState;

  return (
    <Field className="gap-2" data-invalid={invalid}>
      <FieldLabel htmlFor={name}>{legend}</FieldLabel>
      <InputGroup>
        <InputGroupInput aria-invalid={invalid} className="bg-transparent dark:bg-transparent" id={name} type="email" {...field} />
        <InputGroupAddon>
          <MailIcon />
        </InputGroupAddon>
      </InputGroup>
      <FieldError {...fieldState} />
    </Field>
  );
}
export type EmailFieldProps<V extends FieldValues, N extends FieldPath<V>> = FieldProps<V, N>;

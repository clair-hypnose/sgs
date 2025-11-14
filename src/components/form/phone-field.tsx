import { PhoneIcon } from "lucide-react";
import { type FieldPath, type FieldValues, useController } from "react-hook-form";
import { Field, FieldLegend, FieldSet } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group";
import { FieldError } from "./field-error";
import type { FieldProps } from "./utils";

// MAIN ------------------------------------------------------------------------------------------------------------------------------------
export function PhoneField<V extends FieldValues, N extends FieldPath<V>>({ legend, ...props }: PhoneFieldProps<V, N>) {
  const { field, fieldState } = useController(props);
  return (
    <FieldSet>
      <FieldLegend>{legend}</FieldLegend>
      <Field data-invalid={fieldState.invalid} orientation="horizontal">
        <InputGroup>
          <InputGroupInput {...field} />
          <InputGroupAddon>
            <PhoneIcon />
          </InputGroupAddon>
        </InputGroup>
      </Field>
      <FieldError {...fieldState} />
    </FieldSet>
  );
}
export type PhoneFieldProps<V extends FieldValues, N extends FieldPath<V>> = FieldProps<V, N>;

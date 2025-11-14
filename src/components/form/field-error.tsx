import { CircleAlertIcon } from "lucide-react";
import type { ControllerFieldState } from "react-hook-form";
import { FieldError as FieldErrorNative } from "@/components/ui/field";

// STYLES ----------------------------------------------------------------------------------------------------------------------------------
const ERROR = {
  base: () => "flex items-center gap-2 rounded-md bg-destructive/10 p-2 dark:bg-destructive/20",
  icon: () => "size-4",
};

// MAIN ------------------------------------------------------------------------------------------------------------------------------------
export function FieldError(props: FieldErrorProps) {
  const { error, invalid } = props;

  if (!invalid) return null;
  return (
    <FieldErrorNative className={ERROR.base()} errors={[error]}>
      <CircleAlertIcon className={ERROR.icon()} />
      {error?.message}
    </FieldErrorNative>
  );
}
export type FieldErrorProps = ControllerFieldState;

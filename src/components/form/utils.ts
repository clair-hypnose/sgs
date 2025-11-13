import type { FieldPath, FieldValues, UseControllerProps } from "react-hook-form";
import { z } from "zod/mini";

// CONST -----------------------------------------------------------------------------------------------------------------------------------
const fieldTypes = ["checkbox", "radio", "sortable", "textarea"] as const;

// SCHEMAS ---------------------------------------------------------------------------------------------------------------------------------
const zFieldType = z.enum(fieldTypes);
export const zSurveyItem = z.readonly(z.object({ id: z.string(), label: z.string() }));

// TYPES -----------------------------------------------------------------------------------------------------------------------------------
export type FieldProps<V extends FieldValues, N extends FieldPath<V>> = UseControllerProps<V, N> & {
  legend: string;
};

export type FieldType = z.infer<typeof zFieldType>;
export type SurveyItem = z.infer<typeof zSurveyItem>;

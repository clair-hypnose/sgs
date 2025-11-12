import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { Fragment } from "react/jsx-runtime";
import { type FieldPath, type FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";
import { CheckboxField, type CheckboxFieldProps } from "@/components/form/checkbox-field";
import { InputsField, type InputsFieldProps } from "@/components/form/inputs-field";
import { RadioField, type RadioFieldProps } from "@/components/form/radio-field";
import { SortableField, type SortableFieldProps } from "@/components/form/sortable-field";
import { TextareaField, type TextareaFieldProps } from "@/components/form/textarea-field";
import { Button } from "@/components/ui/button";
import { FieldGroup, FieldSeparator } from "@/components/ui/field";
import { defaultSurveyValues, type FieldType, type Survey, survey, zSurvey } from "./index.utils";

// MAIN ------------------------------------------------------------------------------------------------------------------------------------
export function SurveyForm() {
  const { control, handleSubmit } = useForm<Survey>({
    resolver: zodResolver(zSurvey),
    defaultValues: defaultSurveyValues,
  });

  function onSubmit(data: Survey) {
    toast(`You submitted the following values: ${JSON.stringify(data, null, 2)}`);
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          {survey.map((props, i) => (
            <Fragment key={props.name}>
              <SurveyField control={control} {...props} />
              {i < survey.length - 1 && <FieldSeparator />}
            </Fragment>
          ))}
        </FieldGroup>
        <p>
          Merci à vous de nous avoir consacré ce temps qu'on sait précieux. N’hésitez pas à partager ce sondage avec votre réseau de
          thérapeutes.
        </p>
        <Button type="submit">Envoyer</Button>
      </form>
      <DevTool control={control} />
    </>
  );
}

// FIELD -----------------------------------------------------------------------------------------------------------------------------------
export function SurveyField<T extends FieldType, V extends FieldValues, N extends FieldPath<V>>(props: SurveyFieldProps<T, V, N>) {
  if (props.type === "checkbox") return <CheckboxField {...props} />;
  if (props.type === "radio") return <RadioField {...props} />;
  if (props.type === "sortable") return <SortableField {...props} />;
  if (props.type === "textarea") return <TextareaField {...props} />;
  return <InputsField {...props} />;
}
type SurveyFieldProps<T extends FieldType, V extends FieldValues, N extends FieldPath<V>> = T extends "checkbox"
  ? { type: T } & CheckboxFieldProps<V, N>
  : T extends "radio"
    ? { type: T } & RadioFieldProps<V, N>
    : T extends "sortable"
      ? { type: T } & SortableFieldProps<V, N>
      : T extends "textarea"
        ? { type: T } & TextareaFieldProps<V, N>
        : T extends "inputs"
          ? { type: T } & InputsFieldProps<V, N>
          : never;

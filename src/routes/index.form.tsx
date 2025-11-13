import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import confetti from "canvas-confetti";
import { useRef } from "react";
import { Fragment } from "react/jsx-runtime";
import { type FieldPath, type FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Bg } from "@/components/bg";
import { CheckboxField, type CheckboxFieldProps } from "@/components/form/checkbox-field";
import { EmailField } from "@/components/form/email-field";
import { PhoneField } from "@/components/form/phone-field";
import { RadioField, type RadioFieldProps } from "@/components/form/radio-field";
import { SortableField, type SortableFieldProps } from "@/components/form/sortable-field";
import { TextareaField, type TextareaFieldProps } from "@/components/form/textarea-field";
import type { FieldType } from "@/components/form/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FieldGroup, FieldSeparator } from "@/components/ui/field";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { defaultSurveyValues, type Survey, survey, zSurvey } from "./index.utils";

// MAIN ------------------------------------------------------------------------------------------------------------------------------------
export function SurveyForm() {
  const { control, formState, handleSubmit } = useForm<Survey>({
    resolver: zodResolver(zSurvey),
    defaultValues: defaultSurveyValues,
  });

  const { isSubmitting } = formState;

  const buttonRef = useRef<HTMLButtonElement | null>(null);

  function onSubmit(data: Survey) {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();

    console.log(data);

    confetti({
      particleCount: 100,
      spread: 70,
      origin: {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight,
      },
    });

    toast.success("Merci ! Nous avons bien reçu vos réponses.");
  }

  return (
    <form className="flex flex-col gap-7" onSubmit={handleSubmit(onSubmit)}>
      <Card className="relative z-10 gap-10 bg-background">
        <CardHeader>
          <CardTitle className="text-center font-black text-2xl">
            Pour cela, on aimerait en savoir plus sur vos besoins à l'aide de ce sondage.
          </CardTitle>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            {survey.map((props, i) => (
              <Fragment key={props.name}>
                <SurveyField control={control} {...props} />
                {i < survey.length - 1 && <FieldSeparator className="border-grid" />}
              </Fragment>
            ))}
          </FieldGroup>
        </CardContent>
      </Card>
      <section className="relative">
        <Bg />
        <Card className="relative z-10 bg-background py-14">
          <CardContent className="flex flex-row items-center gap-4">
            <CardHeader className="flex-1">
              <CardTitle className="text-balance font-black text-3xl">
                Alors, communiquez-nous vos coordonnées et rejoignez vous aussi la communauté !
              </CardTitle>
              <CardDescription className="text-balance font-normal text-xl">
                Merci à vous de nous avoir consacré ce temps qu'on sait précieux. N’hésitez pas à partager ce sondage avec votre réseau de
                thérapeutes.
              </CardDescription>
            </CardHeader>
            <FieldGroup className="flex-1 gap-4">
              <EmailField control={control} legend="E-mail" name="email" />
              <PhoneField control={control} legend="Téléphone" name="phone" />
              <Button ref={buttonRef} size="lg">
                <LoadingSwap className="inline-flex items-center gap-2" isLoading={isSubmitting}>
                  Envoyer
                </LoadingSwap>
              </Button>
            </FieldGroup>
          </CardContent>
        </Card>
      </section>
      <DevTool control={control} />
    </form>
  );
}

// FIELD -----------------------------------------------------------------------------------------------------------------------------------
export function SurveyField<T extends FieldType, V extends FieldValues, N extends FieldPath<V>>(props: SurveyFieldProps<T, V, N>) {
  if (props.type === "checkbox") return <CheckboxField {...props} />;
  if (props.type === "radio") return <RadioField {...props} />;
  if (props.type === "sortable") return <SortableField {...props} />;
  if (props.type === "textarea") return <TextareaField {...props} />;
  return null;
}
type SurveyFieldProps<T extends FieldType, V extends FieldValues, N extends FieldPath<V>> = T extends "checkbox"
  ? { type: T } & CheckboxFieldProps<V, N>
  : T extends "radio"
    ? { type: T } & RadioFieldProps<V, N>
    : T extends "sortable"
      ? { type: T } & SortableFieldProps<V, N>
      : T extends "textarea"
        ? { type: T } & TextareaFieldProps<V, N>
        : never;

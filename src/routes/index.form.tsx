// import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import confetti from "canvas-confetti";
import { useRef } from "react";
import { Fragment } from "react/jsx-runtime";
import { type FieldPath, type FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";
import { CheckboxesField, type CheckboxesFieldProps } from "@/components/form/checkbox-field";
import { EmailField } from "@/components/form/email-field";
import { PhoneField } from "@/components/form/phone-field";
import { RadioField, type RadioFieldProps } from "@/components/form/radio-field";
import { SortableField, type SortableFieldProps } from "@/components/form/sortable-field";
import { TextareaField, type TextareaFieldProps } from "@/components/form/textarea-field";
import type { FieldType } from "@/components/form/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FieldGroup, FieldSeparator } from "@/components/ui/field";
import { Item, ItemContent, ItemGroup, ItemTitle } from "@/components/ui/item";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { cn } from "@/lib/utils";
import { defaultSurveyValues, type SurveyValues, survey, zSurveyValues } from "./index.utils";

// MAIN ------------------------------------------------------------------------------------------------------------------------------------
export function SurveyForm() {
  const { control, formState, handleSubmit } = useForm<SurveyValues>({
    mode: "onTouched",
    resolver: zodResolver(zSurveyValues),
    defaultValues: defaultSurveyValues,
  });

  const { isSubmitting } = formState;

  const buttonRef = useRef<HTMLButtonElement | null>(null);

  async function onSubmit(data: SurveyValues) {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();

    console.log(data);

    await new Promise((resolve) => setTimeout(resolve, 1000));

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

  const sentences = [
    { id: 1, title: "Notre objectif numéro 1", description: "Créer une agence pensée pour vous simplifier la vie." },
    {
      id: 2,
      title: "Avec les outils d’aujourd’hui",
      description: " Notre ambition est de vous aider à vous concentrer sur l’essentiel: votre métier.",
    },
    {
      id: 3,
      title: "On s'occupe du reste!",
      description: "Votre communication, vos réseaux sociaux et la création de contenu qui vous ressemble.",
    },
  ];

  return (
    <form className="flex flex-col gap-7" onSubmit={handleSubmit(onSubmit)}>
      <Card className="relative z-10 gap-10">
        <CardHeader>
          <CardTitle className="text-center font-heading font-light text-2xl">
            Pour cela, on aimerait en savoir plus sur vos besoins à l'aide de ce sondage.
          </CardTitle>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            {survey.map((props, index) => (
              <Fragment key={props.name}>
                <SurveyField control={control} index={index + 1} {...props} />
                {index < survey.length - 1 && <FieldSeparator className="border-grid" />}
              </Fragment>
            ))}
          </FieldGroup>
          <CardFooter className="mt-10 flex-col items-start gap-4 p-0">
            <ItemGroup className="grid grid-cols-1 gap-4 text-center md:grid-cols-3">
              {sentences.map(({ description, id, title }, i) => (
                <Item className="items-start" key={id} variant="muted">
                  <ItemContent className="items-center text-base">
                    <ItemTitle
                      className={cn("font-heading font-light text-lg uppercase", i % 2 === 0 && "text-pink-400 dark:text-pink-400")}
                    >
                      {title}
                    </ItemTitle>
                    {description}
                  </ItemContent>
                </Item>
              ))}
            </ItemGroup>
          </CardFooter>
        </CardContent>
      </Card>
      <section className="relative">
        <Card className="relative z-10 py-14 lg:flex-row">
          <CardHeader className="flex-1">
            <CardTitle className="font-heading font-light text-3xl leading-none lg:text-balance">
              Prêt·e à rejoindre l'aventure ? Alors, partagez vos coordonnées et embarquez, vous aussi, dans la communauté !
            </CardTitle>
            <CardDescription className="font-normal text-xl lg:text-balance">
              Merci à vous de nous avoir consacré ce temps qu'on sait précieux. N’hésitez pas à partager ce sondage avec votre réseau de
              thérapeutes.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <FieldGroup className="flex-1 gap-4">
              <EmailField control={control} legend="E-mail" name="email" />
              <PhoneField control={control} legend="Téléphone (optionnel)" name="phone" />
              <Button ref={buttonRef} size="lg">
                <LoadingSwap className="inline-flex cursor-pointer items-center gap-2 font-heading text-2xl" isLoading={isSubmitting}>
                  <span className="icon-[roentgen--survey-point]" />
                  ENVOYER
                </LoadingSwap>
              </Button>
            </FieldGroup>
          </CardContent>
        </Card>
      </section>
      {/* <DevTool control={control} /> */}
    </form>
  );
}

// FIELD -----------------------------------------------------------------------------------------------------------------------------------
export function SurveyField<T extends FieldType, V extends FieldValues, N extends FieldPath<V>>(props: SurveyFieldProps<T, V, N>) {
  if (props.type === "checkbox") return <CheckboxesField {...props} />;
  if (props.type === "radio") return <RadioField {...props} />;
  if (props.type === "sortable") return <SortableField {...props} />;
  if (props.type === "textarea") return <TextareaField {...props} />;
  return null;
}
type SurveyFieldProps<T extends FieldType, V extends FieldValues, N extends FieldPath<V>> = T extends "checkbox"
  ? { type: T } & CheckboxesFieldProps<V, N>
  : T extends "radio"
    ? { type: T } & RadioFieldProps<V, N>
    : T extends "sortable"
      ? { type: T } & SortableFieldProps<V, N>
      : T extends "textarea"
        ? { type: T } & TextareaFieldProps<V, N>
        : never;

import { createFileRoute } from "@tanstack/react-router";
import { SurveyForm } from "./index.form";
import { Header, HeaderDescription, HeaderHeading } from "./index.header";

// ROUTE -----------------------------------------------------------------------------------------------------------------------------------
export const Route = createFileRoute("/")({ component: IndexPage });

// PAGE ------------------------------------------------------------------------------------------------------------------------------------
export function IndexPage() {
  const description = `Nous sommes trois thérapeutes et informaticiens, motivé·es par une idée simple : Vous libérer du temps pour votre cœur de métier en
        prenant en charge votre stratégie, votre communication et vos réseaux sociaux. Pour cela, on aimerait en savoir plus sur vos besoins
        à l'aide de ce sondage.`;
  const title = "Bienvenue sur SGS";

  return (
    <>
      <Header>
        <HeaderHeading className="max-w-4xl">{title}</HeaderHeading>
        <HeaderDescription>{description}</HeaderDescription>
      </Header>
      <SurveyForm />
    </>
  );
}

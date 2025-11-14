import { z } from "zod/mini";
import { zSurveyItem } from "@/components/form/utils";

// CONST -----------------------------------------------------------------------------------------------------------------------------------
const q1Items = ["instagram", "facebook", "linkedIn", "tiktok", "youtube", "autre"] as const;
const q2Items = ["oui", "peu", "non"] as const;
// const q3Items = ["boucheAOreille", "reseauxSociaux", "siteInternet", "plateformes", "publicite"] as const;
// const q4Items = [
//   "manqueTemps",
//   "manqueInspiration",
//   "manqueTechnique",
//   "peurIllegitimite",
//   "peurDeontologie",
//   "manqueCodes",
//   "concentrationMetier",
//   "peurVisibilite",
//   "inutilite",
//   "autre",
// ] as const;
const q5Items = [
  "perteAuthenticite",
  "informationsInexactes",
  "deshumanisation",
  "deontologie",
  "perteControleImage",
  "generationIA",
  "complexite",
  "cout",
  "securite",
  "autre",
] as const;
const q6Items = ["tresProblematique", "plutotProblematique", "neutre", "plutotOk", "totalementOk"] as const;
const q10Items = ["oui", "peutEtre"] as const;

export const survey = [
  {
    name: "q1",
    legend: "1 - Sur quels réseaux sociaux êtes-vous actuellement présent·e pour votre activité professionnelle ?",
    description: "(Aucune ou plusieurs réponses possibles)",
    type: "checkbox",
    items: [
      { id: "instagram", label: "Instagram" },
      { id: "facebook", label: "Facebook" },
      { id: "linkedIn", label: "LinkedIn" },
      { id: "tiktok", label: "TikTok" },
      { id: "youtube", label: "Youtube" },
      // { id: "none", label: "Aucun réseau social" },
      { id: "autre", label: "Autre (veuillez préciser)" },
    ],
  },
  {
    name: "q2",
    legend: "2 - Estimez-vous qu'être présent·e sur les réseaux sociaux vous permette d’obtenir de nouveaux patients/clients ?",
    type: "radio",
    items: [
      { id: "oui", label: "Oui, significativement" },
      { id: "peu", label: "Oui, mais très peu" },
      { id: "non", label: "Non, aucun impact mesurable" },
    ],
  },
  {
    name: "q3",
    legend: "3 - Quelle est la meilleure façon, selon vous, d’acquérir des patients/clients ?",
    type: "sortable",
    items: [
      { id: "boucheAOreille", label: "Le bouche-à-oreille" },
      { id: "reseauxSociaux", label: "Les réseaux sociaux" },
      { id: "siteInternet", label: "Un site internet" },
      { id: "plateformes", label: "Des plateformes de réservation (Resalib, Medoucine, etc...)" },
      { id: "publicite", label: "La publicité (physique ou digitale)" },
      { id: "autre", label: "Autre (veuillez préciser)" },
    ],
  },
  {
    name: "q4",
    legend: "4 - Si vous ne publiez pas sur les réseaux sociaux, qu'est-ce qui vous en empêche principalement ?",
    type: "sortable",
    items: [
      { id: "manqueTemps", label: "Je manque de temps" },
      { id: "manqueInspiration", label: "Je manque d'inspiration / ne sais pas quoi publier" },
      { id: "manqueTechnique", label: "Je manque de compétences techniques (création graphique, montage vidéo)" },
      { id: "peurIllegitimite", label: "J'ai peur de ne pas être légitime ou d'être jugé·e" },
      { id: "peurDeontologie", label: "J'ai des doutes sur la déontologie et les règles de communication de ma profession" },
      { id: "manqueCodes", label: "Je ne maîtrise pas les codes des réseaux sociaux" },
      { id: "concentrationMetier", label: "Je préfère me concentrer sur mes consultations" },
      { id: "peurVisibilite", label: "Je n'aime pas être visible sur les réseaux sociaux" },
      { id: "inutilite", label: "Je ne pense pas que ce soit utile pour mon activité" },
      { id: "autre", label: "Autre (veuillez préciser)" },
    ],
  },
  {
    name: "q5",
    legend: "5 - Quelles seraient vos principales préoccupations concernant l'utilisation d'une I.A. pour votre communication ?",
    description: "(Une à plusieurs réponses possibles)",
    type: "checkbox",
    items: [
      { id: "perteAuthenticite", label: "La perte d'authenticité / Le contenu qui ne me ressemble pas" },
      { id: "informationsInexactes", label: "Des informations inexactes" },
      { id: "deshumanisation", label: "La déshumanisation de ma relation avec mes patients/clients" },
      { id: "deontologie", label: "Le non-respect de la déontologie de ma profession" },
      { id: "perteControleImage", label: "La perte de contrôle sur mon image professionnelle" },
      { id: "generationIA", label: "Le fait que mes patients/clients découvrent que la génération est faite par une I.A." },
      { id: "complexite", label: "La complexité technique de l'outil" },
      { id: "cout", label: "Le coût de la solution" },
      { id: "securite", label: "La sécurité et la confidentialité des données" },
      { id: "autre", label: "Autre (veuillez préciser)" },
    ],
  },
  {
    name: "q6",
    legend:
      "6 - A quel point êtes-vous à l'aise avec l'idée qu'une Intelligence Artificielle (I.A.) génère du contenu professionnel pour vous ?",
    type: "radio",
    items: [
      { id: "tresProblematique", label: "Très mal à l'aise" },
      { id: "plutotProblematique", label: "Plutôt réticent·e" },
      { id: "neutre", label: "Neutre / Mitigé·e" },
      { id: "plutotOk", label: "Plutôt à l'aise" },
      { id: "totalementOk", label: "Totalement à l'aise" },
    ],
  },
  {
    name: "q7",
    legend: "7 - Si vous pouviez décrire l'outil idéal pour gérer votre communication sur les réseaux sociaux, quel serait-il ?",
    type: "textarea",
  },
  {
    name: "q8",
    legend: "8 - Quel serait le bénéfice n°1 que vous attendriez d'un tel outil ?",
    type: "textarea",
  },
  {
    name: "q9",
    legend: "9 - Avant de nous laisser, on aimerait en savoir un peu plus sur vous, en quelques lignes :",
    description: "(Exemple : je m'appelle Céline. Je suis sophrologue depuis 5 ans...)",
    type: "textarea",
  },
  {
    name: "q10",
    legend: "10 - Prêt·e à rejoindre l'aventure pour nous aider à développer cette solution ?",
    type: "radio",
    items: [
      { id: "oui", label: "Oui" },
      { id: "peutEtre", label: "Peut-être, j'aimerais en savoir plus" },
    ],
  },
] as const;

// SCHEMAS ---------------------------------------------------------------------------------------------------------------------------------
export const zSurveyValues = z.object({
  q1: z
    .object({ items: z.array(z.enum(q1Items)), other: z.string() })
    .check(
      z.refine(
        ({ items, other }) => !items.includes("autre") || (items.includes("autre") && other.length > 0),
        "'Autre' n'est pas précisé."
      )
    ),
  q2: z.string().check(z.minLength(1, "Cette question nécessite une réponse.")),
  q3: z.array(zSurveyItem).check(z.minLength(survey[2].items.length)),
  q4: z.array(zSurveyItem).check(z.minLength(survey[3].items.length)),
  q5: z
    .object({
      items: z.array(z.enum(q5Items)),
      other: z.string(),
    })
    .check(
      z.refine(({ items }) => items.length > 0, "Cette question nécessite au moins une réponse."),
      z.refine(
        ({ items, other }) => !items.includes("autre") || (items.includes("autre") && other.length > 0),
        "'Autre' n'est pas précisé."
      )
    ),
  q6: z.string().check(z.minLength(1, "Cette question nécessite une réponse.")),
  q7: z.string().check(z.minLength(1, "Cette question nécessite une réponse.")),
  q8: z.string().check(z.minLength(1, "Cette question nécessite une réponse.")),
  q9: z.string().check(z.minLength(1, "Cette question nécessite une réponse.")),
  q10: z.string().check(z.minLength(1, "Cette question nécessite une réponse.")),
  email: z.email("L'email indiqué n'est pas valide."),
  phone: z.optional(z.string()),
});

export const zSurvey = z.object({
  q1: z.object({ items: z.array(z.enum(q1Items)), other: z.string() }),
  q2: z.enum(q2Items, "Cette question nécessite une réponse."),
  q3: z.array(zSurveyItem).check(z.minLength(survey[2].items.length)),
  q4: z.array(zSurveyItem).check(z.minLength(survey[3].items.length)),
  q5: z.object({
    items: z.array(z.enum(q5Items)).check(z.minLength(1, "Cette question nécessite au moins 1 réponse.")),
    other: z.string(),
  }),
  q6: z.enum(q6Items, "Cette question nécessite une réponse."),
  q7: z.string().check(z.minLength(1, "Cette question nécessite une réponse.")),
  q8: z.string().check(z.minLength(1, "Cette question nécessite une réponse.")),
  q9: z.string().check(z.minLength(1, "Cette question nécessite une réponse.")),
  q10: z.enum(q10Items, "Cette question nécessite au moins 1 réponse."),
  email: z.email("L'email indiqué n'est pas valide."),
  phone: z.optional(z.string()),
});

export const defaultSurveyValues: SurveyValues = {
  q1: { items: [], other: "" },
  q2: "",
  q3: [...survey[2].items],
  q4: [...survey[3].items],
  q5: { items: [], other: "" },
  q6: "",
  q7: "",
  q8: "",
  q9: "",
  q10: "",
  email: "",
  phone: "",
};

// TYPES -----------------------------------------------------------------------------------------------------------------------------------
export type Survey = z.infer<typeof zSurvey>;
export type SurveyValues = z.infer<typeof zSurveyValues>;

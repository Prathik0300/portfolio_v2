import type { Project } from "../types";

export const ensogrow: Project = {
  slug: "ensogrow-ai-garden-companion",
  file: "ensogrow",
  name: "EnsoGrow",
  blurb: "A gardening app that diagnoses sick plants from a photo. Built with a team at WildHacks 2025.",
  description:
    "EnsoGrow, built by a team at WildHacks 2025: a gardening PWA that suggests plants for your space, diagnoses sick ones from a photo with Gemini, and sends care reminders.",
  date: "2025-04",
  dateLabel: "Apr 2025",
  where: "WildHacks 2025 (hackathon, team project)",
  role: "Team member",
  glance: {
    problem: "Gardening apps ignore your space, light and time, so beginners give up when the advice feels generic.",
    built: "A PWA that matches plants to your space, diagnoses a sick plant from a photo with Gemini, and sends care reminders.",
    result: "A working prototype built over the hackathon and still live on Vercel.",
  },
  stack: ["Next.js", "React", "Tailwind CSS", "Gemini API", "Computer vision", "AWS"],
  links: [
    { label: "github", url: "https://github.com/Prathik0300/ensogrow-fe" },
    { label: "live demo", url: "https://ensogrow-fe.vercel.app/login" },
  ],
  sections: [
    {
      title: "The problem",
      blocks: [
        {
          type: "p",
          text: "Most gardening apps ignore local constraints like space, light and time, and they overlook organic-first care. Beginners get confusing advice, lose a crop, get little feedback, and give up.",
        },
        {
          type: "p",
          text: "We built EnsoGrow at WildHacks 2025 as a coach rather than a manual, so it gives short steps instead of long instructions. It is aimed at people growing food at home: urban growers, students and busy professionals.",
        },
      ],
    },
    {
      title: "What it does",
      blocks: [
        {
          type: "list",
          items: [
            "Plant matchmaker: suggests plants that fit your space, your sunlight and the time you have.",
            "Plant doctor: take a photo of a sick plant and get a diagnosis with organic treatment tips.",
            "Care reminders, based on the growth stage, the weather and your schedule.",
            "A growth tracker with a timeline and milestone badges, to keep you going.",
            "A local community for things like compost pickups, seed swaps and tips.",
            "A chatbot for gardening questions.",
          ],
        },
      ],
    },
    {
      title: "Flows",
      subtitle: "How a person moves through the app, and what each task involves",
      blocks: [
        {
          type: "p",
          text: "The user flow follows one person through sign-in, setup, plant picks, the dashboard and the plant doctor, including what happens when a step fails. The task flow breaks each task down on its own. Both are large, so click to zoom.",
        },
        {
          type: "figure",
          kind: "diagram",
          src: "/img/ensogrow/user-flow-ensogrow.webp",
          alt: "EnsoGrow user flow in three lanes: the user, the front end, and Gemini, from landing page through onboarding, recommendations, dashboard and plant doctor",
          width: 1600,
          height: 665,
          caption: "User flow across the user, the front end and Gemini.",
        },
        {
          type: "figure",
          kind: "diagram",
          src: "/img/ensogrow/task-flow-ensogrow.webp",
          alt: "EnsoGrow task flow showing sign-in, onboarding, browsing plants, updating plant health and the plant doctor diagnosis",
          width: 1600,
          height: 499,
          caption: "Task flow: sign-in, onboarding, browsing, plant health and diagnosis.",
        },
      ],
    },
    {
      title: "Not done yet",
      blocks: [
        {
          type: "list",
          items: [
            "Testing with more growers across different climates and living spaces.",
            "A better vision model, trained on more labeled plant-disease data.",
            "A deeper community side, such as seed swaps, compost pickups and expert office hours.",
          ],
        },
      ],
    },
  ],
};

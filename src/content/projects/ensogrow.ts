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
  stack: ["Next.js", "React", "Tailwind CSS", "Gemini API", "Computer vision", "AWS"],
  links: [
    { label: "github", url: "https://github.com/Prathik0300/ensogrow-fe" },
    { label: "live demo", url: "https://ensogrow-fe.vercel.app/login" },
  ],
  sections: [
    {
      title: "What it is",
      blocks: [
        {
          type: "p",
          text: "A small progressive web app for people who want to grow food at home, built by a team at WildHacks 2025. We wanted it to feel like a coach rather than a manual, so it gives short steps instead of long instructions.",
        },
      ],
    },
    {
      title: "What it does",
      blocks: [
        {
          type: "list",
          items: [
            "Suggests plants that fit your space, your sunlight and the time you have.",
            "Plant doctor: take a photo of a sick plant and get a diagnosis with organic treatment tips.",
            "Care reminders based on the growth stage, the weather and your schedule.",
            "A growth timeline with milestones.",
            "A local community for things like seed swaps and compost pickups.",
            "A chatbot for gardening questions.",
          ],
        },
        { type: "figure", src: "/img/ensogrow/user-flow-ensogrow.webp", alt: "EnsoGrow user flow diagram", width: 1600, height: 665, caption: "User flow." },
        { type: "figure", src: "/img/ensogrow/task-flow-ensogrow.webp", alt: "EnsoGrow task flow diagram", width: 1600, height: 499, caption: "Task flow." },
      ],
    },
  ],
};

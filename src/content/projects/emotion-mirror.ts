import type { Project } from "../types";

export const emotionMirror: Project = {
  slug: "virtual-emotion-mirror",
  file: "emotion-mirror",
  name: "Virtual Emotion Mirror",
  blurb: "Reads your facial expression in the browser and suggests music and movies to match.",
  description:
    "A solo project: facial emotion detection in the browser, classification in a Python service, and music and movie suggestions plus a mood history. React, NestJS, TensorFlow.",
  date: "2025-03",
  dateLabel: "Jan – Mar 2025",
  where: "Solo project",
  stack: ["React", "NestJS", "Python", "TensorFlow", "MongoDB", "Spotify API", "IMDB API"],
  links: [
    { label: "github", url: "https://github.com/Prathik0300/Virtual_Emotion_Mirror" },
    { label: "live demo", url: "https://vem-prathik0300s-projects.vercel.app/" },
  ],
  sections: [
    {
      title: "What it is",
      blocks: [
        {
          type: "p",
          text: "A web app that reads your facial expression through the webcam, works out your mood, and suggests music and movies that fit it. It also keeps a history, so you can see how your mood moves over days, weeks and months.",
        },
      ],
    },
    {
      title: "How it works",
      blocks: [
        {
          type: "list",
          items: [
            "Face detection runs in the browser, which cuts latency and load on the server.",
            "A Python service with TensorFlow classifies the expression as happy, sad, angry, surprised or neutral. Predictions are averaged over a short window so one noisy frame doesn't flip the result.",
            "NestJS sits in the middle and talks to the Python service, MongoDB, and the Spotify and IMDB APIs.",
            "Suggestions follow the mood: calmer or more uplifting music for stress or sadness, higher energy for happiness, and movies filtered by genre.",
            "MongoDB stores timestamped predictions, which feed the mood history charts.",
          ],
        },
        { type: "figure", src: "/img/vem/vem-system-architecture.webp", alt: "System architecture: React app, NestJS gateway, Python inference service, Spotify and IMDB connectors, MongoDB", width: 1307, height: 736, caption: "System architecture." },
        { type: "figure", src: "/img/vem/emotion-recognition-pipeline.webp", alt: "Emotion recognition pipeline from video stream to face detection, features, classification and smoothing", width: 1339, height: 636, caption: "From video frame to a stable emotion." },
        { type: "figure", src: "/img/vem/sequence-diagram.webp", alt: "Sequence diagram from login through face capture, emotion detection and recommendations", width: 1600, height: 2031, caption: "One session, end to end." },
        { type: "figure", src: "/img/vem/vem.webp", alt: "The dashboard on a laptop and a phone, with mood charts and recommendations", width: 1280, height: 800, caption: "The dashboard." },
      ],
    },
    {
      title: "Not done yet",
      blocks: [{ type: "p", text: "Voice alongside the face, and running the model on the device." }],
    },
  ],
};

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
  role: "Solo: design and build",
  glance: {
    problem: "Recommendations lean on likes and history, so they miss how you feel right now.",
    built: "A web app that reads your expression from the webcam, classifies it in a Python service, and suggests music and movies to match, with a mood history over time.",
    result: "A working end-to-end app, live on Vercel, with suggestions that follow your mood as it changes.",
  },
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
        {
          type: "p",
          text: "I wanted to see whether an expression could act as an implicit signal for personalization, and what a mood history would be like to look at.",
        },
      ],
    },
    {
      title: "Architecture",
      subtitle: "Face detection in the browser, classification on the server",
      blocks: [
        {
          type: "list",
          items: [
            "Frontend: React with the webcam and a lightweight face detector that runs in the browser, so no video leaves the page and the server is not busy with detection.",
            "Backend: a NestJS API gateway that handles login and talks to everything else, and a Python service with TensorFlow that classifies the expression.",
            "Data: MongoDB, which stores timestamped predictions for the mood history.",
          ],
        },
        {
          type: "figure",
          kind: "diagram",
          src: "/img/diagrams/vem-architecture.svg",
          alt: "System architecture: React app, NestJS gateway, Python inference service, Spotify and IMDB connectors, MongoDB",
          width: 1000,
          height: 540,
          caption: "System architecture.",
        },
        { type: "callout", text: "Splitting detection (browser) from classification (server) keeps latency low while the model stays easy to swap." },
      ],
    },
    {
      title: "Emotion pipeline",
      subtitle: "From a video frame to a stable mood",
      blocks: [
        {
          type: "steps",
          items: [
            "The browser detects the face in the live video.",
            "Facial landmarks and expression features are extracted from the frame.",
            "The TensorFlow model classifies it as happy, sad, angry, surprised or neutral, with a confidence score.",
            "Predictions are averaged over a short window, so one noisy frame does not flip the result.",
          ],
        },
        {
          type: "figure",
          kind: "diagram",
          src: "/img/diagrams/vem-pipeline.svg",
          alt: "Emotion recognition pipeline from video stream to face detection, features, classification and smoothing",
          width: 1000,
          height: 495,
          caption: "From video frame to a stable emotion.",
        },
      ],
    },
    {
      title: "Suggestions",
      subtitle: "Mapping a mood to music and movies",
      blocks: [
        {
          type: "p",
          text: "The mood picks the content. Calmer or more uplifting music for stress or sadness, higher energy for happiness, and movies filtered by genre to match. Suggestions update as your mood changes, and results from Spotify and IMDB are cached so they load quickly.",
        },
        {
          type: "figure",
          kind: "diagram",
          src: "/img/diagrams/vem-sequence.svg",
          alt: "Sequence diagram from login through face capture, emotion detection and recommendations",
          width: 1146,
          height: 1376,
          caption: "One session, end to end: login, face capture, emotion detection, genre mapping, Spotify and IMDB, and the feedback loop.",
        },
      ],
    },
    {
      title: "Mood history",
      blocks: [
        {
          type: "p",
          text: "Each prediction is stored with a timestamp. The dashboard turns those into daily, weekly and monthly charts, so recurring patterns, mood cycles and stressful stretches are easy to spot.",
        },
      ],
    },
    {
      title: "Not done yet",
      blocks: [
        {
          type: "list",
          items: [
            "Voice alongside the face, for a second signal.",
            "Running the model on the device instead of the server.",
            "Themes in the UI that follow your mood.",
            "More careful pattern detection in the history.",
          ],
        },
      ],
    },
  ],
};

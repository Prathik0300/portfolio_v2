import type { ProjectItem } from "../types";

export const emotionMirror: ProjectItem = {
  name: "Virtual Emotion Mirror",
  slug: "virtual-emotion-mirror",
  blurb:
    "Real-time facial emotion inference in the browser \u2014 client-side detection, server-side classification, MongoDB trend analytics.",
  badge: "Solo \u00b7 live demo",
  badgeTone: "faint",
  description:
    "An AI-driven facial emotion recognition system that analyzes real-time expressions to recommend personalized content and surface long-term emotional trends.",
  techStack: [
    "React.js",
    "NestJS",
    "Python",
    "TensorFlow",
    "MongoDB",
    "Computer Vision",
    "Deep Learning",
    "REST APIs",
  ],
  detailSubtitle: "AI-Driven Facial Emotion Recognition & Personalized Content System",
  detailDateRange: "Jan 2025 - Mar 2025",
  detailAssociation: "Solo Project",
  detailTechStack:
    "React.js · NestJS (Node.js) · Python · TensorFlow · MongoDB · Computer Vision · Deep Learning · REST APIs",
  detailOverview:
    "An AI-powered emotion intelligence platform that detects facial expressions in real time and personalizes content (movies, music) based on emotional state. Hybrid architecture: client-side face detection, server-side emotion classification, MongoDB analytics. Provides both real-time recommendations and long-term emotional insights.",
  detailProblem:
    "Traditional recommendations rely on explicit actions (likes, history) and miss emotional context. Real-time emotion recognition can act as an implicit signal for better personalization and self-awareness.",
  detailMotivation:
    "Explore how facial emotion recognition enables emotion-aware personalization and how emotional data can provide self-awareness insights over time.",
  detailSolution:
    "Hybrid architecture: React frontend performs face detection, Python backend classifies emotions (Happy, Sad, Angry, Surprised, Neutral), NestJS orchestrates. Maps emotions to content recommendations and tracks patterns over time for analytics.",
  detailSolutionPoints: [
    "Hybrid Architecture – Client-side face detection reduces latency; server-side emotion classification ensures accuracy. NestJS orchestrates, Python handles inference.",
    "Real-Time Emotion Pipeline – Face detection → feature extraction → emotion classification (5 emotions) → temporal smoothing for stable predictions.",
    "Personalized Recommendations – Maps emotions to content: calm/uplifting music for stress/sadness, high-energy for happiness. Movies filtered by emotional compatibility.",
    "Emotional Analytics – Tracks patterns over days/weeks/months, identifies mood cycles and stress trends for self-awareness insights.",
    "Scalable Design – Modular services enable independent scaling of frontend, inference, and data storage.",
  ],
  detailDesignProcessSteps: [
    {
      id: "system-architecture",
      title: "System Architecture",
      subtitle: "Hybrid, low-latency design",
      images: [
        {
          src: "/img/vem/vem-system-architecture.webp",
          width: 1307,
          height: 736,
          alt: "Virtual Emotion Mirror system architecture diagram showing Frontend (React App, Webcam Integration, Emotion Dashboard), Backend (NestJS API Gateway, Python Inference Service, Spotify API Connector, IMDB API Connector), and Data Layer (MongoDB)",
        },
      ],
      paragraphs: [
        "Three-layer architecture: React frontend for client-side face detection, NestJS backend for orchestration, Python service for emotion classification, MongoDB for data persistence. Offloading face detection to client reduces backend load and latency.",
      ],
      bullets: [
        "Frontend: React.js with webcam integration, lightweight browser-based face detection",
        "Backend: NestJS API gateway, Python deep learning service for emotion classification",
        "Data: MongoDB for timestamped predictions, patterns, and trends",
      ],
      summary:
        "Hybrid architecture balances real-time performance and scalability. Modular design enables independent optimization and scaling of each component.",
    },
    {
      id: "emotion-pipeline",
      title: "Emotion Recognition Pipeline",
      subtitle: "Real-time detection system",
      images: [
        {
          src: "/img/vem/emotion-recognition-pipeline.webp",
          width: 1339,
          height: 636,
          alt: "Virtual Emotion Mirror emotion recognition pipeline diagram showing the flow from video stream through face detection, feature extraction, emotion classification, temporal smoothing, to personalization and recommendations",
        },
      ],
      paragraphs: [
        "Four-stage pipeline: face detection → feature extraction → emotion classification (Happy, Sad, Angry, Surprised, Neutral) → temporal smoothing. Processes live video frames with probabilistic outputs and confidence scores. Temporal smoothing prevents abrupt changes from noisy frames.",
      ],
      bullets: [
        "Face detection via browser webcam APIs",
        "Feature extraction: facial landmarks and expression features",
        "Emotion classification: TensorFlow models with confidence scores",
        "Temporal smoothing: averages predictions across time windows",
      ],
      summary:
        "Pipeline enables real-time emotion detection with stable predictions. Probabilistic outputs support confidence-based personalization.",
    },
    {
      id: "recommendation-engine",
      title: "Recommendation Engine",
      subtitle: "Emotion-to-content mapping",
      images: [
        {
          src: "/img/vem/sequence-diagram.webp",
          width: 1600,
          height: 2031,
          alt: "Virtual Emotion Mirror sequence diagram showing the data flow from user login through face capture, emotion detection, genre mapping, API integration with Spotify and IMDB, to personalized recommendations with feedback loop",
        },
      ],
      paragraphs: [
        "Maps detected emotions to content suggestions. Music: calm/uplifting for stress/sadness, high-energy for happiness. Movies: genre filtering by emotional compatibility. Updates in real time as emotional state changes via feedback loop.",
      ],
      bullets: [
        "Emotion-to-content mapping for music and movies",
        "Real-time updates as emotional state changes",
        "Integration with Spotify and IMDB APIs",
        "Caching and optimization for fast retrieval",
      ],
      summary:
        "Engine creates adaptive recommendations that respond to current emotional state, not just historical behavior. Feedback loop keeps content relevant to user's mood.",
    },
    {
      id: "analytics-insights",
      title: "Emotional Analytics",
      subtitle: "Long-term emotional intelligence",
      paragraphs: [
        "Transforms raw emotion data into insights. Tracks distribution over days/weeks/months, identifies recurring patterns, mood cycles, and stress trends. Dashboard visualizes trends for self-awareness and well-being reflection.",
      ],
      bullets: [
        "Tracks emotional distribution over time",
        "Identifies recurring patterns and mood cycles",
        "Visualization dashboard for trends and insights",
        "Privacy-preserving aggregation",
      ],
      summary:
        "Analytics layer provides long-term value beyond real-time recommendations, enabling users to understand emotional patterns and reflect on well-being.",
    },
    {
      id: "implementation",
      title: "Implementation",
      subtitle: "Production-ready system",
      images: [
        {
          src: "/img/vem/vem.webp",
          width: 1280,
          height: 800,
          alt: "Virtual Emotion Mirror dashboard interface showing laptop and smartphone views with emotion analytics dashboard, daily/weekly/monthly charts, and personalized movie and music recommendations",
        },
      ],
      paragraphs: [
        "React frontend, NestJS backend, Python inference service, MongoDB data layer. Key solutions: client-side preprocessing, batched inference requests, temporal smoothing, modular architecture. Achieves real-time performance with minimal latency and scalable design.",
      ],
      bullets: [
        "Frontend: React.js with webcam integration, browser-based face detection",
        "Backend: NestJS API with authentication and orchestration",
        "Inference: Python TensorFlow models for emotion classification",
        "Data: MongoDB for predictions, patterns, and trends",
      ],
      summary:
        "Production-ready system with real-time emotion detection, accurate predictions, and scalable architecture. Modular design enables independent optimization and scaling.",
    },
  ],
  detailHighlights: [
    "Real-Time Detection – Live facial expression analysis with minimal latency",
    "Hybrid Architecture – Client-side preprocessing, server-side inference for performance and scalability",
    "Personalized Recommendations – Music and movies adapt to emotional state in real time",
    "Emotional Analytics – Tracks patterns, mood cycles, and stress trends for self-awareness",
    "Temporal Smoothing – Stable predictions by averaging across time windows",
  ],
  detailReflectionOutcomes:
    "Successfully built a production-ready hybrid AI architecture integrating deep learning into real-time web apps. Demonstrated real-time emotion detection with personalized recommendations and long-term insights. Explored ethical and technical considerations of emotion-based systems, validating feasibility of emotion-aware applications.",
  detailReflectionMoreTime:
    "Future: multi-modal detection (voice + facial), on-device inference for privacy, emotion-aware UI themes, advanced analytics dashboards with sophisticated pattern recognition.",
  detailLinks: [
    {
      label: "GitHub",
      url: "https://github.com/Prathik0300/Virtual_Emotion_Mirror",
      icon: "github",
    },
    {
      label: "Website",
      url: "https://vem-prathik0300s-projects.vercel.app/",
      icon: "website",
    },
  ],
};

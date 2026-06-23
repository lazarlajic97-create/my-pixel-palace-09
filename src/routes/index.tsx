import { createFileRoute } from "@tanstack/react-router";
import raw from "../screens/7.html?raw";
import { Screen } from "../components/Screen";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SoVoice – Automatisierte Terminplanung" },
      {
        name: "description",
        content:
          "KI-gestützte Terminplanung für moderne Teams. Weniger E-Mails, mehr Fokus.",
      },
      { property: "og:title", content: "SoVoice – Automatisierte Terminplanung" },
      {
        property: "og:description",
        content:
          "KI-gestützte Terminplanung für moderne Teams. Weniger E-Mails, mehr Fokus.",
      },
    ],
  }),
  component: () => <Screen html={raw} />,
});

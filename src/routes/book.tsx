import { createFileRoute } from "@tanstack/react-router";
import raw from "../screens/8.html?raw";
import { Screen } from "../components/Screen";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Termin wählen – SoVoice" },
      { name: "description", content: "Wählen Sie einen passenden Termin für Ihre Strategie Consultation." },
      { property: "og:title", content: "Termin wählen – SoVoice" },
      { property: "og:description", content: "Wählen Sie einen passenden Termin für Ihre Strategie Consultation." },
    ],
  }),
  component: () => <Screen html={raw} />,
});

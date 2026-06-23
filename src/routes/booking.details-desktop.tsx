import { createFileRoute } from "@tanstack/react-router";
import raw from "../screens/5.html?raw";
import { Screen } from "../components/Screen";

export const Route = createFileRoute("/booking/details-desktop")({
  head: () => ({
    meta: [
      { title: "Termin Details – SoVoice" },
      { name: "description", content: "Geben Sie Ihre Details für den Termin ein." },
      { property: "og:title", content: "Termin Details – SoVoice" },
      { property: "og:description", content: "Geben Sie Ihre Details für den Termin ein." },
    ],
  }),
  component: () => <Screen html={raw} />,
});

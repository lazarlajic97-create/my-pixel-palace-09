import { createFileRoute } from "@tanstack/react-router";
import raw from "../screens/9.html?raw";
import { Screen } from "../components/Screen";

export const Route = createFileRoute("/manage")({
  head: () => ({
    meta: [
      { title: "Termin verwalten – SoVoice" },
      { name: "description", content: "Verschieben oder stornieren Sie Ihren Termin." },
      { property: "og:title", content: "Termin verwalten – SoVoice" },
      { property: "og:description", content: "Verschieben oder stornieren Sie Ihren Termin." },
    ],
  }),
  component: () => <Screen html={raw} />,
});

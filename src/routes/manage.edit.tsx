import { createFileRoute } from "@tanstack/react-router";
import raw from "../screens/1.html?raw";
import { Screen } from "../components/Screen";

export const Route = createFileRoute("/manage/edit")({
  head: () => ({
    meta: [
      { title: "Termin bearbeiten – SoVoice" },
      { name: "description", content: "Termin verschieben oder stornieren." },
      { property: "og:title", content: "Termin bearbeiten – SoVoice" },
      { property: "og:description", content: "Termin verschieben oder stornieren." },
    ],
  }),
  component: () => <Screen html={raw} />,
});

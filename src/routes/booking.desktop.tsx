import { createFileRoute } from "@tanstack/react-router";
import raw from "../screens/13.html?raw";
import { Screen } from "../components/Screen";

export const Route = createFileRoute("/booking/desktop")({
  head: () => ({
    meta: [
      { title: "Termin buchen – SoVoice" },
      { name: "description", content: "Buchen Sie einen Demo Call mit dem SoVoice Team." },
      { property: "og:title", content: "Termin buchen – SoVoice" },
      { property: "og:description", content: "Buchen Sie einen Demo Call mit dem SoVoice Team." },
    ],
  }),
  component: () => <Screen html={raw} />,
});

import { createFileRoute } from "@tanstack/react-router";
import raw from "../screens/6.html?raw";
import { Screen } from "../components/Screen";

export const Route = createFileRoute("/booking/confirmed-desktop")({
  head: () => ({
    meta: [
      { title: "Termin bestätigt – SoVoice" },
      { name: "description", content: "Ihr Termin wurde bestätigt." },
      { property: "og:title", content: "Termin bestätigt – SoVoice" },
      { property: "og:description", content: "Ihr Termin wurde bestätigt." },
    ],
  }),
  component: () => <Screen html={raw} />,
});

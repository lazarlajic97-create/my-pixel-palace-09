import { createFileRoute } from "@tanstack/react-router";
import raw from "../screens/10.html?raw";
import { Screen } from "../components/Screen";

export const Route = createFileRoute("/book/confirmed")({
  head: () => ({
    meta: [
      { title: "Terminbestätigung – SoVoice" },
      { name: "description", content: "Ihr Termin wurde erfolgreich gebucht." },
      { property: "og:title", content: "Terminbestätigung – SoVoice" },
      { property: "og:description", content: "Ihr Termin wurde erfolgreich gebucht." },
    ],
  }),
  component: () => <Screen html={raw} />,
});

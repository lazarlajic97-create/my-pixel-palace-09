import { createFileRoute } from "@tanstack/react-router";
import raw from "../screens/11.html?raw";
import { Screen } from "../components/Screen";

export const Route = createFileRoute("/book/details")({
  head: () => ({
    meta: [
      { title: "Buchungsdetails – SoVoice" },
      { name: "description", content: "Schritt 2: Geben Sie Ihre Kontaktdaten ein." },
      { property: "og:title", content: "Buchungsdetails – SoVoice" },
      { property: "og:description", content: "Schritt 2: Geben Sie Ihre Kontaktdaten ein." },
    ],
  }),
  component: () => <Screen html={raw} />,
});

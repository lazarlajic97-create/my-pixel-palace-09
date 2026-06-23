import { createFileRoute } from "@tanstack/react-router";
import raw from "../screens/4.html?raw";
import { Screen } from "../components/Screen";

export const Route = createFileRoute("/admin/appointments")({
  head: () => ({
    meta: [
      { title: "Termine – SoVoice Admin" },
      { name: "description", content: "Alle Termine im Überblick." },
      { property: "og:title", content: "Termine – SoVoice Admin" },
      { property: "og:description", content: "Alle Termine im Überblick." },
    ],
  }),
  component: () => <Screen html={raw} />,
});

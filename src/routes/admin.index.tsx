import { createFileRoute } from "@tanstack/react-router";
import raw from "../screens/2.html?raw";
import { Screen } from "../components/Screen";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard – SoVoice" },
      { name: "description", content: "Überblick über Termine, Anrufe und Leads." },
      { property: "og:title", content: "Admin Dashboard – SoVoice" },
      { property: "og:description", content: "Überblick über Termine, Anrufe und Leads." },
    ],
  }),
  component: () => <Screen html={raw} />,
});

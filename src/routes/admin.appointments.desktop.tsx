import { createFileRoute } from "@tanstack/react-router";
import raw from "../screens/3.html?raw";
import { Screen } from "../components/Screen";

export const Route = createFileRoute("/admin/appointments/desktop")({
  head: () => ({
    meta: [
      { title: "Admin Termine (Desktop) – SoVoice" },
      { name: "description", content: "Desktop-Ansicht der Admin Termine." },
      { property: "og:title", content: "Admin Termine (Desktop) – SoVoice" },
      { property: "og:description", content: "Desktop-Ansicht der Admin Termine." },
    ],
  }),
  component: () => <Screen html={raw} />,
});

import { createFileRoute } from "@tanstack/react-router";
import raw from "../screens/12.html?raw";
import { Screen } from "../components/Screen";

export const Route = createFileRoute("/admin/mobile")({
  head: () => ({
    meta: [
      { title: "Admin (Mobile) – SoVoice" },
      { name: "description", content: "SoVoice Admin Dashboard für Mobile." },
      { property: "og:title", content: "Admin (Mobile) – SoVoice" },
      { property: "og:description", content: "SoVoice Admin Dashboard für Mobile." },
    ],
  }),
  component: () => <Screen html={raw} />,
});

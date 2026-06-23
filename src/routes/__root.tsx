import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Toaster } from "sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Seite nicht gefunden</h2>
        <p className="mt-2 text-sm text-[color:var(--color-text-muted)]">
          Die angeforderte Seite existiert nicht oder wurde verschoben.
        </p>
        <div className="mt-6">
          <Link to="/" className="btn-primary">Zur Startseite</Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">Diese Seite konnte nicht geladen werden</h1>
        <p className="mt-2 text-sm text-[color:var(--color-text-muted)]">
          Bitte versuche es erneut oder kehre zur Startseite zurück.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button onClick={() => { router.invalidate(); reset(); }} className="btn-primary">Erneut versuchen</button>
          <a href="/" className="btn-secondary">Zur Startseite</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "ndawsda" },
      { name: "description", content: "frewrqdfb" },
      { property: "og:title", content: "ndawsda" },
      { property: "og:description", content: "frewrqdfb" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "ndawsda" },
      { name: "twitter:description", content: "frewrqdfb" },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/963a600b-d306-4617-99c8-007ed99086de/id-preview-6ff57782--ef2bd4c5-cdfc-45b3-a9db-2ecc2c138c9e.lovable.app-1782178491197.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/963a600b-d306-4617-99c8-007ed99086de/id-preview-6ff57782--ef2bd4c5-cdfc-45b3-a9db-2ecc2c138c9e.lovable.app-1782178491197.png" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="de" className="dark">
      <head><HeadContent /></head>
      <body className="dark antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <Toaster theme="dark" position="top-right" richColors closeButton />
    </QueryClientProvider>
  );
}

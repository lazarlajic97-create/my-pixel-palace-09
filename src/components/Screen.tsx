import { useMemo } from "react";

/**
 * Renders a full-fidelity mockup HTML body in place. Strips inline <script>
 * tags so React can mount safely, and preserves all class names / images.
 */
export function Screen({ html, className }: { html: string; className?: string }) {
  const { body, bodyClass } = useMemo(() => parseHtml(html), [html]);
  return (
    <div
      className={className ?? "min-h-screen " + bodyClass}
      dangerouslySetInnerHTML={{ __html: body }}
    />
  );
}

function parseHtml(raw: string) {
  const bodyMatch = raw.match(/<body([^>]*)>([\s\S]*?)<\/body>/i);
  let body = bodyMatch ? bodyMatch[2] : raw;
  const attrs = bodyMatch ? bodyMatch[1] : "";
  const classMatch = attrs.match(/class="([^"]*)"/);
  const bodyClass = classMatch ? classMatch[1] : "";
  // Drop script blocks (Tailwind CDN, shader, etc.) — design system is local now.
  body = body.replace(/<script[\s\S]*?<\/script>/gi, "");
  // Drop noscript blocks.
  body = body.replace(/<noscript[\s\S]*?<\/noscript>/gi, "");
  return { body, bodyClass };
}

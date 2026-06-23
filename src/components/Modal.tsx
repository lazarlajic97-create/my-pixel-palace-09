import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md",
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: "sm" | "md" | "lg";
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;
  const widths = { sm: "max-w-sm", md: "max-w-lg", lg: "max-w-2xl" };

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center p-4 animate-fade-up">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose} />
      <div
        className={`relative w-full ${widths[size]} glass-strong rounded-2xl overflow-hidden shadow-2xl`}
        onClick={e => e.stopPropagation()}
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(96,165,250,0.5)] to-transparent" />
        <div className="flex items-start justify-between p-5 md:p-6 border-b border-[color:var(--color-border)]">
          <div className="min-w-0">
            <h3 className="font-semibold text-lg tracking-tight">{title}</h3>
            {description && (
              <p className="mt-1 text-xs text-[color:var(--color-text-muted)]">{description}</p>
            )}
          </div>
          <button onClick={onClose} className="btn-ghost p-1.5" aria-label="Schliessen">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="p-5 md:p-6 max-h-[70vh] overflow-y-auto">{children}</div>
        {footer && (
          <div className="px-5 md:px-6 py-4 border-t border-[color:var(--color-border)] bg-white/[0.02] flex flex-wrap gap-2 justify-end">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

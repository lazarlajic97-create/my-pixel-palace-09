import { Modal } from "./Modal";
import { AlertTriangle } from "lucide-react";

export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "Bestätigen",
  destructive,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  destructive?: boolean;
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      size="sm"
      footer={
        <>
          <button onClick={onClose} className="btn-secondary">Abbrechen</button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={destructive ? "btn-primary !bg-[#dc2626] hover:!bg-[#b91c1c]" : "btn-primary"}
          >
            {confirmLabel}
          </button>
        </>
      }
    >
      <div className="flex gap-3">
        {destructive && (
          <div className="h-9 w-9 shrink-0 rounded-lg bg-[rgba(248,113,113,0.12)] grid place-items-center">
            <AlertTriangle className="h-4 w-4 text-[#f87171]" />
          </div>
        )}
        <p className="text-sm text-[color:var(--color-text-muted)]">{message}</p>
      </div>
    </Modal>
  );
}

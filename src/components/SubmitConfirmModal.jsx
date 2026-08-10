import Modal from "./ui/Modal.jsx";
import Button from "./ui/Button.jsx";
import { AlertTriangle } from "lucide-react";

export default function SubmitConfirmModal({ open, onClose, onConfirm, isSubmitting, summary }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Submit exam?"
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={isSubmitting}>
            Keep reviewing
          </Button>
          <Button variant="danger" onClick={onConfirm} isLoading={isSubmitting}>
            Yes, submit now
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <p className="text-sm text-navy-700">
          Once submitted, you won't be able to change any answers. Here's a quick summary:
        </p>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="rounded-lg bg-green-50 border border-green-100 py-3">
            <p className="text-xl font-bold text-green-700">{summary.answered}</p>
            <p className="text-xs text-green-700/80">Answered</p>
          </div>
          <div className="rounded-lg bg-red-50 border border-red-100 py-3">
            <p className="text-xl font-bold text-red-600">{summary.notAnswered}</p>
            <p className="text-xs text-red-600/80">Not Answered</p>
          </div>
          <div className="rounded-lg bg-purple-50 border border-purple-100 py-3">
            <p className="text-xl font-bold text-purple-600">{summary.marked}</p>
            <p className="text-xs text-purple-600/80">Marked</p>
          </div>
        </div>
        {summary.notAnswered > 0 && (
          <div className="flex items-start gap-2 text-xs text-gold-700 bg-gold-50 border border-gold-200 rounded-lg px-3 py-2.5">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            You still have {summary.notAnswered} unanswered question{summary.notAnswered > 1 ? "s" : ""}.
          </div>
        )}
      </div>
    </Modal>
  );
}

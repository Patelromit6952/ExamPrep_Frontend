import { AlertTriangle } from "lucide-react";
import Modal from "./ui/Modal.jsx";
import Button from "./ui/Button.jsx";

export default function TabSwitchWarningModal({ open, onClose, warningCount, maxWarnings }) {
    const remaining = Math.max(0, maxWarnings - warningCount);

    return (
        <Modal
            open={open}
            onClose={onClose}
            title="Tab switch detected"
            footer={
                <Button variant="primary" onClick={onClose}>
                    I understand, continue exam
                </Button>
            }
        >
            <div className="space-y-3.5">
                <div className="flex items-start gap-3 rounded-lg bg-red-50 border border-red-200 px-4 py-3.5">
                    <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <div>
                        <p className="text-sm font-semibold text-red-700">
                            Warning {warningCount} of {maxWarnings}
                        </p>
                        <p className="text-sm text-red-700/90 mt-1 leading-relaxed">
                            Switching tabs, minimizing the window, or leaving this page during the exam is not
                            allowed and has been recorded.
                        </p>
                    </div>
                </div>
                <p className="text-sm text-navy-700">
                    {remaining > 0
                        ? `If this happens ${remaining} more time${remaining > 1 ? "s" : ""}, your exam will be submitted automatically.`
                        : "Your exam will now be submitted automatically."}
                </p>
            </div>
        </Modal>
    );
}
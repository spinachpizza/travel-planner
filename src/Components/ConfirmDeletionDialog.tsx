import '.././Styles/ConfirmDeletionDialog.css'

interface ConfirmDialogProps {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({ isOpen, message, onConfirm, onCancel }: ConfirmDialogProps) {
  
    if (!isOpen) return null;

    return (
        <div className="confirm-deletion-container">
            <div className="confirm-deletion-dialog-box">
                <p style={{ marginBottom: 20 }}>{message}</p>
                <div style={{ display: "flex", justifyContent: "space-around" }}>
                    <button className="confirm-deletion-dialog-button" onClick={onCancel}>
                        Cancel
                    </button>
                    <button className="confirm-deletion-dialog-button" style={{ background: "coral", color: "white" }} onClick={onConfirm}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
  );
}
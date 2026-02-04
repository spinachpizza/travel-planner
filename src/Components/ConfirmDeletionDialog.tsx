interface ConfirmDialogProps {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({ isOpen, message, onConfirm, onCancel }: ConfirmDialogProps) {
  
    if (!isOpen) return null;

    return (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(0,0,0,0.5)",
            display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
            <div style={{ background: "#1a1a1a", padding: 20, borderRadius: 8, minWidth: 300, textAlign: "center", border: "1px solid grey" }}>
                <p style={{ marginBottom: 20 }}>{message}</p>
                <div style={{ display: "flex", justifyContent: "space-around" }}>
                    <button style={{ padding: "6px 12px", borderRadius: 4, cursor: "pointer" }} onClick={onCancel}>
                        Cancel
                    </button>
                    <button style={{ padding: "6px 12px", borderRadius: 4, background: "coral", color: "white", cursor: "pointer", border: "none"}}
                        onClick={onConfirm}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
  );
}
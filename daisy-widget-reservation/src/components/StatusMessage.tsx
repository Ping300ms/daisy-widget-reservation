type StatusMessageProps = {
    status: "loading" | "success" | "error" | "full" | "idle";
    message?: string;
};

function StatusMessage({ status, message }: StatusMessageProps) {
    if (status === "idle") return null;

    const base = "p-3 rounded text-center mt-4 font-medium";

    switch (status) {
        case "loading":
            return <div className={`${base} bg-yellow-100 text-yellow-800`}>Chargement...</div>;
        case "success":
            return <div className={`${base} bg-green-100 text-green-800`}>{message || "Votre réservation a bien été confirmée. Un e-mail de confirmation vous a été envoyé."}</div>;
        case "error":
            return <div className={`${base} bg-red-100 text-red-800`}>{message || "Erreur lors du paiement ❌"}</div>;
        case "full":
            return <div className={`${base} bg-gray-200 text-gray-600`}>Ce créneau est complet.</div>;
        default:
            return null;
    }
}

export default StatusMessage;

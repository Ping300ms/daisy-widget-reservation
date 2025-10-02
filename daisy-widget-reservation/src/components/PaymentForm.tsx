import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import {makePayment} from "../api/mockServer.ts";

type PaymentSimulatorProps = {
    onResult: (success: boolean) => void;
    onCancel: () => void;
};

function PaymentForm({ onResult, onCancel }: PaymentSimulatorProps) {
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvc, setCvc] = useState("");
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    const handlePayment = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const handlePaymentAsync = async () => {
            const response = await makePayment();
            onResult(response);
        }

        handlePaymentAsync();
    };

    return (
        <form
            onSubmit={handlePayment}
            className="p-4 space-y-3 mt-4 relative text-daisy-text"
        >
            <button
                type="button"
                onClick={onCancel}
                className="absolute top-4 left-4 flex items-center text-sm text-gray-600 hover:text-gray-900"
            >
                <ArrowLeft size={18} className="mr-1" />
                Retour
            </button>

            <h3 className="text-lg font-semibold mb-6 text-center">
                Paiement par carte
            </h3>

            <input
                type="text"
                placeholder="Numéro de carte (16 chiffres)"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ""))}
                maxLength={16}
                className="w-full border rounded px-3 py-2 bg-daisy-input"
                required
            />

            <div className="flex gap-2">
                <input
                    type="text"
                    placeholder="MM/YY"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    maxLength={5}
                    className="w-1/2 border rounded px-3 py-2 bg-daisy-input"
                    required
                />
                <input
                    type="text"
                    placeholder="CVC"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value.replace(/\D/g, ""))}
                    maxLength={3}
                    className="w-1/2 border rounded px-3 py-2 bg-daisy-input"
                    required
                />
            </div>

            <input
                type="text"
                placeholder="Nom du titulaire"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded px-3 py-2 bg-daisy-input"
                required
            />

            <button
                type="submit"
                disabled={loading}
                className="bg-daisy-accent text-white px-4 py-2 rounded  w-full"
            >
                {loading ? "Traitement..." : "Payer"}
            </button>
        </form>
    );
}

export default PaymentForm;

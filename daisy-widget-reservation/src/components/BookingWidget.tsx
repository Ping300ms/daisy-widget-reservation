import { useState, useEffect } from "react";
import { fetchWorkshop } from "../api/mockServer";
import WorkshopCard from "./WorkshopCard";
import BookingForm from "./BookingForm";
import PaymentForm from "./PaymentForm";
import StatusMessage from "./StatusMessage";
import type { Workshop } from "../api/types";

function BookingWidget() {
    const [workshop, setWorkshop] = useState<Workshop | null>(null);
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
    const [userData, setUserData] = useState<any>(null);
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "full">("idle");

    useEffect(() => {
        setStatus("loading");

        const container = document.querySelector("#daisy-widget") as HTMLElement | null;
        const apiKey = container?.dataset.apiKey;

        if (!apiKey) {
            console.error("⚠️ Aucune clé API trouvée dans #daisy-widget");
            setStatus("error");
            return;
        }

        fetchWorkshop(apiKey)
            .then((data) => {
                setWorkshop(data);
                setStatus("idle");
            })
            .catch((err) => {
                console.error("Erreur fetchWorkshop:", err);
                setStatus("error");
            });
    }, []);

    const handleSlotSelect = (slotId: string) => {
        setSelectedSlot(slotId);
        setStatus("idle");
    };

    const handleFormSubmit = (data: any) => {
        setUserData(data);
        setStatus("idle");
    };

    const handleCancel = () => {
        setUserData(null);
    };

    const handlePaymentResult = (success: boolean) => {
        if (success) {
            setStatus("success");
        } else {
            setStatus("error");
        }
    };

    return (
        <div className="max-w-xl mx-auto border rounded-xl p-4 shadow-md bg-white mb-4">
            {workshop && (
                <WorkshopCard
                    key={workshop.id}
                    title={workshop.title}
                    description={workshop.description}
                    price={workshop.price}
                    slots={workshop.slots}
                    onSelectSlot={handleSlotSelect}
                />
            )}

            {selectedSlot && !userData && <BookingForm onSubmit={handleFormSubmit} />}

            {selectedSlot && userData && status !== "success" && (
                <PaymentForm onResult={handlePaymentResult} onCancel={handleCancel} />
            )}

            <StatusMessage status={status} />
        </div>
    );
}

export default BookingWidget;

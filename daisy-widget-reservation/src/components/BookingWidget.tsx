import { useState, useEffect } from "react";
import {bookSlot, fetchWorkshop} from "../api/mockServer";
import WorkshopCard from "./WorkshopCard";
import BookingForm from "./BookingForm";
import PaymentForm from "./PaymentForm";
import StatusMessage from "./StatusMessage";
import type {BookingUser, Workshop} from "../api/types";
import useApplyTheme from "../hooks/UseApplyTheme.tsx";

function BookingWidget() {

    useApplyTheme("daisy-widget");

    const [workshop, setWorkshop] = useState<Workshop | null>(null);
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
    const [userData, setUserData] = useState<BookingUser | null>(null);
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "full">("idle");
    const [key, setKey] = useState<string>("");

    useEffect(() => {
        setStatus("loading");

        const container = document.querySelector("#daisy-widget") as HTMLElement | null;
        const apiKey = container?.dataset.apiKey;

        if (!apiKey) {
            console.error("⚠️ Aucune clé API trouvée dans #daisy-widget");
            setStatus("error");
            return;
        }

        setKey(apiKey);

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

    const handleFormSubmit = (data: BookingUser) => {
        setUserData(data);
        setStatus("idle");
    };

    const handleCancel = () => {
        setUserData(null);
    };

    const handlePaymentResult = async (success: boolean) => {
        if (success && key && selectedSlot && userData) {
            try {
                await bookSlot(key, selectedSlot, userData);
                setStatus("success");
            } catch (err) {
                console.error("Erreur réservation:", err);
                setStatus("full");
            }
        } else {
            setStatus("error");
        }
    };

    return (
        <div className="max-w-xl mx-auto rounded-xl p-4 shadow-md bg-daisy-bg mb-4">
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

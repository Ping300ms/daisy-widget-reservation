import { useState, useEffect } from "react";
import { fetchWorkshops } from "../api/mockServer";
import WorkshopCard from "./WorkshopCard";
import BookingForm from "./BookingForm";
import PaymentSimulator from "./PaymentSimulator";
import StatusMessage from "./StatusMessage";
import type {Workshop} from "../api/types.ts";

function BookingWidget() {
    const [workshops, setWorkshops] = useState<Workshop[]>([]);
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
    const [userData, setUserData] = useState<any>(null);
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "full">("idle");

    useEffect(() => {
        setStatus("loading");
        fetchWorkshops().then((data) => {
            setWorkshops(data);
            setStatus("idle");
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

    const handlePaymentResult = (success: boolean) => {
        if (success) {
            setStatus("success");
        } else {
            setStatus("error");
        }
    };

    return (
        <div className="max-w-xl mx-auto border rounded-xl p-4 shadow-md bg-white mb-4">
            {workshops.map((ws) => (
                <WorkshopCard
                    key={ws.id}
                    title={ws.title}
                    description={ws.description}
                    price={ws.price}
                    slots={ws.slots}
                    onSelectSlot={handleSlotSelect}
                />
            ))}

            {selectedSlot && !userData && <BookingForm onSubmit={handleFormSubmit} />}

            {selectedSlot && userData && status !== "success" && (
                <PaymentSimulator onResult={handlePaymentResult} />
            )}

            <StatusMessage status={status} />
        </div>
    );
}

export default BookingWidget;

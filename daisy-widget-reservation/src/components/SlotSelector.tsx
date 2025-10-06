import type {Slot} from "../api/types.ts";

type SlotSelectorProps = {
    slots: Slot[];
    selectedSlot: string | null;
    onSelect: (slotId: string) => void;
};

function SlotSelector({ slots, selectedSlot, onSelect }: SlotSelectorProps) {
    return (
        <div>
            <h4 className="font-medium mb-2">Choisissez un créneau :</h4>
            <select
                className="w-full border rounded px-3 py-2"
                value={selectedSlot ?? ""}
                onChange={(e) => onSelect(e.target.value)}
            >
                <option value="">Sélectionnez un créneau</option>
                {slots.map((slot) => {
                    const isFull = slot.booked >= slot.capacity;
                    return (
                        <option key={slot.id} value={slot.id} disabled={isFull}>
                            {new Date(slot.date).toLocaleString("fr-FR", {
                                dateStyle: "long",
                                timeStyle: "short",
                            })}{" "}
                            — {slot.capacity - slot.booked} places restantes
                        </option>
                    );
                })}
            </select>
        </div>
    );
}

export default SlotSelector;

import type { Slot } from "../api/types.ts";

type SlotSelectorProps = {
    slots: Slot[];
    onSelect: (slotId: string) => void;
};

function SlotSelector({ slots, onSelect }: SlotSelectorProps) {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onSelect(e.target.value);
    };

    return (
        <div className="mb-4 text-daisy-text">
            <select
                id="slot-select"
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 bg-daisy-input"
                defaultValue=""
            >
                <option value="" disabled>
                    Sélectionnez un créneau
                </option>
                {slots.map((slot) => {
                    const isFull = slot.booked >= slot.capacity;
                    return (
                        <option key={slot.id} value={slot.id} disabled={isFull}>
                            {new Date(slot.date).toLocaleString("fr-FR", {
                                dateStyle: "long",
                                timeStyle: "short",
                            })}
                            {isFull ? " — Complet" : ` — ${slot.capacity - slot.booked} places restantes`}
                        </option>
                    );
                })}
            </select>
        </div>
    );
}

export default SlotSelector;

import type {Slot} from "../api/types.ts";

type SlotSelectorProps = {
    slots: Slot[];
    onSelect: (slotId: string) => void;
};

function SlotSelector({ slots, onSelect }: SlotSelectorProps) {
    return (
        <div>
            <h4 className="font-medium mb-2">Choisissez un créneau :</h4>
            <ul className="space-y-2">
                {slots.map((slot) => {
                    const isFull = slot.booked >= slot.capacity;
                    return (
                        <li key={slot.id}>
                            <button
                                className={`w-full px-3 py-2 rounded border 
                  ${isFull ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-indigo-500 text-white hover:bg-indigo-600"}`}
                                disabled={isFull}
                                onClick={() => onSelect(slot.id)}
                            >
                                {new Date(slot.date).toLocaleString("fr-FR", { dateStyle: "long", timeStyle: "short" })}
                                — {slot.capacity - slot.booked} places restantes
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default SlotSelector;

import SlotSelector from "./SlotSelector";
import type {Slot} from "../api/types.ts";

type WorkshopCardProps = {
    title: string;
    description: string;
    price: number;
    slots: Slot[];
    onSelectSlot: (slotId: string) => void;
};

function WorkshopCard({ title, description, price, slots, onSelectSlot }: WorkshopCardProps) {
    return (
        <div className="">
            <h3 className="text-xl text-daisy-text font-bold mb-2">{title}</h3>
            <p className="text-daisy-text mb-2">{description}</p>
            <p className="font-semibold text-daisy-accent mb-3">{price} €</p>
            <SlotSelector slots={slots} onSelect={onSelectSlot} />
        </div>
    );
}

export default WorkshopCard;

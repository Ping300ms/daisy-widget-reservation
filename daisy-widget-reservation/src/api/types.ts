export type Booking = {
    id: string;
    slotId: string;
    name: string;
    email: string;
    phone: string;
    status: "pending" | "confirmed" | "failed";
};

export type Slot = {
    id: string;
    date: string;   // ISO format
    capacity: number;
    booked: number;
};

export type Workshop = {
    id: string;
    title: string;
    description: string;
    price: number;
    slots: Slot[];
};

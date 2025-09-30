export type Booking = {
    id: string;
    slotId: string;
    user: BookingUser
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

export type BookingUser = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
};


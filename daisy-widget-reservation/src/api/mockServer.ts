import type {Booking, Slot, Workshop} from "./types.ts";

export const workshops: Workshop[] = [
    {
        id: "w1",
        title: "Atelier Peinture intuitive",
        description: "Un moment créatif pour explorer la couleur et la matière.",
        price: 45,
        slots: [
            { id: "s1", date: "2025-10-10T14:00:00", capacity: 10, booked: 3 },
            { id: "s2", date: "2025-10-12T10:00:00", capacity: 8, booked: 8 }, // complet
        ],
    },
    {
        id: "w2",
        title: "Cours de Sculpture en argile",
        description: "Apprenez à modeler l’argile et repartez avec votre création.",
        price: 60,
        slots: [
            { id: "s3", date: "2025-10-15T18:30:00", capacity: 12, booked: 5 },
            { id: "s4", date: "2025-10-18T09:30:00", capacity: 12, booked: 2 },
        ],
    },
    {
        id: "w3",
        title: "Stage Photo Portrait",
        description: "Techniques de lumière et pose pour capturer des portraits uniques.",
        price: 80,
        slots: [
            { id: "s5", date: "2025-10-20T14:00:00", capacity: 6, booked: 1 },
            { id: "s6", date: "2025-10-22T14:00:00", capacity: 6, booked: 0 },
        ],
    },
];
let bookings: Booking[] = [];

export async function fetchWorkshops(): Promise<Workshop[]> {
    return new Promise(resolve => setTimeout(() => resolve(workshops), 300));
}

export async function bookSlot(
    slotId: string,
    user: { name: string; email: string; phone: string }
): Promise<Booking> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const slot = workshops[0].slots.find((s : Slot) => s.id === slotId);
            if (!slot || slot.capacity <= 0) {
                return reject(new Error("Créneau complet"));
            }
            slot.capacity -= 1;
            const booking: Booking = {
                id: Math.random().toString(36).substring(2),
                slotId,
                ...user,
                status: Math.random() > 0.2 ? "confirmed" : "failed"
            };
            bookings.push(booking);
            resolve(booking);
        }, 500);
    });
}

import type { Booking, Slot, Workshop } from "./types.ts";

// Dictionnaire d'ateliers indexés par une clé (par ex. API key)
export const workshops: Record<string, Workshop> = {
    "demo-123": {
        id: "w1",
        title: "Atelier Peinture intuitive",
        description: "Un moment créatif pour explorer la couleur et la matière.",
        price: 45,
        slots: [
            { id: "s1", date: "2025-10-10T14:00:00", capacity: 10, booked: 3 },
            { id: "s2", date: "2025-10-12T10:00:00", capacity: 8, booked: 8 }, // complet
        ],
    },
    "demo-456": {
        id: "w2",
        title: "Atelier Sculpture argile",
        description: "Exprimez vos émotions avec vos mains et la terre.",
        price: 60,
        slots: [
            { id: "s3", date: "2025-11-02T14:00:00", capacity: 12, booked: 5 },
            { id: "s4", date: "2025-11-05T18:00:00", capacity: 6, booked: 6 },
        ],
    },
};

const bookings: Booking[] = [];

// ⬇️ Nouveau fetch basé sur la clé
export async function fetchWorkshop(apiKey: string): Promise<Workshop> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const workshop = workshops[apiKey];
            if (!workshop) {
                reject(new Error("Atelier introuvable ou clé invalide"));
            } else {
                resolve(workshop);
            }
        }, 300);
    });
}

// Paiement simulé
export async function makePayment(): Promise<boolean> {
    const success = Math.random() > 0.3; // 70% de succès
    return new Promise(resolve => setTimeout(() => resolve(success), 1500));
}

// Réservation d’un créneau
export async function bookSlot(
    apiKey: string,
    slotId: string,
    user: { name: string; email: string; phone: string }
): Promise<Booking> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const workshop = workshops[apiKey];
            if (!workshop) return reject(new Error("Atelier introuvable"));

            const slot = workshop.slots.find((s: Slot) => s.id === slotId);
            if (!slot || slot.capacity <= 0) {
                return reject(new Error("Créneau complet"));
            }

            slot.capacity -= 1;

            const booking: Booking = {
                id: Math.random().toString(36).substring(2),
                slotId,
                ...user,
                status: Math.random() > 0.2 ? "confirmed" : "failed",
            };

            bookings.push(booking);
            resolve(booking);
        }, 500);
    });
}

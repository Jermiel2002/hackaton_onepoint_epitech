import { cookies } from "next/headers";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";

/**
 * Récupère le pseudo et les points à partir des cookies
 */
export function getSessionData(store?: RequestCookies) {
    const cookieStore = store ?? cookies();

    const pointsCookie = cookieStore.get("points")?.value;
    const pseudoCookie = cookieStore.get("pseudo")?.value;

    const points = pointsCookie ? parseInt(pointsCookie, 10) : 100;
    const pseudo = pseudoCookie || "Unknown";

    return { pseudo, points };
}

/**
 * Met à jour les points et les stocke dans les cookies
 */
export function updateSessionPoints(delta: number, store?: RequestCookies) {
    const cookieStore = store ?? cookies();

    const pointsCookie = cookieStore.get("points")?.value;
    const currentPoints = pointsCookie ? parseInt(pointsCookie, 10) : 100;

    const updatedPoints = Math.max(0, currentPoints + delta);

    cookieStore.set("points", updatedPoints.toString(), {
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
    });

    return updatedPoints;
}

const applyProxy = (url: string) => {
    if (import.meta.env.DEV) {
        return `https://cors-proxy-humanfriend22.onrender.com?url=${
            encodeURIComponent(url)
        }`;
    } else return url;
};

export const latestSeason = ref({
    id: "",
    reId: "",
});
export async function updateLatestSeason() {
    const response = await fetch(
        "https://www.robotevents.com/api/v2/seasons?program%5B%5D=1&active=true",
        {
            headers: {
                "Authorization":
                    `Bearer ${useRuntimeConfig().public.robotevents}`,
            },
        },
    );
    if (!response.ok) {
        throw new Error("Failed to fetch the latest season data.");
    }
    const season = (await response.json()).data[0];
    // 'VEX V5 Robotics Competition 2025-2026: Push Back' -> 'push-back-2526'
    const seasonName: string = season?.name;
    if (!seasonName) {
        throw new Error("Season name not found in API response");
    }
    const parts = seasonName.replace(":", "").split(" ");
    const yearParts = parts.find((part) => !!parseInt(part[0]))?.split("-")!;

    const word1 = parts[parts.length - 2].toLowerCase(),
        word2 = parts[parts.length - 1].toLowerCase();

    latestSeason.value = {
        id: `${word1}-${word2}-${
            yearParts.map((year) => year.slice(-2)).join("")
        }`,
        reId: season.id,
    };
}

export type Competition = {
    id: number;
    name: string;
    level: "World" | "National" | "State" | "Signature" | "Regional" | "Other";
    location: string;
    date: string;
};

export async function fetchTeamCompetitions(seasonId: number, teamId: number) {
    const response = await fetch(
        `https://www.robotevents.com/api/v2/teams/${teamId}/events?season%5B%5D=${seasonId}`,
        {
            headers: {
                "Authorization":
                    `Bearer ${useRuntimeConfig().public.robotevents}`,
            },
        },
    );
    if (!response.ok) {
        console.error(
            "Failed to fetch team competitions.",
            response.statusText,
        );
        return [];
    }
    const competitions = (await response.json()).data;
    console.info(
        `Fetched competitions for team ${teamId} in season ${seasonId}:`,
        competitions,
    );
    return competitions.map((competition: any) => {
        const { venue, city, region, country } = competition.location;
        return {
            id: competition.id,
            name: competition.name,
            level: competition.level,
            location: `${venue} @ ${city}, ${region}, ${country}`,
            date: competition.start,
        };
    }) as Competition[];
}

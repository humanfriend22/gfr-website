async function fetchRE(url: string) {
    const response = await fetch(
        url,
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
    return (await response.json()).data;
}

export async function fetchSeasonREId(seasonId: string) {
    const seasons = await fetchRE(
        `https://www.robotevents.com/api/v2/seasons?program%5B%5D=1`,
    );
    return seasons.find((season: any) =>
        season.name.toLowerCase().includes(
            seasonId.split("-").slice(0, 2).join(" "),
        )
    ).id;
}

export const latestSeason = ref({
    id: "",
    reId: 0,
});
export async function updateLatestSeason() {
    const season = (await fetchRE(
        "https://www.robotevents.com/api/v2/seasons?program%5B%5D=1&active=true",
    ))[0];
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
        reId: parseInt(season.id),
    };
}

export type Competition = {
    id: number;
    name: string;
    level: "World" | "National" | "State" | "Signature" | "Regional" | "Other";
    location: string;
    date: string;
    awards: string[];
};

export async function fetchTeamCompetitions(
    seasonId: number,
    teamId: number,
) {
    const competitions = await fetchRE(
        `https://www.robotevents.com/api/v2/teams/${teamId}/events?season%5B%5D=${seasonId}`,
    );
    console.info(
        `Fetched competitions for team ${teamId} in season ${seasonId}:`,
        competitions,
    );

    "https://www.robotevents.com/api/v2/teams/93449/awards?event%5B%5D=0&season%5B%5D=190";

    return await Promise.all(competitions.map(async (competition: any) => {
        const { venue, city, region, country } = competition.location;
        return {
            id: competition.id,
            name: competition.name,
            level: competition.level,
            location: `${venue} @ ${city}, ${region}, ${country}`,
            date: competition.start,
            awards: (await fetchRE(
                `https://www.robotevents.com/api/v2/teams/${teamId}/awards?event%5B%5D=${competition.id}&season%5B%5D=${seasonId}`,
            )).map((award: any) =>
                award.title.slice(
                    0,
                    award.title.indexOf(" ("),
                ).replace(" - High School", "")
            ),
        };
    })) as Competition[];
}

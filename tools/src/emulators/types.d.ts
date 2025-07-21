// Create seasons & teams
interface Team {
    letter: string;
    // Full name (not shorthand)
    name: string;
    // Logo filename in Firebase Storage
    logo: string;
    // RobotEvents Team ID
    reId: string;
    // Captains' UIDs
    captains: string[];
    // Team members' UIDs
    members: string[];
    // Competitions (propagated by Firebase Functions when reId changes)
    competitions: {
        [competitionId: string]: {
            name: string;
            date: string;
            location: string;
            awards: string[];
        };
    };
}

// UIDs
interface SeasonOfficerMap {
    president: string;
    vice_president: string;
    secretary: string;
    treasurer: string;
    junior_pred: string;
    senior_pred: string;
}

// Name + years is the document ID (e.g high-stakes-2425)
interface Season {
    officers: SeasonOfficerMap;
    teams: Team[];
}

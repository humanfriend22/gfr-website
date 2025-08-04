// Every user has write access to their own document -> Permissions and roles are stored in primary site document.
// Profile picture is stored in Firebase Storage in users/{uid}.jpg, fallback is Google profile picture.
export interface User {
    // Document ID
    uid: string;
    name: string;
    pfp: string;
    // In case they use a different email than their Google account
    email: string;
    graduatingYear: number;
    bio: string;
}

export interface Site {
    // Main image in Hero on homepage
    homeImage: string;
    // Markdown for the banner on the homepage, empty to disable
    bannerMarkdown: string;
    // document ID (e.g. high-stakes-2425)
    currentSeason: string;
    // all uids that can access the admin panel
    admins: string[];
}

export interface Team {
    letter: string;
    // Full name (not shorthand)
    name: string;
    // RobotEvents Team ID
    reId: number;
    // Captains' UIDs
    captains: string[];
    logo: string;
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
    discord: string;
    instagram: string;
}

// UIDs
export interface SeasonOfficerMap {
    president: string;
    vice_president: string;
    secretary: string;
    treasurer: string;
    junior_pred: string;
    senior_pred: string;
}

// Name + years is the document ID (e.g high-stakes-2425)
export interface Season {
    id: string; // Document ID
    reId: number;
    officers: SeasonOfficerMap;
    teams: Team[];
}

export interface WebsiteEvent {
    id: string; // Document ID
    title: string;
    description: string;
    info: string;
    image: string;
    start: Date;
    end: Date;
    location: string;
    signup_link: string;
    volunteer_link: string;
}

export interface Blog {
    id: string; // Document IDs
    title: string;
    author: string;
    description: string;
    content: string;
    image: string;
    images: string[];
    date: Date;
}

interface Database {
    site: [Site];
    users: User[];
    seasons: Season[];
    events: WebsiteEvent[];
    blogs: Blog[];
}

export const officerTitleMap = {
    president: "President",
    vice_president: "Vice President",
    secretary: "Secretary",
    treasurer: "Treasurer",
    junior_pred: "Junior PRED",
    senior_pred: "Senior PRED",
};

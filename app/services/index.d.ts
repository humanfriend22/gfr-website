interface User {
    name: string;
    email: string;
    team: string; // only captain of this team can edit
    role: string; // 'admin', 'captain, 'member'
}

interface Competition {
    reId: string;
    name: string;
    link: string;
    date: number;
    awards: string[];
    // Extra data can be fetched from RobotEvents if necessary, these are needed all the time and for history
}

interface Team {
    // captain cannot edit
    reId: string; // will be updated automatically if the exact name is registered
    season: string;
    // captain can edit always
    name: string;
    image: string;
    description: string;
    roster: string[];
    competitions: Competition[];
}

interface Event {
    name: string;
    date: string;
    image: string;
    description: string;
}

export interface Site {
    advertisementHTML: string;
    images: {
        home: string;
    };
}

interface Post {
    title: string;
    date: number;
    author: string;
    image: string;
    description: string;
    content: string;
}

export interface Database {
    users: User[];
    teams: Team[];
    events: Event[];
    blog: Post[];
    site: [Site];
}

// declare module "nuxt/schema" {
//     interface AppConfig {
//         images: Site["images"];
//     }
// }

// It is always important to ensure you import/export something when augmenting a type
export {};

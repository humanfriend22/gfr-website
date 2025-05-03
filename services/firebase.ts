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

interface Site {
    homeDescription: string;
    homeImage: string;
    advertisementHTML: string;
}

interface Post {
    title: string;
    date: number;
    author: string;
    image: string;
    description: string;
    content: string;
}

interface Database {
    users: User[];
    teams: Team[];
    events: Event[];
    blog: Post[];
    site: [Site];
}

/*

Admin: can change everything. cannot outright delete teams or change their seasons but can hide them (prevents accidental deletion of history)
Captain: can change everything in their team except the season. Cannot hide their team and cannot edit anything else on the site.
Member: if this email is on a team, they can edit their name, profile picture and description.


*/

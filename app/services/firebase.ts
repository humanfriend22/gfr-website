import { type Database } from "~/app/services/app.config";

const database: Database = {
    users: [],
    teams: [],
    events: [],
    blog: [],
    site: [
        {
            homeDescription: "",
            homeImage: "",
            advertisementHTML: "",
        },
    ],
};

/*

Admin: can change everything. cannot outright delete teams or change their seasons but can hide them (prevents accidental deletion of history)
Captain: can change everything in their team except the season. Cannot hide their team and cannot edit anything else on the site.
Member: if this email is on a team, they can edit their name, profile picture and description.


*/

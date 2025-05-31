import { initializeApp } from "firebase/app";
import {
    connectAuthEmulator,
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithRedirect,
    type User as FirebaseUser,
} from "firebase/auth";
import {
    collection,
    connectFirestoreEmulator,
    getDocs,
    initializeFirestore,
    persistentLocalCache,
    persistentMultipleTabManager,
} from "firebase/firestore";

interface Site {
    homeImage: string;
    advertisementHTML: string;
    currentSeason: string;
    seasons: string[];
}

interface Competition {
    name: string;
    season: string;
    reId: string;
}

interface Team {
    // Full name (not shorthand)
    name: string;
    // Logo filename in Firebase Storage
    logo: string;
    // RobotEvents Team ID
    reId: string;
    // RobotEvents Competition IDs (awards will be saved in Firebase)
    competitionIds: string[];
    // Awards & Competition Name
    awards: string[];
}

export interface User {
    // Document ID
    uid: string;
    name: string;
    email: string;
    team: string;
    role: "admin" | "captain" | "member" | "alumni" | ""; // 'admin', 'captain, 'member'
    canBlog: boolean;
}

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
    // These are all uids
    officers: SeasonOfficerMap;
    teams: Team[];
}

interface Database {
    site: [Site];
    users: User[];
    seasons: Season[];
}

export default defineNuxtPlugin(async (nuxtApp) => {
    const config = useRuntimeConfig();
    const app = initializeApp(config.public.firebase);
    const db = initializeFirestore(app, {
        localCache: persistentLocalCache({
            tabManager: persistentMultipleTabManager(),
        }),
    });
    const auth = getAuth(app);

    // Connect to emulators
    connectFirestoreEmulator(db, "127.0.0.1", 8080);
    connectAuthEmulator(auth, "http://127.0.0.1:9099");

    const user = ref<FirebaseUser | null>(null);
    auth.onAuthStateChanged((newUser) => {
        user.value = newUser;
    });

    const usersCollection = collection(db, "users");

    async function listUsers() {
        const snapshot = await getDocs(usersCollection);
        return snapshot.docs.map((doc) => ({
            uid: doc.id,
            ...doc.data() as Omit<User, "uid">,
        })) as User[];
    }

    async function login() {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
    }

    return {
        provide: {
            firebase: {
                user,
                login,
                users: await listUsers(),
            },
        },
    };
});

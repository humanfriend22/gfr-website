import { type FirebaseApp, initializeApp } from "firebase/app";
import {
    type Auth,
    connectAuthEmulator,
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    type User as FirebaseUser,
} from "firebase/auth";
import {
    collection,
    connectFirestoreEmulator,
    Firestore,
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

// All data holders are created here so the app can prerender even without any actual data. (empty arrays, default strings, etc.)
let firebase: FirebaseApp | null = null;
let auth: Auth | null = null;
let firestore: Firestore | null = null;

const currentUser = ref<FirebaseUser | null>(null);

export const users = ref<User[]>([]);

async function updateUsers() {
    const usersCollection = collection(firestore!, "users");
    const snapshot = await getDocs(usersCollection);
    users.value = snapshot.docs.map((doc) => ({
        uid: doc.id,
        ...doc.data() as Omit<User, "uid">,
    })) as User[];
}

// CLIENT SIDE PLUGIN ONLY FUNCTION (ensures is only called once upon Nuxt app startup)
export const initializeFirebase = async () => {
    const config = useRuntimeConfig();

    firebase = initializeApp(config.public.firebase);
    firestore = initializeFirestore(firebase, {
        localCache: persistentLocalCache({
            tabManager: persistentMultipleTabManager(),
        }),
    });
    auth = getAuth(firebase);

    // Connect to emulators
    connectAuthEmulator(auth, "http://127.0.0.1:9099");
    connectFirestoreEmulator(firestore, "127.0.0.1", 8080);

    auth.onAuthStateChanged((user) => {
        currentUser.value = user;
    });

    // Theoretically, this should be called only if the admin panel is accessed.
    updateUsers();
};

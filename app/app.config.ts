import type { Site } from "./services/index.d.ts";

export default defineAppConfig<{
    images: Site["images"];
}>({
    images: {
        home: "gfr-worlds-2023.jpg",
    },
});

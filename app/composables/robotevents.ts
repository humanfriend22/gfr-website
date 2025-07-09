const applyProxy = (url: string) => {
    if (import.meta.env.DEV) {
        return `https://cors-proxy-humanfriend22.onrender.com?url=${
            encodeURIComponent(url)
        }`;
    } else return url;
};

export async function fetchLatestSeasonId() {
    const response = await fetch(
        "https://www.robotevents.com/api/v2/seasons?program%5B%5D=1&active=true",
        {
            headers: [[
                "Authorization",
                `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiMTRkYTRhNmJkOGI4MjY1ZjFjNGQ2NGMwOTY2ZDlhYTk2MjkwODJiYjEwMGFlNWFmYzZkZjU0ZWYyZjA5NmVhNDYwZDViOTE0MDEzMmI3M2IiLCJpYXQiOjE3NTE4NDc2OTIuMjg5Nzc4LCJuYmYiOjE3NTE4NDc2OTIuMjg5Nzc5OSwiZXhwIjoyNjk4NTMyNDkyLjI3Mjc1OSwic3ViIjoiMTI4NTg1Iiwic2NvcGVzIjpbXX0.Dn6o6uLnbwTNHA4czHvhNN1JIKjcqV-d9PAtsiuKI3yfHNhvDQvj9eRGt93zNKuC_vFYiS1CUg9CDLfJY2zgx4hUejTDL6yuXyRZgdoUsAbd8zAF1MiwB1XCOWClzoGJcy5wBLquN92mzGNwy5Zn5b2-AMPlxi70q8Koaj9vk9sdoRS8RzgMGlG-Jj36YkigNFeSML9InS1GsKIxx46Ozcnz5SCD5vu1ypnl6SvjiHTjSUu-VbtT4hAVyV3ViwJmCcab9xj_8qhkOGQJ5QW-Ls8NLUMWVm-Y5cSyBxbsZqif9CHOqYS0UvD1dFPDBGsoh4KCExc_Rg0GWgtz9fzo6zGB7wnHwOkY3cclXk9dbeKjqfIWErKox_cGfx4OOqdh6aBGXzJcMQVns1572sdRSpWbmBWnEjapSWiqy53X0ER_47Y9EwB_r6fIkIS7mGZv65_JBND9edOvTBWHD2VuNcVZnpZmYzRZMGGGFSuPi_OxPIvrPU5Dctc0epfd8e6YVaFWg53uKOC8xlwKbAVMKE31-n3lAKWFD8V-1JZEsx9wATOINb1M6u6oVNZZ9tA7K4GIw_3Ee-UjbfEqg-sJEcb_UWVG8t9w2dTsZo1C7A1UfZlJDyFQGVIiVXNRVyi817KLzzcIkGLeZIspzretTRns-EoXtltH9la1AX4WGac`,
            ]],
        },
    );
    if (!response.ok) {
        throw new Error("Failed to fetch the latest season data.");
    }
    // 'VEX V5 Robotics Competition 2025-2026: Push Back' -> 'push-back-2526'
    const seasonName: string = (await response.json()).data[0].name;
    const parts = seasonName.replace(":", "").split(" ");
    const yearParts = parts.find((part) => !!parseInt(part[0]))?.split("-")!;

    const word1 = parts[parts.length - 2].toLowerCase(),
        word2 = parts[parts.length - 1].toLowerCase();

    return `${word1}-${word2}-${
        yearParts.map((year) => year.slice(-2)).join("")
    }`;
}

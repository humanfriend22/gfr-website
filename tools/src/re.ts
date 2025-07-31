// @ts-nocheck

const TOKEN =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiNWM1MDBjN2IwN2RiOTEyMjgzZmM2NjZiZGRhZjAwNmY5MTdjM2EwMGZjOTFhZmUwNTQ5MTM3Y2E1N2ZhM2YyNGU0MmI0NDYzYThmOTZmM2YiLCJpYXQiOjE3NDkxNTgxODUuNTQxMDU5LCJuYmYiOjE3NDkxNTgxODUuNTQxMDYwOSwiZXhwIjoyNjk1ODQyOTg1LjUzMzAyNjIsInN1YiI6IjEyODU4NSIsInNjb3BlcyI6W119.B9kfj4zz7di2scGvVeY3T3cbJOUWFyvTCus9lCkFGQvltC5zo3y9C0B1FqK-zfQIN1clT5JQBA1DI1-3ebjdFs-erxmezafSdRzrT4G3hzcwCigvBcLJsK7l07zs2IWfqEP2uJSWYfDJp1BjHS-Z148hIjjwE9OSJ-yxfGCNC1LILD_2T2szyHRP5C_F3LlnMDF9JOHLm2EyfoiEQt1EroUT_bMEjbiy2R5wdtjnWHltcHbo1qDqs5zb0TA8mxbm4dRyvcGeKgQ3mKG-M593VZMF1xC5iXafext3nIQaxn-M622ad9M-us7OftJE6BoGHKID5mkBItSsd5-tjw3X26I18vJLZtusYHM9wGkz5crs-K0j_9fThLKrdKeNIJ_dPYLiGI0iOwFTlZJhQY5FiDSPHVYnol2EfXEuVNSXfP5aBhuQHMkM9i0O6XOYUzk4IOE7hwTgL_7LicgWCBAhrfj_q248zMG4ZXlMib_8WY1m36LvRf1B5jmk6n3-bIAARhLYBFMPg-0KmuG-DJ2qWjGZi_MDKYbXOZnHdeZlvjZJ9i6rXTbNIA8rWgFDhVWyV-ToncFptvbD0WovRO1w0hz3U_mOUYYw2jwca-XbvzIKWlRQG5z2A_ZJ0wbY2MmMrTiE8QllKt0gDG4xWnGbkuzlCWFaF-uotCwDZSNcgPI";

const TEAM_ID = "93449";

async function fetchRE(url: string) {
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "accept": "application/json",
            "Authorization": `Bearer ${TOKEN}`,
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    return await response.json();
}

async function main() {
    let events = [];
    for (let i = 1; i <= 7; i++) {
        const { data, meta } = await fetchRE(
            `https://www.robotevents.com/api/v2/seasons/190/events?per_page=250&page=${i}&level%5B%5D=State`,
        );
        events.push(
            ...data.filter((e) =>
                e.name.toLowerCase().includes("california region 2")
            ),
        );
    }
    const gfrStatesId = events[0].id;
    console.log(gfrStatesId);
}

main();

const DOGS_URL = 'https://api.jsonbin.io/v3/b/68ccf99ad0ea881f4082d5b8';


const EMPTY_OWNER = { name: '', lastName: '', phoneNumber: '' };

function normalizeDog(raw){
    return {
        name: raw.name ?? '',
        sex: raw.sex ?? '',
        img: raw.img ?? '',
        breed: raw.breed ?? '',
        present: Boolean(raw.present),
        age: Number(raw.age) || 0,
        chipNumber: raw.chipNumber ?? '',
        owner: {...EMPTY_OWNER, ...raw.owner}
    };
}

export async function fetchDogs ({ signal } = {} ) {
    const response = await fetch(DOGS_URL, {signal});

    if (!response.ok) {

        throw new Error(`Request failed with status ${response.status}`);
    }

    const json = await response.json();
    const list = Array.isArray(json.record) ? json.record : [];

    return list.map(normalizeDog)
}
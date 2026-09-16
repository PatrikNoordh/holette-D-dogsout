// The only file that knows the jsonbin response shape.
// Everything else in the app receives a plain, normalized array of dogs.

const DOGS_URL = "https://api.jsonbin.io/v3/b/68ccf99ad0ea881f4082d5b8";

// Fallback so every dog has the same owner shape, even if the API omits it.
// Owner is never rendered publicly — kept intact for a future admin view.
const EMPTY_OWNER = { name: "", lastName: "", phoneNumber: "" };

// Convert one raw API dog into the shape the app relies on.
function normalizeDog(raw) {
  return {
    name: raw.name ?? "",
    sex: raw.sex ?? "",
    img: raw.img ?? "",
    breed: raw.breed ?? "",
    present: Boolean(raw.present),
    age: Number(raw.age) || 0,
    chipNumber: raw.chipNumber ?? "",
    owner: { ...EMPTY_OWNER, ...raw.owner },
  };
}

export async function fetchDogs({ signal } = {}) {
  const response = await fetch(DOGS_URL, { signal });

  // fetch only rejects on network failure — HTTP errors must be checked by hand.
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const json = await response.json();

  // Unwrap `record` here and nowhere else.
  const list = Array.isArray(json.record) ? json.record : [];

  return list.map(normalizeDog);
}

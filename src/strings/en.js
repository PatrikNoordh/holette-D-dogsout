
const en = {
  header: {
    home: "Home",
    ourDogs: "Our dogs",
    back: "Back",
    admin: "Admin",
    menu: "Toggle navigation menu",
    switchTo: "Byt till svenska",
    switchShort: "SV",
  },

  home: {
    welcome: "Welcome!",
    tagline: "A safe, fun, and active day for your best friend.",
    seeDogs: "See our dogs",
    registered: "in the register",
    hereToday: "here today",
    hours: "Open weekdays 07:00–18:00",
  },

  catalog: {
    title: "Our dogs",
    visitors: (n) => `${n} happy visitors today`,
    filterLabel: "Filter dogs",
    all: "All dogs",
    here: "Here today",
    away: "At home",
    emptyAll: "No dogs to show right now.",
    emptyHere: "No dogs are here right now.",
    emptyAway: "All dogs are here today.",
  },

  dogCard: {
    viewProfile: "View profile →",
  },

  dogDetail: {
    backToCatalog: "Back to our dogs",
    notFound: "Dog not found.",
  },

  admin: {
    title: "Admin",
    summary: (n, total) => `${n} of ${total} dogs here today`,
    chip: "Chip",
    owner: "Owner",
    here: "Here",
    away: "Away",
    switchLabel: (name, present) =>
      `${name} is ${present ? "here" : "away"}`,
  },

  common: {
    years: (n) => `${n} years`,
    female: "Female",
    male: "Male",
    hereToday: "Here today",
    atHome: "At home",
    loading: "Loading dogs…",
    error: "Could not load the dogs. Try again.",
    retry: "Try again",
    empty: "No dogs registered yet.",
  },
};

export default en;
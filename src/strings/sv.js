// Swedish UI copy. Must have exactly the same keys as en.js.

const sv = {
  header: {
    home: "Hem",
    ourDogs: "Våra hundar",
    back: "Tillbaka",
    admin: "Admin",
    menu: "Öppna eller stäng menyn",
    switchTo: "Switch to English",        // ← shows the OTHER language
    switchShort: "EN",
  },

  home: {
    welcome: "Välkommen!",
    tagline: "En trygg, rolig och aktiv dag för din bästa vän.",
    seeDogs: "Se våra hundar",
    registered: "i registret",
    hereToday: "här idag",
    hours: "Öppet vardagar 07:00–18:00",
  },

  catalog: {
    title: "Våra hundar",
    visitors: (n) => `${n} glada besökare idag`,
    filterLabel: "Filtrera hundar",
    all: "Alla hundar",
    here: "Här idag",
    away: "Hemma",
    emptyAll: "Inga hundar att visa just nu.",
    emptyHere: "Inga hundar är här just nu.",
    emptyAway: "Alla hundar är här idag.",
  },

  dogCard: {
    viewProfile: "Visa profil →",
  },

  dogDetail: {
    backToCatalog: "Tillbaka till våra hundar",
    notFound: "Hunden hittades inte.",
  },

  admin: {
    title: "Admin",
    summary: (n, total) => `${n} av ${total} hundar här idag`,
    chip: "Chip",
    owner: "Ägare",
    here: "Här",
    away: "Hemma",
    switchLabel: (name, present) =>
      `${name} är ${present ? "här" : "hemma"}`,
  },

  common: {
    years: (n) => `${n} år`,
    female: "Tik",
    male: "Hane",
    hereToday: "Här idag",
    atHome: "Hemma",
    loading: "Laddar hundar…",
    error: "Kunde inte hämta hundarna. Försök igen.",
    retry: "Försök igen",
    empty: "Inga hundar registrerade ännu.",
  },
};

export default sv;
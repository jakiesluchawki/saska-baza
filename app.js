// Zasada utrzymania: oferty z data dodania 2025 albo tagiem typu
// @ogloszenie archiwalne usuwamy z listy, bez przenoszenia do reject/benchmark.
const searchState = {
  lastUpdatedAt: "2026-07-02T11:02:38.675Z",
  intervalHours: 8,
};

const offers = [
  {
    id: "zwyciezcow-28",
    status: "call",
    fromBrief: true,
    title: "Zwyciezcow 28",
    source: "z pierwszej karty + doprecyzowane",
    url: "https://www.domiporta.pl/nieruchomosci/wynajme-mieszkanie-trzypokojowe-warszawa-praga-poludnie-saska-kepa-zwyciezcow-76m2/156548047",
    facts: [
      "76 m2",
      "3 pokoje",
      "5/6, winda",
      "4900 + 1200 + media",
      "parking 600",
      "ok. 11 min",
    ],
    pros: [
      "Wraca do gry: ogloszenie podaje dwa ustawne pokoje oprocz salonu.",
      "Winda, balkon, internet, panoramiczny widok i sensowny koszt.",
      "Blisko i w budzecie nawet z parkingiem.",
    ],
    cons: [
      "Pierwsza karta miala dobra watpliwosc: trzeba zobaczyc realny uklad drugiej sypialni.",
      "Malo zdjec, wiec telefon i prosba o plan mieszkania.",
    ],
  },
  {
    id: "jana-styki-77",
    status: "call",
    fromBrief: false,
    title: "Jana Styki / 77 m2",
    source: "nowy trop",
    url: "https://gratka.pl/nieruchomosci/mieszkanie-warszawa-praga-poludnie-jana-styki/ob/47432865",
    facts: [
      "77 m2",
      "3 pokoje",
      "parter z ogrodem",
      "7500 + 1400 + prad",
      "ok. 9 min",
    ],
    pros: [
      "Parter spelnia warunek, bo jest ogrod i taras.",
      "Dwie sypialnie i pies akceptowany.",
      "Bardzo dobry dystans.",
    ],
    cons: [
      "Parter trzeba obejrzec pod katem prywatnosci, swiatla i halasu.",
      "Wyjasnic, skad informacja o dwoch miejscach postojowych.",
      "Dopytac o internet i kompletne wyposazenie salonu.",
    ],
  },
  {
    id: "miedzynarodowa-50a",
    status: "call",
    fromBrief: false,
    title: "Miedzynarodowa 50A / 80 m2",
    source: "nowy trop",
    url: "https://gethome.pl/oferta/wynajme-mieszkanie-warszawa-ul-miedzynarodowa-80m2-trzypokojowe-6-pietro-z-2004-roku-2291884",
    facts: [
      "80 m2",
      "3 pokoje",
      "6/8",
      "5290 + 1500 + 200",
      "garaz 400",
      "ok. 20 min",
    ],
    pros: [
      "Dwie sypialnie, dwa balkony, osobna toaleta, prysznic i garaz.",
      "Najlepszy stosunek metraz / koszt z dotychczasowych tropow.",
    ],
    cons: [
      "Dystans jest na granicy awaryjnego maksimum.",
      "Potwierdzic winde, internet i minimalne umeblowanie salonu.",
    ],
  },
  {
    id: "saska-74",
    status: "call",
    fromBrief: false,
    title: "Saska / 74 m2",
    source: "nowy trop",
    url: "https://www.domiporta.pl/nieruchomosci/wynajme-mieszkanie-trzypokojowe-warszawa-praga-poludnie-saska-kepa-saska-74m2/156501275",
    facts: [
      "74 m2",
      "3 pokoje",
      "1/5",
      "6000 + 1500 + prad",
      "parking",
      "ok. 12 min",
    ],
    pros: [
      "Dwie sypialnie, parking i budynek z 2010 roku.",
      "Cena jeszcze miesci sie w logice 8-10k.",
    ],
    cons: [
      "Winda, internet, pralka/zmywarka i widok wymagaja potwierdzenia.",
      "Pierwsze pietro bez windy byloby odrzutem.",
    ],
  },
  {
    id: "londynska-89",
    status: "verify",
    fromBrief: false,
    title: "Londynska / 89 m2",
    source: "nowy trop",
    url: "https://gratka.pl/nieruchomosci/mieszkanie-warszawa-praga-poludnie-londynska/ob/47463491",
    facts: [
      "89 m2",
      "3 pokoje",
      "parter z ogrodem",
      "7700 + oplaty?",
      "ok. 16 min",
    ],
    pros: [
      "Parter ma ogrod i taras, wiec formalnie przechodzi warunek.",
      "Duzy metraz, parking naziemny i spokojniejszy wariant.",
    ],
    cons: [
      "Trzeba potwierdzic pelny total, umeblowanie i czy to na pewno mieszkanie rodzinne, nie biurowy klimat.",
      "Parter do oceny pod katem prywatnosci.",
    ],
  },
  {
    id: "lizbonska-70",
    status: "verify",
    fromBrief: false,
    title: "Lizbonska / 70 m2",
    source: "nowy trop",
    url: "https://www.morizon.pl/oferta/wynajem-mieszkanie-warszawa-praga-poludnie-lizbonska-70m2-mzn2047643254",
    facts: [
      "70 m2",
      "3 pokoje",
      "winda",
      "balkon",
      "garaz",
      "raczej 20+ min",
    ],
    pros: [
      "Winda, balkon, garaz i standard wygladaja dobrze.",
      "Metraz lapie wazne nice-to-have.",
    ],
    cons: [
      "Dystans prawdopodobnie wychodzi poza komfortowy limit.",
      "Pelny koszt i dokladny adres trzeba potwierdzic przed czasem na ogledziny.",
    ],
  },
  {
    id: "francuska-klimatyczne",
    status: "reject",
    fromBrief: true,
    title: "Francuska / klimatyczne 3 pokoje",
    source: "z pierwszej karty",
    url: "https://www.otodom.pl/pl/oferta/klimatyczne-trzypokojowe-przy-francuskiej-ID4BDhJ",
    facts: [
      "3 pokoje",
      "lokalizacja OK",
      "z pierwszej karty",
    ],
    pros: ["Adresowo kuszace, bo Francuska jest w samym obszarze poszukiwan."],
    cons: ["Bez windy, zero mebli i bez prysznica. Must-have fail, nie tracic czasu."],
  },
  {
    id: "walecznych-39-65",
    status: "reject",
    fromBrief: true,
    title: "Walecznych 39 / 65 m2",
    source: "z pierwszej karty",
    url: "https://www.otodom.pl/pl/oferta/saska-kepa-walecznych-39-3pok-65m2-wynajem-ID4BKEx",
    facts: [
      "65 m2",
      "3 pokoje",
      "parter",
      "lokalizacja idealna",
    ],
    pros: ["Lokalizacja prawie idealna i metraz formalnie przechodzi minimum."],
    cons: ["Parter bez potwierdzonego ogrodu odpada. Do tego slaby standard wedlug pierwszej oceny."],
  },
  {
    id: "walecznych-3p",
    status: "reject",
    fromBrief: true,
    title: "Walecznych / 3 pokoje",
    source: "z pierwszej karty",
    url: "https://www.otodom.pl/pl/oferta/3-pokoje-saska-kepa-walecznych-ID4kPFr",
    facts: [
      "3 pokoje",
      "z pierwszej karty",
    ],
    pros: ["Ulica bardzo dobra, wiec link zostaje jako punkt odniesienia."],
    cons: ["Bez windy i slaby standard. Przy kryteriach autora to odrzut."],
  },
  {
    id: "meksykanska-85-brief",
    status: "verify",
    fromBrief: true,
    title: "Meksykanska / 85 m2",
    source: "z pierwszej karty",
    url: "https://www.otodom.pl/pl/oferta/mieszkanie-85m-saska-kepa-warszawa-ID4nsXb",
    facts: [
      "85 m2",
      "3 pokoje",
      "z pierwszej karty",
    ],
    pros: ["Metraz i lokalizacja sa potencjalnie dobre."],
    cons: [
      "Pierwsza ocena: ciasny, malo przyjemny klimat. Sprawdzic tylko, jesli ma winde, dwie sypialnie i sensowne swiatlo.",
    ],
  },
  {
    id: "saska-3p-brief",
    status: "reject",
    fromBrief: true,
    title: "Saska / 3 pokoje",
    source: "z pierwszej karty",
    url: "https://www.otodom.pl/pl/oferta/saska-3-pokoje-ID4Bs57",
    facts: [
      "3 pokoje",
      "z pierwszej karty",
    ],
    pros: ["Adres w dobrym obszarze."],
    cons: ["Bez windy, wiec odpada przy kryteriach autora."],
  },
  {
    id: "nowoczesne-overbudget",
    status: "benchmark",
    fromBrief: true,
    title: "Nowoczesne na Saskiej Kepie",
    source: "z pierwszej karty",
    url: "https://www.otodom.pl/pl/oferta/nowoczesne-mieszkanie-na-saskiej-kepie-ID4BkR6",
    facts: [
      "bardzo dobry standard",
      "ponad budzet",
    ],
    pros: ["Dobry wzorzec standardu: tak ma wygladac mieszkanie warte rozmowy o 10k."],
    cons: ["Over budget. Tylko benchmark albo negocjacja, nie normalny kandydat."],
  },
  {
    id: "zwyciezcow-176",
    status: "benchmark",
    fromBrief: true,
    title: "Zwyciezcow / 176 m2",
    source: "z pierwszej karty",
    url: "https://www.domiporta.pl/nieruchomosci/wynajme-mieszkanie-warszawa-praga-poludnie-saska-kepa-zwyciezcow-176m2/156546679",
    facts: [
      "176 m2",
      "idealny kierunek",
      "za drogo",
    ],
    pros: ["Wzorzec ukladu i jakosci, gdyby budzet nie istnial."],
    cons: ["Za drogo i za duze. Zostawione tylko jako punkt porownania."],
  },
];

const alerts = [
  "Saska Kepa 3 pokoje winda 70 m2 wynajem",
  "Zwyciezcow 28 Saska Kepa 3 pokoje winda",
  "Walecznych 3 pokoje garaz winda wynajem",
  "Jana Styki 3 pokoje ogrod wynajem",
  "Meksykanska 3 pokoje winda garaz wynajem",
  "Miedzynarodowa 3 pokoje balkon garaz",
  "Londynska 3 pokoje ogrod Saska Kepa",
];

const questions = [
  "Jaki jest pelny miesieczny koszt: najem, czynsz administracyjny, media, parking, internet i kaucja?",
  "Czy jest winda? Jesli parter, czy jest prywatny ogrod i czy widok nie jest w sciane?",
  "Czy sa dwie normalne sypialnie oraz kanapa do spania w salonie?",
  "Czy w kuchni jest plyta, piekarnik i zmywarka, a w lazience pralka?",
  "Czy mozna wynajac z psem i obejrzec mieszkanie w tym tygodniu?",
];

const message = [
  "Dzien dobry, czy mieszkanie jest nadal dostepne?",
  "Szukamy 3-4 pokoi, minimum 2 sypialnie, w okolicy Saskiej Kepy, z pelnym kosztem do ok. 8-10 tys. miesiecznie.",
  "Czy moga Panstwo potwierdzic: pelny miesieczny koszt, winde albo parter z ogrodem, dwie sypialnie, wyposazenie kuchni i lazienki, internet, zgode na psa oraz termin ogladania?",
].join(" ");

const offersBody = document.querySelector("#offersBody");
const emptyState = document.querySelector("#emptyState");
const searchInput = document.querySelector("#searchInput");
const toast = document.querySelector("#toast");
const restoreHiddenButton = document.querySelector("#restoreHidden");
const countAll = document.querySelector("#countAll");
const lastUpdated = document.querySelector("#lastUpdated");
const tabs = Array.from(document.querySelectorAll(".tab"));
const hiddenOffersKey = "saska-baza-hidden-offers";
let activeFilter = "all";
let hiddenOfferIds = readHiddenOffers();

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function statusLabel(status) {
  const labels = {
    call: "Dzwonic",
    verify: "Sprawdzic",
    reject: "Odpada",
    benchmark: "Benchmark",
  };
  return labels[status] || status;
}

function statusIcon(status) {
  const icons = {
    call: "phone-call",
    verify: "search-check",
    reject: "x-circle",
    benchmark: "ruler",
  };
  return icons[status] || "circle";
}

function icon(name) {
  return `<i data-lucide="${name}"></i>`;
}

function formatDateTime(value) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat("pl-PL", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function providerName(url) {
  const host = new URL(url).hostname.replace(/^www\./, "");
  const labels = {
    "domiporta.pl": "Domiporta",
    "gratka.pl": "Gratka",
    "gethome.pl": "GetHome",
    "morizon.pl": "Morizon",
    "nestoria.pl": "Nestoria",
    "nieruchomosci-online.pl": "Nieruchomosci-online",
    "olx.pl": "OLX",
    "otodom.pl": "Otodom",
    "znajdznajem.pl": "ZnajdzNajem",
  };
  return labels[host] || host;
}

function offerDiscoveredTime(offer) {
  const timestamp = Date.parse(offer.discoveredAt || "");
  return Number.isNaN(timestamp) ? 0 : timestamp;
}

function isFreshOffer(offer) {
  const timestamp = offerDiscoveredTime(offer);
  if (!timestamp) return false;
  const ageMs = Date.now() - timestamp;
  return ageMs >= 0 && ageMs <= 7 * 24 * 60 * 60 * 1000;
}

function sortOffers(items) {
  return [...items].sort((first, second) => {
    const freshDiff = Number(isFreshOffer(second)) - Number(isFreshOffer(first));
    if (freshDiff) return freshDiff;
    return offerDiscoveredTime(second) - offerDiscoveredTime(first);
  });
}

function offerText(offer) {
  return [
    offer.title,
    offer.source,
    offer.status,
    providerName(offer.url),
    ...offer.facts,
    ...offer.pros,
    ...offer.cons,
  ]
    .join(" ")
    .toLowerCase();
}

function readHiddenOffers() {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(hiddenOffersKey) || "[]");
    return new Set(Array.isArray(parsed) ? parsed.filter((id) => typeof id === "string") : []);
  } catch {
    return new Set();
  }
}

function saveHiddenOffers() {
  try {
    window.localStorage.setItem(hiddenOffersKey, JSON.stringify(Array.from(hiddenOfferIds)));
    return true;
  } catch {
    return false;
  }
}

function filterOffer(offer) {
  if (activeFilter === "all") return true;
  if (activeFilter === "from-brief") return offer.fromBrief;
  if (activeFilter === "reject") return offer.status === "reject" || offer.status === "benchmark";
  return offer.status === activeFilter;
}

function renderList(items, type) {
  return `
    <ul class="argument-list ${type}">
      ${items.map((item) => `<li>${escapeHTML(item)}</li>`).join("")}
    </ul>
  `;
}

function renderFacts(facts) {
  return facts.map((fact) => `<span class="fact">${escapeHTML(fact)}</span>`).join("");
}

function renderSummary() {
  const activeOffersCount = offers.filter((offer) => !hiddenOfferIds.has(offer.id)).length;
  countAll.textContent = `${activeOffersCount} / ${offers.length} pozycji`;
  const formattedDate = formatDateTime(searchState.lastUpdatedAt);
  lastUpdated.textContent = formattedDate ? `Sprawdzone ${formattedDate}` : `Auto co ${searchState.intervalHours}h`;
  restoreHiddenButton.disabled = hiddenOfferIds.size === 0;
}

function renderOffers() {
  const query = searchInput.value.trim().toLowerCase();
  const visible = sortOffers(
    offers.filter(
      (offer) => !hiddenOfferIds.has(offer.id) && filterOffer(offer) && (!query || offerText(offer).includes(query))
    )
  );

  offersBody.innerHTML = visible
    .map(
      (offer) => `
        <tr class="offer-row ${offer.status}">
          <td data-label="Status">
            <span class="status-chip ${offer.status}">${icon(statusIcon(offer.status))}${statusLabel(offer.status)}</span>
            ${isFreshOffer(offer) ? `<span class="new-chip">Nowe</span>` : ""}
            <span class="source-chip">${escapeHTML(providerName(offer.url))}</span>
          </td>
          <td data-label="Oferta">
            <a class="offer-title" href="${offer.url}" target="_blank" rel="noreferrer">${escapeHTML(offer.title)}</a>
            <div class="offer-meta">
              <button class="hide-offer" type="button" data-hide-offer="${escapeHTML(offer.id)}">
                ${icon("eye-off")}
                <span>Ukryj</span>
              </button>
            </div>
          </td>
          <td data-label="Parametry">
            <div class="facts">${renderFacts(offer.facts)}</div>
          </td>
          <td data-label="Co jest na tak">
            ${renderList(offer.pros, "pros")}
          </td>
          <td data-label="Co jest na nie / do sprawdzenia">
            ${renderList(offer.cons, "cons")}
          </td>
          <td data-label="Akcje">
            <div class="table-actions">
              <a class="open-link" href="${offer.url}" target="_blank" rel="noreferrer">
                ${icon("external-link")}
                <span>Otworz ${escapeHTML(providerName(offer.url))}</span>
              </a>
            </div>
          </td>
        </tr>
      `
    )
    .join("");

  emptyState.hidden = Boolean(visible.length);
  renderSummary();
  window.lucide?.createIcons();
}

function renderAlerts() {
  document.querySelector("#alerts").innerHTML = alerts
    .map((query) => {
      const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
      return `
        <a class="alert-link" href="${url}" target="_blank" rel="noreferrer">
          <span>${escapeHTML(query)}</span>
          ${icon("external-link")}
        </a>
      `;
    })
    .join("");
}

function renderQuestions() {
  document.querySelector("#questions").innerHTML = questions.map((question) => `<li>${escapeHTML(question)}</li>`).join("");
}

function showToast(text) {
  toast.textContent = text;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 1800);
}

async function copyText(text, doneText) {
  try {
    await navigator.clipboard.writeText(text);
    showToast(doneText);
  } catch {
    showToast("Nie udalo sie skopiowac");
  }
}

document.addEventListener("click", (event) => {
  const hideButton = event.target.closest("[data-hide-offer]");
  if (hideButton) {
    hiddenOfferIds.add(hideButton.dataset.hideOffer);
    const saved = saveHiddenOffers();
    renderOffers();
    showToast(saved ? "Oferta ukryta" : "Oferta ukryta na czas tej sesji");
    return;
  }

  const tab = event.target.closest(".tab");
  if (!tab) return;
  activeFilter = tab.dataset.filter;
  tabs.forEach((item) => item.classList.toggle("active", item === tab));
  renderOffers();
});

searchInput.addEventListener("input", renderOffers);

restoreHiddenButton.addEventListener("click", () => {
  hiddenOfferIds = new Set();
  try {
    window.localStorage.removeItem(hiddenOffersKey);
  } catch {
    // Nothing else to clear; the in-memory list is already empty.
  }
  renderOffers();
  showToast("Ukryte oferty przywrocone");
});

document.querySelector("#copyMessage").addEventListener("click", () => {
  copyText(message, "Wiadomosc skopiowana");
});

document.querySelector("#copyQuestions").addEventListener("click", () => {
  copyText(questions.join("\n"), "Pytania skopiowane");
});

document.querySelector("#copyAlerts").addEventListener("click", () => {
  copyText(alerts.join("\n"), "Alerty skopiowane");
});

renderAlerts();
renderQuestions();
renderOffers();
window.lucide?.createIcons();

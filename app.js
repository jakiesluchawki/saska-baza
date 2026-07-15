// Zasada utrzymania: oferty z data dodania 2025 albo tagiem typu
// @ogloszenie archiwalne usuwamy z listy, bez przenoszenia do reject/benchmark.
const searchState = {
  lastUpdatedAt: "2026-07-15T20:53:35.662Z",
  intervalMinutes: 15,
};

const offers = [
  {
    id: "auto-domiporta-mieszkanie-trzypokojowe-na-wynajem-warszawa-prag-0fd29351",
    status: "verify",
    fromBrief: false,
    discoveredAt: "2026-07-13T13:40:04.135Z",
    marketDate: "2026-07-13",
    title: "Mieszkanie trzypokojowe na wynajem Warszawa , Praga-Poludnie , Lizbonska - 63,0m",
    source: "auto 15 min",
    url: "https://www.domiporta.pl/nieruchomosci/wynajme-mieszkanie-trzypokojowe-warszawa-praga-poludnie-lizbonska-63m2/156570886",
    location: { label: "Lizbonska", lat: 52.2276098, lng: 21.0641878, precision: "street" },
    facts: [
      "63.0 m2",
      "3 pokoje",
      "rynek 2 dni",
      "auto 15 min",
    ],
    pros: ["Swiezy wynik z automatycznego przegladu; sprawdzic dopasowanie do must-have."],
    cons: ["Do weryfikacji: aktualnosc, pelny koszt, winda albo parter z ogrodem, dwie sypialnie i pies."],
  },
  {
    id: "miedzynarodowa-50a",
    status: "call",
    fromBrief: false,
    updatedAt: "2026-07-09",
    title: "Miedzynarodowa 50A / 80 m2",
    source: "nowy trop",
    url: "https://gethome.pl/oferta/wynajme-mieszkanie-warszawa-ul-miedzynarodowa-80m2-trzypokojowe-6-pietro-z-2004-roku-2291884",
    location: { label: "Miedzynarodowa 50A", lat: 52.2352777, lng: 21.0666572, precision: "street" },
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
    marketDate: "2026-05-21",
    title: "Saska / 74 m2",
    source: "nowy trop",
    url: "https://www.domiporta.pl/nieruchomosci/wynajme-mieszkanie-trzypokojowe-warszawa-praga-poludnie-saska-kepa-saska-74m2/156501275",
    location: { label: "Saska 74", lat: 52.2353554, lng: 21.0596705, precision: "street" },
    facts: [
      "74 m2",
      "3 pokoje",
      "1/5",
      "6000 + 1500 + prad",
      "parking",
      "ok. 12 min",
      "rynek 55 dni",
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
    id: "francuska-klimatyczne",
    status: "reject",
    fromBrief: true,
    updatedAt: "2026-06-24",
    title: "Francuska / klimatyczne 3 pokoje",
    source: "z pierwszej karty",
    url: "https://www.otodom.pl/pl/oferta/klimatyczne-trzypokojowe-przy-francuskiej-ID4BDhJ",
    location: { label: "Francuska", lat: 52.2317759, lng: 21.0557167, precision: "street" },
    facts: [
      "3 pokoje",
      "lokalizacja OK",
      "z pierwszej karty",
    ],
    pros: ["Adresowo kuszace, bo Francuska jest w samym obszarze poszukiwan."],
    cons: ["Bez windy, zero mebli i bez prysznica. Must-have fail, nie tracic czasu."],
  },
  {
    id: "walecznych-3p",
    status: "reject",
    fromBrief: true,
    updatedAt: "2026-05-19",
    title: "Walecznych / 3 pokoje",
    source: "z pierwszej karty",
    url: "https://www.otodom.pl/pl/oferta/3-pokoje-saska-kepa-walecznych-ID4kPFr",
    location: { label: "Walecznych", lat: 52.2350911, lng: 21.0557063, precision: "street" },
    facts: [
      "3 pokoje",
      "z pierwszej karty",
    ],
    pros: ["Ulica bardzo dobra, wiec link zostaje jako punkt odniesienia."],
    cons: ["Bez windy i slaby standard. Przy kryteriach autora to odrzut."],
  },
  {
    id: "saska-3p-brief",
    status: "reject",
    fromBrief: true,
    updatedAt: "2026-05-21",
    title: "Saska / 3 pokoje",
    source: "z pierwszej karty",
    url: "https://www.otodom.pl/pl/oferta/saska-3-pokoje-ID4Bs57",
    location: { label: "Saska Kepa", lat: 52.2329941, lng: 21.0571754, precision: "area" },
    facts: [
      "3 pokoje",
      "z pierwszej karty",
    ],
    pros: ["Adres w dobrym obszarze."],
    cons: ["Bez windy, wiec odpada przy kryteriach autora."],
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
const mapElement = document.querySelector("#offersMap");
const mapStats = document.querySelector("#mapStats");
const tabs = Array.from(document.querySelectorAll(".tab"));
const hiddenOffersKey = "saska-baza-hidden-offers";
const freshMarketDays = 2;
let activeFilter = "all";
let hiddenOfferIds = readHiddenOffers();
let offersMap = null;
let offersMarkers = null;

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

function refreshIntervalLabel() {
  const minutes = Number(searchState.intervalMinutes || searchState.intervalHours * 60);
  if (!Number.isFinite(minutes) || minutes <= 0) return "auto";
  if (minutes < 60) return `${minutes} min`;
  return `${minutes / 60}h`;
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

function offerMarketTime(offer) {
  const timestamp = Date.parse(offer.marketDate || "");
  return Number.isNaN(timestamp) ? 0 : timestamp;
}

function isFreshOffer(offer) {
  const timestamp = offerMarketTime(offer);
  if (!timestamp) return false;
  const ageMs = Date.now() - timestamp;
  return ageMs >= 0 && ageMs <= freshMarketDays * 24 * 60 * 60 * 1000;
}

function offerSortTime(offer) {
  return offerMarketTime(offer) || offerDiscoveredTime(offer);
}

function sortOffers(items) {
  return [...items].sort((first, second) => {
    const freshDiff = Number(isFreshOffer(second)) - Number(isFreshOffer(first));
    if (freshDiff) return freshDiff;
    return offerSortTime(second) - offerSortTime(first);
  });
}

function visibleOffers() {
  const query = searchInput.value.trim().toLowerCase();
  return sortOffers(
    offers.filter(
      (offer) => !hiddenOfferIds.has(offer.id) && filterOffer(offer) && (!query || offerText(offer).includes(query))
    )
  );
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

function mapPinClass(offer) {
  if (isFreshOffer(offer)) return "fresh";
  if (offer.status === "call") return "call";
  if (offer.status === "reject" || offer.status === "benchmark") return "reject";
  return "verify";
}

function mapPinLabel(offer) {
  const provider = providerName(offer.url);
  return provider === "Nieruchomosci-online" ? "NO" : provider.slice(0, 1);
}

function renderMapSummary(visible) {
  if (!mapStats) return;
  const mapped = visible.filter((offer) => offer.location).length;
  const exact = visible.filter((offer) => offer.location?.precision === "street").length;
  mapStats.textContent = `${mapped} pinezek, ${exact} na ulicy`;
}

function initMap() {
  if (!mapElement || offersMap || !window.L) return Boolean(offersMap);
  offersMap = window.L.map(mapElement, {
    scrollWheelZoom: false,
    zoomControl: false,
  }).setView([52.2329941, 21.0571754], 14);
  window.L.control.zoom({ position: "bottomright" }).addTo(offersMap);
  window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(offersMap);
  offersMarkers = window.L.layerGroup().addTo(offersMap);
  return true;
}

function updateMap(visible) {
  renderMapSummary(visible);
  if (!mapElement) return;
  if (!window.L) {
    mapElement.classList.add("map-fallback");
    mapElement.textContent = "Mapa chwilowo niedostepna";
    return;
  }
  if (!initMap()) return;

  offersMarkers.clearLayers();
  const mapped = visible.filter((offer) => offer.location);
  const bounds = [];

  mapped.forEach((offer) => {
    const className = mapPinClass(offer);
    const marker = window.L.marker([offer.location.lat, offer.location.lng], {
      icon: window.L.divIcon({
        className: "map-marker",
        html: `<span class="map-pin ${className}" title="${escapeHTML(offer.title)}">${escapeHTML(mapPinLabel(offer))}</span>`,
        iconSize: [34, 34],
        iconAnchor: [17, 17],
        popupAnchor: [0, -18],
      }),
    }).bindPopup(`
      <div class="map-popup">
        <strong>${escapeHTML(offer.title)}</strong>
        <span>${escapeHTML(offer.location.label)} - ${escapeHTML(providerName(offer.url))}</span>
        <button type="button" data-map-focus="${escapeHTML(offer.id)}">Pokaz w liscie</button>
      </div>
    `);
    marker.addTo(offersMarkers);
    bounds.push([offer.location.lat, offer.location.lng]);
  });

  const fitVisibleBounds = () => {
    offersMap.invalidateSize();
    if (!bounds.length) return;
    offersMap.fitBounds(window.L.latLngBounds(bounds).pad(0.18), {
      animate: false,
      maxZoom: bounds.length === 1 ? 15 : 14,
    });
  };
  window.requestAnimationFrame(fitVisibleBounds);
  window.setTimeout(fitVisibleBounds, 250);
}

function focusOfferRow(offerId) {
  const row = Array.from(document.querySelectorAll("[data-offer-row]")).find(
    (item) => item.dataset.offerRow === offerId
  );
  if (!row) return;
  row.scrollIntoView({ behavior: "smooth", block: "center" });
  row.classList.add("spotlight");
  window.setTimeout(() => row.classList.remove("spotlight"), 1200);
}

function renderSummary() {
  const activeOffersCount = offers.filter((offer) => !hiddenOfferIds.has(offer.id)).length;
  countAll.textContent = `${activeOffersCount} / ${offers.length} pozycji`;
  const formattedDate = formatDateTime(searchState.lastUpdatedAt);
  lastUpdated.textContent = formattedDate ? `Sprawdzone ${formattedDate}` : `Auto co ${refreshIntervalLabel()}`;
  restoreHiddenButton.disabled = hiddenOfferIds.size === 0;
}

function renderOffers() {
  const visible = visibleOffers();

  offersBody.innerHTML = visible
    .map(
      (offer) => `
        <tr class="offer-row ${offer.status} ${isFreshOffer(offer) ? "fresh" : ""}" data-offer-row="${escapeHTML(offer.id)}">
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
  updateMap(visible);
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
  const mapFocusButton = event.target.closest("[data-map-focus]");
  if (mapFocusButton) {
    focusOfferRow(mapFocusButton.dataset.mapFocus);
    return;
  }

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

window.addEventListener("resize", () => {
  if (!offersMap) return;
  window.setTimeout(() => offersMap.invalidateSize(), 80);
});

renderAlerts();
renderQuestions();
renderOffers();
window.lucide?.createIcons();

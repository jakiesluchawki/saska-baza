const offers = [
  {
    id: "miedzynarodowa-50a",
    priority: "call",
    title: "Mi\u0119dzynarodowa 50A",
    area: "80 m2",
    rooms: "3 pokoje",
    route: "ok. 20 min",
    cost: "ok. 7390 total",
    url: "https://gethome.pl/oferta/wynajme-mieszkanie-warszawa-ul-miedzynarodowa-80m2-trzypokojowe-6-pietro-z-2004-roku-2291884/",
    pluses: [
      "2 sypialnie, 6/8, dwa balkony",
      "gara\u017c, prysznic, osobna toaleta",
      "najlepszy stosunek metra\u017c / koszt",
    ],
    risks: ["potwierdzi\u0107 wind\u0119, internet, kanap\u0119 do spania i pe\u0142ne umeblowanie"],
  },
  {
    id: "jana-styki",
    priority: "call",
    title: "Jana Styki",
    area: "77 m2",
    rooms: "3 pokoje",
    route: "ok. 9 min",
    cost: "ok. 8900+ total",
    url: "https://gratka.pl/nieruchomosci/mieszkanie-warszawa-praga-poludnie-jana-styki/ob/47432865",
    pluses: [
      "parter z ogrodem i tarasem",
      "2 sypialnie, 2 miejsca postojowe",
      "pies akceptowany, bardzo blisko punktu odniesienia",
    ],
    risks: ["parter musi by\u0107 realnie przyjemny i prywatny"],
  },
  {
    id: "saska-74",
    priority: "call",
    title: "Saska",
    area: "74 m2",
    rooms: "3 pokoje",
    route: "ok. 12-16 min",
    cost: "ok. 7500+ total",
    url: "https://www.domiporta.pl/nieruchomosci/wynajme-mieszkanie-trzypokojowe-warszawa-praga-poludnie-saska-kepa-saska-74m2/156501275",
    pluses: [
      "2 sypialnie, miejsce parkingowe",
      "budynek 2010, sensowny koszt",
      "dobry kandydat do szybkiego telefonu",
    ],
    risks: ["potwierdzi\u0107 wind\u0119, umeblowanie i internet"],
  },
  {
    id: "apartament-96",
    priority: "verify",
    title: "Apartament 96 m2",
    area: "96 m2",
    rooms: "3 pokoje",
    route: "brak adresu",
    cost: "ok. 9100+ total",
    url: "https://www.morizon.pl/oferta/wynajem-mieszkanie-warszawa-praga-poludnie-96m2-mzn2047605868",
    pluses: [
      "2 sypialnie, winda, gara\u017c",
      "balkon, meble na \u017cyczenie",
      "du\u017cy metra\u017c w bud\u017cecie 10k",
    ],
    risks: ["bez dok\u0142adnego adresu nie da si\u0119 oceni\u0107 20 minut pieszo"],
  },
  {
    id: "lizbonska-70",
    priority: "verify",
    title: "Lizbo\u0144ska",
    area: "70 m2",
    rooms: "3 pokoje",
    route: "raczej 20+ min",
    cost: "czynsz do sprawdzenia",
    url: "https://www.morizon.pl/oferta/wynajem-mieszkanie-warszawa-praga-poludnie-lizbonska-70m2-mzn2047643254",
    pluses: [
      "3/5, winda, balkon",
      "gara\u017c, umeblowane",
      "awaryjnie mo\u017ce by\u0107 dobrym standardem",
    ],
    risks: ["trasa prawdopodobnie poza komfortowym limitem i trzeba zna\u0107 total"],
  },
];

const alerts = [
  "Saska K\u0119pa 3 pokoje winda 70",
  "Jana Styki wynajem 3 pokoje",
  "Saska wynajem 3 pokoje parking",
  "Meksyka\u0144ska 3 pokoje winda",
  "Mi\u0119dzynarodowa 3 pokoje gara\u017c",
  "Kr\u00f3lowej Aldony 3 pokoje wynajem",
  "Walecznych 3 pokoje parter ogr\u00f3d",
];

const message = [
  "Dzie\u0144 dobry, czy mieszkanie jest nadal dost\u0119pne?",
  "Szukamy 3-4 pokoi dla rodziny, minimum 2 sypialnie, wynajem najch\u0119tniej od ko\u0144ca wakacji.",
  "Czy mog\u0105 Pa\u0144stwo potwierdzi\u0107: pe\u0142ny miesi\u0119czny koszt z czynszem i mediami, wind\u0119 albo parter z ogr\u00f3dkiem, internet, wyposa\u017cenie salonu (zw\u0142aszcza kanapa do spania) i sypialni, zgod\u0119 na psa oraz czy da si\u0119 obejrze\u0107 lokal w tym tygodniu?",
].join(" ");

const stateKey = "saska-baza-status-v1";
const cards = document.querySelector("#cards");
const searchInput = document.querySelector("#searchInput");
const toast = document.querySelector("#toast");
const tabs = Array.from(document.querySelectorAll(".tab"));
let activeFilter = "all";

function readStatus() {
  try {
    return JSON.parse(localStorage.getItem(stateKey)) || {};
  } catch {
    return {};
  }
}

function writeStatus(status) {
  localStorage.setItem(stateKey, JSON.stringify(status));
}

function offerText(offer) {
  return [
    offer.title,
    offer.area,
    offer.rooms,
    offer.route,
    offer.cost,
    ...offer.pluses,
    ...offer.risks,
  ]
    .join(" ")
    .toLowerCase();
}

function priorityLabel(priority) {
  return priority === "call" ? "Najpierw dzwoni\u0107" : "Do weryfikacji";
}

function icon(name) {
  return `<i data-lucide="${name}"></i>`;
}

function statusButton(offerId, key, label, iconName, extraClass = "") {
  const status = readStatus();
  const active = Boolean(status[offerId]?.[key]);
  return `
    <button class="status-button ${extraClass} ${active ? "active" : ""}" type="button" data-status="${key}" data-offer="${offerId}">
      ${icon(iconName)}
      <span>${label}</span>
    </button>
  `;
}

function renderCards() {
  const query = searchInput.value.trim().toLowerCase();
  const visible = offers.filter((offer) => {
    const filterMatch = activeFilter === "all" || offer.priority === activeFilter;
    const searchMatch = !query || offerText(offer).includes(query);
    return filterMatch && searchMatch;
  });

  cards.innerHTML = visible
    .map(
      (offer) => `
        <article class="card">
          <div class="card-main">
            <div class="card-top">
              <div>
                <h3>${offer.title}</h3>
                <div class="meta">
                  <span class="tag">${offer.area}</span>
                  <span class="tag">${offer.rooms}</span>
                  <span class="tag">${offer.route}</span>
                  <span class="cost-pill">${offer.cost}</span>
                </div>
              </div>
              <span class="priority ${offer.priority}">${priorityLabel(offer.priority)}</span>
            </div>
            <ul class="notes">
              ${offer.pluses.map((note) => `<li>${icon("check-circle-2")}<span>${note}</span></li>`).join("")}
              ${offer.risks.map((note) => `<li class="risk">${icon("alert-triangle")}<span>${note}</span></li>`).join("")}
            </ul>
          </div>
          <div class="card-actions">
            <a class="open-link" href="${offer.url}" target="_blank" rel="noreferrer">
              ${icon("external-link")}
              <span>Otw\u00f3rz</span>
            </a>
            ${statusButton(offer.id, "called", "Telefon", "phone")}
            ${statusButton(offer.id, "seen", "Obejrzane", "eye")}
            ${statusButton(offer.id, "favorite", "Mocne", "star")}
            ${statusButton(offer.id, "rejected", "Odpada", "x-circle", "reject")}
          </div>
        </article>
      `
    )
    .join("");

  if (!visible.length) {
    cards.innerHTML = `<div class="panel-section"><h2>Brak wynik\u00f3w</h2></div>`;
  }

  window.lucide?.createIcons();
}

function renderAlerts() {
  document.querySelector("#alerts").innerHTML = alerts
    .map((query) => {
      const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
      return `
        <a class="alert-link" href="${url}" target="_blank" rel="noreferrer">
          <span>${query}</span>
          ${icon("external-link")}
        </a>
      `;
    })
    .join("");
}

function showToast(text) {
  toast.textContent = text;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 1800);
}

async function copyText(text, doneText) {
  await navigator.clipboard.writeText(text);
  showToast(doneText);
}

document.addEventListener("click", (event) => {
  const tab = event.target.closest(".tab");
  if (tab) {
    activeFilter = tab.dataset.filter;
    tabs.forEach((item) => item.classList.toggle("active", item === tab));
    renderCards();
    return;
  }

  const statusButtonEl = event.target.closest("[data-status]");
  if (statusButtonEl) {
    const status = readStatus();
    const offerId = statusButtonEl.dataset.offer;
    const key = statusButtonEl.dataset.status;
    status[offerId] = status[offerId] || {};
    status[offerId][key] = !status[offerId][key];
    writeStatus(status);
    renderCards();
  }
});

searchInput.addEventListener("input", renderCards);

document.querySelector("#copyMessage").addEventListener("click", () => {
  copyText(message, "Wiadomo\u015b\u0107 skopiowana");
});

document.querySelector("#copyAlerts").addEventListener("click", () => {
  copyText(alerts.join("\n"), "Alerty skopiowane");
});

renderAlerts();
renderCards();
window.lucide?.createIcons();

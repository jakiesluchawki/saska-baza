const offers = [
  {
    id: "zwyciezcow-28",
    status: "call",
    fromBrief: true,
    title: "Zwyciezcow 28",
    source: "z pierwszej karty + doprecyzowane",
    url: "https://www.domiporta.pl/nieruchomosci/wynajme-mieszkanie-trzypokojowe-warszawa-praga-poludnie-saska-kepa-zwyciezcow-76m2/156548047",
    facts: ["76 m2", "3 pokoje", "5/6, winda", "4900 + 1200 + media", "parking 600", "ok. 11 min"],
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
    id: "walecznych-39-96",
    status: "call",
    fromBrief: false,
    title: "Walecznych 39 / 96 m2",
    source: "nowy trop",
    url: "https://gratka.pl/nieruchomosci/mieszkanie-warszawa-praga-poludnie-walecznych/ob/47282923",
    facts: ["96 m2", "3 pokoje", "garaz, balkon", "6700 + 2500 czynsz", "ok. 8 min"],
    pros: [
      "Dwie sypialnie, duzy metraz i lokalizacja blisko idealu.",
      "Garaz, balkon i standard wygladajacy na gorny pulap budzetu.",
    ],
    cons: [
      "Potwierdzic winde, pelne umeblowanie i czy koszt mediow nie wypycha ponad 10k.",
      "Jesli meble sa tylko na zyczenie, trzeba to domknac przed ogladaniem.",
    ],
  },
  {
    id: "jana-styki-77",
    status: "call",
    fromBrief: false,
    title: "Jana Styki / 77 m2",
    source: "nowy trop",
    url: "https://gratka.pl/nieruchomosci/mieszkanie-warszawa-praga-poludnie-jana-styki/ob/47432865",
    facts: ["77 m2", "3 pokoje", "parter z ogrodem", "7500 + 1400 + prad", "ok. 9 min"],
    pros: [
      "Parter spelnia warunek, bo jest ogrod i taras.",
      "Dwie sypialnie, dwa miejsca postojowe, pies akceptowany.",
      "Bardzo dobry dystans.",
    ],
    cons: [
      "Parter trzeba obejrzec pod katem prywatnosci, swiatla i halasu.",
      "Dopytac o internet i kompletne wyposazenie salonu.",
    ],
  },
  {
    id: "meksykanska-83",
    status: "call",
    fromBrief: false,
    title: "Meksykanska / 83 m2",
    source: "nowy trop",
    url: "https://warszawa.nieruchomosci-online.pl/mieszkanie%2Cz-aneksem-kuchennym/25911563.html",
    facts: ["83 m2", "3 pokoje", "6/8, winda", "6600 + 1100 + media", "garaz 300"],
    pros: [
      "Bardzo mocny zestaw: winda, balkon, garaz, wysoki poziom i metraz 70+.",
      "Opis wskazuje dwie sypialnie oraz pelne wyposazenie.",
    ],
    cons: [
      "Ogloszenie wyglada na starsze, wiec pierwsze pytanie to aktualnosc.",
      "Potwierdzic psa i pelny miesieczny total.",
    ],
  },
  {
    id: "saska-70-dwa-balkony",
    status: "call",
    fromBrief: false,
    title: "Saska Kepa / 70 m2, dwa balkony",
    source: "nowy trop",
    url: "https://www.olx.pl/d/oferta/saska-kepa-garaz-dwa-balkony-70m2-CID3-ID15g4Rl.html",
    facts: ["70 m2", "3 pokoje", "3. pietro, winda", "5300 + 1400 + prad", "miejsce 300"],
    pros: [
      "Dwa balkony, winda, garaz, zwierzeta dozwolone i koszt ponizej 8k.",
      "Dobre dopasowanie do nice-to-have, jesli adres jest wlasciwy.",
    ],
    cons: [
      "Brak ulicy w ogloszeniu, wiec trzeba potwierdzic dokladny spacer.",
      "Sprawdzic, czy sa realne dwie sypialnie i kanapa do spania.",
    ],
  },
  {
    id: "miedzynarodowa-50a",
    status: "call",
    fromBrief: false,
    title: "Miedzynarodowa 50A / 80 m2",
    source: "nowy trop",
    url: "https://gethome.pl/oferta/wynajme-mieszkanie-warszawa-ul-miedzynarodowa-80m2-trzypokojowe-6-pietro-z-2004-roku-2291884/",
    facts: ["80 m2", "3 pokoje", "6/8", "5290 + 1500 + 200", "garaz 400", "ok. 20 min"],
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
    facts: ["74 m2", "3 pokoje", "1/5", "6000 + 1500 + prad", "parking", "ok. 12 min"],
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
    facts: ["89 m2", "3 pokoje", "parter z ogrodem", "7700 + oplaty?", "ok. 16 min"],
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
    facts: ["70 m2", "3 pokoje", "winda", "balkon", "garaz", "raczej 20+ min"],
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
    id: "miedzynarodowa-55",
    status: "verify",
    fromBrief: false,
    title: "Miedzynarodowa / 55 m2",
    source: "nowy trop",
    url: "https://znajdznajem.pl/warszawa/oferta/253609-mieszkanie-3-pokoje-praga-poludnie",
    facts: ["55 m2", "3 pokoje", "6/10", "3600 + oplaty?", "ok. 20 min"],
    pros: [
      "Tani wariant awaryjny, minimalny metraz i widok na zielen.",
      "Wysokie pietro powinno oznaczac winde, ale trzeba to potwierdzic.",
    ],
    cons: [
      "55 m2 to absolutne minimum, a opis sugeruje podzial scianka.",
      "Sprawdzic, czy sa dwie prawdziwe sypialnie i czy oferta nadal zyje.",
    ],
  },
  {
    id: "paryska-56",
    status: "verify",
    fromBrief: false,
    title: "Paryska / 56 m2",
    source: "nowy trop",
    url: "https://www.nestoria.pl/detail/0000000030868192299291514/title/5/1-6",
    facts: ["56 m2", "3 pokoje", "5. pietro, winda", "4900 + oplaty?", "ok. 14 min"],
    pros: [
      "Bardzo blisko minimum, dobra lokalizacja i niska cena.",
      "Winda oraz balkon sa w opisie agregatora.",
    ],
    cons: [
      "Agregator: trzeba dojsc do pierwotnego ogloszenia.",
      "Potwierdzic dwie sypialnie, wyposazenie i realny total.",
    ],
  },
  {
    id: "walecznych-90",
    status: "verify",
    fromBrief: false,
    title: "Walecznych / 90 m2",
    source: "nowy trop",
    url: "https://www.nestoria.pl/detail/0000000030220270580049847/title/5/1-8",
    facts: ["90 m2", "3 pokoje", "7000 + oplaty?", "bardzo blisko"],
    pros: [
      "Lokalizacja i metraz sa na papierze bardzo mocne.",
      "Warto wykonac jeden telefon, jesli kontakt da sie znalezc.",
    ],
    cons: [
      "Brak jasnej windy, pietra i wyposazenia w dostepnym opisie.",
      "Jesli nie ma windy albo parteru z ogrodem, od razu odpada.",
    ],
  },
  {
    id: "francuska-klimatyczne",
    status: "reject",
    fromBrief: true,
    title: "Francuska / klimatyczne 3 pokoje",
    source: "z pierwszej karty",
    url: "https://www.otodom.pl/pl/oferta/klimatyczne-trzypokojowe-przy-francuskiej-ID4BDhJ",
    facts: ["3 pokoje", "lokalizacja OK", "z pierwszej karty"],
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
    facts: ["65 m2", "3 pokoje", "parter", "lokalizacja idealna"],
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
    facts: ["3 pokoje", "z pierwszej karty"],
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
    facts: ["85 m2", "3 pokoje", "z pierwszej karty"],
    pros: ["Metraz i lokalizacja sa potencjalnie dobre."],
    cons: ["Pierwsza ocena: ciasny, malo przyjemny klimat. Sprawdzic tylko, jesli ma winde, dwie sypialnie i sensowne swiatlo."],
  },
  {
    id: "saska-3p-brief",
    status: "reject",
    fromBrief: true,
    title: "Saska / 3 pokoje",
    source: "z pierwszej karty",
    url: "https://www.otodom.pl/pl/oferta/saska-3-pokoje-ID4Bs57",
    facts: ["3 pokoje", "z pierwszej karty"],
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
    facts: ["bardzo dobry standard", "ponad budzet"],
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
    facts: ["176 m2", "idealny kierunek", "za drogo"],
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
const tabs = Array.from(document.querySelectorAll(".tab"));
let activeFilter = "all";

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

function offerText(offer) {
  return [
    offer.title,
    offer.source,
    offer.status,
    ...offer.facts,
    ...offer.pros,
    ...offer.cons,
  ]
    .join(" ")
    .toLowerCase();
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

function renderOffers() {
  const query = searchInput.value.trim().toLowerCase();
  const visible = offers.filter((offer) => filterOffer(offer) && (!query || offerText(offer).includes(query)));

  offersBody.innerHTML = visible
    .map(
      (offer) => `
        <tr class="offer-row ${offer.status}">
          <td data-label="Status">
            <span class="status-chip ${offer.status}">${icon(statusIcon(offer.status))}${statusLabel(offer.status)}</span>
            <span class="source-chip">${escapeHTML(offer.source)}</span>
          </td>
          <td data-label="Oferta">
            <a class="offer-title" href="${offer.url}" target="_blank" rel="noreferrer">${escapeHTML(offer.title)}</a>
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
          <td data-label="Link">
            <a class="open-link" href="${offer.url}" target="_blank" rel="noreferrer">
              ${icon("external-link")}
              <span>Otworz</span>
            </a>
          </td>
        </tr>
      `
    )
    .join("");

  emptyState.hidden = Boolean(visible.length);
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
  const tab = event.target.closest(".tab");
  if (!tab) return;
  activeFilter = tab.dataset.filter;
  tabs.forEach((item) => item.classList.toggle("active", item === tab));
  renderOffers();
});

searchInput.addEventListener("input", renderOffers);

document.querySelector("#copyMessage").addEventListener("click", () => {
  copyText(message, "Wiadomosc skopiowana");
});

document.querySelector("#copyQuestions").addEventListener("click", () => {
  copyText(questions.join("\n"), "Pytania skopiowane");
});

document.querySelector("#copyAlerts").addEventListener("click", () => {
  copyText(alerts.join("\n"), "Alerty skopiowane");
});

document.querySelector("#countAll").textContent = `${offers.length} pozycji`;
renderAlerts();
renderQuestions();
renderOffers();
window.lucide?.createIcons();

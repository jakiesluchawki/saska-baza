import fs from "node:fs";
import vm from "node:vm";
import crypto from "node:crypto";

const APP_FILE = "app.js";
const INDEX_FILE = "index.html";
const INTERVAL_MINUTES = 15;
const MAX_NEW_OFFERS = Number(process.env.MAX_NEW_OFFERS || 8);
const USER_AGENT =
  "Mozilla/5.0 (compatible; SaskaBazaBot/1.0; +https://jakiesluchawki.github.io/saska-baza/)";

const DIRECT_SEARCHES = [
  "https://www.domiporta.pl/mieszkanie/wynajme/mazowieckie/warszawa/saska-kepa",
  "https://www.domiporta.pl/mieszkanie/wynajme/mazowieckie/warszawa/praga-poludnie",
  "https://gratka.pl/nieruchomosci/mieszkania/warszawa/saska-kepa/wynajem?cena-calkowita:max=10000&liczba-pokoi:min=3&sort=newest",
  "https://gratka.pl/nieruchomosci/mieszkania/warszawa/praga-poludnie/wynajem?cena-calkowita:max=10000&liczba-pokoi:min=3&sort=newest",
  "https://www.morizon.pl/do-wynajecia/mieszkania/warszawa/saska-kepa/?ps%5Bnumber_of_rooms_from%5D=3&ps%5Bprice_to%5D=10000",
  "https://www.morizon.pl/do-wynajecia/mieszkania/warszawa/praga-poludnie/?ps%5Bnumber_of_rooms_from%5D=3&ps%5Bprice_to%5D=10000",
  "https://gethome.pl/mieszkania/do-wynajecia/warszawa/saska-kepa/?rooms=3&price_to=10000",
  "https://gethome.pl/mieszkania/do-wynajecia/warszawa/praga-poludnie/?rooms=3&price_to=10000",
];

const SEARCHES = [
  "site:otodom.pl/pl/oferta Warszawa Saska Kepa wynajem mieszkanie 3 pokoje",
  "site:gratka.pl/nieruchomosci Warszawa Saska Kepa wynajem mieszkanie 3 pokoje",
  "site:morizon.pl/oferta Warszawa Saska Kepa wynajem mieszkanie 3 pokoje",
  "site:domiporta.pl/nieruchomosci Warszawa Saska Kepa wynajme mieszkanie 3 pokoje",
  "site:gethome.pl/oferta Warszawa Saska Kepa wynajme mieszkanie 3 pokoje",
  "site:otodom.pl/pl/oferta Warszawa Praga-Poludnie wynajem mieszkanie 3 pokoje winda",
  "site:gratka.pl/nieruchomosci Warszawa Praga-Poludnie wynajem mieszkanie 3 pokoje winda",
];

const ALLOWED_HOSTS = new Set([
  "domiporta.pl",
  "gratka.pl",
  "gethome.pl",
  "morizon.pl",
  "otodom.pl",
]);

const ARCHIVAL_PATTERNS = [
  /ogloszenie archiwalne/i,
  /ogłoszenie archiwalne/i,
  /archiwalne/i,
  /nieaktualne/i,
  /nie jest juz dostepne/i,
  /nie jest już dostępne/i,
  /strona nie istnieje/i,
  /nie znaleziono strony/i,
];

const TARGET_LOCATION_PATTERN =
  /\b(saska|saskiej|francuska|francuskiej|paryska|paryskiej|walecznych|zwyciezcow|zwyciezcow|jana styki|styki|miedzynarodowa|miedzynarodowej|londynska|londynskiej|lizbonska|lizbonskiej|meksykanska|meksykanskiej|berezynska|berezynskiej|nobla|obroncow|katowicka|katowickiej|algierska|algierskiej|brukselska|brukselskiej|estonska|estonskiej|finlandzka|finlandzkiej|waszyngtona)\b/i;
const DESIRED_ROOMS_PATTERN =
  /\b(?:3|4)\s*[- ]?(?:pok|pokoje|pokojowe|pokojowy)\b|\b(?:trzy|cztero)[- ]?pokoj/i;
const UNWANTED_ROOMS_PATTERN =
  /\b(?:1|2)\s*[- ]?(?:pok|pokoje|pokojowe|pokojowy)\b|\b(?:jedno|dwu|dwu|dwupokoj)[- ]?pokoj/i;
const EXCLUDED_LOCATION_PATTERN =
  /\b(goclaw|goclawek|grochow|kamionek|wiatraczna|kobielska|siennicka|jana nowaka|nowaka jezioranskiego|nowaka-jezioranskiego|ostrobramska|fieldorfa|abrahama|kobielska)\b/i;
const MIN_AREA_M2 = 55;
const LOCATION_ALIASES = [
  ["afrykanska", /\bafrykanska|afrykanskiej\b/i],
  ["algierska", /\balgierska|algierskiej\b/i],
  ["berezynska", /\bberezynska|berezynskiej\b/i],
  ["brukselska", /\bbrukselska|brukselskiej\b/i],
  ["estonska", /\bestonska|estonskiej\b/i],
  ["finlandzka", /\bfinlandzka|finlandzkiej\b/i],
  ["francuska", /\bfrancuska|francuskiej\b/i],
  ["jana-styki", /\bjana styki|styki\b/i],
  ["katowicka", /\bkatowicka|katowickiej\b/i],
  ["lizbonska", /\blizbonska|lizbonskiej\b/i],
  ["londynska", /\blondynska|londynskiej\b/i],
  ["miedzynarodowa", /\bmiedzynarodowa|miedzynarodowej\b/i],
  ["meksykanska", /\bmeksykanska|meksykanskiej\b/i],
  ["nobla", /\bnobla\b/i],
  ["obroncow", /\bobroncow\b/i],
  ["paryska", /\bparyska|paryskiej\b/i],
  ["walecznych", /\bwalecznych\b/i],
  ["waszyngtona", /\bwaszyngtona\b/i],
  ["zwyciezcow", /\bzwyciezcow\b/i],
  ["saska-kepa", /\bsaska|saskiej\b/i],
];

const dryRun = process.argv.includes("--dry-run");

function toAscii(value) {
  return String(value)
    .replaceAll("ł", "l")
    .replaceAll("Ł", "L")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\x20-\x7E]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function decodeEntities(value) {
  return String(value)
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(Number.parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number.parseInt(dec, 10)));
}

function stripNoise(html) {
  return decodeEntities(html)
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ");
}

function visibleText(html) {
  return stripNoise(html).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function extractTag(html, tagName) {
  const match = stripNoise(html).match(new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, "i"));
  return match ? toAscii(match[1].replace(/<[^>]+>/g, " ")) : "";
}

function normalizedHost(url) {
  return new URL(url).hostname.replace(/^www\./, "").replace(/^m\./, "");
}

function allowedUrl(url) {
  try {
    return ALLOWED_HOSTS.has(normalizedHost(url));
  } catch {
    return false;
  }
}

function canonicalUrl(url) {
  const parsed = new URL(url);
  parsed.hash = "";
  for (const key of [...parsed.searchParams.keys()]) {
    if (/^(utm_|fbclid|gclid|yclid|msclkid)/i.test(key)) parsed.searchParams.delete(key);
  }
  const normalized = parsed.toString().replace(/\/$/, "");
  return normalized;
}

function canonicalKey(url) {
  try {
    const parsed = new URL(canonicalUrl(url));
    return `${normalizedHost(parsed.toString())}${parsed.pathname}`.toLowerCase().replace(/\/$/, "");
  } catch {
    return String(url).toLowerCase();
  }
}

function offerSignature(offer) {
  const haystack = toAscii([offer.title, offer.url, ...(offer.facts || [])].join(" ")).toLowerCase();
  const location = LOCATION_ALIASES.find(([, pattern]) => pattern.test(haystack))?.[0];
  const area = haystack.match(/\b(\d{2,3})(?:[,.]\d+)?\s*m(?:2|\b)/i)?.[1];
  const rooms = haystack.match(/\b([3-4])\s*[- ]?(?:pok|pokoje|pokojowe|pokojowy)\b/i)?.[1];
  if (!location || !area) return null;
  return `${location}:${area}:${rooms || "rooms"}`;
}

function extractAreaM2(value) {
  const match = toAscii(value).match(/\b(\d{2,3})(?:[,.]\d+)?\s*m(?:2|\b)/i);
  return match ? Number(match[1]) : null;
}

function isLikelyOfferUrl(url) {
  try {
    const host = normalizedHost(url);
    const path = new URL(url).pathname.toLowerCase();
    if (host === "domiporta.pl") return /\/nieruchomosci\/wynajme-mieszkanie-/.test(path);
    if (host === "gratka.pl") return /\/nieruchomosci\/mieszkanie-/.test(path) && /\/ob\//.test(path);
    if (host === "gethome.pl") return /\/oferta\/wynajme-mieszkanie-/.test(path);
    if (host === "morizon.pl") return /\/oferta\/wynajem-mieszkanie-/.test(path);
    if (host === "otodom.pl") return /\/pl\/oferta\//.test(path);
    return false;
  } catch {
    return false;
  }
}

async function fetchPage(url) {
  const response = await fetch(url, {
    redirect: "follow",
    headers: {
      "user-agent": USER_AGENT,
      "accept-language": "pl-PL,pl;q=0.9,en;q=0.5",
    },
    signal: AbortSignal.timeout(25000),
  });
  const body = await response.text();
  return {
    status: response.status,
    finalUrl: response.url || url,
    body,
  };
}

function hasArchivalMarker(text) {
  return ARCHIVAL_PATTERNS.some((pattern) => pattern.test(text));
}

function classifyPage({ offer, url, status, finalUrl, body }) {
  const text = visibleText(body);
  const normalizedText = toAscii(text).toLowerCase();
  const pageTitle = extractTag(body, "title");
  const h1 = extractTag(body, "h1");
  const titleLine = `${pageTitle} ${h1}`.toLowerCase();

  if (status >= 400) {
    return { keep: false, reason: `HTTP ${status}`, pageTitle, h1 };
  }
  if (!allowedUrl(finalUrl)) {
    return { keep: false, reason: `redirect to ${normalizedHost(finalUrl)}`, pageTitle, h1 };
  }
  if (hasArchivalMarker(normalizedText)) {
    return { keep: false, reason: "archival marker", pageTitle, h1 };
  }
  if (/\bna sprzedaz\b|\bsprzedaz\b|\bsprzedam\b/.test(titleLine)) {
    return { keep: false, reason: "sale listing", pageTitle, h1 };
  }
  if (/\bpokoj\b|\bpokoju\b|\bpokoje jednoosobowe\b/.test(titleLine) && !/\bmieszkanie\b|\bapartament\b/.test(titleLine)) {
    return { keep: false, reason: "room listing", pageTitle, h1 };
  }

  if (!offer) {
    const firstPageChunk = `${titleLine} ${normalizedText.slice(0, 8000)}`;
    const locationLine = `${titleLine} ${toAscii(url)}`.toLowerCase();
    const relevantLocation = TARGET_LOCATION_PATTERN.test(locationLine);
    const excludedLocation = EXCLUDED_LOCATION_PATTERN.test(locationLine);
    const desiredRooms = DESIRED_ROOMS_PATTERN.test(titleLine);
    const unwantedRooms = UNWANTED_ROOMS_PATTERN.test(titleLine);
    const areaM2 = extractAreaM2(titleLine);
    const tooSmall = areaM2 !== null && areaM2 < MIN_AREA_M2;
    const rental = /\bwynajem\b|\bwynajme\b|\bwynajecia\b|\bwynajecie\b/.test(firstPageChunk);
    const dwelling = /\bmieszkanie\b|\bapartament\b/.test(firstPageChunk);
    if (!relevantLocation || excludedLocation || !desiredRooms || unwantedRooms || tooSmall || !rental || !dwelling) {
      return { keep: false, reason: "not a matching rental", pageTitle, h1 };
    }
  }

  return { keep: true, reason: "ok", pageTitle, h1, finalUrl: canonicalUrl(finalUrl) };
}

function extractUrls(html, baseUrl) {
  const decoded = decodeEntities(html);
  const candidates = new Set();
  const hrefPattern = /href=["']([^"']+)["']/gi;
  const rawPattern = /https?:\/\/[^\s"'<>\\]+/gi;

  for (const match of decoded.matchAll(hrefPattern)) candidates.add(match[1]);
  for (const match of decoded.matchAll(rawPattern)) candidates.add(match[0]);

  return [...candidates]
    .map((candidate) => {
      try {
        let value = candidate;
        if (value.startsWith("/url?") || value.startsWith("https://www.google.com/url?")) {
          const parsed = new URL(value, "https://www.google.com");
          value = parsed.searchParams.get("q") || parsed.searchParams.get("url") || value;
        }
        if (value.includes("bing.com/ck/a")) return null;
        value = decodeURIComponent(value);
        value = value.replace(/[)\],.]+$/, "");
        const parsed = new URL(value, baseUrl);
        parsed.hash = "";
        return parsed.toString();
      } catch {
        return null;
      }
    })
    .filter(Boolean)
    .filter(allowedUrl)
    .filter(isLikelyOfferUrl);
}

async function searchCandidates() {
  const urls = new Set();

  for (const directUrl of DIRECT_SEARCHES) {
    try {
      const page = await fetchPage(directUrl);
      const found = extractUrls(page.body, page.finalUrl || directUrl);
      for (const url of found) urls.add(canonicalUrl(url));
      console.log(`Direct source: ${normalizedHost(directUrl)} ${found.length}`);
    } catch (error) {
      console.warn(`Direct source failed: ${directUrl} :: ${error.message}`);
    }
  }

  for (const query of SEARCHES) {
    const searchUrls = [
      `https://www.bing.com/search?q=${encodeURIComponent(query)}&count=20&setlang=pl`,
      `https://www.google.com/search?q=${encodeURIComponent(query)}&num=20&hl=pl`,
    ];

    for (const searchUrl of searchUrls) {
      try {
        const page = await fetchPage(searchUrl);
        for (const url of extractUrls(page.body, page.finalUrl || searchUrl)) urls.add(canonicalUrl(url));
      } catch (error) {
        console.warn(`Search failed: ${searchUrl} :: ${error.message}`);
      }
    }
  }
  return [...urls];
}

function extractArrayBlock(source, declaration) {
  const start = source.indexOf(declaration);
  if (start === -1) throw new Error(`Missing ${declaration}`);
  const arrayStart = source.indexOf("[", start);
  let depth = 0;
  let inString = null;
  let escaped = false;
  for (let index = arrayStart; index < source.length; index += 1) {
    const char = source[index];
    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (char === "\\") {
        escaped = true;
      } else if (char === inString) {
        inString = null;
      }
      continue;
    }
    if (char === "\"" || char === "'" || char === "`") {
      inString = char;
      continue;
    }
    if (char === "[") depth += 1;
    if (char === "]") depth -= 1;
    if (depth === 0) {
      return {
        start,
        end: source.indexOf(";", index) + 1,
        value: source.slice(arrayStart, index + 1),
      };
    }
  }
  throw new Error(`Could not parse ${declaration}`);
}

function parseOffers(source) {
  const block = extractArrayBlock(source, "const offers =");
  const offers = vm.runInNewContext(`(${block.value})`, {});
  return { offers, block };
}

function slugify(value) {
  return toAscii(value).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 48);
}

function shortHash(value) {
  return crypto.createHash("sha1").update(value).digest("hex").slice(0, 8);
}

function extractFacts(text) {
  const ascii = toAscii(text);
  const facts = [];
  const area = ascii.match(/\b(\d{2,3}(?:[,.]\d+)?)\s*m(?:2|\b)/i);
  const rooms = ascii.match(/\b([3-4])\s*[- ]?(?:pokoje|pok\.?|pokojowe|pokojowy)\b/i);
  const price = ascii.match(/\b(\d[\d\s]{3,6})\s*zl\b/i);
  if (area) facts.push(`${area[1].replace(",", ".")} m2`);
  if (rooms) facts.push(`${rooms[1]} pokoje`);
  if (price) facts.push(`${price[1].replace(/\s+/g, " ")} zl`);
  facts.push("auto 15 min");
  return [...new Set(facts)].slice(0, 5);
}

function buildOffer(url, page, now) {
  const title = toAscii(page.h1 || page.pageTitle || "Nowa oferta").replace(/\s+\|\s+.*$/, "").slice(0, 80);
  const provider = normalizedHost(url).split(".")[0];
  const id = `auto-${provider}-${slugify(title) || shortHash(url)}-${shortHash(url)}`;
  const facts = extractFacts(`${page.h1} ${page.pageTitle}`);
  return {
    id,
    status: "verify",
    fromBrief: false,
    discoveredAt: now,
    title,
    source: "auto 15 min",
    url,
    facts,
    pros: ["Nowy wynik z automatycznego przegladu; sprawdzic dopasowanie do must-have."],
    cons: ["Do weryfikacji: aktualnosc, pelny koszt, winda albo parter z ogrodem, dwie sypialnie i pies."],
  };
}

function quote(value) {
  return JSON.stringify(value);
}

function arrayLiteral(values, indent = 4) {
  const prefix = " ".repeat(indent);
  const itemPrefix = " ".repeat(indent + 2);
  if (!values.length) return "[]";
  if (values.length === 1 && `${prefix}${quote(values[0])}`.length <= 110) return `[${quote(values[0])}]`;
  return `[\n${values.map((value) => `${itemPrefix}${quote(value)},`).join("\n")}\n${prefix}]`;
}

function serializeOffer(offer) {
  const lines = ["  {"];
  for (const field of ["id", "status"]) lines.push(`    ${field}: ${quote(offer[field])},`);
  lines.push(`    fromBrief: ${offer.fromBrief ? "true" : "false"},`);
  if (offer.discoveredAt) lines.push(`    discoveredAt: ${quote(offer.discoveredAt)},`);
  for (const field of ["title", "source", "url"]) lines.push(`    ${field}: ${quote(offer[field])},`);
  lines.push(`    facts: ${arrayLiteral(offer.facts || [])},`);
  lines.push(`    pros: ${arrayLiteral(offer.pros || [])},`);
  lines.push(`    cons: ${arrayLiteral(offer.cons || [])},`);
  lines.push("  }");
  return lines.join("\n");
}

function replaceSearchState(source, now) {
  const replacement = `const searchState = {\n  lastUpdatedAt: ${quote(now)},\n  intervalMinutes: ${INTERVAL_MINUTES},\n};`;
  if (/const searchState = \{[\s\S]*?\};/.test(source)) {
    return source.replace(/const searchState = \{[\s\S]*?\};/, replacement);
  }
  return source.replace(/(\/\/ @ogloszenie archiwalne[^\n]*\n)/, `$1${replacement}\n\n`);
}

function replaceOffers(source, block, offers) {
  const serialized = `const offers = [\n${offers.map(serializeOffer).join(",\n")},\n];`;
  return `${source.slice(0, block.start)}${serialized}${source.slice(block.end)}`;
}

function assetVersion(now) {
  return now.replace(/[^0-9A-Za-z]/g, "").slice(0, 15);
}

function replaceAssetVersions(source, now) {
  const version = assetVersion(now);
  return source
    .replace(/href="\.\/styles\.css(?:\?v=[^"]*)?"/, `href="./styles.css?v=${version}"`)
    .replace(/src="\.\/app\.js(?:\?v=[^"]*)?"/, `src="./app.js?v=${version}"`);
}

async function main() {
  const now = new Date().toISOString();
  const source = fs.readFileSync(APP_FILE, "utf8");
  const { offers, block } = parseOffers(source);
  const existingKeys = new Set(offers.map((offer) => canonicalKey(offer.url)));
  const existingSignatures = new Set(offers.map(offerSignature).filter(Boolean));
  const kept = [];
  const removed = [];

  for (const offer of offers) {
    try {
      const response = await fetchPage(offer.url);
      const page = classifyPage({ offer, ...response });
      if (page.keep) {
        const keptOffer = { ...offer, url: page.finalUrl || offer.url };
        kept.push(keptOffer);
        const signature = offerSignature(keptOffer);
        if (signature) existingSignatures.add(signature);
      } else {
        removed.push({ id: offer.id, title: offer.title, reason: page.reason });
      }
    } catch (error) {
      console.warn(`Validation skipped for ${offer.id}: ${error.message}`);
      kept.push(offer);
    }
  }

  const candidates = await searchCandidates();
  const additions = [];
  const seenCandidateKeys = new Set(existingKeys);

  for (const url of candidates) {
    if (additions.length >= MAX_NEW_OFFERS) break;
    const key = canonicalKey(url);
    if (seenCandidateKeys.has(key)) continue;
    seenCandidateKeys.add(key);

    try {
      const response = await fetchPage(url);
      const page = classifyPage({ url, ...response });
      if (!page.keep) continue;
      const finalKey = canonicalKey(page.finalUrl || url);
      if (existingKeys.has(finalKey)) continue;
      const offer = buildOffer(page.finalUrl || url, page, now);
      const signature = offerSignature(offer);
      if (signature && existingSignatures.has(signature)) continue;
      if (signature) existingSignatures.add(signature);
      additions.push(offer);
    } catch (error) {
      console.warn(`Candidate skipped ${url}: ${error.message}`);
    }
  }

  const nextOffers = [...additions, ...kept];
  let nextSource = replaceOffers(source, block, nextOffers);
  nextSource = replaceSearchState(nextSource, now);

  console.log(`Validated: ${offers.length}`);
  console.log(`Removed: ${removed.length}`);
  for (const item of removed) console.log(`- remove ${item.id}: ${item.reason}`);
  console.log(`Added: ${additions.length}`);
  for (const item of additions) console.log(`- add ${item.id}: ${item.title} :: ${item.url}`);

  if (!dryRun) {
    fs.writeFileSync(APP_FILE, nextSource);
    if (fs.existsSync(INDEX_FILE)) {
      fs.writeFileSync(INDEX_FILE, replaceAssetVersions(fs.readFileSync(INDEX_FILE, "utf8"), now));
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

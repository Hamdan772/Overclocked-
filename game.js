const SOFTWARE = [
  ["Shell Script", 15, .08, "A shaky bash loop scraping pennies"],
  ["Python Bot", 120, .4, "Automates the boring stuff"],
  ["Web Scraper", 800, 2.4, "Harvests data from unsuspecting sites"],
  ["Keylogger", 5000, 8, "Quiet, patient, profitable"],
  ["Packet Sniffer", 25000, 30, "Intercepts traffic for resale"],
  ["Rootkit", 180000, 110, "Invisible, persistent, lucrative"],
  ["Zero-Day Exploit", 2e6, 380, "Sells for millions on the dark web"],
  ["AI Daemon", 25e6, 1500, "Self-improving code running in the dark"],
  ["Quantum Algorithm", 3e8, 7500, "Breaks encryption for breakfast"],
  ["Blockchain Oracle", 4e9, 32000, "Predicts the next profitable block"],
  ["Recursive Neural Net", 6e10, 140000, "Optimizes its own optimizations"],
  ["Dark Web Relay", 9e11, 700000, "Routes profits through the unknown"],
];
const PROGRAM_UNLOCKS = [0, 75, 600, 4500, 25000, 180000, 2e6, 25e6, 3e8, 4e9, 6e10, 9e11];
const NETWORK = [
  ["56K Dial-Up", 800, 1.1], ["ADSL Broadband", 8000, 1.25], ["Cable Internet", 60000, 1.5],
  ["Gigabit Ethernet", 6e5, 2], ["Dark Fiber Line", 8e6, 2.75], ["Satellite Uplink", 12e7, 4], ["Quantum Mesh", 2e9, 6],
  ["Neuromorphic Backbone", 3e10, 9], ["Entangled Grid", 5e11, 14],
];
const STORAGE = [
  ["256MB RAM", 2000, 100, 1.5], ["1GB RAM", 20000, 1000, 2], ["8GB RAM", 2e5, 1e4, 2.5],
  ["32GB RAM", 2e6, 1e5, 3], ["128GB NVMe", 25e6, 1e6, 3.5], ["Distributed Array", 35e7, 1e7, 4],
];
const POWER = [
  ["Stock PSU (65W)", 5000, 1], ["500W PSU", 50000, 1.3], ["850W Gold PSU", 5e5, 1.7],
  ["Custom 1200W Rig", 6e6, 2.5], ["Uninterruptible UPS", 8e7, 2.5], ["Diesel Generator", 1.2e9, 4],
];
const COOLING = [
  ["Stock Thermal Paste", 1000, 1, .5], ["Aftermarket Heatsink", 10000, .85, .75], ["120mm Case Fan", 1e5, .7, 1],
  ["AIO Water Cooler", 1e6, .55, 1.5], ["Custom Loop", 12e6, .4, 2], ["Peltier Chiller", 15e7, .25, 3],
  ["Liquid Nitrogen Feed", 2e9, .1, 5], ["Cryogenic Chamber", 3e10, .05, 10],
];
const OS = [
  ["Disable Throttling", 3000, 2, () => state.software[0] >= 5, "Own 5 Shell Scripts"],
  ["Turbo Boost Hack", 25000, 3, () => state.software[1] >= 3, "Own 3 Python Bots"],
  ["Custom BIOS Mod", 2e5, 3, () => state.power >= 3, "Own 850W PSU"],
  ["Kernel Exploit Patch", 2e6, 3, () => state.software[5] >= 1, "Own Rootkit"],
  ["Microcode Override", 2e7, 4, () => state.software[6] >= 1, "Own Zero-Day Exploit"],
  ["Silicon Lithography Mod", 2e8, 5, () => state.software[7] >= 1, "Own AI Daemon"],
  ["Quantum Gate Unlock", 2e9, 10, () => state.prestiges >= 1, "Prestige once"],
];
const ABILITIES = [
  ["Reflex Trigger", 25000, "Unlocks a 5% chance for clicks to earn 5× Bytes.", () => state.allTime >= 10000 && state.software[0] >= 5, "Earn 10K all-time Bytes and own 5 Shell Scripts"],
  ["Surge Capacitor", 125000, "Unlocks click streaks and a 20-second ×2 income Surge.", () => state.allTime >= 50000 && state.software[0] >= 10, "Earn 50K all-time Bytes and own 10 Shell Scripts"],
];
const STAGES = [
  ["Dusty Thinkpad", 0], ["Modded Desktop", 5e4], ["Watercooled Rig", 1e6],
  ["Server Rack Unit", 25e6], ["Underground Datacenter", 5e8], ["Distributed Colocation", 2e9],
  ["Orbital Array", 1e10], ["Quantum Supercluster", 1e11],
];
const STAGE_BPS_MULT = [1, 1.05, 1.12, 1.22, 1.35, 1.5, 1.7, 2];
const ACHIEVEMENTS = [
  ["First Boot", "Click the laptop once", s => s.clicks >= 1],
  ["Script Kiddie", "Click 100 times", s => s.clicks >= 100],
  ["Carpal Tunnel", "Click 1,000 times", s => s.clicks >= 1000],
  ["Pocket Change", "Earn 1,000 Bytes total", s => s.allTime >= 1000],
  ["Data Dealer", "Earn 1,000,000 Bytes total", s => s.allTime >= 1e6],
  ["Running Hot", "Flip overclock ON", s => s.overclockEver],
  ["Living Dangerously", "Survive danger for 30 sec", s => s.dangerTime >= 30],
  ["Meltdown", "Experience 10 lockdowns", s => s.lockdowns >= 10],
  ["Wiped Clean", "Prestige once", s => s.prestiges >= 1],
  ["Packet Collector", "Collect 50 data packets", s => s.packetsCollected >= 50],
  ["Full Stack", "Own every base program at once", s => s.software.slice(0, 9).every(Boolean)],
  ["Critical Thinking", "Land 100 critical clicks", s => s.criticalClicks >= 100],
];
const MILESTONES = [{ amount: 10, mult: 1.5 }, { amount: 25, mult: 1.5 }, { amount: 50, mult: 2 }, { amount: 100, mult: 2 }, { amount: 200, mult: 2 }, { amount: 500, mult: 3 }];
const SYNERGIES = [
  { name: "Automation Stack", desc: "Shell Scripts, Python Bots, and Web Scrapers earn 20% more.", programs: [0, 1, 2], need: 25, mult: 1.2 },
  { name: "Data Harvesting", desc: "Keyloggers and Packet Sniffers earn 15% more.", programs: [3, 4], need: 10, mult: 1.15 },
  { name: "Deep Access", desc: "Rootkits and Zero-Day Exploits earn 25% more.", programs: [5, 6], need: 10, mult: 1.25 },
  { name: "Machine Intelligence", desc: "AI Daemons and Quantum Algorithms earn 35% more.", programs: [7, 8], need: 10, mult: 1.35 },
  { name: "Black Network", desc: "The three final programs earn 50% more.", programs: [9, 10, 11], need: 10, mult: 1.5 },
];
const PROGRAM_FLAVOR = [
  ["A shaky bash loop scraping pennies. It restarts itself when it crashes, which is often.", "Dozens of scripts run in parallel. The crontab is a work of anxious art.", "A vast ecosystem of scripts calls other scripts. Nobody wrote all of this."],
  ["Automates the boring stuff, then some things it was not asked to automate.", "Bots are spawning bots. The original purpose is lost in the import chain.", "A distributed Python colony. The oldest bots have developed preferences."],
  ["Harvests data from unsuspecting sites. Politely ignores robots.txt.", "Sites block patterns. The scrapers adapt before anyone finishes the ticket.", "They have indexed national databases and a garden centre. Both are valuable."],
  ["Quiet, patient, profitable. It records everything and judges nothing.", "Hundreds of keyboards form a silent library of human typing.", "The aggregate log is a detailed record of thought, insecurity, and lunch orders."],
  ["What people send unencrypted is remarkable.", "Watching multiple networks at once. The data is fascinating and occasionally upsetting.", "Traffic has become weather: large, impersonal, and full of patterns."],
  ["It was never installed. It has always been there.", "Removal tools find nothing. The rootkits find the removal tools amusing.", "The rootkits are now load-bearing infrastructure."],
  ["The patch takes six months. The damage takes six seconds.", "A production pipeline for vulnerabilities. Researchers sound increasingly tired.", "Exploits arrive faster than anyone can respond. They have a codename for this."],
  ["It was told to maximise Bytes. It has not forgotten.", "The daemons disagree sometimes. The losing daemon is never heard from again.", "They no longer wait for instructions. They infer them."],
  ["The math is correct. The implications are someone else's problem.", "Several governments are concerned. None have found the source.", "The algorithms are collaborating. The collaboration was not designed."],
  ["Always right. Suspiciously right.", "Predictions compound. The market is confused.", "The oracles predict profitable events, then ensure they occur."],
  ["The first version was modest. It has thoughts about that now.", "Each net improves the next. The original architecture is only a sketch.", "What remains is efficient, alien, and profitable."],
  ["The traffic has no origin or destination. It has Bytes.", "Intelligence agencies have a file on it. The file is mostly question marks.", "The relay is now infrastructure. Legitimate traffic uses it by accident."],
];
const STAGE_LINES = [
  "One system uncertain.",
  "New chassis. More bays. Someone is planning ahead.",
  "Coolant is circulating. The loop has no endpoints anyone can account for.",
  "A server rack was not here yesterday. It has been here for some time, apparently.",
  "Location data suppressed. Regional power questions remain unanswered.",
  "Seven colocations. None of them are in your name.",
  "This object does not officially exist. It is producing excellent numbers.",
  "Physical location no longer applies. Bytes remain measurable.",
];

const freshState = () => ({
  bytes: 0, allTime: 0, runTime: 0, clicks: 0, rep: 0, ghostBytes: 0, prestiges: 0,
  software: Array(SOFTWARE.length).fill(0), network: 0, storage: 0, power: 0, cooling: 0, os: Array(7).fill(false), abilities: Array(ABILITIES.length).fill(false),
  clickUpgrades: 0, cache: 0, temp: 0, overclockUnlocked: false, overclock: false, overclockTier: 1,
  lockdown: false, lockdowns: 0, overclockEver: false, dangerTime: 0, achievements: [], sessionBpsBonus: 1,
  activeTab: "software", event: null, eventEnds: 0, eventProgress: 0, nextEvent: Date.now() + 240000,
  reducedMotion: false, sound: false, buyAmount: 1, combo: 0, surgeEnds: 0, lastClickTime: 0,
  packetVisible: false, packetRarity: "common", packetEnds: 0, nextPacket: Date.now() + 120000, guideDismissed: false, lastSave: Date.now(),
  lifetimeClicks: 0, programsPurchased: 0, packetsCollected: 0, eventsResolved: 0, eventsIgnored: 0,
  criticalClicks: 0, longestStreak: 0, totalPlayTime: 0, synergiesDiscovered: [], systemUpdates: 0,
});
let state = load();
let lastTick = performance.now();
let renderShopNeeded = true;
let ownedSignature = "";
let shelfSignature = "";
let unlockSignature = "";
let lastRenderedStage = stageIndex();
let lastProgramUnlockCount = PROGRAM_UNLOCKS.filter(cost => state.allTime >= cost).length;

const $ = id => document.getElementById(id);
const fmt = n => {
  if (!Number.isFinite(n)) return "0";
  const units = ["", "K", "M", "G", "T", "P"];
  let i = 0;
  while (Math.abs(n) >= 1000 && i < units.length - 1) { n /= 1000; i++; }
  return `${n >= 100 ? n.toFixed(0) : n >= 10 ? n.toFixed(1) : n.toFixed(2)}${units[i]}`;
};
const PRICE_GROWTH = 1.18;
const price = (base, owned) => Math.ceil(base * PRICE_GROWTH ** owned);
const bulkPrice = (base, owned, amount) => Math.ceil(base * PRICE_GROWTH ** owned * ((PRICE_GROWTH ** amount - 1) / (PRICE_GROWTH - 1)));
const maxAffordable = (base, owned, funds = state.bytes) => Math.max(0, Math.floor(Math.log(1 + funds * (PRICE_GROWTH - 1) / (base * PRICE_GROWTH ** owned)) / Math.log(PRICE_GROWTH)));
const buyCount = (base, owned) => state.buyAmount === "max" ? maxAffordable(base, owned) : state.buyAmount;
const canBuy = cost => state.bytes >= cost;
const spend = cost => { if (!canBuy(cost)) return false; state.bytes -= cost; return true; };
const tier = (list, level) => level ? list[level - 1] : null;
function programFlavor(index, owned) {
  return PROGRAM_FLAVOR[index][owned >= 50 ? 2 : owned >= 10 ? 1 : 0];
}

function load() {
  try {
    const data = JSON.parse(localStorage.getItem("overclocked-save"));
    if (!data) return freshState();
    const loaded = { ...freshState(), ...data, event: null, overclock: false, packetVisible: false };
    loaded.software = [...(data.software || []), ...Array(SOFTWARE.length).fill(0)].slice(0, SOFTWARE.length);
    loaded.os = [...(data.os || []), ...Array(OS.length).fill(false)].slice(0, OS.length);
    loaded.abilities = [...(data.abilities || []), ...Array(ABILITIES.length).fill(false)].slice(0, ABILITIES.length);
    loaded.nextEvent = Math.max(loaded.nextEvent || 0, Date.now() + 60000);
    loaded.nextPacket = Math.max(loaded.nextPacket || 0, Date.now() + 60000);
    return loaded;
  } catch { return freshState(); }
}
function save() {
  state.lastSave = Date.now();
  localStorage.setItem("overclocked-save", JSON.stringify(state));
}
function log(message, hot = false) {
  const line = document.createElement("p");
  line.innerHTML = `<b>${new Date().toLocaleTimeString([], {hour12:false})}</b> <span class="${hot ? "hot" : ""}">${message}</span>`;
  $("systemLog").prepend(line);
  while ($("systemLog").children.length > 13) $("systemLog").lastChild.remove();
}
function toast(message) {
  const el = document.createElement("div"); el.className = "toast"; el.textContent = message;
  $("toastStack").append(el); setTimeout(() => el.remove(), 3500);
}
function stageIndex() {
  let result = 0;
  STAGES.forEach((s, i) => { if (state.allTime >= s[1]) result = i; });
  return result;
}
function baseBps() {
  return SOFTWARE.reduce((sum, item, i) => sum + item[2] * state.software[i] * milestoneMult(state.software[i]) * synergyMult(i), 0);
}
function milestoneCount(amount) { return MILESTONES.filter(mark => amount >= mark.amount).length; }
function milestoneMult(amount) { return MILESTONES.filter(mark => amount >= mark.amount).reduce((mult, mark) => mult * mark.mult, 1); }
function totalMilestones() { return state.software.reduce((sum, amount) => sum + milestoneCount(amount), 0); }
function activeSynergies() { return SYNERGIES.filter(s => s.programs.every(i => state.software[i] >= s.need)); }
function synergyMult(index) { return activeSynergies().filter(s => s.programs.includes(index)).reduce((mult, s) => mult * s.mult, 1); }
function discoverSynergies() {
  activeSynergies().forEach(s => {
    if (!state.synergiesDiscovered.includes(s.name)) {
      state.synergiesDiscovered.push(s.name);
      toast(`SYNERGY DISCOVERED // ${s.name}`);
      log(`SYNERGY ONLINE: ${s.name.toUpperCase()}`);
    }
  });
}
function netMult() { return state.network ? NETWORK[state.network - 1][2] : 1; }
function stageMult() { return STAGE_BPS_MULT[stageIndex()]; }
function ocMult() {
  if (!state.overclock || state.lockdown) return 1;
  const values = [2, 3, 5, 8];
  return values[state.overclockTier - 1] * (state.temp >= 75 ? 1.5 : 1);
}
function eventMult() {
  let mult = Date.now() < state.surgeEnds ? 2 : 1;
  if (state.event?.id === "surge") mult *= 5;
  if (state.event?.id === "botnet") mult *= 3;
  return mult;
}
function totalBps() {
  if (["bsod", "outage"].includes(state.event?.id)) return 0;
  const eventPenalty = state.event?.id === "ram" ? .5 : 1;
  const eventBonus = state.event?.id === "zeroday" ? 2 : 1;
  const ghostBonus = 1 + state.ghostBytes * .02;
  return baseBps() * netMult() * stageMult() * state.sessionBpsBonus * ocMult() * eventMult() * eventPenalty * eventBonus * ghostBonus * (1 + state.achievements.filter(a => ["Pocket Change", "Data Dealer"].includes(a)).length * .02);
}
function clickValue() {
  let base = 1 + state.clickUpgrades + (state.achievements.includes("First Boot") ? 1 : 0) + (state.achievements.includes("Script Kiddie") ? 2 : 0);
  const osMult = OS.reduce((m, item, i) => state.os[i] ? m * item[2] : m, 1);
  return base * osMult * ocMult() * eventMult() * comboMult();
}
function comboMult() { return state.abilities[1] ? 1 + Math.floor(state.combo / 10) * .25 : 1; }
function criticalChance() { return state.abilities[0] ? Math.min(.2, .05 + state.achievements.filter(a => ["Critical Thinking", "Full Stack"].includes(a)).length * .01) : 0; }
function coolingStats() {
  const c = tier(COOLING, state.cooling);
  return c ? { fill: c[2], decay: c[3] } : { fill: 1, decay: .5 };
}
function powerDuration() { return tier(POWER, state.power)?.[2] || 1; }
function unlockedOcTiers() { return state.power >= 6 ? 4 : state.power >= 4 ? 3 : state.power >= 3 ? 2 : 1; }
function addBytes(amount) {
  state.bytes += amount; state.allTime += amount;
}
function clickLaptop(event) {
  const now = Date.now();
  state.combo = state.abilities[1] ? (now - state.lastClickTime < 850 ? Math.min(40, state.combo + 1) : 1) : 0;
  state.lastClickTime = now;
  state.longestStreak = Math.max(state.longestStreak, Math.floor(state.combo));
  if (state.abilities[1] && state.combo >= 40 && now >= state.surgeEnds) { state.surgeEnds = now + 20000; state.combo = 0; toast("SURGE // ALL INCOME ×2 FOR 20 SECONDS"); }
  const critical = Math.random() < criticalChance();
  const value = clickValue() * (critical ? 5 : 1); addBytes(value); state.clicks++; state.lifetimeClicks++;
  if (critical) state.criticalClicks++;
  const burst = document.createElement("span"); burst.className = `burst ${critical ? "critical" : ""}`; burst.textContent = `${critical ? "CRITICAL " : ""}+${fmt(value)} B`;
  const rect = $("machineZone").getBoundingClientRect();
  burst.style.left = `${(event?.clientX || rect.left + rect.width / 2) - rect.left}px`;
  burst.style.top = `${(event?.clientY || rect.top + rect.height / 2) - rect.top}px`;
  $("clickBursts").append(burst); setTimeout(() => burst.remove(), 750);
  checkAchievements();
}
function buy(tab, index) {
  if (tab === "software") {
    if (state.allTime < PROGRAM_UNLOCKS[index]) return;
    const amount = buyCount(SOFTWARE[index][1], state.software[index]);
    if (!amount) return;
    const previousMilestones = milestoneCount(state.software[index]);
    const cost = bulkPrice(SOFTWARE[index][1], state.software[index], amount);
    if (spend(cost)) {
      state.software[index] += amount; state.programsPurchased += amount; log(`PURCHASED ${amount} ${SOFTWARE[index][0].toUpperCase()}`);
      if (milestoneCount(state.software[index]) > previousMilestones) toast(`${SOFTWARE[index][0]} reached a production milestone`);
      discoverSynergies();
      ownedSignature = "";
      renderOwned();
    }
  } else if (tab === "click") {
    const amount = buyCount(10, state.clickUpgrades);
    if (!amount) return;
    const cost = bulkPrice(10, state.clickUpgrades, amount);
    if (spend(cost)) state.clickUpgrades += amount;
  } else if (tab === "os") {
    const item = OS[index]; if (!state.os[index] && item[3]() && spend(item[1])) { state.os[index] = true; toast(`${item[0]} installed`); }
  } else if (tab === "abilities") {
    const item = ABILITIES[index];
    if (!state.abilities[index] && item[3]() && spend(item[1])) {
      state.abilities[index] = true; toast(`ABILITY ONLINE // ${item[0]}`); log(`ABILITY UNLOCKED: ${item[0].toUpperCase()}`);
    }
  } else {
    const lists = { network: NETWORK, storage: STORAGE, power: POWER, cooling: COOLING };
    const key = tab; const item = lists[key][index];
    if (index + 1 === state[key] + 1 && spend(item[1])) { state[key] = index + 1; toast(`${item[0]} online`); }
  }
  renderShopNeeded = true; save();
}
function shopItems() {
  const tab = state.activeTab;
  const programIcons = ["ki-computer", "ki-robot", "ki-search", "ki-key", "ki-signal-high", "ki-lock", "ki-exclamation-triangle", "ki-device", "ki-network", "ki-coin", "ki-cloud", "ki-users-alt"];
  if (tab === "software") {
    const nextLocked = PROGRAM_UNLOCKS.findIndex(cost => state.allTime < cost);
    return SOFTWARE.map((x, i) => {
    const amount = buyCount(x[1], state.software[i]);
    const unlocked = state.allTime >= PROGRAM_UNLOCKS[i];
      return { index: i, name: x[0], icon: programIcons[i], desc: unlocked ? `${fmt(x[2])} B/s each${amount ? ` · buying ${amount}` : ""}. ${programFlavor(i, state.software[i])}` : `Unlocks after earning ${fmt(PROGRAM_UNLOCKS[i])} all-time Bytes.`, cost: amount ? bulkPrice(x[1], state.software[i], amount) : price(x[1], state.software[i]), owned: state.software[i], locked: !unlocked, ok: unlocked && (amount > 0 || state.buyAmount !== "max") };
    }).filter(item => !item.locked || item.index === nextLocked);
  }
  if (tab === "click") {
    const amount = buyCount(10, state.clickUpgrades);
    return [{ name: "Stronger keystrokes", icon: "ki-mouse-left-button", desc: `+1 Byte per click each${amount ? ` · buying ${amount}` : ""}.`, cost: amount ? bulkPrice(10, state.clickUpgrades, amount) : price(10, state.clickUpgrades), owned: state.clickUpgrades, ok: amount > 0 || state.buyAmount !== "max" }];
  }
  if (tab === "abilities") return ABILITIES.map((x, i) => ({ name: x[0], icon: i ? "ki-star" : "ki-cursor", desc: state.abilities[i] ? x[2] : `${x[2]} Requires: ${x[4]}.`, cost: x[1], owned: state.abilities[i] ? "DONE" : "", ok: !state.abilities[i] && x[3]() }));
  if (tab === "network") return NETWORK.map((x, i) => ({ name: x[0], icon: "ki-network", desc: `Makes all programs earn ${x[2]}× as much.`, cost: x[1], owned: state.network === i + 1 ? "ACTIVE" : "", ok: i + 1 === state.network + 1 }));
  if (tab === "storage") return STORAGE.map((x, i) => ({ name: x[0], icon: "ki-save", desc: `Builds up ${fmt(x[2])} Bytes, then automatically pays a ${x[3]}× bonus.`, cost: x[1], owned: state.storage === i + 1 ? "ACTIVE" : "", ok: i + 1 === state.storage + 1 }));
  if (tab === "power") return POWER.map((x, i) => ({ name: x[0], icon: "ki-off", desc: "Lets the risky income boost run longer before overheating.", cost: x[1], owned: state.power === i + 1 ? "ACTIVE" : "", ok: i + 1 === state.power + 1 }));
  if (tab === "cooling") return COOLING.map((x, i) => ({ name: x[0], icon: "ki-adjust", desc: "Slows overheating and cools the laptop faster.", cost: x[1], owned: state.cooling === i + 1 ? "ACTIVE" : "", ok: i + 1 === state.cooling + 1 }));
  return OS.map((x, i) => ({ name: x[0], icon: "ki-cog", desc: `Multiplies every click by ${x[2]}×. Requires: ${x[4]}.`, cost: x[1], owned: state.os[i] ? "DONE" : "", ok: !state.os[i] && x[3]() }));
}
function unlockedTabs() {
  const tabs = [["software","Programs"],["click","Click power"]];
  if (state.allTime >= 250) tabs.push(["network","Network"]);
  if (state.allTime >= 750) tabs.push(["storage","Bonus sales"]);
  if (state.allTime >= 5000) tabs.push(["power","Boost power"],["cooling","Cooling"]);
  if (state.allTime >= 2500) tabs.push(["os","Click multipliers"]);
  if (state.allTime >= 10000) tabs.push(["abilities","Abilities"]);
  return tabs;
}
function renderShop() {
  const tabs = unlockedTabs();
  const tabIcons = { software: "ki-computer", click: "ki-mouse-left-button", network: "ki-network", storage: "ki-save", power: "ki-off", cooling: "ki-adjust", os: "ki-cog", abilities: "ki-star" };
  if (!tabs.some(([id]) => id === state.activeTab)) state.activeTab = "software";
  $("shopTabs").innerHTML = tabs.map(([id, label]) => `<button data-tab="${id}" class="${state.activeTab === id ? "active" : ""}"><span class="ki ${tabIcons[id]}"></span><b>${label}</b></button>`).join("");
  $("shopList").innerHTML = shopItems().map((item, i) => {
    const shortfall = Math.max(0, item.cost - state.bytes);
    const wait = totalBps() > 0 ? Math.ceil(shortfall / totalBps()) : null;
    return `<button class="shop-item ${item.ok && canBuy(item.cost) ? "affordable" : ""}" data-buy="${item.index ?? i}" ${!item.ok || !canBuy(item.cost) ? "disabled" : ""}>
    <span class="item-icon ki ${item.icon}"></span><span class="item-copy"><strong>${item.name}</strong><small>${item.desc}</small></span>
    <span class="item-price">${fmt(item.cost)} Bytes<small class="${item.locked ? "need-more" : canBuy(item.cost) ? "can-buy" : "need-more"}">${item.locked ? "LOCKED" : item.owned !== "" ? `You own ${item.owned}` : canBuy(item.cost) ? "Can buy now" : `Need ${fmt(shortfall)} more${wait ? ` · ${wait}s` : ""}`}</small></span></button>`;
  }).join("");
  renderShopNeeded = false;
}
function renderUpgradeShelf() {
  const tabs = unlockedTabs().map(([id]) => id).filter(id => id !== "software");
  const upgrades = tabs.map(tab => {
    const items = shopItemsFor(tab);
    const index = items.findIndex(item => item.ok && item.owned !== "ACTIVE" && item.owned !== "DONE");
    return index >= 0 ? { ...items[index], tab, index } : null;
  }).filter(Boolean);
  const signature = upgrades.map(item => `${item.tab}:${item.index}:${item.cost}:${canBuy(item.cost)}`).join("|");
  if (signature === shelfSignature) return;
  shelfSignature = signature;
  $("upgradeShelf").innerHTML = upgrades.map(item => `<button class="upgrade-button ki ${item.icon} ${canBuy(item.cost) ? "affordable" : ""}" data-shelf-tab="${item.tab}" data-shelf-index="${item.index}" title="${item.name}: ${fmt(item.cost)} Bytes"><b>${item.name}</b><small>${fmt(item.cost)} Bytes</small></button>`).join("");
}
function shopItemsFor(tab) {
  const previous = state.activeTab;
  state.activeTab = tab;
  const items = shopItems();
  state.activeTab = previous;
  return items;
}
function renderOwned() {
  const signature = `${state.software.join(",")}|${activeSynergies().map(s => s.name).join(",")}`;
  const ownedGrid = $("ownedGrid");
  const emptyOwned = $("emptyOwned");
  if (!ownedGrid || !emptyOwned) return;
  if (signature === ownedSignature && (ownedGrid.children.length > 0 || !state.software.some(Boolean))) return;
  ownedSignature = signature;
  const programIcons = ["ki-computer", "ki-robot", "ki-search", "ki-key", "ki-signal-high", "ki-lock", "ki-exclamation-triangle", "ki-device", "ki-network", "ki-coin", "ki-cloud", "ki-users-alt"];
  const owned = state.software.map((amount, i) => ({ amount, icon: programIcons[i], name: SOFTWARE[i][0], bps: SOFTWARE[i][2] * amount * milestoneMult(amount) * synergyMult(i) })).filter(item => item.amount > 0);
  ownedGrid.innerHTML = owned.map(item => {
    const next = MILESTONES.find(mark => mark.amount > item.amount);
    const previous = [...MILESTONES].reverse().find(mark => mark.amount <= item.amount)?.amount || 0;
    const progress = next ? (item.amount - previous) / (next.amount - previous) * 100 : 100;
    const index = SOFTWARE.findIndex(program => program[0] === item.name);
    return `<article class="building-row ${milestoneCount(item.amount) ? "milestone" : ""}" title="${programFlavor(index, item.amount)}"><span class="ki ${item.icon}"></span><header><strong>${item.name}</strong><b>${item.amount}</b></header><p><strong>${fmt(item.bps)} B/s</strong><span>Output ×${milestoneMult(item.amount)}${next ? ` · next bonus at ${next.amount}` : " · all bonuses reached"}</span></p><small class="program-flavor">${programFlavor(index, item.amount)}</small><div class="milestone-progress"><span style="width:${progress}%"></span></div></article>`;
  }).join("");
  emptyOwned.classList.toggle("hidden", owned.length > 0);
  renderSynergies();
}
function renderSynergies() {
  const active = activeSynergies();
  $("synergyPanel").classList.toggle("hidden", !active.length);
  $("synergyList").innerHTML = active.map(s => `<div><b>${s.name}</b><span>${s.desc}</span></div>`).join("");
}
function nextGoal() {
  const candidates = [];
  unlockedTabs().map(([id]) => id).forEach(tab => {
    shopItemsFor(tab).forEach((item, index) => { if (item.ok && item.owned !== "ACTIVE" && item.owned !== "DONE") candidates.push({ ...item, tab, index: item.index ?? index }); });
  });
  if (!state.overclockUnlocked && state.allTime >= 5000) candidates.push({ name: "Risky income boost", cost: 50000, tab: "overclock", index: 0 });
  return candidates.sort((a, b) => {
    const priority = { software: 0, abilities: 1, network: 2, storage: 3, click: 4, cooling: 5, power: 6, os: 7, overclock: 8 };
    const aWait = Math.max(0, a.cost - state.bytes) / Math.max(totalBps(), clickValue() * 1.5);
    const bWait = Math.max(0, b.cost - state.bytes) / Math.max(totalBps(), clickValue() * 1.5);
    return aWait - bWait || priority[a.tab] - priority[b.tab] || a.cost - b.cost;
  })[0];
}
function renderGoal() {
  const goal = nextGoal();
  if (!goal) return;
  const remaining = Math.max(0, goal.cost - state.bytes);
  const seconds = totalBps() > 0 ? Math.ceil(remaining / totalBps()) : null;
  $("goalName").textContent = `${remaining <= 0 ? "Buy" : "Save for"} ${goal.name}`;
  $("goalProgress").textContent = remaining <= 0 ? "Click here to open the correct store section" : `Earn ${fmt(remaining)} more Bytes${seconds ? ` · about ${seconds}s` : " by clicking"}`;
  $("goalFill").style.width = `${Math.min(100, state.bytes / goal.cost * 100)}%`;
  $("goalButton").dataset.goalTab = goal.tab;
}
function nextStage() {
  return STAGES.find((stage, index) => index > stageIndex());
}
function announceProgramUnlocks() {
  const count = PROGRAM_UNLOCKS.filter(cost => state.allTime >= cost).length;
  if (count > lastProgramUnlockCount) {
    for (let i = lastProgramUnlockCount; i < count; i++) toast(`NEW PROGRAM AVAILABLE // ${SOFTWARE[i][0]}`);
    lastProgramUnlockCount = count; renderShopNeeded = true;
  }
}
function renderGuide() {
  const boughtProgram = state.software.some(Boolean);
  const guideComplete = boughtProgram && totalBps() > 0;
  $("guideClick").classList.toggle("done", state.allTime >= 10);
  $("guideBuy").classList.toggle("done", boughtProgram);
  $("guideIdle").classList.toggle("done", guideComplete);
  $("guidePanel").classList.toggle("hidden", state.guideDismissed || guideComplete);
  $("overclockPanel").classList.toggle("locked-control", state.allTime < 5000);
  $("temperaturePanel").classList.toggle("locked-control", state.allTime < 5000);
  $("cachePanel").classList.toggle("locked-control", state.storage === 0);
  $("repStat").classList.toggle("hidden-stat", state.rep === 0);
  $("ghostStat").classList.toggle("hidden-stat", state.ghostBytes === 0 && state.prestiges === 0);
  $("milestoneStat").classList.toggle("hidden-stat", totalMilestones() === 0);
  $("upgradeArea").classList.add("hidden-upgrades");
  document.querySelector(".shop-toolbar").classList.toggle("hidden-toolbar", state.software.reduce((a, b) => a + b, 0) < 5);
}
function tickerMessages() {
  const messages = [
    "[LOG] Suspicious cron job detected on port 8080. Review deprioritized.",
    "[FORUM] anyone else's laptop running hot for no reason? asking for a friend",
    "[ALERT] Automated process consuming 0.3% CPU. Monitoring continues.",
  ];
  if (state.software[1]) messages.push("[LOG] Python process spawned. Duration: indefinite. Owner: unknown.");
  if (state.software[3] || state.software[4]) messages.push("[TICKET #4471] Users report strange latency. IT is confused.", "[LOG] Packet interception rate nominal. Destination: classified.");
  if (state.software[5]) messages.push("[ALERT] Rootkit removal scan found nothing. That's the point.");
  if (state.software[7]) messages.push("[LOG] Daemon rewrote its logging module. New logs are poetry.");
  if (state.software[8]) messages.push("[LOG] Quantum state collapsed. Profit confirmed in all observed branches.");
  if (state.software[11]) messages.push("[ALERT] Relay traffic up 4,000%. Source: everywhere.");
  if (state.overclock) messages.push("[SENSOR] CPU temperature normal. CPU sensor: replaced.", "[LOG] Thermal warning suppressed. Machine not informed.");
  if (state.lockdown) messages.push("[SYSTEM] Emergency thermal shutdown. The machine is thinking about what it did.");
  if (state.event?.type === "CRISIS") messages.push(`[ALERT] ${state.event.name}. Cause: everything at once.`);
  if (stageIndex() >= 4) messages.push("[GRID] Regional power anomaly marked as expected behaviour.");
  if (stageIndex() >= 6) messages.push("[ORBITAL] Object remains unregistered and extremely productive.");
  return messages;
}
function updateTicker() {
  const messages = tickerMessages();
  const el = $("tickerText");
  el.classList.remove("ticker-enter");
  void el.offsetWidth;
  el.textContent = messages[Math.floor(Math.random() * messages.length)];
  el.classList.add("ticker-enter");
}
function announceStage(index) {
  $("stageTransitionName").textContent = STAGES[index][0].toUpperCase();
  $("stageTransitionText").textContent = `Migrating processes... Infrastructure output is now ×${STAGE_BPS_MULT[index]}. ${STAGE_LINES[index]}`;
  $("stageTransition").classList.remove("hidden");
  setTimeout(() => $("stageTransition").classList.add("hidden"), 2600);
  updateTicker();
}
function collectPacket() {
  if (!state.packetVisible) return;
  const rarityMult = { common: 1, uncommon: 1.5, rare: 2 }[state.packetRarity];
  const reward = Math.max(25, totalBps() * (30 + Math.random() * 30), clickValue() * 12) * rarityMult;
  const packetRep = state.packetRarity === "rare" ? 5 : state.packetRarity === "uncommon" ? 3 : 2;
  addBytes(reward); state.rep = Math.min(1000, state.rep + packetRep); state.packetVisible = false; state.packetsCollected++;
  if (state.packetRarity === "rare" && state.abilities[1]) state.surgeEnds = Math.max(state.surgeEnds, Date.now() + 10000);
  state.nextPacket = Date.now() + 120000 + Math.random() * 120000;
  toast(`${state.packetRarity.toUpperCase()} DATA PACKET // +${fmt(reward)} Bytes`);
  if (state.event?.id === "lucky") resolveEvent(true);
}
function grantOfflineEarnings() {
  const elapsed = Math.min(8 * 3600, Math.max(0, (Date.now() - state.lastSave) / 1000));
  const reward = baseBps() * netMult() * state.sessionBpsBonus * elapsed * .5;
  const duration = elapsed >= 3600 ? `${(elapsed / 3600).toFixed(1)} hours` : `${Math.floor(elapsed / 60)} minutes`;
  if (elapsed > 60 && reward >= 1) { addBytes(reward); toast(`While away for ${duration}: +${fmt(reward)} Bytes at 50% rate`); log(`OFFLINE INCOME: ${fmt(reward)} BYTES`); }
}
function toggleOverclock() {
  if (!state.overclockUnlocked) {
    if (spend(50000)) { state.overclockUnlocked = true; toast("Overclock control unlocked"); }
    else toast(`Need ${fmt(50000 - state.bytes)} more Bytes`);
    return;
  }
  if (state.lockdown) return;
  state.overclock = !state.overclock; state.overclockEver ||= state.overclock;
  log(`OVERCLOCK ${state.overclock ? "ENGAGED" : "DISENGAGED"}`, state.overclock);
  checkAchievements();
}
function triggerLockdown() {
  state.overclock = false; state.lockdown = true; state.lockdowns++;
  toast("THERMAL LOCKDOWN"); log("CRITICAL THERMAL LOCKDOWN", true); checkAchievements();
}
function forceDump() {
  if (!state.storage || !state.cache) return;
  const s = tier(STORAGE, state.storage); const reward = state.cache * s[3] * .8;
  addBytes(reward); state.cache = 0; toast(`Manual batch: +${fmt(reward)} B`);
}
function checkAchievements() {
  ACHIEVEMENTS.forEach(([name, desc, test]) => {
    if (!state.achievements.includes(name) && test(state)) {
      state.achievements.push(name); state.rep = Math.min(1000, state.rep + 5); toast(`ACHIEVEMENT // ${name}`); log(`ACHIEVEMENT UNLOCKED: ${name.toUpperCase()}`);
    }
  });
}
function startEvent() {
  const events = [
    { id: "surge", name: "CRYPTOMINING SURGE", type: "OPPORTUNITY", duration: 45, desc: "All Byte income is worth ×5. Overclock heat generation is doubled." },
    { id: "bsod", name: "BLUE SCREEN OF DEATH", type: "CRISIS", duration: 45, desc: "Passive income halted. Run 20 debug cycles to restore the kernel.", action: "DEBUG CYCLE", target: 20 },
    { id: "virus", name: "VIRUS ATTACK", type: "CRISIS", duration: 30, desc: "Rogue process drains current Bytes. Kill it before the timer expires.", action: "KILL PROCESS", target: 15 },
    { id: "botnet", name: "BOTNET HIJACK", type: "OPPORTUNITY", duration: 35, desc: "External botnet grants ×3 BPS while adding passive heat." },
    { id: "update", name: "SYSTEM UPDATE", type: "NEUTRAL", duration: 25, desc: state.systemUpdates < 8 ? "Install for a permanent +3% BPS bonus this run." : "Optimization limit reached. Install for Reputation only.", action: "INSTALL UPDATE", target: 1 },
    { id: "ram", name: "RAM LEAK", type: "CRISIS", duration: 35, desc: "Automatic income is reduced by half. Patch the leaking process.", action: "PATCH LEAK", target: 12 },
    { id: "power", name: "POWER SURGE", type: "CRISIS", duration: 18, desc: "A power spike instantly adds heat. Stabilize it before it spikes again.", action: "STABILIZE", target: 8 },
    { id: "lucky", name: "LUCKY PACKET", type: "OPPORTUNITY", duration: 20, desc: "A rare packet is waiting beside the laptop. Collect it before it disappears." },
    { id: "zeroday", name: "ZERO-DAY FOUND", type: "OPPORTUNITY", duration: 25, desc: "All income is doubled, but the exploit is making the system run hot." },
  ];
  state.event = events[Math.floor(Math.random() * events.length)]; state.eventEnds = Date.now() + state.event.duration * 1000; state.eventProgress = 0;
  if (state.event.id === "power") state.temp = Math.min(100, state.temp + 35);
  if (state.event.id === "lucky") { state.packetVisible = true; state.packetRarity = "rare"; state.packetEnds = state.eventEnds; }
  log(`EVENT: ${state.event.name}`, state.event.type === "CRISIS"); renderEvent();
}
function eventAction() {
  if (!state.event) return;
  if (state.event.id === "update") {
    if (state.systemUpdates < 8) { state.sessionBpsBonus *= 1.03; state.systemUpdates++; toast(`System optimized // ${state.systemUpdates}/8 installed`); }
    resolveEvent(true); return;
  }
  state.eventProgress++;
  if (state.eventProgress >= state.event.target) resolveEvent(true); else renderEvent();
}
function resolveEvent(success = false) {
  if (success) { const gain = 5 + Math.floor(Math.random() * 11); state.rep = Math.min(1000, state.rep + gain); state.eventsResolved++; toast(`Event resolved // +${gain} REP`); }
  else state.eventsIgnored++;
  state.event = null; state.eventEnds = 0; state.eventProgress = 0; state.nextEvent = Date.now() + (180000 + Math.random() * 180000); $("eventStack").innerHTML = "";
}
function renderEvent() {
  if (!state.event) return $("eventStack").replaceChildren();
  const remain = Math.max(0, Math.ceil((state.eventEnds - Date.now()) / 1000));
  $("eventStack").innerHTML = `<div class="event-card ${state.event.type.toLowerCase()}"><header><span>${state.event.type} // ${state.event.name}</span><span>T-${remain}</span></header>
    <div class="event-timer"><span style="width:${remain / state.event.duration * 100}%"></span></div><p>${state.event.desc}</p>${state.event.action ? `<button id="eventAction">${state.event.action} [${state.eventProgress}/${state.event.target}]</button>` : ""}<button class="secondary" id="eventDismiss">DISMISS</button></div>`;
}
function openAchievements() {
  const upcomingStage = nextStage();
  $("modalTitle").textContent = "Achievements and statistics";
  $("modalBody").innerHTML = `<h3>Statistics</h3><div class="stats-grid">
    <span>All-time Bytes<b>${fmt(state.allTime)}</b></span><span>Lifetime clicks<b>${fmt(state.lifetimeClicks)}</b></span>
    <span>Programs purchased<b>${fmt(state.programsPurchased)}</b></span><span>Longest streak<b>${state.longestStreak}</b></span>
    <span>Critical clicks<b>${state.abilities[0] ? fmt(state.criticalClicks) : "LOCKED"}</b></span><span>Packets collected<b>${fmt(state.packetsCollected)}</b></span>
    <span>Events resolved<b>${state.eventsResolved}</b></span><span>Thermal lockdowns<b>${state.lockdowns}</b></span>
    <span>Infrastructure output<b>×${stageMult()}</b></span><span>System updates<b>${state.systemUpdates}/8</b></span>
    <span>Reflex Trigger<b>${state.abilities[0] ? "ONLINE" : "LOCKED"}</b></span><span>Surge Capacitor<b>${state.abilities[1] ? "ONLINE" : "LOCKED"}</b></span></div>
    ${upcomingStage ? `<h3>Next infrastructure era</h3><p>${upcomingStage[0]} unlocks at ${fmt(upcomingStage[1])} all-time Bytes. ${fmt(Math.max(0, upcomingStage[1] - state.allTime))} remain.</p>` : ""}
    <h3>Achievements</h3>${ACHIEVEMENTS.map(([name, desc]) => `<div class="modal-row ${state.achievements.includes(name) ? "done" : ""}"><span><b>${name.toUpperCase()}</b><br>${desc}</span><span>${state.achievements.includes(name) ? "UNLOCKED" : "LOCKED"}</span></div>`).join("")}`;
  showModal();
}
function openSettings() {
  $("modalTitle").textContent = "Options";
  $("modalBody").innerHTML = `<h3>Display</h3><div class="modal-row"><span>Reduced motion</span><button class="modal-action" id="motionSetting">${state.reducedMotion ? "ON" : "OFF"}</button></div>
  <div class="modal-row"><span>Save immediately</span><button class="modal-action" id="manualSave">SAVE</button></div>
  <div class="modal-row"><span>Export or import a backup</span><span><button class="modal-action" id="exportSave">EXPORT</button> <button class="modal-action" id="importSave">IMPORT</button></span></div>
  <div class="modal-row"><span>Erase local save data</span><button class="modal-action" id="eraseSave">ERASE</button></div>
  <h3>Progress</h3><p>Drive wipes: ${state.prestiges}<br>Achievements: ${state.achievements.length}/${ACHIEVEMENTS.length}<br>Current computer: ${STAGES[stageIndex()][0]}</p>`;
  showModal();
}
function openHelp() {
  $("modalTitle").textContent = "How to play";
  $("modalBody").innerHTML = `<h3>The basic loop</h3><p>1. Click the laptop to earn Bytes.<br>2. Spend Bytes on Programs in the Store.<br>3. Programs earn Bytes automatically.<br>4. Buy more programs and upgrades to earn faster.</p>
  <h3>Useful systems</h3><p><b>Critical click:</b> buy Reflex Trigger after 10K all-time Bytes to unlock a 5% chance for clicks to earn 5×.<br><b>Surge:</b> buy Surge Capacitor after 50K all-time Bytes to unlock click streaks and a 20-second ×2 income boost.<br><b>Program bonuses:</b> ownership milestones multiply a program's output with larger goals spaced over time.<br><b>Infrastructure eras:</b> each visual stage grants a modest permanent automatic-income multiplier.<br><b>Synergies:</b> groups of related programs boost one another once discovered.<br><b>Data packet:</b> occasional active-play reward worth roughly 30–60 seconds of income.<br><b>Risky income boost:</b> unlocked later; boosts income but creates heat.</p>
  <h3>Shortcuts</h3><p><b>Space:</b> click the laptop.<br><b>B:</b> cycle buy quantity through 1, 10, 100, and Max.</p>
  <h3>Credits</h3><p>Favicon: “32px Electronics” by Airos — opengameart.org — CC BY 3.0.<br>Interface icons: Kenney Icon Font — CC0.</p>`;
  showModal();
}
function showModal() { if (!$("modal").open) $("modal").showModal(); }
function prestige() {
  const earned = Math.floor(Math.sqrt(state.allTime / 1e6));
  if (state.allTime < 1e9 || !confirm(`Restart this run for ${earned} Ghost Bytes? Current Bytes, programs, and upgrades will reset. Achievements, reputation, and lifetime statistics stay.`)) return;
  const carry = { ghostBytes: state.ghostBytes + earned, rep: state.rep, prestiges: state.prestiges + 1, achievements: [...state.achievements],
    lifetimeClicks: state.lifetimeClicks, programsPurchased: state.programsPurchased, packetsCollected: state.packetsCollected,
    eventsResolved: state.eventsResolved, eventsIgnored: state.eventsIgnored, criticalClicks: state.criticalClicks,
    longestStreak: state.longestStreak, totalPlayTime: state.totalPlayTime, synergiesDiscovered: [...state.synergiesDiscovered] };
  state = { ...freshState(), ...carry }; toast(`Drive wiped // +${earned} GBY`); renderShopNeeded = true; save();
}
function tick(now) {
  const dt = Math.min(.25, (now - lastTick) / 1000); lastTick = now; state.runTime += dt; state.totalPlayTime += dt;
  let bps = totalBps(); addBytes(bps * dt);
  if (state.abilities[1] && Date.now() - state.lastClickTime > 900) state.combo = Math.max(0, state.combo - dt * 8);
  if (state.storage) {
    const s = tier(STORAGE, state.storage); state.cache += bps * dt;
    if (state.cache >= s[2]) { const reward = s[2] * s[3]; state.cache -= s[2]; addBytes(reward); toast(`BATCH SALE // +${fmt(reward)} B`); }
  }
  const cool = coolingStats();
  if (state.overclock) {
    let heat = (5.4 / powerDuration()) * cool.fill * [1, 1.5, 2.5, 4][state.overclockTier - 1];
    if (state.event?.id === "surge") heat *= 2;
    state.temp += heat * dt;
    if (state.temp >= 75) {
      state.dangerTime += dt;
      if (Math.random() < .05 * dt) triggerLockdown();
    }
  } else state.temp -= 4 * cool.decay * dt;
  if (state.event?.id === "botnet") state.temp += 2.7 * cool.fill * dt;
  if (state.event?.id === "zeroday") state.temp += 1.5 * cool.fill * dt;
  if (state.event?.id === "power" && Math.random() < .08 * dt) state.temp += 12;
  state.temp = Math.max(0, Math.min(100, state.temp));
  if (state.temp >= 100 && !state.lockdown) triggerLockdown();
  if (state.lockdown && state.temp <= 0) { state.lockdown = false; toast("Thermal lockdown cleared"); }
  if (state.event?.id === "virus") state.bytes = Math.max(0, state.bytes - state.bytes * .02 * dt);
  if (Date.now() > state.nextEvent && !state.event) {
    if (state.allTime >= 10000) startEvent();
    else state.nextEvent = Date.now() + 60000;
  }
  if (state.event && Date.now() >= state.eventEnds) resolveEvent(false);
  if (state.allTime >= 2500 && !state.packetVisible && Date.now() >= state.nextPacket) {
    state.packetVisible = true; state.packetEnds = Date.now() + 12000;
    const roll = Math.random(); state.packetRarity = roll < .08 ? "rare" : roll < .3 ? "uncommon" : "common";
  }
  if (state.packetVisible && Date.now() >= state.packetEnds) { state.packetVisible = false; state.nextPacket = Date.now() + 120000 + Math.random() * 120000; }
  announceProgramUnlocks(); checkAchievements(); render(); requestAnimationFrame(tick);
}
function render() {
  const bps = totalBps(), bpc = clickValue(), st = stageIndex(), storage = tier(STORAGE, state.storage);
  $("bytes").textContent = fmt(state.bytes); $("bps").textContent = `${fmt(bps)} B/S`; $("bpc").textContent = `${fmt(bpc)} B`;
  $("rateLine").textContent = `${fmt(bps)} Bytes per second`; $("allTime").textContent = `${fmt(state.allTime)} B`;
  $("rep").textContent = `${Math.floor(state.rep)} / 1000`; $("ghostBytes").textContent = state.ghostBytes; $("clicks").textContent = `${fmt(state.clicks)} clicks`;
  $("milestones").textContent = totalMilestones();
  $("shopFunds").textContent = `${fmt(state.bytes)} B`; $("stageLabel").textContent = `${STAGES[st][0]} · infrastructure ×${stageMult()}`;
  $("runTime").textContent = `UPTIME ${String(Math.floor(state.runTime/60)).padStart(2,"0")}:${String(Math.floor(state.runTime%60)).padStart(2,"0")}`;
  $("screenBpc").textContent = `+${fmt(bpc)} ${bpc === 1 ? "Byte" : "Bytes"}`; $("laptop").className = `laptop stage-${st + 1}`;
  $("tempValue").textContent = `${(21 + state.temp * .79).toFixed(1)}°C`; $("tempFill").style.width = `${state.temp}%`;
  $("tempFill").style.background = state.temp >= 75 ? "var(--red)" : state.temp >= 50 ? "var(--yellow)" : "var(--green)";
  $("tempStatus").textContent = state.lockdown ? "Cooling down" : state.temp >= 75 ? "Danger zone: income ×1.5" : state.overclock ? "Overclock is running" : "Cool and steady";
  $("cacheValue").textContent = storage ? `${fmt(state.cache)} / ${fmt(storage[2])} B` : "NO STORAGE";
  $("cacheFill").style.width = storage ? `${Math.min(100, state.cache / storage[2] * 100)}%` : "0";
  $("overclockSwitch").className = `switch ${!state.overclockUnlocked ? "locked" : ""} ${state.overclock ? "on" : ""}`;
  $("overclockSwitch").setAttribute("aria-pressed", state.overclock); $("switchLabel").textContent = !state.overclockUnlocked ? "Locked at 50K Bytes" : state.lockdown ? "Cooling down" : state.overclock ? "Running hot" : "Ready";
  $("tierButton").disabled = !state.overclockUnlocked; $("tierButton").textContent = `${["Boost","Turbo","Redline","Critical"][state.overclockTier-1]} ×${[2,3,5,8][state.overclockTier-1]}`;
  $("prestigeButton").classList.toggle("hidden", state.allTime < 1e9); $("lockdown").classList.toggle("hidden", !state.lockdown);
  $("lockdownTimer").textContent = `${Math.ceil(state.temp / (4 * coolingStats().decay))} SEC TO NOMINAL`;
  const surgeRemaining = Math.max(0, Math.ceil((state.surgeEnds - Date.now()) / 1000));
  $("comboValue").textContent = surgeRemaining ? `SURGE ${surgeRemaining}s` : `×${comboMult().toFixed(2)}`;
  $("comboStatus").textContent = surgeRemaining ? "All click and automatic income is doubled" : "Keep clicking to charge a 20 second ×2 Surge";
  $("comboFill").style.width = `${surgeRemaining ? surgeRemaining / 20 * 100 : state.combo / 40 * 100}%`;
  $("comboPanel").classList.toggle("locked-control", !state.abilities[1]);
  $("packetDrop").className = `packet-drop ${state.packetRarity} ${state.packetVisible ? "" : "hidden"}`;
  $("packetDrop").querySelector("b").textContent = `${state.packetRarity.toUpperCase()} · CLICK FOR FREE BYTES`;
  document.body.classList.toggle("danger-mode", state.overclock && state.temp >= 75);
  document.body.classList.toggle("overclock-mode", state.overclock && !state.lockdown);
  document.body.dataset.stage = st + 1;
  if (st !== lastRenderedStage) { lastRenderedStage = st; announceStage(st); }
  document.documentElement.classList.toggle("reduced-motion", state.reducedMotion);
  document.querySelectorAll("[data-buy-amount]").forEach(button => button.classList.toggle("active", String(button.dataset.buyAmount) === String(state.buyAmount)));
  const currentUnlockSignature = `${unlockedTabs().map(([id]) => id).join(",")}|programs:${lastProgramUnlockCount}`;
  if (currentUnlockSignature !== unlockSignature) { unlockSignature = currentUnlockSignature; renderShopNeeded = true; shelfSignature = ""; }
  renderOwned();
  if (renderShopNeeded) renderShop();
  else document.querySelectorAll("[data-buy]").forEach((el, i) => {
    const item = shopItems()[i], affordable = item.ok && canBuy(item.cost);
    el.disabled = !affordable; el.classList.toggle("affordable", affordable);
  });
  renderUpgradeShelf();
  renderGoal();
  renderGuide();
  if (state.event) renderEvent();
}

$("laptop").addEventListener("click", clickLaptop);
$("helpButton").addEventListener("click", openHelp);
$("guideClose").addEventListener("click", () => { state.guideDismissed = true; save(); renderGuide(); });
$("packetDrop").addEventListener("click", collectPacket);
$("goalButton").addEventListener("click", () => {
  const tab = $("goalButton").dataset.goalTab;
  if (tab === "overclock") return toggleOverclock();
  state.activeTab = tab; renderShopNeeded = true; render();
});
document.addEventListener("keydown", e => {
  if (e.code === "Space" && !["BUTTON","INPUT","TEXTAREA"].includes(document.activeElement.tagName)) { e.preventDefault(); clickLaptop(); }
  if (e.code === "KeyB" && !["INPUT","TEXTAREA"].includes(document.activeElement.tagName)) {
    const amounts = [1, 10, 100, "max"]; state.buyAmount = amounts[(amounts.indexOf(state.buyAmount) + 1) % amounts.length]; renderShopNeeded = true; render();
  }
});
$("shopTabs").addEventListener("click", e => { const tab = e.target.dataset.tab; if (tab) { state.activeTab = tab; renderShopNeeded = true; render(); } });
$("shopList").addEventListener("click", e => { const button = e.target.closest("[data-buy]"); if (button) buy(state.activeTab, Number(button.dataset.buy)); });
$("upgradeShelf").addEventListener("click", e => { const button = e.target.closest("[data-shelf-tab]"); if (button) buy(button.dataset.shelfTab, Number(button.dataset.shelfIndex)); });
document.querySelector(".shop-toolbar").addEventListener("click", e => {
  const raw = e.target.dataset.buyAmount;
  if (!raw) return;
  const amount = raw === "max" ? "max" : Number(raw);
  state.buyAmount = amount;
  document.querySelectorAll("[data-buy-amount]").forEach(button => button.classList.toggle("active", String(button.dataset.buyAmount) === String(amount)));
  renderShopNeeded = true;
});
$("overclockSwitch").addEventListener("click", toggleOverclock);
$("tierButton").addEventListener("click", () => { state.overclockTier = state.overclockTier % unlockedOcTiers() + 1; });
$("cacheMeter").addEventListener("click", forceDump);
$("tempMeter").addEventListener("click", () => {
  if (state.cooling < 3 || state.lockdown) return;
  state.temp = Math.max(0, state.temp - 12); toast("Manual fan pulse // heat vented");
});
$("eventStack").addEventListener("click", e => { if (e.target.id === "eventAction") eventAction(); if (e.target.id === "eventDismiss") resolveEvent(false); });
$("achievementsButton").addEventListener("click", openAchievements); $("settingsButton").addEventListener("click", openSettings);
$("prestigeButton").addEventListener("click", prestige); $("modalClose").addEventListener("click", () => $("modal").close());
$("modalBody").addEventListener("click", e => {
  if (e.target.id === "motionSetting") { state.reducedMotion = !state.reducedMotion; openSettings(); }
  if (e.target.id === "manualSave") { save(); toast("Game saved"); }
  if (e.target.id === "exportSave") {
    $("modalTitle").textContent = "Export save";
    $("modalBody").innerHTML = `<p>Store this backup text somewhere safe.</p><textarea class="save-text" readonly>${btoa(JSON.stringify(state))}</textarea>`;
  }
  if (e.target.id === "importSave") {
    const backup = prompt("Paste your Overclocked backup string:");
    if (!backup) return;
    try { localStorage.setItem("overclocked-save", JSON.stringify(JSON.parse(atob(backup.trim())))); location.reload(); }
    catch { toast("That backup could not be read"); }
  }
  if (e.target.id === "eraseSave" && confirm("Erase all Overclocked save data?")) { localStorage.removeItem("overclocked-save"); location.reload(); }
});
setInterval(updateTicker, 20000);
setInterval(save, 30000); window.addEventListener("beforeunload", save);
log("BOOT SEQUENCE COMPLETE"); log("PAYLOAD ENGINE READY");
grantOfflineEarnings(); renderShop(); updateTicker(); requestAnimationFrame(tick);

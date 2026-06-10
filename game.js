const SOFTWARE = [
  ["Shell Script", 10, .1, "A shaky bash loop scraping pennies"],
  ["Python Bot", 80, .5, "Automates the boring stuff"],
  ["Web Scraper", 500, 3, "Harvests data from unsuspecting sites"],
  ["Keylogger", 3000, 10, "Quiet, patient, profitable"],
  ["Packet Sniffer", 15000, 40, "Intercepts traffic for resale"],
  ["Rootkit", 100000, 150, "Invisible, persistent, lucrative"],
  ["Zero-Day Exploit", 1e6, 500, "Sells for millions on the dark web"],
  ["AI Daemon", 1e7, 2000, "Self-improving code running in the dark"],
  ["Quantum Algorithm", 1e8, 10000, "Breaks encryption for breakfast"],
];
const NETWORK = [
  ["56K Dial-Up", 500, 1.1], ["ADSL Broadband", 5000, 1.25], ["Cable Internet", 25000, 1.5],
  ["Gigabit Ethernet", 2e5, 2], ["Dark Fiber Line", 2e6, 3], ["Satellite Uplink", 2e7, 5], ["Quantum Mesh", 5e8, 10],
];
const STORAGE = [
  ["256MB RAM", 1000, 100, 1.5], ["1GB RAM", 8000, 1000, 2], ["8GB RAM", 60000, 1e4, 2.5],
  ["32GB RAM", 5e5, 1e5, 3], ["128GB NVMe", 5e6, 1e6, 3.5], ["Distributed Array", 5e7, 1e7, 4],
];
const POWER = [
  ["Stock PSU (65W)", 2000, 1], ["500W PSU", 15000, 1.3], ["850W Gold PSU", 12e4, 1.7],
  ["Custom 1200W Rig", 1e6, 2.5], ["Uninterruptible UPS", 1e7, 2.5], ["Diesel Generator", 1e8, 4],
];
const COOLING = [
  ["Stock Thermal Paste", 500, 1, .5], ["Aftermarket Heatsink", 4000, .85, .75], ["120mm Case Fan", 2e4, .7, 1],
  ["AIO Water Cooler", 15e4, .55, 1.5], ["Custom Loop", 1.2e6, .4, 2], ["Peltier Chiller", 1e7, .25, 3],
  ["Liquid Nitrogen Feed", 1e8, .1, 5], ["Cryogenic Chamber", 1e9, .05, 10],
];
const OS = [
  ["Disable Throttling", 3000, 2, () => state.software[0] >= 5, "Own 5 Shell Scripts"],
  ["Turbo Boost Hack", 25000, 2, () => state.software[1] >= 3, "Own 3 Python Bots"],
  ["Custom BIOS Mod", 2e5, 3, () => state.power >= 3, "Own 850W PSU"],
  ["Kernel Exploit Patch", 2e6, 3, () => state.software[5] >= 1, "Own Rootkit"],
  ["Microcode Override", 2e7, 4, () => state.software[6] >= 1, "Own Zero-Day Exploit"],
  ["Silicon Lithography Mod", 2e8, 5, () => state.software[7] >= 1, "Own AI Daemon"],
  ["Quantum Gate Unlock", 2e9, 10, () => state.prestiges >= 1, "Prestige once"],
];
const STAGES = [
  ["Dusty Thinkpad", 0], ["Modded Desktop", 5e4], ["Watercooled Rig", 1e6],
  ["Server Rack Unit", 25e6], ["Underground Datacenter", 5e8], ["Quantum Supercluster", 1e10],
];
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
];

const freshState = () => ({
  bytes: 0, allTime: 0, runTime: 0, clicks: 0, rep: 0, ghostBytes: 0, prestiges: 0,
  software: Array(9).fill(0), network: 0, storage: 0, power: 0, cooling: 0, os: Array(7).fill(false),
  clickUpgrades: 0, cache: 0, temp: 0, overclockUnlocked: false, overclock: false, overclockTier: 1,
  lockdown: false, lockdowns: 0, overclockEver: false, dangerTime: 0, achievements: [], sessionBpsBonus: 1,
  activeTab: "software", event: null, eventEnds: 0, eventProgress: 0, nextEvent: Date.now() + 90000,
  reducedMotion: false, sound: false, lastSave: Date.now(),
});
let state = load();
let lastTick = performance.now();
let renderShopNeeded = true;
let ownedSignature = "";

const $ = id => document.getElementById(id);
const fmt = n => {
  if (!Number.isFinite(n)) return "0";
  const units = ["", "K", "M", "G", "T", "P"];
  let i = 0;
  while (Math.abs(n) >= 1000 && i < units.length - 1) { n /= 1000; i++; }
  return `${n >= 100 ? n.toFixed(0) : n >= 10 ? n.toFixed(1) : n.toFixed(2)}${units[i]}`;
};
const price = (base, owned) => Math.ceil(base * 1.15 ** owned);
const canBuy = cost => state.bytes >= cost;
const spend = cost => { if (!canBuy(cost)) return false; state.bytes -= cost; return true; };
const tier = (list, level) => level ? list[level - 1] : null;

function load() {
  try {
    const data = JSON.parse(localStorage.getItem("overclocked-save"));
    return data ? { ...freshState(), ...data, event: null, overclock: false } : freshState();
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
  return SOFTWARE.reduce((sum, item, i) => sum + item[2] * state.software[i], 0);
}
function netMult() { return state.network ? NETWORK[state.network - 1][2] : 1; }
function ocMult() {
  if (!state.overclock || state.lockdown) return 1;
  const values = [2, 3, 5, 8];
  return values[state.overclockTier - 1] * (state.temp >= 75 ? 1.5 : 1);
}
function eventMult() {
  if (state.event?.id === "surge") return 5;
  if (state.event?.id === "botnet") return 3;
  return 1;
}
function totalBps() {
  if (["bsod", "outage"].includes(state.event?.id)) return 0;
  return baseBps() * netMult() * state.sessionBpsBonus * ocMult() * eventMult() * (1 + state.achievements.filter(a => ["Pocket Change", "Data Dealer"].includes(a)).length * .02);
}
function clickValue() {
  let base = 1 + state.clickUpgrades + (state.achievements.includes("First Boot") ? 1 : 0) + (state.achievements.includes("Script Kiddie") ? 2 : 0);
  const osMult = OS.reduce((m, item, i) => state.os[i] ? m * item[2] : m, 1);
  return base * osMult * ocMult() * eventMult();
}
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
  const value = clickValue(); addBytes(value); state.clicks++;
  const burst = document.createElement("span"); burst.className = "burst"; burst.textContent = `+${fmt(value)} B`;
  const rect = $("machineZone").getBoundingClientRect();
  burst.style.left = `${(event?.clientX || rect.left + rect.width / 2) - rect.left}px`;
  burst.style.top = `${(event?.clientY || rect.top + rect.height / 2) - rect.top}px`;
  $("clickBursts").append(burst); setTimeout(() => burst.remove(), 750);
  checkAchievements();
}
function buy(tab, index) {
  if (tab === "software") {
    const cost = price(SOFTWARE[index][1], state.software[index]);
    if (spend(cost)) { state.software[index]++; log(`PURCHASED ${SOFTWARE[index][0].toUpperCase()}`); }
  } else if (tab === "click") {
    const cost = price(10, state.clickUpgrades);
    if (spend(cost)) state.clickUpgrades++;
  } else if (tab === "os") {
    const item = OS[index]; if (!state.os[index] && item[3]() && spend(item[1])) { state.os[index] = true; toast(`${item[0]} installed`); }
  } else {
    const lists = { network: NETWORK, storage: STORAGE, power: POWER, cooling: COOLING };
    const key = tab; const item = lists[key][index];
    if (index + 1 === state[key] + 1 && spend(item[1])) { state[key] = index + 1; toast(`${item[0]} online`); }
  }
  renderShopNeeded = true; save();
}
function shopItems() {
  const tab = state.activeTab;
  const programIcons = ["ki-computer", "ki-robot", "ki-search", "ki-key", "ki-signal-high", "ki-lock", "ki-exclamation-triangle", "ki-device", "ki-network"];
  if (tab === "software") return SOFTWARE.map((x, i) => ({ name: x[0], icon: programIcons[i], desc: `Makes ${fmt(x[2])} Bytes every second. ${x[3]}`, cost: price(x[1], state.software[i]), owned: state.software[i], ok: true }));
  if (tab === "click") return [{ name: "Stronger keystrokes", icon: "ki-mouse-left-button", desc: "Every click makes one more Byte.", cost: price(10, state.clickUpgrades), owned: state.clickUpgrades, ok: true }];
  if (tab === "network") return NETWORK.map((x, i) => ({ name: x[0], icon: "ki-network", desc: `Multiplies all automatic income by ×${x[2]}.`, cost: x[1], owned: state.network === i + 1 ? "ACTIVE" : "", ok: i + 1 === state.network + 1 }));
  if (tab === "storage") return STORAGE.map((x, i) => ({ name: x[0], icon: "ki-save", desc: `Stores ${fmt(x[2])} Bytes, then sells them for ×${x[3]}.`, cost: x[1], owned: state.storage === i + 1 ? "ACTIVE" : "", ok: i + 1 === state.storage + 1 }));
  if (tab === "power") return POWER.map((x, i) => ({ name: x[0], icon: "ki-off", desc: `Lets overclock run ×${x[2]} longer.`, cost: x[1], owned: state.power === i + 1 ? "ACTIVE" : "", ok: i + 1 === state.power + 1 }));
  if (tab === "cooling") return COOLING.map((x, i) => ({ name: x[0], icon: "ki-adjust", desc: "Slower heat, faster cooldown.", cost: x[1], owned: state.cooling === i + 1 ? "ACTIVE" : "", ok: i + 1 === state.cooling + 1 }));
  return OS.map((x, i) => ({ name: x[0], icon: "ki-cog", desc: `Clicks ×${x[2]}. Unlock: ${x[4]}.`, cost: x[1], owned: state.os[i] ? "DONE" : "", ok: !state.os[i] && x[3]() }));
}
function renderShop() {
  const tabs = [["software","Programs"],["click","Clicking"],["network","Network"],["storage","Storage"],["power","Power"],["cooling","Cooling"],["os","Firmware"]];
  $("shopTabs").innerHTML = tabs.map(([id, label]) => `<button data-tab="${id}" class="${state.activeTab === id ? "active" : ""}">${label}</button>`).join("");
  $("shopList").innerHTML = shopItems().map((item, i) => `<button class="shop-item" data-buy="${i}" ${!item.ok || !canBuy(item.cost) ? "disabled" : ""}>
    <span class="item-icon ki ${item.icon}"></span><span class="item-copy"><strong>${item.name}</strong><small>${item.desc}</small></span>
    <span class="item-price">${fmt(item.cost)} B<small>${item.owned !== "" ? `owned: ${item.owned}` : "buy"}</small></span></button>`).join("");
  renderShopNeeded = false;
}
function renderOwned() {
  const signature = state.software.join(",");
  if (signature === ownedSignature) return;
  ownedSignature = signature;
  const programIcons = ["ki-computer", "ki-robot", "ki-search", "ki-key", "ki-signal-high", "ki-lock", "ki-exclamation-triangle", "ki-device", "ki-network"];
  const owned = state.software.map((amount, i) => ({ amount, icon: programIcons[i], name: SOFTWARE[i][0] })).filter(item => item.amount > 0);
  $("ownedGrid").innerHTML = owned.map(item => `<div class="owned-unit ki ${item.icon}" title="${item.amount} ${item.name}${item.amount === 1 ? "" : "s"}"><b>${item.amount}</b></div>`).join("");
  $("emptyOwned").classList.toggle("hidden", owned.length > 0);
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
    { id: "update", name: "SYSTEM UPDATE", type: "NEUTRAL", duration: 25, desc: "Install for a permanent +5% session BPS bonus.", action: "INSTALL UPDATE", target: 1 },
  ];
  state.event = events[Math.floor(Math.random() * events.length)]; state.eventEnds = Date.now() + state.event.duration * 1000; state.eventProgress = 0;
  log(`EVENT: ${state.event.name}`, state.event.type === "CRISIS"); renderEvent();
}
function eventAction() {
  if (!state.event) return;
  if (state.event.id === "update") { state.sessionBpsBonus *= 1.05; resolveEvent(true); return; }
  state.eventProgress++;
  if (state.eventProgress >= state.event.target) resolveEvent(true); else renderEvent();
}
function resolveEvent(success = false) {
  if (success) { const gain = 5 + Math.floor(Math.random() * 11); state.rep = Math.min(1000, state.rep + gain); toast(`Event resolved // +${gain} REP`); }
  state.event = null; state.eventEnds = 0; state.eventProgress = 0; state.nextEvent = Date.now() + (75000 + Math.random() * 75000); $("eventStack").innerHTML = "";
}
function renderEvent() {
  if (!state.event) return $("eventStack").replaceChildren();
  const remain = Math.max(0, Math.ceil((state.eventEnds - Date.now()) / 1000));
  $("eventStack").innerHTML = `<div class="event-card"><header><span>${state.event.type} // ${state.event.name}</span><span>T-${remain}</span></header>
    <p>${state.event.desc}</p>${state.event.action ? `<button id="eventAction">${state.event.action} [${state.eventProgress}/${state.event.target}]</button>` : ""}<button class="secondary" id="eventDismiss">DISMISS</button></div>`;
}
function openAchievements() {
  $("modalTitle").textContent = "[ ACHIEVEMENTS ]";
  $("modalBody").innerHTML = ACHIEVEMENTS.map(([name, desc]) => `<div class="modal-row ${state.achievements.includes(name) ? "done" : ""}"><span><b>${name.toUpperCase()}</b><br>${desc}</span><span>${state.achievements.includes(name) ? "UNLOCKED" : "LOCKED"}</span></div>`).join("");
  showModal();
}
function openSettings() {
  $("modalTitle").textContent = "[ SYSTEM SETTINGS ]";
  $("modalBody").innerHTML = `<h3>DISPLAY PROCESSING</h3><div class="modal-row"><span>Reduced motion</span><button class="modal-action" id="motionSetting">${state.reducedMotion ? "ON" : "OFF"}</button></div>
  <div class="modal-row"><span>Erase local save data</span><button class="modal-action" id="eraseSave">ERASE</button></div>
  <h3>RUN SUMMARY</h3><p>Prestiges: ${state.prestiges}<br>Achievements: ${state.achievements.length}/${ACHIEVEMENTS.length}<br>Current stage: ${STAGES[stageIndex()][0]}</p>`;
  showModal();
}
function showModal() { if (!$("modal").open) $("modal").showModal(); }
function prestige() {
  if (state.allTime < 1e7 || !confirm("WIPE DRIVE? Upgrades and current Bytes will reset.")) return;
  const earned = Math.floor(Math.sqrt(state.allTime / 1e6));
  const carry = { ghostBytes: state.ghostBytes + earned, rep: Math.min(1000, Math.floor(state.rep * 1.5)), prestiges: state.prestiges + 1, achievements: [...state.achievements] };
  state = { ...freshState(), ...carry }; toast(`Drive wiped // +${earned} GBY`); renderShopNeeded = true; save();
}
function tick(now) {
  const dt = Math.min(.25, (now - lastTick) / 1000); lastTick = now; state.runTime += dt;
  let bps = totalBps(); addBytes(bps * dt);
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
  state.temp = Math.max(0, Math.min(100, state.temp));
  if (state.temp >= 100 && !state.lockdown) triggerLockdown();
  if (state.lockdown && state.temp <= 0) { state.lockdown = false; toast("Thermal lockdown cleared"); }
  if (state.event?.id === "virus") state.bytes = Math.max(0, state.bytes - state.bytes * .02 * dt);
  if (Date.now() > state.nextEvent && !state.event) startEvent();
  if (state.event && Date.now() >= state.eventEnds) resolveEvent(false);
  checkAchievements(); render(); requestAnimationFrame(tick);
}
function render() {
  const bps = totalBps(), bpc = clickValue(), st = stageIndex(), storage = tier(STORAGE, state.storage);
  $("bytes").textContent = fmt(state.bytes); $("bps").textContent = `${fmt(bps)} B/S`; $("bpc").textContent = `${fmt(bpc)} B`;
  $("rateLine").textContent = `${fmt(bps)} Bytes per second`; $("allTime").textContent = `${fmt(state.allTime)} B`;
  $("rep").textContent = `${Math.floor(state.rep)} / 1000`; $("ghostBytes").textContent = `${state.ghostBytes} GBY`; $("clicks").textContent = `${fmt(state.clicks)} clicks`;
  $("shopFunds").textContent = `${fmt(state.bytes)} B`; $("stageLabel").textContent = STAGES[st][0];
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
  $("prestigeButton").classList.toggle("hidden", state.allTime < 1e7); $("lockdown").classList.toggle("hidden", !state.lockdown);
  $("lockdownTimer").textContent = `${Math.ceil(state.temp / (4 * coolingStats().decay))} SEC TO NOMINAL`;
  document.body.classList.toggle("danger-mode", state.overclock && state.temp >= 75);
  document.documentElement.classList.toggle("reduced-motion", state.reducedMotion);
  renderOwned();
  if (renderShopNeeded) renderShop();
  else document.querySelectorAll("[data-buy]").forEach((el, i) => { const item = shopItems()[i]; el.disabled = !item.ok || !canBuy(item.cost); });
  if (state.event) renderEvent();
}

$("laptop").addEventListener("click", clickLaptop);
document.addEventListener("keydown", e => { if (e.code === "Space" && !["BUTTON","INPUT"].includes(document.activeElement.tagName)) { e.preventDefault(); clickLaptop(); } });
$("shopTabs").addEventListener("click", e => { const tab = e.target.dataset.tab; if (tab) { state.activeTab = tab; renderShopNeeded = true; render(); } });
$("shopList").addEventListener("click", e => { const button = e.target.closest("[data-buy]"); if (button) buy(state.activeTab, Number(button.dataset.buy)); });
$("overclockSwitch").addEventListener("click", toggleOverclock);
$("tierButton").addEventListener("click", () => { state.overclockTier = state.overclockTier % unlockedOcTiers() + 1; });
$("cacheMeter").addEventListener("click", forceDump);
$("eventStack").addEventListener("click", e => { if (e.target.id === "eventAction") eventAction(); if (e.target.id === "eventDismiss") resolveEvent(false); });
$("achievementsButton").addEventListener("click", openAchievements); $("settingsButton").addEventListener("click", openSettings);
$("prestigeButton").addEventListener("click", prestige); $("modalClose").addEventListener("click", () => $("modal").close());
$("modalBody").addEventListener("click", e => {
  if (e.target.id === "motionSetting") { state.reducedMotion = !state.reducedMotion; openSettings(); }
  if (e.target.id === "eraseSave" && confirm("Erase all Overclocked save data?")) { localStorage.removeItem("overclocked-save"); location.reload(); }
});
setInterval(() => { $("clock").textContent = new Date().toLocaleTimeString([], {hour12:false}); }, 1000);
setInterval(save, 10000); window.addEventListener("beforeunload", save);
log("BOOT SEQUENCE COMPLETE"); log("PAYLOAD ENGINE READY");
renderShop(); requestAnimationFrame(tick);

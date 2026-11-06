# 🌿 Invasive Species: The Game!

**A mobile-first educational strategy game about managing real invasive species — with real control methods.**

You play as a **natural resource / land manager**. Once a species becomes invasive,
eradicating it completely is nearly impossible — so your job is to *manage* the
invasion and keep the ecosystem healthy, not to wipe every invader out.

## 🎮 Play Now

Open `index.html` in any browser, or play it on GitHub Pages:
**https://harrisonmiles13.github.io/invasive-species-the-game/**

Works great on phones — add it to your home screen for a fullscreen app feel.

## 🎯 How to Play

1. Your hand holds two kinds of **intervention** cards:
   - **Controls** (🔨 ✂️ 🐾 💧 🔥 💊) — tap one, then tap an **invasive species** (red rings) to manage it
   - **Native enhancements** (🌱 🌻 🌾 🤝) — plant and protect **natives** (gold rings)
2. **Match the method to the species** — every invader has real-world weaknesses. Wrong method = the invader survives and you lose points.
3. **End your turn** and watch out: invaders **spread** to neighbouring cells, one at a time.
4. **Protect the natives** — they're lost if invaders surround them. Plant more and restore habitat to keep your balance.
5. **Win** by maintaining a **healthy ecosystem** (70% natives) for **5 consecutive turns** — about one game in a 50-minute workshop slot.
6. **Lose** if the invasion meter fills up or all natives are lost.

Tap any creature on the board for a fun fact, and check the 📖 Field Guide,
📚 Glossary, and 🔬 Game Science sections for the full picture.

## 🦠 The Invaders (all real!)

| Species | From | Weak to |
|---|---|---|
| 🌿 Kudzu | East Asia | ✂️ Mechanical control · 🔥 Prescribed burn |
| 🌺 Water Hyacinth | Amazon Basin | ✂️ Mechanical harvest · 🐾 Weevils |
| 🐚 Zebra Mussel | Caspian Sea region | 👐 Hunting & scraping · 💧 Clean-Drain-Dry |
| 🪲 Emerald Ash Borer | Northeast Asia | 🐾 Parasitoid wasps · 💊 Targeted treatment |
| 🐍 Burmese Python | Southeast Asia | 👐 Trained trackers · 💰 Python bounty |
| 🐟 Asian Carp | East Asia | 👐 Hunting · ✂️ Netting · 💧 Barriers |
| 🦠 Chytrid Fungus | East Asia | 💧 Disinfection · 💊 Antifungal treatment |

## 🛠 Your Interventions

**Controls (manage invaders):**
- 👐 **Hunting & Trapping** — tracking, trapping and removing invasive animals by hand
- ✂️ **Mechanical Control** — cutting, mowing, harvesting and netting to strip biomass
- 🐾 **Biological Control** — tested natural enemies from the invader's homeland
- 💧 **Water Management** — drawdowns, hot-water washes, barriers
- 🔥 **Prescribed Burn** — planned fire that helps natives return
- 💊 **Targeted Treatment** — precise, last-resort pesticide
- 💰 **Python Bounty** — area control modelled on Florida's Python Elimination Program: hunters sweep every python within 2 cells, then patrol that zone for 2 more turns (only dealt while pythons are present)

**Native enhancements (build up natives):**
- 🌱 **Native Planting** — establish a new native on an empty cell
- 🌻 **Seed Bombing** — scatter natives across an area
- 🌾 **Habitat Restoration** — clear one invader (any species) and plant two natives in its place
- 🤝 **Community Day** — rally volunteers to protect every native and gain an action

## 👥 Workshop Mode (multiplayer)

Built for facilitated group sessions:

- One device **hosts a room** and shows a **live scoreboard** plus a **live event feed**
  (hurricanes, new arrivals, bounties, wins). Tap **📺 Projector view** for a full-screen layout.
- Teams join from their phones with a **team name** (bar-trivia style) via the room
  code, a shared link, or a **QR code**.
- Teams take turns on a shared habitat; every team starts from the same board.
- **Ranking:** winners first (fewest rounds), then the longest healthy streak, then score (points ÷ rounds).
- Up to **5 teams** per room; single player works too.

Multiplayer uses [PeerJS](https://peerjs.com/) free peer-to-peer signaling, so it
runs on plain static hosting with no backend. If the network is unavailable, the
game falls back to single-player automatically.

## 🌀 Random Events

Each turn there's a chance of a real-world disturbance:
- **Hurricanes** wipe random cells — invaders and natives alike.
- **Wildfires** burn random cells; invasive plants score extra.

Events, new invader arrivals, bounty catches and native losses appear as a
full-screen banner, and the affected cells flash on the board. New arrivals
carry a pulsing **NEW** tag until the next turn.

## 🔬 Educational Goals

Players learn that invasive species management is about **matching the right
method to the right species** and **maintaining balance** — there is no universal
fix, eradication is usually impossible once a species is established, chemicals
have side-effects, and prevention ("never release a pet", "Clean, Drain, Dry")
beats cure. Rebuilding native communities (planting, restoration, community
engagement) is as important as removing invaders.

## 🧪 Development

The whole game lives in `index.html` (no build step, no dependencies beyond the
optional PeerJS CDN for Workshop Mode). Game balance was tuned by simulation: a
player who consistently picks the right intervention wins most games within the
6-turn healthy-ratio target.

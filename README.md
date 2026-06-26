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
| 🌿 Kudzu | East Asia | ✂️ Cutting · 🔥 Prescribed burn |
| 🌺 Water Hyacinth | Amazon Basin | 🔨 Manual harvest · 🐾 Weevils |
| 🐚 Zebra Mussel | Caspian Sea region | 🔨 Scraping · 💧 Clean-Drain-Dry |
| 🪲 Emerald Ash Borer | Northeast Asia | 🐾 Parasitoid wasps · 💊 Targeted treatment |
| 🐍 Burmese Python | Southeast Asia | 🔨 Trained trackers (nothing else works!) |
| 🐟 Asian Carp | East Asia | 🔨 Targeted removal · 💧 Barriers |
| 🦠 Chytrid Fungus | East Asia | 💧 Disinfection · 💊 Antifungal treatment |

## 🛠 Your Interventions

**Controls (manage invaders):**
- 🔨 **Manual Removal** — hand-pulling, trapping, harvesting, scraping
- ✂️ **Cutting & Mowing** — repeated cutting exhausts root reserves
- 🐾 **Biological Control** — tested natural enemies from the invader's homeland
- 💧 **Water Management** — drawdowns, hot-water washes, barriers
- 🔥 **Prescribed Burn** — planned fire that helps natives return
- 💊 **Targeted Treatment** — precise, last-resort pesticide

**Native enhancements (build up natives):**
- 🌱 **Native Planting** — establish a new native on an empty cell
- 🌻 **Seed Bombing** — scatter natives across an area
- 🌾 **Habitat Restoration** — clear one invader (any species) and plant two natives in its place
- 🤝 **Community Day** — rally volunteers to protect every native and gain an action

## 👥 Workshop Mode (multiplayer)

Built for facilitated group sessions:

- One device **hosts a room** (great on a projector) and shows a **live leaderboard**.
- Teams join from their phones with a **team name** (bar-trivia style) via the room
  code, a shared link, or a **QR code**.
- Each team's score streams in **live** for high-energy competition between groups.
- Up to **5 teams** per room; single player works too.

Multiplayer uses [PeerJS](https://peerjs.com/) free peer-to-peer signaling, so it
runs on plain static hosting with no backend. If the network is unavailable, the
game falls back to single-player automatically.

## 🌀 Random Events

Each turn there's a chance of a real-world disturbance:
- **Hurricanes** scatter and destroy some invaders.
- **Wildfires / prescribed fire** hit invasive plants especially hard.

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

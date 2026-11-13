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
5. **Win** by maintaining a **healthy ecosystem** (70% natives) for **5 consecutive turns** — a game takes about 5-15 minutes.
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
- 🐾 **Biological Control** — tested natural enemies from the invader's homeland. Reaches the species across the whole board, but it's never 100%: the targeted cell is always cleared and every other cell has a 90% chance, so the larger the population, the more likely one or two survive
- 💧 **Water Management** — drawdowns, hot-water washes, barriers
- 🔥 **Prescribed Burn** — planned fire that helps natives return
- 💊 **Targeted Treatment** — precise, last-resort pesticide
- 💰 **Python Bounty** — area control modelled on Florida's Python Elimination Program: hunters sweep every python within 2 cells, then patrol that zone for 2 more turns (only dealt while pythons are present)

**Native enhancements (build up natives):**
- 🌱 **Native Planting** — establish a new native on an empty cell
- 🌻 **Seed Bombing** — scatter natives across an area
- 🌾 **Habitat Restoration** — clear one invader (any species) and plant two natives in its place
- 🤝 **Community Day** — rally volunteers to protect every native and gain an action

## 🏆 Global Leaderboard (classrooms & workshops)

Everyone plays their own single-player game on their phone; one screen shows the
live leaderboard.

- Open **`leaderboard.html`** on the projector
  (https://harrisonmiles13.github.io/invasive-species-the-game/leaderboard.html).
  It shows a **QR code** for the game, this **room's** top players, the
  **all-time** top players and a feed of recent wins. It refreshes every 10 seconds.
- The QR code carries a room code (`?s=ABCD`), so wins from those phones post to
  the room board as well as the all-time board. **🔄 New room** starts a fresh room
  board; all-time scores are kept.
- After a **win**, players enter a name or initials and tap **🏆 Post**. Losses
  aren't posted. Each player's best win is shown.
- **Final score** = `5000 ÷ turns played` (speed; a perfect 5-turn win = 1000)
  `+ 37 × natives saved` (habitat). The weight 37 makes speed and habitat swing
  the score equally across playtested wins. The in-game ⭐ points are live
  feedback only.

### Setting up the leaderboard (one time, free)

Scores are stored in a free Firebase Realtime Database through its REST API (no SDK).

1. Create a project at https://console.firebase.google.com and add a
   **Realtime Database** (start in locked mode).
2. In the database's **Rules** tab, paste [`database.rules.json`](database.rules.json)
   and publish. The rules make scores and logs append-only, check every field,
   reject a score that doesn't match its turns and natives, and keep logs
   unreadable from browsers (you read them in the Firebase console).
3. Put the database URL (e.g. `https://your-project-default-rtdb.firebaseio.com`) in
   [`leaderboard-config.js`](leaderboard-config.js) and push.

Until the URL is set, the game works as normal and the post button stays hidden;
`leaderboard.html` shows these setup steps.

## 📊 Anonymous Gameplay Data (research)

When the database is configured, each game uploads one anonymous record to
`/logs` so you can study how people play. It is designed to contain nothing that
identifies a person:

- **Collected:** game version, the UTC **date** (no time), the game's random seed,
  outcome (win / loss / abandoned), turns, final counts, and the **move list**:
  each card played, its target, whether it was the right control, invalid taps,
  passes, discards and turn ends, each with the seconds since the previous move.
- **Not collected:** names, room codes, device or browser IDs, user agent, screen
  size, location, exact times or IP addresses. Logs can't be matched to
  leaderboard entries, and browsers can't read them back (`.read: false`).
- Players see a notice in **How to Play** and can switch it off in **⚙️ Settings**.

Whether your use needs ethics review is your institution's call; this is built to
avoid identifiable data.

**Replays:** every random event comes from a seeded generator, so a record's
`seed` + `moves` replays the game exactly. Open `index.html?replay`, paste a
record exported from the Firebase console, and watch it play back. Records carry
a `v` (game version); bump `GAME_VERSION` in `index.html` whenever rules change.

## 🌀 Random Events

Each turn there's a chance of a real-world disturbance:
- **Hurricanes** wipe random cells — invaders and natives alike.
- **Wildfires** burn random cells; invasive plants burned earn bonus ⭐ points.

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

The whole game lives in `index.html` (no build step, no dependencies). The
leaderboard is `leaderboard.html` + `leaderboard-config.js` + `database.rules.json`
(which also covers `/logs`).
Balance is checked by bot playtests: in 100 simulated games a player who picks the
right intervention wins about 88% of the time (median 10 turns), while a player
choosing cards at random never wins.

# 🌿 Nature Defenders

**A mobile-first educational strategy game about stopping real invasive species — with real control methods.**

## 🎮 Play Now

Open `index.html` in any browser, or play it on GitHub Pages:
**https://harrisonmiles13.github.io/invasive-species-the-game/**

Works great on phones — add it to your home screen for a fullscreen app feel.

## 🎯 How to Play

1. **Tap a control card** in your hand, then **tap an invasive species** on the board (red rings) — or just drag the card onto it
2. **Match the method to the species** — every invader has real-world weaknesses. Wrong method = the invader survives and you lose points
3. **End your turn** and watch out: invaders **spread** to neighbouring cells
4. **Protect the natives** (gold rings) — they're lost if invaders surround them
5. **Win** by clearing every invader before the invasion meter fills up

Tap any creature on the board to learn about it, and check the 📖 Field Guide for the full science.

## 🦠 The Invaders (all real!)

| Species | From | Weak to |
|---|---|---|
| 🌿 Kudzu | East Asia | ✂️ Cutting · 🔥 Prescribed burn |
| 🌺 Water Hyacinth | Amazon Basin | 🔨 Manual harvest · 🐾 Weevils |
| 🐚 Zebra Mussel | Caspian Sea region | 🔨 Scraping · 💧 Clean-Drain-Dry |
| 🪲 Emerald Ash Borer | Northeast Asia | 🐾 Parasitoid wasps · ☠️ Targeted treatment |
| 🐍 Burmese Python | Southeast Asia | 🔨 Trained trackers (nothing else works!) |

## 🛠 Your Control Methods

- 🔨 **Manual Removal** — hand-pulling, trapping, harvesting, scraping
- ✂️ **Cutting & Mowing** — repeated cutting exhausts root reserves
- 🐾 **Biological Control** — tested natural enemies from the invader's homeland
- 💧 **Water Management** — drawdowns, hot-water washes, barriers
- 🔥 **Prescribed Burn** — planned fire that helps natives return
- ☠️ **Targeted Pesticide** — precise last-resort treatment

## 📱 Mobile Features

- **Tap or drag** — both work, with unified pointer input
- **Responsive board** — fits any screen, portrait or landscape
- **Haptic + audio feedback** — vibration and sound on every action
- **Safe-area aware** — plays nicely with notches and home indicators
- **No install needed** — a single self-contained HTML file

## 🔬 Educational Goals

Players learn that invasive species management is about **matching the right
method to the right species**: there is no universal fix, chemicals have
side-effects, some invaders (like pythons) are nearly impossible to control
once established — and prevention ("never release a pet", "Clean, Drain, Dry")
beats cure.

## 🧪 Development

The whole game lives in `index.html` (no build step, no dependencies).
Game balance was tuned by simulation: a player who always picks the right
control wins ~75% of games in about 6 turns.

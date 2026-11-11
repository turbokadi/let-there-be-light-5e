![](https://img.shields.io/badge/Foundry-v13%20%7C%20v14-informational)
[![version](https://img.shields.io/badge/version-2.0.0-red.svg)](https://semver.org)

[<img src="licensed/dnd.png" height="76"/>](licensed/dnd.png "D&D Licensed")
[<img src="licensed/srd.png" height="76"/>](licensed/srd.png "SRD 5th")

# Let There Be Light 5e - FoundryVTT Module

[<img src="logo.png" width="164"/>](logo.png "Let There Be Light 5e")

Let There Be Light 5e FoundryVTT module auto apply vision traits and equipped light source items of any playable character to their corresponding token automatically.

It only works for DnD5e and supports Player Handbook 2024 official module as well.

# FAQ:

### What if I create a character with darkvision 120 trait ?

Darkvision 120 trait is applied the token directly.

### If I decide to equip a Torch on my character ?

The Torch light stats are applied to your character directly when you equipped it (20ft bright, 20ft dim, Torch animation, etc ...).

### If I decide to equip a Lamp as well ?

You can't have more than one light source equipped, the Lamp will be unequipped.

### What if my Torch doesn't any use left ?

The Torch wont make any light and you will have a notification

### Why Wands and Staffs shine ?

Why not 😜

## Development

The module is built with [esbuild](https://esbuild.github.io/) into `dist/`. Light emitting items are declared as `ItemSpec` in `src/items/*.js`:

```sh
npm install
npm run dev      # readable build + sourcemaps, rebuilt on change
npm run release  # minified build (what GitHub releases ship)
```

To test in Foundry, symlink `dist/` into your Foundry data folder as `Data/modules/let-there-be-light-5e`.

## You want to ask for a change, a fix, release a new version ?

Make a Pull Request explaining your problem and I will do my best

## Copyrights

All licensed content, including rules, text, and imagery, belongs to their respective copyright holders.

This module respects and adheres to the ownership rights of the original creators, including Wizards of the Coast for D&D content.

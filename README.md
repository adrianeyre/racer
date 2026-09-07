# Racer Game

#### Technologies: TypeScript, React, SCSS, Vite

Requires **Node 26** (see `.nvmrc`).

The aim of the game is to navigate your car around the track avoiding the grass and other cars. Beware of the oil spills that will cause you to slip!

## Index

- [Installation and Run](#Install)
- [Scripts](#Scripts)
- [Releases](#Release)
- [Screen Shots](#Shots)
- [Play Racer](#Play)

## <a name="Install">Installation and Run</a>

- To clone the repo and run the game

```shell
$ git clone https://github.com/adrianeyre/racer
$ cd racer
$ nvm use
$ npm install
$ npm start
```

The dev server runs on <http://localhost:5173>.

## <a name="Scripts">Scripts</a>

| Script                      | What it does                                   |
| --------------------------- | ---------------------------------------------- |
| `npm start` / `npm run dev` | Vite dev server with hot reload                |
| `npm run build`             | Typecheck, then build the site into `dist-web` |
| `npm run preview`           | Serve the built site locally                   |
| `npm run typecheck`         | `tsc --noEmit`                                 |
| `npm run lint`              | ESLint                                         |
| `npm run format`            | Prettier, writing changes                      |
| `npm run format:check`      | Prettier, checking only — this is what CI runs |
| `npm test`                  | Vitest, once                                   |
| `npm run test:watch`        | Vitest, watching                               |

## <a name="Release">Releases</a>

Commits follow [Conventional Commits](https://www.conventionalcommits.org). Merging
to `master` runs the release workflow: semantic-release works out the next version
from the commit messages, tags it, writes `CHANGELOG.md` and publishes the GitHub
release, and the site is then built from the bumped tree and deployed to GitHub
Pages.

## <a name="Shots">Screen Shots</a>

[![Screenshot](https://raw.githubusercontent.com/adrianeyre/racer/master/src/images/screenshot1.png)](https://raw.githubusercontent.com/adrianeyre/racer/master/src/images/screenshot1.png 'Game View')

[![Screenshot](https://raw.githubusercontent.com/adrianeyre/racer/master/src/images/screenshot2.png)](https://raw.githubusercontent.com/adrianeyre/racer/master/src/images/screenshot2.png 'Game View')

## <a name="Play">Racer</a>

- [Racer](https://adrianeyre.github.io/racer/)

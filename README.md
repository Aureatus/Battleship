
# Battleship

This is a take on the post 2002 version of the classic game Battleship, created for the odin project's battleship project, adhering to their [specification](https://www.theodinproject.com/lessons/node-path-javascript-battleship).

## Table of Contents
* [Features](#features)
* [Tech stack](#tech-stack)
* [Run locally](#run-locally)

## Features
- A semi-intelligent AI opponent to play against.
  - Hits adjacent tiles if the last one was successful.
- Drag and drop placement of ships.
- Responsive design.
- Unit tests for logical modules `gameboard`, `player` and `ship`.

## Tech Stack
HTML, CSS, JavaScript, Jest, Webpack

## Run Locally

Clone the project

```bash
  git clone https://github.com/Aureatus/Battleship.git
```

Go to the project directory

```bash
  cd Battleship
```

Install dependencies

```bash
  npm install
```

create a production build

```bash
  npm run build
```

then open dist/index.html

Or run the dev environment

```bash
  npm run serve
```

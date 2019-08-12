# Mark Westerlund's Fantasy Football Draft Aid

## About
This project was a quick dashboard built to assist with the time crunch of deciding who to draft within a fantasy football draft.  This was put together in about 12 hours, so it is a bit lacking in some features that would be useful, such as a player search.  The data was all pulled from The Huddle player projections (http://thehuddle.com/2019-fantasy-football-draft-kit/) and will be updated for 2019.  This data includes projections for yards, touchdowns, receptions, etc. for each player and team defense, which I accumulated according to my leagues’ different settings.

Each player is assigned a rank for projected total points for each position.  The UI is designed to allow filtering  for player position, and multiple selection of player allowing you to compare each player (once again lacking in certain useful features).  The most important dimensions I have identified for this quick turn was player rank and quarterback rank.  Also, once a player is drafted to your team, the by column shows in red to denote you have a player with that buy week already drafted.

### Additional features planned for 2019:
* Text Search (player name, team name)
* Column Sorting on table
* Better player information
* Updated Nicer UI

### Usage:
Click on the filter boxes up top to select a position to filter by
Click on a player row to compare multiple players
Click the “Picked” column for
Click on Draft to add the player to your team


## Installation

Clone or download zip from github

Open base directory and run:

`$ npm install`

Once install is complete run with:

`$ npm run`

Load in your favorite browser:
http://localhost:3000


const db = require('./index.js');
const { GameDetail } = require('./model.js');

const insertWerewolf = function () {
  const werewolf = [{
    name: "One Night Ultimate Werewolf",
    year: 2014,
    minPlayers: 3,
    maxPlayers: 10,
    description: "One Night Ultimate Werewolf is a fast game for 3-10 players where everyone gets a role: One of the dastardly Werewolves, the tricky Troublemaker, the helpful Seer or one of a dozen different characters, each with a special ability. In the course of a single morning, your village will decide who is a werewolf... because all it takes is lynching one werewolf to win!!<br /> <br /> Because it's so fast, fun and engaging, you'll want to play it again and again and no two games are ever the same.",
    imageUrl: "https://cdn.shopify.com/s/files/1/0740/4855/products/ONUW-BOX-COVER_2048x.jpg?v=1554841270",
    officialUrl: "https://beziergames.com/products/one-night-ultimate-werewolf?utm_source=boardgameatlas.com&utm_medium=search&utm_campaign=5cc_ads",
    rulesUrl: "https://www.fgbradleys.com/rules/rules2/OneNightUltimateWerewolf-rules.pdf"
  }, {
    name: "The Resistance: Avalon",
    year: 2012,
    minPlayers: 5,
    maxPlayers: 10,
    description: "<p>Secret Identities! Deduction! Deception! </p><p>The Resistance: Avalon pits the forces of Good and Evil in a battle to control the future of civilization. Arthur represents the future of Britain, a promise of prosperity and honor. Yet hidden among his brave warriors are Mordred's unscrupulous minions. These forces of evil are few in number, but have knowledge of each other and remain hidden from all but one of Arthur's servants. Merlin alone knows the agents of evil, but he must speak of this only in riddles. If his true identity is discovered all will be lost!</p>",
    imageUrl: "https://images-na.ssl-images-amazon.com/images/I/51TZ2aGz%2BOL.jpg",
    officialUrl: "http://www.indieboardsandcards.com/index.php/games/avalon/?utm_source=boardgameatlas.com&utm_medium=search&utm_campaign=5cc_ads",
    rulesUrl: "http://upload.snakesandlattes.com/rules/r/ResistanceAvalon.pdf",
  }]

  GameDetail.create(werewolf)
    .then(() => db.close());
};

insertWerewolf();
import { Team, Match, GroupId, MatchStatus } from '../types/tournament';

// Helper to assign groups A-L
const rawTeams: any[] = [
  {
    "id": "MEX",
    "name": "Mexico",
    "group": "TBD",
    "flagCode": "mex",
    "logoUrl": "https://a.espncdn.com/i/teamlogos/countries/500/mex.png"
  },
  {
    "id": "RSA",
    "name": "South Africa",
    "group": "TBD",
    "flagCode": "rsa",
    "logoUrl": "https://a.espncdn.com/i/teamlogos/countries/500/rsa.png"
  },
  {
    "id": "KOR",
    "name": "South Korea",
    "group": "TBD",
    "flagCode": "kor",
    "logoUrl": "https://a.espncdn.com/i/teamlogos/countries/500/kors.png"
  },
  {
    "id": "CZE",
    "name": "Czechia",
    "group": "TBD",
    "flagCode": "cze",
    "logoUrl": "https://a.espncdn.com/i/teamlogos/countries/500/cze.png"
  },
  {
    "id": "CAN",
    "name": "Canada",
    "group": "TBD",
    "flagCode": "can",
    "logoUrl": "https://a.espncdn.com/i/teamlogos/countries/500/can.png"
  },
  {
    "id": "BIH",
    "name": "Bosnia-Herzegovina",
    "group": "TBD",
    "flagCode": "bih",
    "logoUrl": "https://a.espncdn.com/i/teamlogos/countries/500/bih.png"
  },
  {
    "id": "USA",
    "name": "United States",
    "group": "TBD",
    "flagCode": "usa",
    "logoUrl": "https://a.espncdn.com/i/teamlogos/countries/500/usa.png"
  },
  {
    "id": "PAR",
    "name": "Paraguay",
    "group": "TBD",
    "flagCode": "par",
    "logoUrl": "https://a.espncdn.com/i/teamlogos/countries/500/par.png"
  },
  {
    "id": "QAT",
    "name": "Qatar",
    "group": "TBD",
    "flagCode": "qat",
    "logoUrl": "https://a.espncdn.com/i/teamlogos/countries/500/qat.png"
  },
  {
    "id": "SUI",
    "name": "Switzerland",
    "group": "TBD",
    "flagCode": "sui",
    "logoUrl": "https://a.espncdn.com/i/teamlogos/countries/500/sui.png"
  },
  {
    "id": "BRA",
    "name": "Brazil",
    "group": "TBD",
    "flagCode": "bra",
    "logoUrl": "https://a.espncdn.com/i/teamlogos/countries/500/bra.png"
  },
  {
    "id": "MAR",
    "name": "Morocco",
    "group": "TBD",
    "flagCode": "mar",
    "logoUrl": "https://a.espncdn.com/i/teamlogos/countries/500/mar.png"
  },
  {
    "id": "HAI",
    "name": "Haiti",
    "group": "TBD",
    "flagCode": "hai",
    "logoUrl": "https://a.espncdn.com/i/teamlogos/countries/500/hai.png"
  },
  {
    "id": "SCO",
    "name": "Scotland",
    "group": "TBD",
    "flagCode": "sco",
    "logoUrl": "https://a.espncdn.com/i/teamlogos/countries/500/sco.png"
  },
  {
    "id": "AUS",
    "name": "Australia",
    "group": "TBD",
    "flagCode": "aus",
    "logoUrl": "https://a.espncdn.com/i/teamlogos/countries/500/aus.png"
  },
  {
    "id": "TUR",
    "name": "Türkiye",
    "group": "TBD",
    "flagCode": "tur",
    "logoUrl": "https://a.espncdn.com/i/teamlogos/countries/500/tur.png"
  },
  {
    "id": "GER",
    "name": "Germany",
    "group": "TBD",
    "flagCode": "ger",
    "logoUrl": "https://a.espncdn.com/i/teamlogos/countries/500/ger.png"
  },
  {
    "id": "CUW",
    "name": "Curaçao",
    "group": "TBD",
    "flagCode": "cuw",
    "logoUrl": "https://a.espncdn.com/i/teamlogos/soccer/500/11678.png"
  },
  {
    "id": "NED",
    "name": "Netherlands",
    "group": "TBD",
    "flagCode": "ned",
    "logoUrl": "https://a.espncdn.com/i/teamlogos/countries/500/ned.png"
  },
  {
    "id": "JPN",
    "name": "Japan",
    "group": "TBD",
    "flagCode": "jpn",
    "logoUrl": "https://a.espncdn.com/i/teamlogos/countries/500/jpn.png"
  },
  {
    "id": "CIV",
    "name": "Ivory Coast",
    "group": "TBD",
    "flagCode": "civ",
    "logoUrl": "https://a.espncdn.com/i/teamlogos/countries/500/civ.png"
  },
  {
    "id": "ECU",
    "name": "Ecuador",
    "group": "TBD",
    "flagCode": "ecu",
    "logoUrl": "https://a.espncdn.com/i/teamlogos/countries/500/ecu.png"
  },
  {
    "id": "SWE",
    "name": "Sweden",
    "group": "TBD",
    "flagCode": "swe",
    "logoUrl": "https://a.espncdn.com/i/teamlogos/countries/500/swe.png"
  },
  {
    "id": "TUN",
    "name": "Tunisia",
    "group": "TBD",
    "flagCode": "tun",
    "logoUrl": "https://a.espncdn.com/i/teamlogos/countries/500/tun.png"
  },
  {
    "id": "ESP",
    "name": "Spain",
    "group": "TBD",
    "flagCode": "esp",
    "logoUrl": "https://a.espncdn.com/i/teamlogos/countries/500/esp.png"
  },
  {
    "id": "CPV",
    "name": "Cape Verde",
    "group": "TBD",
    "flagCode": "cpv",
    "logoUrl": "https://a.espncdn.com/i/teamlogos/countries/500/cpv.png"
  },
  {
    "id": "BEL",
    "name": "Belgium",
    "group": "TBD",
    "flagCode": "bel",
    "logoUrl": "https://a.espncdn.com/i/teamlogos/countries/500/bel.png"
  },
  {
    "id": "EGY",
    "name": "Egypt",
    "group": "TBD",
    "flagCode": "egy",
    "logoUrl": "https://a.espncdn.com/i/teamlogos/countries/500/egy.png"
  },
  {
    "id": "KSA",
    "name": "Saudi Arabia",
    "group": "TBD",
    "flagCode": "ksa",
    "logoUrl": "https://a.espncdn.com/i/teamlogos/countries/500/ksa.png"
  },
  {
    "id": "URU",
    "name": "Uruguay",
    "group": "TBD",
    "flagCode": "uru",
    "logoUrl": "https://a.espncdn.com/i/teamlogos/countries/500/uru.png"
  },
  {
    "id": "IRN",
    "name": "Iran",
    "group": "TBD",
    "flagCode": "irn",
    "logoUrl": "https://a.espncdn.com/i/teamlogos/countries/500/irn.png"
  },
  {
    "id": "NZL",
    "name": "New Zealand",
    "group": "TBD",
    "flagCode": "nzl",
    "logoUrl": "https://a.espncdn.com/i/teamlogos/countries/500/nzl.png"
  },
  {
    "id": "FRA",
    "name": "France",
    "group": "TBD",
    "flagCode": "fra",
    "logoUrl": "https://a.espncdn.com/i/teamlogos/countries/500/fra.png"
  },
  {
    "id": "SEN",
    "name": "Senegal",
    "group": "TBD",
    "flagCode": "sen",
    "logoUrl": "https://a.espncdn.com/i/teamlogos/countries/500/sen.png"
  },
  {
    "id": "IRQ",
    "name": "Iraq",
    "group": "TBD",
    "flagCode": "irq",
    "logoUrl": "https://a.espncdn.com/i/teamlogos/countries/500/irq.png"
  },
  {
    "id": "NOR",
    "name": "Norway",
    "group": "TBD",
    "flagCode": "nor",
    "logoUrl": "https://a.espncdn.com/i/teamlogos/countries/500/nor.png"
  },
  {
    "id": "ARG",
    "name": "Argentina",
    "group": "TBD",
    "flagCode": "arg",
    "logoUrl": "https://a.espncdn.com/i/teamlogos/countries/500/arg.png"
  },
  {
    "id": "ALG",
    "name": "Algeria",
    "group": "TBD",
    "flagCode": "alg",
    "logoUrl": "https://a.espncdn.com/i/teamlogos/countries/500/alg.png"
  },
  {
    "id": "AUT",
    "name": "Austria",
    "group": "TBD",
    "flagCode": "aut",
    "logoUrl": "https://a.espncdn.com/i/teamlogos/countries/500/aut.png"
  },
  {
    "id": "JOR",
    "name": "Jordan",
    "group": "TBD",
    "flagCode": "jor",
    "logoUrl": "https://a.espncdn.com/i/teamlogos/countries/500/jor.png"
  },
  {
    "id": "POR",
    "name": "Portugal",
    "group": "TBD",
    "flagCode": "por",
    "logoUrl": "https://a.espncdn.com/i/teamlogos/countries/500/por.png"
  },
  {
    "id": "COD",
    "name": "Congo DR",
    "group": "TBD",
    "flagCode": "cod",
    "logoUrl": "https://a.espncdn.com/i/teamlogos/countries/500/rdc.png"
  },
  {
    "id": "ENG",
    "name": "England",
    "group": "TBD",
    "flagCode": "eng",
    "logoUrl": "https://a.espncdn.com/i/teamlogos/countries/500/eng.png"
  },
  {
    "id": "CRO",
    "name": "Croatia",
    "group": "TBD",
    "flagCode": "cro",
    "logoUrl": "https://a.espncdn.com/i/teamlogos/countries/500/cro.png"
  },
  {
    "id": "GHA",
    "name": "Ghana",
    "group": "TBD",
    "flagCode": "gha",
    "logoUrl": "https://a.espncdn.com/i/teamlogos/countries/500/gha.png"
  },
  {
    "id": "PAN",
    "name": "Panama",
    "group": "TBD",
    "flagCode": "pan",
    "logoUrl": "https://a.espncdn.com/i/teamlogos/countries/500/pan.png"
  },
  {
    "id": "UZB",
    "name": "Uzbekistan",
    "group": "TBD",
    "flagCode": "uzb",
    "logoUrl": "https://a.espncdn.com/i/teamlogos/countries/500/uzb.png"
  },
  {
    "id": "COL",
    "name": "Colombia",
    "group": "TBD",
    "flagCode": "col",
    "logoUrl": "https://a.espncdn.com/i/teamlogos/countries/500/col.png"
  },
  {
    "id": "2A",
    "name": "Group A 2nd Place",
    "group": "TBD",
    "flagCode": "2a",
    "logoUrl": ""
  },
  {
    "id": "2B",
    "name": "Group B 2nd Place",
    "group": "TBD",
    "flagCode": "2b",
    "logoUrl": ""
  },
  {
    "id": "1C",
    "name": "Group C Winner",
    "group": "TBD",
    "flagCode": "1c",
    "logoUrl": ""
  },
  {
    "id": "2F",
    "name": "Group F 2nd Place",
    "group": "TBD",
    "flagCode": "2f",
    "logoUrl": ""
  },
  {
    "id": "1E",
    "name": "Group E Winner",
    "group": "TBD",
    "flagCode": "1e",
    "logoUrl": ""
  },
  {
    "id": "3RD",
    "name": "Third Place Group A/B/C/D/F",
    "group": "TBD",
    "flagCode": "3rd",
    "logoUrl": ""
  },
  {
    "id": "1F",
    "name": "Group F Winner",
    "group": "TBD",
    "flagCode": "1f",
    "logoUrl": ""
  },
  {
    "id": "2C",
    "name": "Group C 2nd Place",
    "group": "TBD",
    "flagCode": "2c",
    "logoUrl": ""
  },
  {
    "id": "2E",
    "name": "Group E 2nd Place",
    "group": "TBD",
    "flagCode": "2e",
    "logoUrl": ""
  },
  {
    "id": "2I",
    "name": "Group I 2nd Place",
    "group": "TBD",
    "flagCode": "2i",
    "logoUrl": ""
  },
  {
    "id": "1I",
    "name": "Group I Winner",
    "group": "TBD",
    "flagCode": "1i",
    "logoUrl": ""
  },
  {
    "id": "1A",
    "name": "Group A Winner",
    "group": "TBD",
    "flagCode": "1a",
    "logoUrl": ""
  },
  {
    "id": "1L",
    "name": "Group L Winner",
    "group": "TBD",
    "flagCode": "1l",
    "logoUrl": ""
  },
  {
    "id": "1G",
    "name": "Group G Winner",
    "group": "TBD",
    "flagCode": "1g",
    "logoUrl": ""
  },
  {
    "id": "1D",
    "name": "Group D Winner",
    "group": "TBD",
    "flagCode": "1d",
    "logoUrl": ""
  },
  {
    "id": "1H",
    "name": "Group H Winner",
    "group": "TBD",
    "flagCode": "1h",
    "logoUrl": ""
  },
  {
    "id": "2J",
    "name": "Group J 2nd Place",
    "group": "TBD",
    "flagCode": "2j",
    "logoUrl": ""
  },
  {
    "id": "2K",
    "name": "Group K 2nd Place",
    "group": "TBD",
    "flagCode": "2k",
    "logoUrl": ""
  },
  {
    "id": "2L",
    "name": "Group L 2nd Place",
    "group": "TBD",
    "flagCode": "2l",
    "logoUrl": ""
  },
  {
    "id": "1B",
    "name": "Group B Winner",
    "group": "TBD",
    "flagCode": "1b",
    "logoUrl": ""
  },
  {
    "id": "2D",
    "name": "Group D 2nd Place",
    "group": "TBD",
    "flagCode": "2d",
    "logoUrl": ""
  },
  {
    "id": "2G",
    "name": "Group G 2nd Place",
    "group": "TBD",
    "flagCode": "2g",
    "logoUrl": ""
  },
  {
    "id": "1J",
    "name": "Group J Winner",
    "group": "TBD",
    "flagCode": "1j",
    "logoUrl": ""
  },
  {
    "id": "2H",
    "name": "Group H 2nd Place",
    "group": "TBD",
    "flagCode": "2h",
    "logoUrl": ""
  },
  {
    "id": "1K",
    "name": "Group K Winner",
    "group": "TBD",
    "flagCode": "1k",
    "logoUrl": ""
  },
  {
    "id": "RD32",
    "name": "Round of 32 1 Winner",
    "group": "TBD",
    "flagCode": "rd32",
    "logoUrl": ""
  },
  {
    "id": "RD16 W1",
    "name": "Round of 16 1 Winner",
    "group": "TBD",
    "flagCode": "rd16 w1",
    "logoUrl": ""
  },
  {
    "id": "RD16 W2",
    "name": "Round of 16 2 Winner",
    "group": "TBD",
    "flagCode": "rd16 w2",
    "logoUrl": ""
  },
  {
    "id": "RD16 W5",
    "name": "Round of 16 5 Winner",
    "group": "TBD",
    "flagCode": "rd16 w5",
    "logoUrl": ""
  },
  {
    "id": "RD16 W6",
    "name": "Round of 16 6 Winner",
    "group": "TBD",
    "flagCode": "rd16 w6",
    "logoUrl": ""
  },
  {
    "id": "RD16 W3",
    "name": "Round of 16 3 Winner",
    "group": "TBD",
    "flagCode": "rd16 w3",
    "logoUrl": ""
  },
  {
    "id": "RD16 W4",
    "name": "Round of 16 4 Winner",
    "group": "TBD",
    "flagCode": "rd16 w4",
    "logoUrl": ""
  },
  {
    "id": "RD16 W7",
    "name": "Round of 16 7 Winner",
    "group": "TBD",
    "flagCode": "rd16 w7",
    "logoUrl": ""
  },
  {
    "id": "RD16 W8",
    "name": "Round of 16 8 Winner",
    "group": "TBD",
    "flagCode": "rd16 w8",
    "logoUrl": ""
  },
  {
    "id": "QFW1",
    "name": "Quarterfinal 1 Winner",
    "group": "TBD",
    "flagCode": "qfw1",
    "logoUrl": ""
  },
  {
    "id": "QFW2",
    "name": "Quarterfinal 2 Winner",
    "group": "TBD",
    "flagCode": "qfw2",
    "logoUrl": ""
  },
  {
    "id": "QFW3",
    "name": "Quarterfinal 3 Winner",
    "group": "TBD",
    "flagCode": "qfw3",
    "logoUrl": ""
  },
  {
    "id": "QW4",
    "name": "Quarterfinal 4 Winner",
    "group": "TBD",
    "flagCode": "qw4",
    "logoUrl": ""
  },
  {
    "id": "SF L1",
    "name": "Semifinal 1 Loser",
    "group": "TBD",
    "flagCode": "sf l1",
    "logoUrl": ""
  },
  {
    "id": "SF L2",
    "name": "Semifinal 2 Loser",
    "group": "TBD",
    "flagCode": "sf l2",
    "logoUrl": ""
  },
  {
    "id": "SFW1",
    "name": "Semifinal 1 Winner",
    "group": "TBD",
    "flagCode": "sfw1",
    "logoUrl": ""
  },
  {
    "id": "SFW2",
    "name": "Semifinal 2 Winner",
    "group": "TBD",
    "flagCode": "sfw2",
    "logoUrl": ""
  }
];
const rawSchedule: any[] = [
  {
    "id": "1489369",
    "homeTeamId": "MEX",
    "awayTeamId": "RSA",
    "date": "2026-06-11T19:00Z",
    "group": "Group",
    "matchday": 1,
    "venue": "Estadio Banorte",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760414",
    "homeTeamId": "KOR",
    "awayTeamId": "CZE",
    "date": "2026-06-12T02:00Z",
    "group": "Group",
    "matchday": 1,
    "venue": "Estadio Akron",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760416",
    "homeTeamId": "CAN",
    "awayTeamId": "BIH",
    "date": "2026-06-12T19:00Z",
    "group": "Group",
    "matchday": 1,
    "venue": "BMO Field",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760417",
    "homeTeamId": "USA",
    "awayTeamId": "PAR",
    "date": "2026-06-13T01:00Z",
    "group": "Group",
    "matchday": 1,
    "venue": "SoFi Stadium",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760420",
    "homeTeamId": "QAT",
    "awayTeamId": "SUI",
    "date": "2026-06-13T19:00Z",
    "group": "Group",
    "matchday": 1,
    "venue": "Levi's Stadium",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760419",
    "homeTeamId": "BRA",
    "awayTeamId": "MAR",
    "date": "2026-06-13T22:00Z",
    "group": "Group",
    "matchday": 1,
    "venue": "MetLife Stadium",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760418",
    "homeTeamId": "HAI",
    "awayTeamId": "SCO",
    "date": "2026-06-14T01:00Z",
    "group": "Group",
    "matchday": 1,
    "venue": "Gillette Stadium",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760421",
    "homeTeamId": "AUS",
    "awayTeamId": "TUR",
    "date": "2026-06-14T04:00Z",
    "group": "Group",
    "matchday": 1,
    "venue": "BC Place",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760422",
    "homeTeamId": "GER",
    "awayTeamId": "CUW",
    "date": "2026-06-14T17:00Z",
    "group": "Group",
    "matchday": 1,
    "venue": "NRG Stadium",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760425",
    "homeTeamId": "NED",
    "awayTeamId": "JPN",
    "date": "2026-06-14T20:00Z",
    "group": "Group",
    "matchday": 1,
    "venue": "AT&T Stadium",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760423",
    "homeTeamId": "CIV",
    "awayTeamId": "ECU",
    "date": "2026-06-14T23:00Z",
    "group": "Group",
    "matchday": 1,
    "venue": "Lincoln Financial Field",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760424",
    "homeTeamId": "SWE",
    "awayTeamId": "TUN",
    "date": "2026-06-15T02:00Z",
    "group": "Group",
    "matchday": 1,
    "venue": "Estadio BBVA",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760428",
    "homeTeamId": "ESP",
    "awayTeamId": "CPV",
    "date": "2026-06-15T16:00Z",
    "group": "Group",
    "matchday": 1,
    "venue": "Mercedes-Benz Stadium",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760426",
    "homeTeamId": "BEL",
    "awayTeamId": "EGY",
    "date": "2026-06-15T19:00Z",
    "group": "Group",
    "matchday": 1,
    "venue": "Lumen Field",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760429",
    "homeTeamId": "KSA",
    "awayTeamId": "URU",
    "date": "2026-06-15T22:00Z",
    "group": "Group",
    "matchday": 1,
    "venue": "Hard Rock Stadium",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760427",
    "homeTeamId": "IRN",
    "awayTeamId": "NZL",
    "date": "2026-06-16T01:00Z",
    "group": "Group",
    "matchday": 1,
    "venue": "SoFi Stadium",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760432",
    "homeTeamId": "FRA",
    "awayTeamId": "SEN",
    "date": "2026-06-16T19:00Z",
    "group": "Group",
    "matchday": 1,
    "venue": "MetLife Stadium",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760430",
    "homeTeamId": "IRQ",
    "awayTeamId": "NOR",
    "date": "2026-06-16T22:00Z",
    "group": "Group",
    "matchday": 1,
    "venue": "Gillette Stadium",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760433",
    "homeTeamId": "ARG",
    "awayTeamId": "ALG",
    "date": "2026-06-17T01:00Z",
    "group": "Group",
    "matchday": 1,
    "venue": "GEHA Field at Arrowhead Stadium",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760431",
    "homeTeamId": "AUT",
    "awayTeamId": "JOR",
    "date": "2026-06-17T04:00Z",
    "group": "Group",
    "matchday": 1,
    "venue": "Levi's Stadium",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760435",
    "homeTeamId": "POR",
    "awayTeamId": "COD",
    "date": "2026-06-17T17:00Z",
    "group": "Group",
    "matchday": 1,
    "venue": "NRG Stadium",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760437",
    "homeTeamId": "ENG",
    "awayTeamId": "CRO",
    "date": "2026-06-17T20:00Z",
    "group": "Group",
    "matchday": 1,
    "venue": "AT&T Stadium",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760434",
    "homeTeamId": "GHA",
    "awayTeamId": "PAN",
    "date": "2026-06-17T23:00Z",
    "group": "Group",
    "matchday": 1,
    "venue": "BMO Field",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760436",
    "homeTeamId": "UZB",
    "awayTeamId": "COL",
    "date": "2026-06-18T02:00Z",
    "group": "Group",
    "matchday": 1,
    "venue": "Estadio Banorte",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760438",
    "homeTeamId": "CZE",
    "awayTeamId": "RSA",
    "date": "2026-06-18T16:00Z",
    "group": "Group",
    "matchday": 2,
    "venue": "Mercedes-Benz Stadium",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760439",
    "homeTeamId": "SUI",
    "awayTeamId": "BIH",
    "date": "2026-06-18T19:00Z",
    "group": "Group",
    "matchday": 2,
    "venue": "SoFi Stadium",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760440",
    "homeTeamId": "CAN",
    "awayTeamId": "QAT",
    "date": "2026-06-18T22:00Z",
    "group": "Group",
    "matchday": 2,
    "venue": "BC Place",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760441",
    "homeTeamId": "MEX",
    "awayTeamId": "KOR",
    "date": "2026-06-19T01:00Z",
    "group": "Group",
    "matchday": 2,
    "venue": "Estadio Akron",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760442",
    "homeTeamId": "USA",
    "awayTeamId": "AUS",
    "date": "2026-06-19T19:00Z",
    "group": "Group",
    "matchday": 2,
    "venue": "Lumen Field",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760445",
    "homeTeamId": "SCO",
    "awayTeamId": "MAR",
    "date": "2026-06-19T22:00Z",
    "group": "Group",
    "matchday": 2,
    "venue": "Gillette Stadium",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760444",
    "homeTeamId": "BRA",
    "awayTeamId": "HAI",
    "date": "2026-06-20T00:30Z",
    "group": "Group",
    "matchday": 2,
    "venue": "Lincoln Financial Field",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760443",
    "homeTeamId": "TUR",
    "awayTeamId": "PAR",
    "date": "2026-06-20T03:00Z",
    "group": "Group",
    "matchday": 2,
    "venue": "Levi's Stadium",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760447",
    "homeTeamId": "NED",
    "awayTeamId": "SWE",
    "date": "2026-06-20T17:00Z",
    "group": "Group",
    "matchday": 2,
    "venue": "NRG Stadium",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760448",
    "homeTeamId": "GER",
    "awayTeamId": "CIV",
    "date": "2026-06-20T20:00Z",
    "group": "Group",
    "matchday": 2,
    "venue": "BMO Field",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760446",
    "homeTeamId": "ECU",
    "awayTeamId": "CUW",
    "date": "2026-06-21T00:00Z",
    "group": "Group",
    "matchday": 2,
    "venue": "GEHA Field at Arrowhead Stadium",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760449",
    "homeTeamId": "TUN",
    "awayTeamId": "JPN",
    "date": "2026-06-21T04:00Z",
    "group": "Group",
    "matchday": 2,
    "venue": "Estadio BBVA",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760453",
    "homeTeamId": "ESP",
    "awayTeamId": "KSA",
    "date": "2026-06-21T16:00Z",
    "group": "Group",
    "matchday": 2,
    "venue": "Mercedes-Benz Stadium",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760451",
    "homeTeamId": "BEL",
    "awayTeamId": "IRN",
    "date": "2026-06-21T19:00Z",
    "group": "Group",
    "matchday": 2,
    "venue": "SoFi Stadium",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760450",
    "homeTeamId": "URU",
    "awayTeamId": "CPV",
    "date": "2026-06-21T22:00Z",
    "group": "Group",
    "matchday": 2,
    "venue": "Hard Rock Stadium",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760452",
    "homeTeamId": "NZL",
    "awayTeamId": "EGY",
    "date": "2026-06-22T01:00Z",
    "group": "Group",
    "matchday": 2,
    "venue": "BC Place",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760456",
    "homeTeamId": "ARG",
    "awayTeamId": "AUT",
    "date": "2026-06-22T17:00Z",
    "group": "Group",
    "matchday": 2,
    "venue": "AT&T Stadium",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760457",
    "homeTeamId": "FRA",
    "awayTeamId": "IRQ",
    "date": "2026-06-22T21:00Z",
    "group": "Group",
    "matchday": 2,
    "venue": "Lincoln Financial Field",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760454",
    "homeTeamId": "NOR",
    "awayTeamId": "SEN",
    "date": "2026-06-23T00:00Z",
    "group": "Group",
    "matchday": 2,
    "venue": "MetLife Stadium",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760455",
    "homeTeamId": "JOR",
    "awayTeamId": "ALG",
    "date": "2026-06-23T03:00Z",
    "group": "Group",
    "matchday": 2,
    "venue": "Levi's Stadium",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760461",
    "homeTeamId": "POR",
    "awayTeamId": "UZB",
    "date": "2026-06-23T17:00Z",
    "group": "Group",
    "matchday": 2,
    "venue": "NRG Stadium",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760458",
    "homeTeamId": "ENG",
    "awayTeamId": "GHA",
    "date": "2026-06-23T20:00Z",
    "group": "Group",
    "matchday": 2,
    "venue": "Gillette Stadium",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760460",
    "homeTeamId": "PAN",
    "awayTeamId": "CRO",
    "date": "2026-06-23T23:00Z",
    "group": "Group",
    "matchday": 2,
    "venue": "BMO Field",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760459",
    "homeTeamId": "COL",
    "awayTeamId": "COD",
    "date": "2026-06-24T02:00Z",
    "group": "Group",
    "matchday": 2,
    "venue": "Estadio Akron",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760462",
    "homeTeamId": "BIH",
    "awayTeamId": "QAT",
    "date": "2026-06-24T19:00Z",
    "group": "Group",
    "matchday": 3,
    "venue": "Lumen Field",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760463",
    "homeTeamId": "SUI",
    "awayTeamId": "CAN",
    "date": "2026-06-24T19:00Z",
    "group": "Group",
    "matchday": 3,
    "venue": "BC Place",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760464",
    "homeTeamId": "MAR",
    "awayTeamId": "HAI",
    "date": "2026-06-24T22:00Z",
    "group": "Group",
    "matchday": 3,
    "venue": "Mercedes-Benz Stadium",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760465",
    "homeTeamId": "SCO",
    "awayTeamId": "BRA",
    "date": "2026-06-24T22:00Z",
    "group": "Group",
    "matchday": 3,
    "venue": "Hard Rock Stadium",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760467",
    "homeTeamId": "CZE",
    "awayTeamId": "MEX",
    "date": "2026-06-25T01:00Z",
    "group": "Group",
    "matchday": 3,
    "venue": "Estadio Banorte",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760466",
    "homeTeamId": "RSA",
    "awayTeamId": "KOR",
    "date": "2026-06-25T01:00Z",
    "group": "Group",
    "matchday": 3,
    "venue": "Estadio BBVA",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760473",
    "homeTeamId": "CUW",
    "awayTeamId": "CIV",
    "date": "2026-06-25T20:00Z",
    "group": "Group",
    "matchday": 3,
    "venue": "Lincoln Financial Field",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760468",
    "homeTeamId": "ECU",
    "awayTeamId": "GER",
    "date": "2026-06-25T20:00Z",
    "group": "Group",
    "matchday": 3,
    "venue": "MetLife Stadium",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760471",
    "homeTeamId": "JPN",
    "awayTeamId": "SWE",
    "date": "2026-06-25T23:00Z",
    "group": "Group",
    "matchday": 3,
    "venue": "AT&T Stadium",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760472",
    "homeTeamId": "TUN",
    "awayTeamId": "NED",
    "date": "2026-06-25T23:00Z",
    "group": "Group",
    "matchday": 3,
    "venue": "GEHA Field at Arrowhead Stadium",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760469",
    "homeTeamId": "PAR",
    "awayTeamId": "AUS",
    "date": "2026-06-26T02:00Z",
    "group": "Group",
    "matchday": 3,
    "venue": "Levi's Stadium",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760470",
    "homeTeamId": "TUR",
    "awayTeamId": "USA",
    "date": "2026-06-26T02:00Z",
    "group": "Group",
    "matchday": 3,
    "venue": "SoFi Stadium",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760475",
    "homeTeamId": "NOR",
    "awayTeamId": "FRA",
    "date": "2026-06-26T19:00Z",
    "group": "Group",
    "matchday": 3,
    "venue": "Gillette Stadium",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760474",
    "homeTeamId": "SEN",
    "awayTeamId": "IRQ",
    "date": "2026-06-26T19:00Z",
    "group": "Group",
    "matchday": 3,
    "venue": "BMO Field",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760478",
    "homeTeamId": "CPV",
    "awayTeamId": "KSA",
    "date": "2026-06-27T00:00Z",
    "group": "Group",
    "matchday": 3,
    "venue": "NRG Stadium",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760479",
    "homeTeamId": "URU",
    "awayTeamId": "ESP",
    "date": "2026-06-27T00:00Z",
    "group": "Group",
    "matchday": 3,
    "venue": "Estadio Akron",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760476",
    "homeTeamId": "EGY",
    "awayTeamId": "IRN",
    "date": "2026-06-27T03:00Z",
    "group": "Group",
    "matchday": 3,
    "venue": "Lumen Field",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760477",
    "homeTeamId": "NZL",
    "awayTeamId": "BEL",
    "date": "2026-06-27T03:00Z",
    "group": "Group",
    "matchday": 3,
    "venue": "BC Place",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760480",
    "homeTeamId": "CRO",
    "awayTeamId": "GHA",
    "date": "2026-06-27T21:00Z",
    "group": "Group",
    "matchday": 3,
    "venue": "Lincoln Financial Field",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760485",
    "homeTeamId": "PAN",
    "awayTeamId": "ENG",
    "date": "2026-06-27T21:00Z",
    "group": "Group",
    "matchday": 3,
    "venue": "MetLife Stadium",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760481",
    "homeTeamId": "COL",
    "awayTeamId": "POR",
    "date": "2026-06-27T23:30Z",
    "group": "Group",
    "matchday": 3,
    "venue": "Hard Rock Stadium",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760482",
    "homeTeamId": "COD",
    "awayTeamId": "UZB",
    "date": "2026-06-27T23:30Z",
    "group": "Group",
    "matchday": 3,
    "venue": "Mercedes-Benz Stadium",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760484",
    "homeTeamId": "ALG",
    "awayTeamId": "AUT",
    "date": "2026-06-28T02:00Z",
    "group": "Group",
    "matchday": 3,
    "venue": "GEHA Field at Arrowhead Stadium",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760483",
    "homeTeamId": "JOR",
    "awayTeamId": "ARG",
    "date": "2026-06-28T02:00Z",
    "group": "Group",
    "matchday": 3,
    "venue": "AT&T Stadium",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760486",
    "homeTeamId": "1E",
    "awayTeamId": "3RD",
    "date": "2026-06-29T20:30Z",
    "group": "Knockout",
    "matchday": 4,
    "venue": "Gillette Stadium",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760487",
    "homeTeamId": "1I",
    "awayTeamId": "3RD",
    "date": "2026-06-30T21:00Z",
    "group": "Knockout",
    "matchday": 4,
    "venue": "MetLife Stadium",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760488",
    "homeTeamId": "2A",
    "awayTeamId": "2B",
    "date": "2026-06-28T19:00Z",
    "group": "Knockout",
    "matchday": 4,
    "venue": "SoFi Stadium",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760489",
    "homeTeamId": "1F",
    "awayTeamId": "2C",
    "date": "2026-06-30T01:00Z",
    "group": "Knockout",
    "matchday": 4,
    "venue": "Estadio BBVA",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760490",
    "homeTeamId": "1C",
    "awayTeamId": "2F",
    "date": "2026-06-29T17:00Z",
    "group": "Knockout",
    "matchday": 4,
    "venue": "NRG Stadium",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760491",
    "homeTeamId": "2E",
    "awayTeamId": "2I",
    "date": "2026-06-30T17:00Z",
    "group": "Knockout",
    "matchday": 4,
    "venue": "AT&T Stadium",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760492",
    "homeTeamId": "1A",
    "awayTeamId": "3RD",
    "date": "2026-07-01T01:00Z",
    "group": "Knockout",
    "matchday": 4,
    "venue": "Estadio Banorte",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760493",
    "homeTeamId": "1L",
    "awayTeamId": "3RD",
    "date": "2026-07-01T16:00Z",
    "group": "Knockout",
    "matchday": 4,
    "venue": "Mercedes-Benz Stadium",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760494",
    "homeTeamId": "2K",
    "awayTeamId": "2L",
    "date": "2026-07-02T23:00Z",
    "group": "Knockout",
    "matchday": 4,
    "venue": "BMO Field",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760495",
    "homeTeamId": "1H",
    "awayTeamId": "2J",
    "date": "2026-07-02T19:00Z",
    "group": "Knockout",
    "matchday": 4,
    "venue": "SoFi Stadium",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760496",
    "homeTeamId": "1G",
    "awayTeamId": "3RD",
    "date": "2026-07-01T20:00Z",
    "group": "Knockout",
    "matchday": 4,
    "venue": "Lumen Field",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760497",
    "homeTeamId": "1D",
    "awayTeamId": "3RD",
    "date": "2026-07-02T00:00Z",
    "group": "Knockout",
    "matchday": 4,
    "venue": "Levi's Stadium",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760498",
    "homeTeamId": "1J",
    "awayTeamId": "2H",
    "date": "2026-07-03T22:00Z",
    "group": "Knockout",
    "matchday": 4,
    "venue": "Hard Rock Stadium",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760499",
    "homeTeamId": "2D",
    "awayTeamId": "2G",
    "date": "2026-07-03T18:00Z",
    "group": "Knockout",
    "matchday": 4,
    "venue": "AT&T Stadium",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760500",
    "homeTeamId": "1B",
    "awayTeamId": "3RD",
    "date": "2026-07-03T03:00Z",
    "group": "Knockout",
    "matchday": 4,
    "venue": "BC Place",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760501",
    "homeTeamId": "1K",
    "awayTeamId": "3RD",
    "date": "2026-07-04T01:30Z",
    "group": "Knockout",
    "matchday": 4,
    "venue": "GEHA Field at Arrowhead Stadium",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760502",
    "homeTeamId": "W73",
    "awayTeamId": "W75",
    "date": "2026-07-04T17:00Z",
    "group": "Knockout",
    "matchday": 4,
    "venue": "NRG Stadium",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760503",
    "homeTeamId": "W74",
    "awayTeamId": "W77",
    "date": "2026-07-04T21:00Z",
    "group": "Knockout",
    "matchday": 4,
    "venue": "Lincoln Financial Field",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760504",
    "homeTeamId": "W76",
    "awayTeamId": "W78",
    "date": "2026-07-05T20:00Z",
    "group": "Knockout",
    "matchday": 4,
    "venue": "MetLife Stadium",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760505",
    "homeTeamId": "W79",
    "awayTeamId": "W80",
    "date": "2026-07-06T00:00Z",
    "group": "Knockout",
    "matchday": 4,
    "venue": "Estadio Azteca",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760506",
    "homeTeamId": "W83",
    "awayTeamId": "W84",
    "date": "2026-07-06T19:00Z",
    "group": "Knockout",
    "matchday": 4,
    "venue": "AT&T Stadium",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760507",
    "homeTeamId": "W81",
    "awayTeamId": "W82",
    "date": "2026-07-07T00:00Z",
    "group": "Knockout",
    "matchday": 4,
    "venue": "Lumen Field",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760508",
    "homeTeamId": "W86",
    "awayTeamId": "W88",
    "date": "2026-07-07T16:00Z",
    "group": "Knockout",
    "matchday": 4,
    "venue": "Mercedes-Benz Stadium",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760509",
    "homeTeamId": "W85",
    "awayTeamId": "W87",
    "date": "2026-07-07T20:00Z",
    "group": "Knockout",
    "matchday": 4,
    "venue": "BC Place",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760510",
    "homeTeamId": "W89",
    "awayTeamId": "W90",
    "date": "2026-07-09T20:00Z",
    "group": "Knockout",
    "matchday": 4,
    "venue": "Gillette Stadium",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760511",
    "homeTeamId": "W93",
    "awayTeamId": "W94",
    "date": "2026-07-10T19:00Z",
    "group": "Knockout",
    "matchday": 4,
    "venue": "SoFi Stadium",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760512",
    "homeTeamId": "W91",
    "awayTeamId": "W92",
    "date": "2026-07-11T21:00Z",
    "group": "Knockout",
    "matchday": 4,
    "venue": "Hard Rock Stadium",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760513",
    "homeTeamId": "W95",
    "awayTeamId": "W96",
    "date": "2026-07-12T01:00Z",
    "group": "Knockout",
    "matchday": 4,
    "venue": "GEHA Field at Arrowhead Stadium",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760514",
    "homeTeamId": "W97",
    "awayTeamId": "W98",
    "date": "2026-07-14T19:00Z",
    "group": "Knockout",
    "matchday": 4,
    "venue": "AT&T Stadium",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760515",
    "homeTeamId": "W99",
    "awayTeamId": "W100",
    "date": "2026-07-15T19:00Z",
    "group": "Knockout",
    "matchday": 4,
    "venue": "Mercedes-Benz Stadium",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760516",
    "homeTeamId": "L101",
    "awayTeamId": "L102",
    "date": "2026-07-18T21:00Z",
    "group": "Knockout",
    "matchday": 4,
    "venue": "Hard Rock Stadium",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  },
  {
    "id": "760517",
    "homeTeamId": "W101",
    "awayTeamId": "W102",
    "date": "2026-07-19T19:00Z",
    "group": "Knockout",
    "matchday": 4,
    "venue": "MetLife Stadium",
    "status": "upcoming",
    "homeScore": null,
    "awayScore": null,
    "minute": 0
  }
];

// Build groups from fixtures
const graph = new Map();
for (const match of rawSchedule) {
  if (match.group === 'Knockout') continue;
  if (!graph.has(match.homeTeamId)) graph.set(match.homeTeamId, new Set());
  if (!graph.has(match.awayTeamId)) graph.set(match.awayTeamId, new Set());
  graph.get(match.homeTeamId).add(match.awayTeamId);
  graph.get(match.awayTeamId).add(match.homeTeamId);
}

const visited = new Set();
const clusters = [];

for (const teamId of graph.keys()) {
  if (visited.has(teamId)) continue;
  const cluster = [];
  const q = [teamId];
  while (q.length > 0) {
    const curr = q.shift();
    if (!visited.has(curr)) {
      visited.add(curr);
      cluster.push(curr);
      for (const neighbor of graph.get(curr)) {
        if (!visited.has(neighbor)) {
          q.push(neighbor);
        }
      }
    }
  }
  clusters.push(cluster);
}

const groupNames = ['A', 'B', 'D', 'C', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
let nextGroupIdx = 0;

function getNextGroupName(c) {
  if (c.includes('MEX')) return 'A';
  if (c.includes('CAN')) return 'B';
  if (c.includes('USA')) return 'D';
  while (groupNames[nextGroupIdx] === 'A' || groupNames[nextGroupIdx] === 'B' || groupNames[nextGroupIdx] === 'D') {
    nextGroupIdx++;
  }
  const name = groupNames[nextGroupIdx];
  nextGroupIdx++;
  return name;
}

for (const c of clusters) {
  const gName = getNextGroupName(c);
  for (const teamId of c) {
    const t = rawTeams.find(x => x.id === teamId);
    if (t) t.group = gName;
  }
}

for (let t of rawTeams) {
  if (!t.primaryColor) t.primaryColor = '#3b82f6';
  if (!t.group || t.group === 'TBD' || t.name.includes("Round") || t.name.includes("Place") || t.name.includes("Winner") || t.name.includes("Loser")) {
    t.group = "Knockout";
  }
}

export const TEAMS: Team[] = rawTeams as Team[];

for (let m of rawSchedule) {
  const homeTeam = rawTeams.find(t => t.id === m.homeTeamId);
  if (homeTeam && homeTeam.group !== "Knockout") {
    m.group = homeTeam.group;
  }
}

export const FIXTURES: Match[] = rawSchedule as Match[];

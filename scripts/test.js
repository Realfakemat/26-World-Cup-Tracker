import axios from 'axios';

async function fetchESPN() {
  try {
    const res = await axios.get('https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard?dates=20260611');
    const ev = res.data.events[0];
    console.log("Competition groups?", ev.competitions[0].groups);
    console.log("Home team:", JSON.stringify(ev.competitions[0].competitors.find(c => c.homeAway === 'home').team, null, 2));
  } catch(e) {
    console.error(e.message);
  }
}
fetchESPN();

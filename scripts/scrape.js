import axios from 'axios';
import * as cheerio from 'cheerio';

async function scrapeWikipedia() {
  const { data } = await axios.get('https://en.wikipedia.org/wiki/2026_FIFA_World_Cup');
  const $ = cheerio.load(data);
  const tables = $('table.wikitable');
  console.log('Found ' + tables.length + ' tables');
}
scrapeWikipedia();

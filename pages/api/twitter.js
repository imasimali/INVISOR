const SCRAPYBOOK_URL = process.env.scrapy_url;
export default async (req, res) => {
  const { stock } = req.query;

  try {
    var tweets = await getTweets(stock);
    res.status(200).json(tweets);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

async function getTweets(stock){
    var alltweets = [];
    for (let i = 0; i < 15; i++){
      let iterDate = formatYmd(new Date(Date.now() - i * 24 * 60 * 60 * 1000));
      let iterDatelast = formatYmd(new Date(Date.now() - (i+1) * 24 * 60 * 60 * 1000));

      const res = await fetch(`https://${SCRAPYBOOK_URL}/twitter?stock=${stock}&since=${iterDatelast}&until=${iterDate}`);
      const json = await res.json();
      alltweets = alltweets.concat(json);
    }
    for (const value of Object.entries(alltweets)) {
      const date = new Date(value[1].dates);
      value[1].dates = formatYmd(date);
    }
    return alltweets
  }

const formatYmd = (date) => date.toISOString().slice(0, 10);
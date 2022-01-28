
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
    const nowDate = new Date();
    const todayDate = nowDate.getDate();
    var alltweets = [];
    for (let i = 0; i < 2; i++){
      const res = await fetch(`https://scrapybook.axemgit2.repl.co/twitter?stock=${stock}&since=2022-01-${todayDate-i}&until=2022-01-${(todayDate+1)-i}`);
      const json = await res.json();
      alltweets = alltweets.concat(json);
    }
    return alltweets
  }
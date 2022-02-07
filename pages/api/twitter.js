
export default async (req, res) => {
  const { stock } = req.query;

  try {
    var tweets = await getTweets(stock);
    // var result = shake_shake(cleaner(tweets));
    res.status(200).json(tweets);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

async function getTweets(stock){
    // const nowDate = new Date();
    // const todayDate = nowDate.getDate();
    var alltweets = [];
    for (let i = 0; i < 15; i++){
      let iterDate = formatYmd(new Date(Date.now() - i * 24 * 60 * 60 * 1000));
      let iterDatelast = formatYmd(new Date(Date.now() - (i+1) * 24 * 60 * 60 * 1000));
      // console.log(iterDate,iterDatelast)
      const res = await fetch(`https://scrapybook.axemgit2.repl.co/twitter?stock=${stock}&since=${iterDatelast}&until=${iterDate}`);
      const json = await res.json();
      alltweets = alltweets.concat(json);
    }
    for (const value of Object.entries(alltweets)) {
      const date = new Date(value[1].dates);
      value[1].dates = formatYmd(date);
    }
    return alltweets
  }

function shake_shake(arr) {
    const dateTweets = arr.reduce(function(results, item) {
      if (!results[item.dates]) results[item.dates] = [];
      results[ item.dates ].push(item.title);
      
      return results;
    }, {});
    // return dateTweets
    return Object.keys(dateTweets).map(function(key) {
      return { date: key, news: dateTweets[key] };
    });
  }

function cleaner(arr){
  const cleaned = arr.filter((arr, index, self) =>
    index === self.findIndex((t) => (t.title === arr.title)))
  return cleaned
}

const formatYmd = (date) => date.toISOString().slice(0, 10);

export default async (req, res) => {
  const { stock } = req.query;

  try {
    var reddits = await getReddits(stock);
    // var result = shake_shake(cleaner(reddits));
    res.status(200).json(reddits);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

async function getReddits(stock){
    const nowDate = new Date();
    const todayDate = nowDate.getDate();
    var allReddits = [];
    for (let i = 0; i < 15; i++){
      const res = await fetch(`https://scrapybook.axemgit2.repl.co/reddit?stock=${stock}&since=2022-01-${todayDate-i}&until=2022-01-${(todayDate+1)-i}`);
      const json = await res.json();
      allReddits = allReddits.concat(json);
    }
    for (const value of Object.entries(allReddits)) {
      const date = new Date(value[1].dates);
      value[1].dates = formatYmd(date);
    }
    return allReddits
  }

function shake_shake(arr) {
    const dateReddits = arr.reduce(function(results, item) {
      if (!results[item.dates]) results[item.dates] = [];
      results[ item.dates ].push(item.title);
      
      return results;
    }, {});
    // return dateReddits
    return Object.keys(dateReddits).map(function(key) {
      return { date: key, news: dateReddits[key] };
    });
  }

function cleaner(arr){
  const cleaned = arr.filter((arr, index, self) =>
    index === self.findIndex((t) => (t.title === arr.title)))
  return cleaned
}

const formatYmd = (date) => date.toISOString().slice(0, 10);
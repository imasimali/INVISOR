
export default async (req, res) => {
  const { stock } = req.query;

  try {
    var news = await getNews(stock);
    // var result = shake_shake(cleaner(news));
    res.status(200).json(news);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

async function getNews(stock){
    const res = await fetch(`https://scrapybook.axemgit2.repl.co/reuters?stock=${stock}`);
    const json = await res.json();

    for (const value of Object.entries(json)) {
      const date = new Date(value[1].dates);
      value[1].dates = formatYmd(date);
    }
    return json
  }

function shake_shake(arr) {
    const dateNews = arr.reduce(function(results, item) {
      if (!results[item.dates]) results[item.dates] = [];
      results[ item.dates ].push(item.title);
      
      return results;
    }, {});
    // return dateNews
    return Object.keys(dateNews).map(function(key) {
      return { date: key, news: dateNews[key] };
    });
  }

function removeEmpty(array) {
  return array.filter(v => Object.values(v)[1] !== null)
}

function cleaner(arr){
  const cleaned = arr.filter((arr, index, self) =>
    index === self.findIndex((t) => (t.title === arr.title)))
  return cleaned
}

const formatYmd = (date) => date.toISOString().slice(0, 10);

export default async (req, res) => {
  const { stock } = req.query;

  try {
    var allnews = await getAllNews(stock);
    var result = shake_shake(cleaner(removeEmpty(allnews)));
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

async function getAllNews(stock){
    const nowDate = new Date();
    const todayDate = nowDate.getDate();
    const newSites = ['twitter', 'reddit', 'yahoo', 'reuters']
    var allNews = [];
    for (let x = 0; x < newSites.length; ++x){
      const res = await fetch(`https://invisor.axemgit2.repl.co/api/${newSites[x]}?stock=${stock}`);
      const json = await res.json();
      allNews = allNews.concat(json);
    }
    for (const value of Object.entries(allNews)) {
      if (value[1].dates !=null){
        const date = new Date(value[1].dates);
        value[1].dates = formatYmd(date);
      }
    }
    return allNews
  }

function shake_shake(arr) {
    const dateTweets = arr.reduce(function(results, item) {
      if (!results[item.dates]){
        results[item.dates] = [];
      }
      results[ item.dates ].push(item.title);
      
      return results;
    }, {});
    // return dateTweets
    return Object.keys(dateTweets).map(function(key) {
      return { date: key, news: dateTweets[key] };
    });
  }

function removeEmpty(arr) {
  return arr.filter(v => v.dates != null && v.title != null )
}

function cleaner(arr){
  const cleaned = arr.filter((arr, index, self) =>
    index === self.findIndex((t) => (t.title === arr.title)))
  return cleaned
}

const formatYmd = (date) => date.toISOString().slice(0, 10);
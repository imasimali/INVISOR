
export default async (req, res) => {
  const { stock } = req.query;

  try {
    var apiData = await getapiData(stock);
    // var result = shake_shake(cleaner(apiData));
    res.status(200).json(apiData);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

async function getapiData(stock){
    const nowDate = new Date();
    const todayDate = nowDate.getDate();
    // Use incase of CORS ERROR https://invisorlink.herokuapp.com/
    const res = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${stock}?region=US&lang=en-US&includePrePost=false&interval=1d&useYfid=true&range=1d`);
    // const res = await fetch(`http://api.marketstack.com/v1/eod?access_key=c2fb428e67bf9232583b7eacc4300cbc&date_from=2022-01-05&date_to=2022-01-${todayDate}&symbols=${stock}`);
    const json = await res.json();

    for (const value of Object.entries(json.chart.result[0].indicators.quote[0])) {
      // const date = new Date(value[1].date);
      value[1][0] = value[1][0].toString().slice(0, 6);
    }
    return json.chart.result[0].indicators.quote[0]
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
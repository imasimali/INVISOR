
export default async (req, res) => {
  const { stock } = req.query;

  try {
    var apiData = await getapiData(stock);
    
    res.status(200).json(apiData);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

async function getapiData(stock){
    const nowDate = new Date();
    const todayDate = nowDate.getDate();
    const res = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${stock}?region=US&lang=en-US&includePrePost=false&interval=1d&useYfid=true&range=1d`);

    const json = await res.json();
    for (const value of Object.entries(json.chart.result[0].indicators.quote[0])) {
      value[1][0] = value[1][0].toString().slice(0, 6);
    }
    return json.chart.result[0].indicators.quote[0]
  }
const SCRAPYBOOK_URL = process.env.scrapy_url;
export default async (req, res) => {
  const { stock } = req.query;

  try {
    var news = await getNews(stock);
    res.status(200).json(news);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

async function getNews(stock){
    const res = await fetch(`https://${SCRAPYBOOK_URL}/yahoo?stock=${stock}`);
    const json = await res.json();

    for (const value of Object.entries(json)) {
      const date = new Date(value[1].dates);
      value[1].dates = formatYmd(date);
    }
    return json
  }

const formatYmd = (date) => date.toISOString().slice(0, 10);
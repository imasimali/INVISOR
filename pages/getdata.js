const [tweets, setTweeets] = useState([])
  const [stock_name, setstock_name] = useState("AAPL");

  const nowDate = new Date();
  const todayDate = nowDate.getDate();

  const formatYmd = (date) => date.toISOString().slice(0, 10);

  async function getTweets(stock){
    const alltweets = [];
    for (let i = 0; i < 2; i++){
      const res = await fetch(`https://scrapybook.axemgit2.repl.co/twitter?stock=${stock}&since=2022-01-${todayDate-i}&until=2022-01-${(todayDate+1)-i}`);
      const json = await res.json();
      alltweets = alltweets.concat(json);
    }
    for (const value of Object.entries(alltweets)) {
      const date = new Date(value[1].Datetime);
      value[1].Datetime = formatYmd(date);
    }
    console.log(alltweets);
    setTweeets(alltweets);
  }

  async function getReddits(stock){
    const allreddits = [];
    for (let i = 0; i < 2; i++){
      const res = await fetch(`https://scrapybook.axemgit2.repl.co/reddit?stock=${stock}&since=2022-01-${todayDate-i}&until=2022-01-${(todayDate+1)-i}`);
      const json = await res.json();
      allreddits = allreddits.concat(json);
    }
    for (const value of Object.entries(allreddits)) {
      const date = new Date(value[1].Datetime);
      value[1].Datetime = formatYmd(date);
    }
    console.log(allreddits);
    setTweeets(allreddits);
  }

  function shake_shake(arr) {
    const dateResponse = arr.reduce(function(results, item) {
      if (!results[item.Datetime]) results[item.Datetime] = [];
      results[ item.Datetime ].push(item.Text);
      
      return results;
    }, {});
    // return dateResponse
    return Object.keys(dateResponse).map(function(key) {
      return { date: key, news: dateResponse[key] };
    });
  }

  function cleaner(arr){
    const cleaned = arr.filter((arr, index, self) =>
      index === self.findIndex((t) => (t.Text === arr.Text)))
    return cleaned
  }

  const result = shake_shake(cleaner(tweets));
  console.log(result);
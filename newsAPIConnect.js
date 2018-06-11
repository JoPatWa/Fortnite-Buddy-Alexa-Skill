const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('67e11e145e34441bb45b4e4e2d7e920d');
// To query /v2/top-headlines
// All options passed to topHeadlines are optional, but you need to include at least one of them
newsapi.v2.everything({
  q: 'fortnite',
  sources: "abc-news, ign, google-news",
  pageSize: 10,
  from: "2018-06-08",
  language: 'en'
}).then(response => {
  console.log(response);
  /*
    {
      status: "ok",
      articles: [...]
    }
  */
});
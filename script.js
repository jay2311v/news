const API_KEY = "34d3cf1da0184f0e9648f677e371ae60";
const API_URL = "https://newsapi.org/v2/everything?q=";
window.addEventListener("load", () => fetchNews("India"));

function reload() {
  window.location.reload();
}
function bindData(articles) {
  const cardsContainer = document.getElementById("cards-container");
  const newsCardTemplate = document.getElementById("template-news-card");

  cardsContainer.innerHTML = "";
  if (!article.urlToImage){
    return;
  }
  articles.forEach((article) => {
    const cardClone = newsCardTemplate.content.cloneNode(true);
    fillDataCard(cardClone, article);
    cardsContainer.appendChild(cardClone);
  });
}
async function fetchNews(query) {
  const response = await fetch(`${API_URL}${query}&apiKey=${API_KEY}`);
  const data = await response.json();
  bindData(data.articles);
}
async function fetchNews(query) {
  try {
      const response = await fetch(`${API_URL}${query}&apiKey=${API_KEY}`);
      
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response Data:", data);  // Log the response data

      if (!data || !data.articles) {
          console.error("No articles found in the API response:", data);
          return;
      }
      bindData(data.articles);
  } catch (error) {
      console.error("Error fetching news:", error);
  }
}
function fillDataCard(cardClone, article) {
  const newsImg = cardClone.querySelector("#news-img");
  const newsTitle = cardClone.querySelector("#news-title");
  const newsSource = cardClone.querySelector("#news-source");
  const newsDesc = cardClone.querySelector("#news-desc");

  newsImg.src = article.urlToImage;
  newsTitle.innerHTML = article.title;
  newsDesc.innerHTML = article.description;

  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  });

  newsSource.innerHTML = `${article.source.name} : ${date}`;

  cardClone.firstElementChild.addEventListener("click", () => {
    window.open(article.url, "_blank");
  });
}
let curSelectedNav = null;
function onNavItemClick(id) {
  fetchNews(id);
  const navItem = document.getElementById(id);
  curSelectedNav?.classList.remove("active");
  curSelectedNav = navItem;
  curSelectedNav.classList.add("active");
}

const searchbtn = document.getElementById("search-btn");
const searchtext = document.getElementById("news-input");

searchbtn.addEventListener("click", () => {
  const query = searchtext.value;
  if (!query) return;
  fetchNews(query);
  curSelectedNav?.classList.remove("active");
  curSelectedNav = null;
});

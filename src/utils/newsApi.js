// HARDCODED for local testing ONLY. Remove before production!
const NEWS_API_KEY = "028f50518ffd43de972dcb22df379db6";
const BASE_URL = "https://newsapi.org/v2/everything";

// Helper: format YYYY-MM-DD
const formatDate = (date) => date.toISOString().split("T")[0];

const getArticles = async (keyword) => {
  const today = new Date();
  const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

  const url = `${BASE_URL}?q=${encodeURIComponent(keyword)}&from=${formatDate(
    lastWeek
  )}&to=${formatDate(today)}&pageSize=100&apiKey=${NEWS_API_KEY}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `News API error: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();
  return data.articles;
};

export default getArticles;

const NEWS_API_KEY = "028f50518ffd43de972dcb22df379db6";
const BASE_URL = "https://newsapi.org/v2/everything";

const formatDate = (date) => date.toISOString().split("T")[0];

const MOCK_ARTICLES = [
  {
    source: { id: "wired", name: "Wired" },
    author: "Parker Hall",
    title: "Samsung HW-Q990F Soundbar System Review: Glorious Atmos",
    description:
      "Samsung's flagship soundbar system sounds as excellent as ever, filling rooms with massive Dolby Atmos goodness.",
    url: "https://www.wired.com/review/samsung-hw-q990f/",
    urlToImage:
      "https://media.wired.com/photos/68ca0b03ad5539f28c4dbafd/191:100/w_1280,c_limit/Review-%20Samsung%20HW-Q990F%20Dolby%20Atmos%20Soundbar%20System.png",
    publishedAt: "2025-09-17T13:09:00Z",
    content:
      "Most people arent using physical media anymore, which is why I spent the majority of my time testing the HW-Q990F with streaming media.",
  },
  {
    source: { id: "the-verge", name: "The Verge" },
    author: "Jennifer Pattison Tuohy",
    title:
      "Tariffs kill the Starling Home Hub, Google Nest’s best bridge to Apple Home",
    description:
      "The much-loved Starling Home Hub has been discontinued due to tariffs driving up component costs.",
    url: "https://www.theverge.com/news/780013/starling-home-hub-discontinued-google-nest-apple-home-bridge",
    urlToImage:
      "https://platform.theverge.com/wp-content/uploads/sites/2/2025/09/Screenshot-2025-09-17-at-12.03.15%E2%80%AFPM.png?quality=90&strip=all&crop=5.712478920742%2C0%2C88.575042158516%2C100&w=1200",
    publishedAt: "2025-09-17T16:28:01Z",
    content:
      "The small US company behind the popular device says tariffs drove up component costs, forcing it to discontinue production.",
  },
  {
    source: { id: "the-verge", name: "The Verge" },
    author: "Thomas Ricker",
    title: "Kuxiu’s X40 Turbo lays claim to best 3-in-1 travel charger",
    description:
      "The MagSafe-compatible Qi2.2 charger folds up super small when not charging your phone, earbuds, and watch.",
    url: "https://www.theverge.com/tech/779884/kuxius-x40-turbo-lays-claim-to-best-3-in-1-travel-charger",
    urlToImage:
      "https://platform.theverge.com/wp-content/uploads/sites/2/2025/09/IMG20250917150000.jpeg?quality=90&strip=all&crop=0%2C15.095986038394%2C100%2C69.808027923211&w=1200",
    publishedAt: "2025-09-17T14:43:40Z",
    content:
      "The Qi2.2 MagSafe-compatible charger folds up super small when not charging your phone, earbuds, and watch.",
  },
  {
    source: { id: "the-verge", name: "The Verge" },
    author: "Jess Weatherbed",
    title: "Apple’s future MacBook Pro might have a touchscreen",
    description:
      "The next generation of Apple’s MacBook Pro laptops could be the first to feature a touchscreen display.",
    url: "https://www.theverge.com/news/779759/apple-macbook-pro-oled-touchscreen-rumors",
    urlToImage:
      "https://platform.theverge.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/25786623/247412_Apple_MacBook_Pro_16_M4_Max_ADiBenedetto_0005.jpg?quality=90&strip=all&crop=0%2C10.732984293194%2C100%2C78.534031413613&w=1200",
    publishedAt: "2025-09-17T11:26:24Z",
    content:
      "When is an iPad not an iPad? When it's a MacBook Pro with a touchscreen.",
  },
  {
    source: { id: "the-verge", name: "The Verge" },
    author: "Cameron Faulkner",
    title: "8BitDo’s wireless N64-inspired controller is 30 percent off",
    description:
      "8BitDo’s slick 64 Bluetooth controller — made for the Analogue 3D — is now 30% off.",
    url: "https://www.theverge.com/tech/779829/8bitdo-n64-wireless-controller-mission-impossible-rent-deal-sale",
    urlToImage:
      "https://platform.theverge.com/wp-content/uploads/sites/2/2025/09/8bitdo64wireless.png?quality=90&strip=all&crop=0%2C10.732984293194%2C100%2C78.534031413613&w=1200",
    publishedAt: "2025-09-17T15:09:25Z",
    content:
      "Other deals include a sweet 360-degree iPad stand under $10, and a cheaper way to watch the latest Mission: Impossible.",
  },
  {
    source: { id: null, name: "Gizmodo.com" },
    author: "Raymond Wong",
    title: "Do You Really Need a New Apple Watch If You Already Have One?",
    description:
      "I took a closer look at Apple's new Sleep Score and hypertension notification features for Apple Watch.",
    url: "https://gizmodo.com/do-you-really-need-a-new-apple-watch-if-you-already-have-one-2000659714",
    urlToImage:
      "https://gizmodo.com/app/uploads/2025/09/Apple-Watch-SE-3-Series-11-Ultra-3-Sleep-Score-Hypertension-2-1200x675.jpg",
    publishedAt: "2025-09-17T00:00:45Z",
    content:
      "Reviews for the Apple Watch SE 3, Series 11, and Ultra 3 came out today — I only have two wrists, and there are three Apple Watches to review!",
  },
];

const getArticles = async (keyword) => {
  const today = new Date();
  const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

  const realUrl = `${BASE_URL}?q=${encodeURIComponent(
    keyword
  )}&from=${formatDate(lastWeek)}&to=${formatDate(
    today
  )}&pageSize=100&apiKey=${NEWS_API_KEY}`;

  const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(
    realUrl
  )}`;

  try {
    const response = await fetch(proxyUrl);
    if (!response.ok) {
      throw new Error(`Proxy error: ${response.status}`);
    }

    const data = await response.json();
    const parsed = JSON.parse(data.contents);

    if (!parsed.articles || parsed.articles.length === 0) {
      throw new Error("No articles found");
    }

    return parsed.articles;
  } catch (error) {
    console.warn("Using mock data due to API error:", error.message);
    return MOCK_ARTICLES;
  }
};

export default getArticles;

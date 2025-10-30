import {
  CoinDetail,
  CoinHistoryData,
  CryptoCoin,
  GetCoinsListParams,
  GlobalMarketDataResponse,
  TrendingResponse,
} from "./coingecko.types";

export async function GetCoinsListWithMarketData(
  params: GetCoinsListParams = {}
) {
  const {
    vs_currency = "usd",
    order = "market_cap_desc",
    per_page = 10,
    page = 1,
    sparkline = false,
    price_change_percentage,
    locale = "en",
  } = params;

  const searchParams = new URLSearchParams({
    vs_currency,
    order,
    per_page: per_page.toString(),
    page: page.toString(),
    sparkline: sparkline.toString(),
    locale,
  });

  if (price_change_percentage) {
    searchParams.append("price_change_percentage", price_change_percentage);
  }

  const request = await fetch(
    `${process.env.EXPO_PUBLIC_API_URL}/coins/markets?${searchParams.toString()}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-cg-demo-api-key": `${process.env.EXPO_PUBLIC_API_KEY}`,
      },
    }
  );

  const response: CryptoCoin[] = await request.json();
  return response;
}

export async function GetGlobalCryptoMarketData() {
  const request = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/global`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-cg-demo-api-key": `${process.env.EXPO_PUBLIC_API_KEY}`,
    },
  });

  const response: GlobalMarketDataResponse = await request.json();
  return response;
}

export async function GetTrendingCoins() {
  const request = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/search/trending`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-cg-demo-api-key": `${process.env.EXPO_PUBLIC_API_KEY}`,
    },
  });

  const response: TrendingResponse = await request.json();
  return response;
}

export async function GetCoin(id: string) {
  const request = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/coins/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-cg-demo-api-key": `${process.env.EXPO_PUBLIC_API_KEY}`,
    },
  });

  const response: CoinDetail = await request.json();
  return response;
}

export async function GetCoinHistory(id: string) {
  const request = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/coins/${id}/history`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-cg-demo-api-key": `${process.env.EXPO_PUBLIC_API_KEY}`,
    },
  });

  const response = await request.json();
  return response;
}

export async function GetCoinMarketChartData(
  id: string,
  days: number = 1,
  vs_currency: string = "usd"
) {
  const searchParams = new URLSearchParams({
    vs_currency,
    days: days.toString(),
  });

  const request = await fetch(
    `${process.env.EXPO_PUBLIC_API_URL}/coins/${id}/market_chart?${searchParams.toString()}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-cg-demo-api-key": `${process.env.EXPO_PUBLIC_API_KEY}`,
      },
    }
  );

  const response = await request.json();
  return response;
}

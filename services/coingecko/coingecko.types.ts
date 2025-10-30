export interface CryptoCoin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number | null;
  market_cap_rank: number | null;
  fully_diluted_valuation: number | null;
  total_volume: number | null;
  high_24h: number | null;
  low_24h: number | null;
  price_change_24h: number | null;
  price_change_percentage_24h: number | null;
  market_cap_change_24h: number | null;
  market_cap_change_percentage_24h: number | null;
  circulating_supply: number | null;
  total_supply: number | null;
  max_supply: number | null;
  ath: number | null;
  ath_change_percentage: number | null;
  ath_date: string | null;
  atl: number | null;
  atl_change_percentage: number | null;
  atl_date: string | null;
  roi: string | null;
  last_updated: string;
  sparkline_in_7d?: {
    price: number[];
  };
}

export interface GetCoinsListParams {
  vs_currency?: string;
  order?:
    | "market_cap_desc"
    | "market_cap_asc"
    | "volume_desc"
    | "volume_asc"
    | "id_asc"
    | "id_desc";
  per_page?: number;
  page?: number;
  sparkline?: boolean;
  price_change_percentage?: string;
  locale?: string;
}

export interface GlobalMarketData {
  active_cryptocurrencies: number;
  upcoming_icos: number;
  ongoing_icos: number;
  ended_icos: number;
  markets: number;
  total_market_cap: Record<string, number>;
  total_volume: Record<string, number>;
  market_cap_percentage: Record<string, number>;
  market_cap_change_percentage_24h_usd: number;
  updated_at: number;
}

export interface GlobalMarketDataResponse {
  data: GlobalMarketData;
}

export interface MarketChangePercentages {
  [currency: string]: number;
}

export interface CoinContent {
  title?: string;
  description?: string;
}

export interface CoinData {
  price: number;
  price_btc: string;
  price_change_percentage_24h: MarketChangePercentages;
  market_cap: string;
  market_cap_btc: string;
  total_volume: string;
  total_volume_btc: string;
  sparkline: string;
  content: CoinContent | null;
}

export interface CoinItem {
  id: string;
  coin_id: number;
  name: string;
  symbol: string;
  market_cap_rank: number | null;
  thumb: string;
  small: string;
  large: string;
  slug: string;
  price_btc: number;
  score: number;
  data: CoinData;
}

export interface CoinEntry {
  item: CoinItem;
}

export interface NftDataContent {
  title?: string;
  description?: string;
}

export interface NftData {
  floor_price: string;
  floor_price_in_usd_24h_percentage_change: string;
  h24_volume: string;
  h24_average_sale_price: string;
  sparkline: string;
  content: NftDataContent | null;
}

export interface NftEntry {
  id: string;
  name: string;
  symbol: string;
  thumb: string;
  nft_contract_id: number;
  native_currency_symbol: string;
  floor_price_in_native_currency: number;
  floor_price_24h_percentage_change: number;
  data: NftData;
}

export interface CategoryData {
  market_cap: number;
  market_cap_btc: number;
  total_volume: number;
  total_volume_btc: number;
  market_cap_change_percentage_24h: MarketChangePercentages;
  sparkline: string;
}

export interface CategoryEntry {
  id: number;
  name: string;
  market_cap_1h_change: number;
  slug: string;
  coins_count: number;
  data: CategoryData;
}

export interface TrendingResponse {
  coins: CoinEntry[];
  nfts: NftEntry[];
  categories: CategoryEntry[];
}

export interface CoinDetail {
  id: string;
  symbol: string;
  name: string;
  web_slug?: string;
  asset_platform_id?: string | null;
  platforms: Record<string, string>;
  detail_platforms: Record<
    string,
    {
      decimal_place: number | null;
      contract_address: string;
    }
  >;
  block_time_in_minutes?: number | null;
  hashing_algorithm?: string | null;
  categories: string[];
  preview_listing: boolean;
  public_notice?: string | null;
  additional_notices: string[];
  localization: Record<string, string>;
  description: Record<string, string>;
  links: {
    homepage: string[];
    whitepaper?: string;
    blockchain_site: string[];
    official_forum_url: string[];
    chat_url: string[];
    announcement_url: string[];
    snapshot_url?: string | null;
    twitter_screen_name?: string | null;
    facebook_username?: string | null;
    bitcointalk_thread_identifier?: string | null;
    telegram_channel_identifier?: string | null;
    subreddit_url?: string | null;
    repos_url: {
      github: string[];
      bitbucket: string[];
    };
  };
  image: {
    thumb: string;
    small: string;
    large: string;
  };
  country_origin: string;
  genesis_date?: string | null;
  sentiment_votes_up_percentage?: number | null;
  sentiment_votes_down_percentage?: number | null;
  watchlist_portfolio_users?: number | null;
  market_cap_rank?: number | null;
  market_data: {
    current_price: Record<string, number>;
    total_value_locked?: unknown | null;
    mcap_to_tvl_ratio?: unknown | null;
    fdv_to_tvl_ratio?: unknown | null;
    roi?: unknown | null;
    ath: Record<string, number>;
    ath_change_percentage: Record<string, number>;
    ath_date: Record<string, string>;
    atl: Record<string, number>;
    atl_change_percentage: Record<string, number>;
    atl_date: Record<string, string>;
    market_cap: Record<string, number>;
    market_cap_rank?: number | null;
    fully_diluted_valuation?: Record<string, number> | null;
    total_volume: Record<string, number>;
    high_24h: Record<string, number>;
    low_24h: Record<string, number>;
    price_change_24h?: number | null;
    price_change_percentage_24h?: number | null;
    price_change_percentage_7d?: number | null;
    price_change_percentage_14d?: number | null;
    price_change_percentage_30d?: number | null;
    price_change_percentage_60d?: number | null;
    price_change_percentage_200d?: number | null;
    price_change_percentage_1y?: number | null;
    market_cap_change_24h?: number | null;
    market_cap_change_percentage_24h?: number | null;
    price_change_24h_in_currency?: Record<string, number>;
    price_change_percentage_1h_in_currency?: Record<string, number>;
    price_change_percentage_24h_in_currency?: Record<string, number>;
    price_change_percentage_7d_in_currency?: Record<string, number>;
    price_change_percentage_14d_in_currency?: Record<string, number>;
    price_change_percentage_30d_in_currency?: Record<string, number>;
    price_change_percentage_60d_in_currency?: Record<string, number>;
    price_change_percentage_200d_in_currency?: Record<string, number>;
    price_change_percentage_1y_in_currency?: Record<string, number>;
    market_cap_change_24h_in_currency?: Record<string, number>;
    market_cap_change_percentage_24h_in_currency?: Record<string, number>;
    total_supply?: number | null;
    max_supply?: number | null;
    circulating_supply?: number | null;
    last_updated?: string | null;
    market_cap_fdv_ratio?: number | null;
  };
  community_data: {
    facebook_likes?: number | null;
    reddit_average_posts_48h?: number;
    reddit_average_comments_48h?: number;
    reddit_subscribers?: number;
    reddit_accounts_active_48h?: number;
    telegram_channel_user_count?: number | null;
  };
  developer_data: {
    forks?: number;
    stars?: number;
    subscribers?: number;
    total_issues?: number;
    closed_issues?: number;
    pull_requests_merged?: number;
    pull_request_contributors?: number;
    code_additions_deletions_4_weeks?: {
      additions: number;
      deletions: number;
    };
    commit_count_4_weeks?: number;
    last_4_weeks_commit_activity_series?: unknown[];
  };
  status_updates: unknown[];
  last_updated: string;
  tickers: Ticker[];
}

export interface Ticker {
  base: string;
  target: string;
  market: {
    name: string;
    identifier: string;
    has_trading_incentive: boolean;
  };
  last: number;
  volume: number;
  converted_last: Record<string, number>;
  converted_volume: Record<string, number>;
  trust_score?: string | null;
  bid_ask_spread_percentage?: number | null;
  timestamp?: string | null;
  last_traded_at?: string | null;
  last_fetch_at?: string | null;
  is_anomaly?: boolean;
  is_stale?: boolean;
  trade_url?: string | null;
  token_info_url?: string | null;
  coin_id?: string | null;
  target_coin_id?: string | null;
}

export interface CoinHistoryData {
  id: string;
  symbol: string;
  name: string;
  localization: Record<string, string>;
  image: {
    thumb: string;
    small: string;
    large?: string | null;
  };
  market_data: {
    current_price: Record<string, number>;
    market_cap: Record<string, number>;
    total_volume: Record<string, number>;
  };
  community_data: {
    facebook_likes: number | null;
    reddit_average_posts_48h: number;
    reddit_average_comments_48h: number;
    reddit_subscribers: number | null;
    reddit_accounts_active_48h: number | null;
  };
  developer_data: {
    forks: number;
    stars: number;
    subscribers: number;
    total_issues: number;
    closed_issues: number;
    pull_requests_merged: number;
    pull_request_contributors: number;
    code_additions_deletions_4_weeks: {
      additions: number;
      deletions: number;
    };
    commit_count_4_weeks: number;
  };
  public_interest_stats: {
    alexa_rank: number | null;
    bing_matches: number | null;
  };
}

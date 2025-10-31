import PriceChart from "@/components/charts/price-chart";
import {
  GetCoin,
  GetCoinMarketChartData,
} from "@/services/coingecko/coingecko.service";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter, useNavigation } from "expo-router";
import React, { useState, useLayoutEffect } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TIME_PERIODS = ["24H", "1W", "1M", "1Y"] as const;
type TimePeriod = (typeof TIME_PERIODS)[number];

const DAYS_MAP: Record<TimePeriod, number> = {
  "24H": 1,
  "1W": 7,
  "1M": 30,
  "1Y": 365,
};

export default function CoinDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>("24H");

  const { data: coin, isLoading } = useQuery({
    queryKey: ["coin", id],
    queryFn: () => GetCoin(id as string),
    enabled: !!id,
  });

  const { data: chartData, isLoading: isChartLoading } = useQuery({
    queryKey: ["coin-chart", id, selectedPeriod],
    queryFn: () =>
      GetCoinMarketChartData(id as string, DAYS_MAP[selectedPeriod]),
    enabled: !!id,
  });


  // We use useLayoutEffect to change the layout options of a page, based off some data, etc
  // here, the header changes based on the selected coin
  useLayoutEffect(() => {
    if (coin) {
      navigation.setOptions({
        headerLeft: () => (
          <View className="flex-row items-center gap-3">
            <TouchableOpacity
              onPress={() => router.back()}
              className="w-10 h-10 rounded-full bg-background-secondary border border-border items-center justify-center"
            >
              <Ionicons name="arrow-back" size={20} color="#111827" />
            </TouchableOpacity>
            <Text style={{ fontFamily: "PlusJakartaSans_600SemiBold", fontSize: 20 }}>
              {coin.name} ({coin.symbol.toUpperCase()})
            </Text>
          </View>
        ),
        headerRight: () => (
          <View>
            <TouchableOpacity>
              <Ionicons name="star-outline" size={24} color="#f59e0b" />
            </TouchableOpacity>
          </View>
        ),
      });
    }
  }, [coin, navigation, router]);

  if (isLoading || !coin) {
    return (
      <View className="flex-1 items-center justify-center bg-background-primary">
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  const currentPrice = coin.market_data.current_price.usd;
  const priceChange = coin.market_data.price_change_percentage_24h || 0;
  const isPositive = priceChange >= 0;

  return (
    <ScrollView
      className="flex-1 bg-background-primary"
      contentContainerStyle={{
        paddingBottom: insets.bottom + 100,
      }}
    >
      {/* Price */}
      <View className="px-4 pt-6 pb-6">
        <Text className="text-text-primary text-4xl font-bold mb-2">
          ${currentPrice.toLocaleString()}
        </Text>
        <View className="flex-row items-center">
          <Text
            className={`text-base font-medium ${
              isPositive ? "text-green-500" : "text-red-500"
            }`}
          >
            {isPositive ? "▲" : "▼"} ${Math.abs(priceChange).toFixed(2)} (
            {priceChange.toFixed(2)}%)
          </Text>
        </View>
      </View>

      {/* Time Period Selector */}
      <View className="flex-row px-4 mb-4 gap-2">
        {TIME_PERIODS.map((period) => (
          <TouchableOpacity
            key={period}
            onPress={() => setSelectedPeriod(period)}
            className={`px-4 py-2 rounded-lg ${
              selectedPeriod === period
                ? "bg-primary-600"
                : "bg-background-secondary"
            }`}
          >
            <Text
              className={`text-sm font-medium ${
                selectedPeriod === period ? "text-white" : "text-text-secondary"
              }`}
            >
              {period}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Chart */}
      <View className="p-2">
        <PriceChart
          data={chartData?.prices || []}
          isPositive={isPositive}
          isLoading={isChartLoading}
        />
      </View>

      {/* Tabs */}
      <View className="flex-row border-b border-border px-4 mb-4">
        {["Key stats", "Deals", "Order history", "Information"].map(
          (tab, index) => (
            <TouchableOpacity
              key={tab}
              className={`pb-3 mr-6 ${index === 0 ? "border-b-2 border-primary-600" : ""}`}
            >
              <Text
                className={`text-sm font-medium ${
                  index === 0 ? "text-text-primary" : "text-text-secondary"
                }`}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          )
        )}
      </View>

      {/* Key Stats */}
      <View className="px-4">
        <View className="flex-row justify-between mb-6">
          <View className="flex-1">
            <View className="mb-4">
              <Text className="text-text-secondary text-sm mb-1">Open</Text>
              <Text className="text-text-primary text-base font-medium">
                ${coin.market_data.current_price.usd.toLocaleString()}
              </Text>
            </View>
            <View className="mb-4">
              <Text className="text-text-secondary text-sm mb-1">Close</Text>
              <Text className="text-text-primary text-base font-medium">
                ${coin.market_data.current_price.usd.toLocaleString()}
              </Text>
            </View>
            <View>
              <Text className="text-text-secondary text-sm mb-1">
                Market vol
              </Text>
              <Text className="text-text-primary text-base font-medium">
                {(coin.market_data.total_volume.usd / 1000000).toFixed(1)}M
              </Text>
            </View>
          </View>

          <View className="flex-1">
            <View className="mb-4">
              <Text className="text-text-secondary text-sm mb-1">Current</Text>
              <Text className="text-text-primary text-base font-medium">
                ${coin.market_data.current_price.usd.toLocaleString()}
              </Text>
            </View>
            <View className="mb-4">
              <Text className="text-text-secondary text-sm mb-1">High</Text>
              <Text className="text-green-500 text-base font-medium">
                ${coin.market_data.high_24h.usd.toLocaleString()}
              </Text>
            </View>
            <View>
              <Text className="text-text-secondary text-sm mb-1">Low</Text>
              <Text className="text-red-500 text-base font-medium">
                ${coin.market_data.low_24h.usd.toLocaleString()}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View className="px-4 pt-4 flex-row gap-4">
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/sell-crypto",
              params: {
                coinSymbol: coin.symbol.toUpperCase(),
                coinPrice: currentPrice.toString(),
                holdings: "0.5",
              },
            })
          }
          className="flex-1 bg-background-secondary py-4 rounded-2xl items-center border border-border"
        >
          <Text
            className="text-text-primary text-base font-semibold"
            style={{ fontFamily: "PlusJakartaSans_600SemiBold" }}
          >
            Sell
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/buy-sell",
              params: {
                coinSymbol: coin.symbol.toUpperCase(),
                coinPrice: currentPrice.toString(),
              },
            })
          }
          className="flex-1 bg-primary-600 py-4 rounded-2xl items-center"
        >
          <Text
            className="text-white text-base font-semibold"
            style={{ fontFamily: "PlusJakartaSans_600SemiBold" }}
          >
            Buy
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

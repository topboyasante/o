import React, { useState } from "react";
import {
  ScrollView,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useQuery } from "@tanstack/react-query";
import { GetCoin } from "@/services/coingecko/coingecko.service";
import { Ionicons } from "@expo/vector-icons";

const TIME_PERIODS = ["24H", "1W", "1M", "1Y", "All"];

export default function CoinDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const [selectedPeriod, setSelectedPeriod] = useState("24H");

  const { data: coin, isLoading } = useQuery({
    queryKey: ["coin", id],
    queryFn: () => GetCoin(id as string),
    enabled: !!id,
  });

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
      contentContainerStyle={{ paddingBottom: insets.bottom + 100, paddingTop: insets.top + 16 }}
    >
      {/* Header */}
      <View className="px-4 pb-6">
        <View className="flex-row items-center justify-between mb-6">
          <Text className="text-text-primary text-xl font-semibold">
            {coin.name} ({coin.symbol.toUpperCase()})
          </Text>
          <TouchableOpacity>
            <Ionicons name="star-outline" size={24} color="#f59e0b" />
          </TouchableOpacity>
        </View>

        {/* Price */}
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
              selectedPeriod === period ? "bg-primary-600" : "bg-background-secondary"
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

      {/* Chart Placeholder */}
      <View className="h-64 mx-4 mb-6 bg-background-secondary rounded-2xl items-center justify-center border border-border">
        <Text className="text-text-tertiary">Chart Coming Soon</Text>
      </View>

      {/* Tabs */}
      <View className="flex-row border-b border-border px-4 mb-4">
        {["Key stats", "Deals", "Order history", "Information"].map((tab, index) => (
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
        ))}
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
              <Text className="text-text-secondary text-sm mb-1">Market vol</Text>
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
        <TouchableOpacity className="flex-1 bg-background-secondary py-4 rounded-2xl items-center border border-border">
          <Text className="text-text-primary text-base font-semibold">Sell</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 bg-primary-600 py-4 rounded-2xl items-center">
          <Text className="text-white text-base font-semibold">Buy</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

import React from "react";
import { Image, Text, View, TouchableOpacity, useWindowDimensions } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import SparklineChart from "@/components/charts/spark-line-chart";
import { CryptoCoin } from "@/services/coingecko/coingecko.types";

interface CoinListItemProps {
  coin: CryptoCoin;
}

export default function CoinListItem({ coin }: CoinListItemProps) {
  const router = useRouter();
  const { width: screenWidth } = useWindowDimensions();
  const priceChange = coin.price_change_percentage_24h || 0;
  const isPositive = priceChange >= 0;

  const handlePress = () => {
    router.push(`/coin/${coin.id}`);
  };

  // Calculate chart width: screen width - (horizontal padding 32px + card padding 32px)
  const chartWidth = screenWidth - 64;

  const formatPrice = (price: number) => {
    if (price >= 1) {
      return price.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }
    return price.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    });
  };

  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1_000_000_000_000) {
      return `$${(marketCap / 1_000_000_000_000).toFixed(2)}T`;
    } else if (marketCap >= 1_000_000_000) {
      return `$${(marketCap / 1_000_000_000).toFixed(2)}B`;
    } else if (marketCap >= 1_000_000) {
      return `$${(marketCap / 1_000_000).toFixed(2)}M`;
    }
    return `$${marketCap.toLocaleString()}`;
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      className="bg-background-secondary rounded-2xl p-4 mb-3 border border-border active:bg-gray-100"
      activeOpacity={0.7}
    >
      {/* Top Section */}
      <View className="flex-row items-center mb-3">
        <View className="bg-white rounded-full p-1 shadow-sm">
          <Image
            source={{ uri: coin.image }}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
            }}
          />
        </View>

        <View className="ml-3 flex-1">
          <Text
            className="text-base font-semibold text-text-primary mb-1"
            style={{ fontFamily: "PlusJakartaSans_600SemiBold" }}
          >
            {coin.name}
          </Text>
          <Text className="text-xs text-text-tertiary">
            {coin.symbol.toUpperCase()} • MCap {formatMarketCap(coin.market_cap || 0)}
          </Text>
        </View>

        <View className="items-end">
          <Text
            className="text-base font-semibold text-text-primary mb-1"
            style={{ fontFamily: "PlusJakartaSans_600SemiBold" }}
          >
            ${formatPrice(coin.current_price)}
          </Text>
          <View
            className={`flex-row items-center gap-1 px-2 py-1 rounded-full ${
              isPositive ? "bg-green-100" : "bg-red-100"
            }`}
          >
            <Ionicons
              name={isPositive ? "arrow-up" : "arrow-down"}
              size={12}
              color={isPositive ? "#10b981" : "#ef4444"}
            />
            <Text
              className={`text-xs font-semibold ${
                isPositive ? "text-green-600" : "text-red-600"
              }`}
              style={{ fontFamily: "PlusJakartaSans_600SemiBold" }}
            >
              {Math.abs(priceChange).toFixed(2)}%
            </Text>
          </View>
        </View>
      </View>

      {/* Sparkline Chart */}
      {coin.sparkline_in_7d?.price && (
        <View className="pt-3 border-t border-border/50">
          <SparklineChart
            data={coin.sparkline_in_7d.price}
            isPositive={isPositive}
            width={chartWidth}
            height={50}
          />
        </View>
      )}
    </TouchableOpacity>
  );
}

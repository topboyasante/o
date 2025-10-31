import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { GetCoinsListWithMarketData } from "@/services/coingecko/coingecko.service";

export default function BuyPage() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const { data: coins, isLoading } = useQuery({
    queryKey: ["coins-for-buy"],
    queryFn: () =>
      GetCoinsListWithMarketData({
        per_page: 20,
        sparkline: false,
      }),
  });

  const handleCoinPress = (coin: any) => {
    router.push({
      pathname: "/buy-sell",
      params: {
        coinSymbol: coin.symbol.toUpperCase(),
        coinPrice: coin.current_price.toString(),
      },
    });
  };

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

  if (isLoading) {
    return (
      <View className="flex-1 bg-background-primary items-center justify-center">
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-background-primary"
      contentContainerStyle={{
        paddingBottom: insets.bottom + 100,
        paddingTop: 16,
      }}
    >
      {/* Quick Stats */}
      <View className="px-4 mb-6">
        <View className="bg-primary-600 rounded-2xl p-5">
          <Text
            className="text-white text-sm mb-2"
            style={{ fontFamily: "PlusJakartaSans_500Medium" }}
          >
            Available Balance
          </Text>
          <Text
            className="text-white text-3xl font-bold mb-1"
            style={{ fontFamily: "PlusJakartaSans_700Bold" }}
          >
            $12,461.23
          </Text>
          <Text
            className="text-white opacity-80 text-xs"
            style={{ fontFamily: "PlusJakartaSans_400Regular" }}
          >
            Ready to invest
          </Text>
        </View>
      </View>

      {/* Popular Coins Section */}
      <View className="px-4 mb-4">
        <View className="flex-row items-center justify-between mb-4">
          <Text
            className="text-text-primary text-lg font-semibold"
            style={{ fontFamily: "PlusJakartaSans_600SemiBold" }}
          >
            Popular Coins
          </Text>
          <TouchableOpacity className="flex-row items-center gap-1">
            <Text
              className="text-primary-600 text-sm font-medium"
              style={{ fontFamily: "PlusJakartaSans_500Medium" }}
            >
              View All
            </Text>
            <Ionicons name="chevron-forward" size={16} color="#2563eb" />
          </TouchableOpacity>
        </View>

        {/* Coin List */}
        <View className="gap-3">
          {coins?.map((coin) => (
            <TouchableOpacity
              key={coin.id}
              onPress={() => handleCoinPress(coin)}
              className="bg-background-secondary rounded-2xl p-4 border border-border active:bg-gray-100"
            >
              <View className="flex-row items-center justify-between mb-3">
                <View className="flex-row items-center gap-3 flex-1">
                  {coin.image && (
                    <View className="bg-white rounded-full p-1 shadow-sm">
                      <Image
                        source={{ uri: coin.image }}
                        style={{ width: 40, height: 40, borderRadius: 20 }}
                      />
                    </View>
                  )}
                  <View className="flex-1">
                    <Text
                      className="text-text-primary text-base font-semibold mb-1"
                      style={{ fontFamily: "PlusJakartaSans_600SemiBold" }}
                    >
                      {coin.name}
                    </Text>
                    <Text className="text-text-tertiary text-xs">
                      {coin.symbol.toUpperCase()} • MCap {formatMarketCap(coin.market_cap)}
                    </Text>
                  </View>
                </View>

                <View className="items-end">
                  <Text
                    className="text-text-primary text-base font-semibold mb-1"
                    style={{ fontFamily: "PlusJakartaSans_600SemiBold" }}
                  >
                    ${formatPrice(coin.current_price)}
                  </Text>
                  <View
                    className={`flex-row items-center gap-1 px-2 py-1 rounded-full ${
                      coin.price_change_percentage_24h >= 0
                        ? "bg-green-100"
                        : "bg-red-100"
                    }`}
                  >
                    <Ionicons
                      name={
                        coin.price_change_percentage_24h >= 0
                          ? "arrow-up"
                          : "arrow-down"
                      }
                      size={12}
                      color={
                        coin.price_change_percentage_24h >= 0
                          ? "#10b981"
                          : "#ef4444"
                      }
                    />
                    <Text
                      className={`text-xs font-semibold ${
                        coin.price_change_percentage_24h >= 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                      style={{ fontFamily: "PlusJakartaSans_600SemiBold" }}
                    >
                      {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                    </Text>
                  </View>
                </View>
              </View>

              {/* Buy Button */}
              <View className="flex-row items-center justify-between pt-3 border-t border-border/50">
                <Text
                  className="text-text-secondary text-xs"
                  style={{ fontFamily: "PlusJakartaSans_400Regular" }}
                >
                  24h Vol: ${(coin.total_volume / 1_000_000_000).toFixed(2)}B
                </Text>
                <View className="bg-primary-600 px-4 py-2 rounded-lg">
                  <Text
                    className="text-white text-sm font-semibold"
                    style={{ fontFamily: "PlusJakartaSans_600SemiBold" }}
                  >
                    Buy Now
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

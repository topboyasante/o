import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { GetCoinsListWithMarketData } from "@/services/coingecko/coingecko.service";

export default function BuyPage() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const { data: coins } = useQuery({
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

  return (
    <ScrollView
      className="flex-1 bg-background-primary"
      contentContainerStyle={{
        paddingBottom: insets.bottom + 100,
        paddingTop: 16,
      }}
    >
      {/* Popular Coins Section */}
      <View className="px-4 mb-4">
        <Text
          className="text-text-primary text-lg font-semibold mb-4"
          style={{ fontFamily: "PlusJakartaSans_600SemiBold" }}
        >
          Popular Coins
        </Text>

        {/* Coin List */}
        <View className="space-y-3">
          {coins?.map((coin) => (
            <TouchableOpacity
              key={coin.id}
              onPress={() => handleCoinPress(coin)}
              className="bg-background-secondary rounded-2xl p-4 border border-border"
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-3 flex-1">
                  {coin.image && (
                    <Image
                      source={{ uri: coin.image }}
                      style={{ width: 40, height: 40, borderRadius: 20 }}
                    />
                  )}
                  <View className="flex-1">
                    <Text
                      className="text-text-primary text-base font-semibold"
                      style={{ fontFamily: "PlusJakartaSans_600SemiBold" }}
                    >
                      {coin.name}
                    </Text>
                    <Text className="text-text-secondary text-sm">
                      {coin.symbol.toUpperCase()}
                    </Text>
                  </View>
                </View>

                <View className="items-end">
                  <Text
                    className="text-text-primary text-base font-semibold"
                    style={{ fontFamily: "PlusJakartaSans_600SemiBold" }}
                  >
                    ${coin.current_price.toLocaleString()}
                  </Text>
                  <View className="flex-row items-center gap-1">
                    <Ionicons
                      name={
                        coin.price_change_percentage_24h >= 0
                          ? "trending-up"
                          : "trending-down"
                      }
                      size={16}
                      color={
                        coin.price_change_percentage_24h >= 0
                          ? "#10b981"
                          : "#ef4444"
                      }
                    />
                    <Text
                      className={`text-sm font-medium ${
                        coin.price_change_percentage_24h >= 0
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                      style={{ fontFamily: "PlusJakartaSans_500Medium" }}
                    >
                      {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

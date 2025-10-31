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

export default function SellPage() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const { data: coins, isLoading } = useQuery({
    queryKey: ["coins-for-sell"],
    queryFn: () =>
      GetCoinsListWithMarketData({
        per_page: 10,
        sparkline: false,
      }),
  });

  const handleCoinPress = (coin: any, holdings: number) => {
    router.push({
      pathname: "/sell-crypto",
      params: {
        coinSymbol: coin.symbol.toUpperCase(),
        coinPrice: coin.current_price.toString(),
        holdings: holdings.toString(),
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

  // Mock holdings data - in a real app this would come from user's wallet
  const mockHoldings = coins?.slice(0, 5).map((coin) => ({
    ...coin,
    holdings: Math.random() * 0.5, // Random holdings between 0 and 0.5
    purchasePrice: coin.current_price * (0.8 + Math.random() * 0.4), // Random purchase price ±20%
  }));

  const calculateProfitLoss = (current: number, purchase: number, amount: number) => {
    const profitLoss = (current - purchase) * amount;
    const profitLossPercentage = ((current - purchase) / purchase) * 100;
    return { profitLoss, profitLossPercentage };
  };

  const totalPortfolioValue = mockHoldings?.reduce(
    (sum, coin) => sum + (coin.current_price * coin.holdings || 0),
    0
  ) || 0;

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
      {/* Portfolio Summary */}
      <View className="px-4 mb-6">
        <View className="bg-orange-500 rounded-2xl p-5">
          <Text
            className="text-white text-sm mb-2"
            style={{ fontFamily: "PlusJakartaSans_500Medium" }}
          >
            Total Portfolio Value
          </Text>
          <Text
            className="text-white text-3xl font-bold mb-1"
            style={{ fontFamily: "PlusJakartaSans_700Bold" }}
          >
            ${totalPortfolioValue.toFixed(2)}
          </Text>
          <View className="flex-row items-center gap-2">
            <View className="bg-white opacity-20 px-2 py-1 rounded-full">
              <Text
                className="text-white text-xs font-semibold"
                style={{ fontFamily: "PlusJakartaSans_600SemiBold" }}
              >
                +12.5%
              </Text>
            </View>
            <Text
              className="text-white opacity-80 text-xs"
              style={{ fontFamily: "PlusJakartaSans_400Regular" }}
            >
              Last 24h
            </Text>
          </View>
        </View>
      </View>

      {/* Your Holdings Section */}
      <View className="px-4 mb-4">
        <View className="flex-row items-center justify-between mb-4">
          <Text
            className="text-text-primary text-lg font-semibold"
            style={{ fontFamily: "PlusJakartaSans_600SemiBold" }}
          >
            Your Holdings
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
          {mockHoldings?.map((coin) => {
            const { profitLoss, profitLossPercentage } = calculateProfitLoss(
              coin.current_price,
              coin.purchasePrice,
              coin.holdings
            );
            const currentValue = coin.current_price * coin.holdings;

            return (
              <TouchableOpacity
                key={coin.id}
                onPress={() => handleCoinPress(coin, coin.holdings)}
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
                        {coin.holdings.toFixed(8)} {coin.symbol.toUpperCase()}
                      </Text>
                    </View>
                  </View>

                  <View className="items-end">
                    <Text
                      className="text-text-primary text-base font-semibold mb-1"
                      style={{ fontFamily: "PlusJakartaSans_600SemiBold" }}
                    >
                      ${currentValue.toFixed(2)}
                    </Text>
                    <View
                      className={`flex-row items-center gap-1 px-2 py-1 rounded-full ${
                        profitLoss >= 0 ? "bg-green-100" : "bg-red-100"
                      }`}
                    >
                      <Ionicons
                        name={profitLoss >= 0 ? "arrow-up" : "arrow-down"}
                        size={12}
                        color={profitLoss >= 0 ? "#10b981" : "#ef4444"}
                      />
                      <Text
                        className={`text-xs font-semibold ${
                          profitLoss >= 0 ? "text-green-600" : "text-red-600"
                        }`}
                        style={{ fontFamily: "PlusJakartaSans_600SemiBold" }}
                      >
                        {profitLossPercentage >= 0 ? "+" : ""}
                        {profitLossPercentage.toFixed(2)}%
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Sell Button and Stats */}
                <View className="flex-row items-center justify-between pt-3 border-t border-border/50">
                  <View>
                    <Text
                      className="text-text-tertiary text-xs mb-1"
                      style={{ fontFamily: "PlusJakartaSans_400Regular" }}
                    >
                      Current Price
                    </Text>
                    <Text
                      className="text-text-secondary text-xs font-medium"
                      style={{ fontFamily: "PlusJakartaSans_500Medium" }}
                    >
                      ${formatPrice(coin.current_price)}
                    </Text>
                  </View>
                  <View className="bg-orange-500 px-4 py-2 rounded-lg">
                    <Text
                      className="text-white text-sm font-semibold"
                      style={{ fontFamily: "PlusJakartaSans_600SemiBold" }}
                    >
                      Sell Now
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Empty State - if no holdings */}
        {(!mockHoldings || mockHoldings.length === 0) && (
          <View className="bg-background-secondary rounded-2xl p-8 border border-border items-center">
            <View className="w-16 h-16 bg-gray-100 rounded-full items-center justify-center mb-4">
              <Ionicons name="wallet-outline" size={32} color="#9ca3af" />
            </View>
            <Text
              className="text-text-primary text-base font-semibold mb-2"
              style={{ fontFamily: "PlusJakartaSans_600SemiBold" }}
            >
              No Holdings Yet
            </Text>
            <Text
              className="text-text-secondary text-sm text-center mb-4"
              style={{ fontFamily: "PlusJakartaSans_400Regular" }}
            >
              You don't have any crypto to sell.{"\n"}Start by buying some crypto first.
            </Text>
            <TouchableOpacity className="bg-primary-600 px-6 py-3 rounded-lg">
              <Text
                className="text-white text-sm font-semibold"
                style={{ fontFamily: "PlusJakartaSans_600SemiBold" }}
              >
                Buy Crypto
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

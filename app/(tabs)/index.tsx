import React from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { GetCoinsListWithMarketData } from "@/services/coingecko/coingecko.service";

export default function Index() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const { data: coins, isLoading } = useQuery({
    queryKey: ["coins-for-wallet"],
    queryFn: () =>
      GetCoinsListWithMarketData({
        per_page: 5,
        sparkline: false,
      }),
  });

  // Mock portfolio data - in a real app this would come from user's actual holdings
  const mockHoldings = coins?.slice(0, 4).map((coin) => ({
    ...coin,
    holdings: Math.random() * 0.5,
    purchasePrice: coin.current_price * (0.8 + Math.random() * 0.4),
  }));

  const totalPortfolioValue = mockHoldings?.reduce(
    (sum, coin) => sum + coin.current_price * coin.holdings,
    0
  ) || 0;

  const totalProfitLoss = mockHoldings?.reduce((sum, coin) => {
    const profitLoss = (coin.current_price - coin.purchasePrice) * coin.holdings;
    return sum + profitLoss;
  }, 0) || 0;

  const profitLossPercentage = totalProfitLoss / (totalPortfolioValue - totalProfitLoss) * 100;

  const quickActions = [
    { icon: "add-circle", label: "Buy", color: "#2563eb", route: "/buy" },
    { icon: "remove-circle", label: "Sell", color: "#f97316", route: "/sell" },
    { icon: "swap-horizontal", label: "Swap", color: "#8b5cf6", route: "/swap" },
    { icon: "paper-plane", label: "Send", color: "#10b981", route: null },
  ];

  return (
    <ScrollView
      className="flex-1 bg-background-primary"
      contentContainerStyle={{ paddingBottom: insets.bottom + 100, paddingTop: 16 }}
    >
      {/* Portfolio Card */}
      <View className="px-4 mb-6">
        <View className="bg-primary-500 rounded-3xl p-6">
          <Text
            className="text-white opacity-80 text-sm mb-2"
            style={{ fontFamily: "PlusJakartaSans_500Medium" }}
          >
            Total Portfolio Value
          </Text>
          <Text
            className="text-white text-4xl font-bold mb-4"
            style={{ fontFamily: "PlusJakartaSans_700Bold" }}
          >
            ${totalPortfolioValue.toFixed(2)}
          </Text>
          <View className="flex-row items-center gap-2">
            <View
              className={`flex-row items-center gap-1 px-2 py-1 rounded-full ${
                totalProfitLoss >= 0 ? "bg-green-500" : "bg-red-500"
              }`}
            >
              <Ionicons
                name={totalProfitLoss >= 0 ? "arrow-up" : "arrow-down"}
                size={14}
                color="#ffffff"
              />
              <Text
                className="text-white text-xs font-semibold"
                style={{ fontFamily: "PlusJakartaSans_600SemiBold" }}
              >
                {totalProfitLoss >= 0 ? "+" : ""}${Math.abs(totalProfitLoss).toFixed(2)} (
                {profitLossPercentage.toFixed(2)}%)
              </Text>
            </View>
            <Text
              className="text-white opacity-80 text-xs"
              style={{ fontFamily: "PlusJakartaSans_400Regular" }}
            >
              All time
            </Text>
          </View>
        </View>
      </View>

      {/* Quick Actions */}
      <View className="px-4 mb-6">
        <Text
          className="text-text-primary text-lg font-semibold mb-4"
          style={{ fontFamily: "PlusJakartaSans_600SemiBold" }}
        >
          Quick Actions
        </Text>
        <View className="flex-row justify-between gap-3">
          {quickActions.map((action) => (
            <TouchableOpacity
              key={action.label}
              onPress={() => action.route && router.push(action.route as any)}
              className="flex-1 bg-background-secondary rounded-2xl p-4 items-center border border-border"
              disabled={!action.route}
              style={{ opacity: action.route ? 1 : 0.5 }}
            >
              <View
                className="w-12 h-12 rounded-full items-center justify-center mb-2"
                style={{ backgroundColor: action.color + "20" }}
              >
                <Ionicons name={action.icon as any} size={24} color={action.color} />
              </View>
              <Text
                className="text-text-primary text-sm font-medium"
                style={{ fontFamily: "PlusJakartaSans_500Medium" }}
              >
                {action.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Holdings */}
      <View className="px-4 mb-4">
        <View className="flex-row items-center justify-between mb-4">
          <Text
            className="text-text-primary text-lg font-semibold"
            style={{ fontFamily: "PlusJakartaSans_600SemiBold" }}
          >
            Your Holdings
          </Text>
          <TouchableOpacity
            onPress={() => router.push("/sell")}
            className="flex-row items-center gap-1"
          >
            <Text
              className="text-primary-600 text-sm font-medium"
              style={{ fontFamily: "PlusJakartaSans_500Medium" }}
            >
              See All
            </Text>
            <Ionicons name="chevron-forward" size={16} color="#2563eb" />
          </TouchableOpacity>
        </View>

        <View className="gap-3">
          {mockHoldings?.map((coin) => {
            const currentValue = coin.current_price * coin.holdings;
            const profitLoss = (coin.current_price - coin.purchasePrice) * coin.holdings;
            const profitLossPercentage = ((coin.current_price - coin.purchasePrice) / coin.purchasePrice) * 100;

            return (
              <TouchableOpacity
                key={coin.id}
                onPress={() => router.push(`/coin/${coin.id}`)}
                className="bg-background-secondary rounded-2xl p-4 border border-border active:bg-gray-100"
              >
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center gap-3 flex-1">
                    <View className="bg-white rounded-full p-1 shadow-sm">
                      <Image
                        source={{ uri: coin.image }}
                        style={{ width: 40, height: 40, borderRadius: 20 }}
                      />
                    </View>
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
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Market Overview */}
      <View className="px-4 mb-4">
        <View className="flex-row items-center justify-between mb-4">
          <Text
            className="text-text-primary text-lg font-semibold"
            style={{ fontFamily: "PlusJakartaSans_600SemiBold" }}
          >
            Market Overview
          </Text>
          <TouchableOpacity
            onPress={() => router.push("/market")}
            className="flex-row items-center gap-1"
          >
            <Text
              className="text-primary-600 text-sm font-medium"
              style={{ fontFamily: "PlusJakartaSans_500Medium" }}
            >
              View Market
            </Text>
            <Ionicons name="chevron-forward" size={16} color="#2563eb" />
          </TouchableOpacity>
        </View>

        <View className="bg-background-secondary rounded-2xl p-4 border border-border">
          <View className="flex-row justify-between mb-3">
            <Text
              className="text-text-secondary text-sm"
              style={{ fontFamily: "PlusJakartaSans_400Regular" }}
            >
              Total Market Cap
            </Text>
            <Text
              className="text-text-primary text-sm font-semibold"
              style={{ fontFamily: "PlusJakartaSans_600SemiBold" }}
            >
              $2.45T
            </Text>
          </View>
          <View className="flex-row justify-between mb-3">
            <Text
              className="text-text-secondary text-sm"
              style={{ fontFamily: "PlusJakartaSans_400Regular" }}
            >
              24h Trading Volume
            </Text>
            <Text
              className="text-text-primary text-sm font-semibold"
              style={{ fontFamily: "PlusJakartaSans_600SemiBold" }}
            >
              $89.2B
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text
              className="text-text-secondary text-sm"
              style={{ fontFamily: "PlusJakartaSans_400Regular" }}
            >
              BTC Dominance
            </Text>
            <Text
              className="text-text-primary text-sm font-semibold"
              style={{ fontFamily: "PlusJakartaSans_600SemiBold" }}
            >
              51.2%
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

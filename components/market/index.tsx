import { GetCoinsListWithMarketData } from "@/services/coingecko/coingecko.service";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CoinListItem from "@/components/market/coin-list-item";

function MarketsPage() {
  const insets = useSafeAreaInsets();
  const results = useQuery({
    queryKey: ["market-data"],
    queryFn: () =>
      GetCoinsListWithMarketData({
        sparkline: true,
        price_change_percentage: "24h",
        per_page: 20,
      }),
  });

  if (results.isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-background-primary">
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-background-primary"
      contentContainerStyle={{ paddingBottom: insets.bottom + 50 }}
    >
      <View className="px-4 py-2">
        {results.data?.map((coin) => (
          <CoinListItem key={coin.id} coin={coin} />
        ))}
      </View>
    </ScrollView>
  );
}

export default MarketsPage;

import React from "react";
import { Image, Text, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import SparklineChart from "@/components/charts/spark-line-chart";
import { CryptoCoin } from "@/services/coingecko/coingecko.types";

interface CoinListItemProps {
  coin: CryptoCoin;
}

export default function CoinListItem({ coin }: CoinListItemProps) {
  const router = useRouter();
  const priceChange = coin.price_change_percentage_24h || 0;
  const isPositive = priceChange >= 0;

  const handlePress = () => {
    router.push(`/coin/${coin.id}`);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      className="bg-background-secondary rounded-2xl p-4 mb-3 flex-row items-center"
      activeOpacity={0.7}
    >
      <Image
        source={{ uri: coin.image }}
        style={{
          width: 40,
          height: 40,
        }}
      />

      <View className="ml-3 flex-1">
        <Text className="text-base font-bold text-text-primary">
          {coin.symbol.toUpperCase()}
        </Text>
        <Text className="text-xs text-text-secondary mt-0.5">
          {coin.name}
        </Text>
      </View>

      {coin.sparkline_in_7d?.price && (
        <View className="mx-3">
          <SparklineChart
            data={coin.sparkline_in_7d.price}
            isPositive={isPositive}
          />
        </View>
      )}

      <View className="items-end">
        <Text className="text-base font-semibold text-text-primary">
          ${coin.current_price.toLocaleString()}
        </Text>
        <Text
          className={`text-xs font-medium mt-0.5 ${
            isPositive ? "text-green-500" : "text-red-500"
          }`}
        >
          {isPositive ? "↑" : "↓"} {Math.abs(priceChange).toFixed(2)}%
        </Text>
      </View>
    </TouchableOpacity>
  );
}

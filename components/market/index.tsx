import { GetCoinsListWithMarketData } from "@/services/coingecko/coingecko.service";
import { useQuery } from "@tanstack/react-query";
import React, { useState, useLayoutEffect } from "react";
import { ActivityIndicator, ScrollView, View, TouchableOpacity, TextInput, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import CoinListItem from "@/components/market/coin-list-item";

function MarketsPage() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const results = useQuery({
    queryKey: ["market-data"],
    queryFn: () =>
      GetCoinsListWithMarketData({
        sparkline: true,
        price_change_percentage: "24h",
        per_page: 20,
      }),
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View className="ml-6">
          <Text style={{ fontFamily: "PlusJakartaSans_600SemiBold", fontSize: 20 }}>
            Crypto Market
          </Text>
        </View>
      ),
      headerRight: () => (
        <View className="flex-row items-center gap-6 mr-6">
          <TouchableOpacity
            onPress={() => setIsSearchVisible(!isSearchVisible)}
            className={`w-10 h-10 rounded-full items-center justify-center ${
              isSearchVisible ? "bg-primary-100" : ""
            }`}
          >
            <Ionicons
              name={isSearchVisible ? "search" : "search-outline"}
              size={24}
              color={isSearchVisible ? "#2563eb" : "#000000"}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="filter-outline" size={24} color="#000000" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, isSearchVisible]);

  if (results.isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-background-primary">
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  const filteredCoins = results.data?.filter((coin) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      coin.name.toLowerCase().includes(query) ||
      coin.symbol.toLowerCase().includes(query)
    );
  });

  return (
    <ScrollView
      className="flex-1 bg-background-primary"
      contentContainerStyle={{ paddingBottom: insets.bottom + 50 }}
    >
      {/* Search Bar */}
      {isSearchVisible && (
        <View className="px-4 pt-4 pb-2">
          <View className="flex-row items-center bg-background-secondary rounded-xl px-4 py-3 border border-border">
            <Ionicons name="search-outline" size={20} color="#6b7280" />
            <TextInput
              className="flex-1 ml-2 text-text-primary"
              placeholder="Search coins..."
              placeholderTextColor="#9ca3af"
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus
              style={{ fontFamily: "PlusJakartaSans_400Regular" }}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <Ionicons name="close-circle" size={20} color="#6b7280" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}

      <View className="px-4 py-2">
        {filteredCoins?.map((coin) => (
          <CoinListItem key={coin.id} coin={coin} />
        ))}
      </View>
    </ScrollView>
  );
}

export default MarketsPage;

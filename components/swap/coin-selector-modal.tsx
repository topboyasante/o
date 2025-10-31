import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CryptoCoin } from "@/services/coingecko/coingecko.types";

interface CoinSelectorModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectCoin: (coinId: string) => void;
  coins?: CryptoCoin[];
  currentCoinId?: string;
}

export default function CoinSelectorModal({
  visible,
  onClose,
  onSelectCoin,
  coins = [],
  currentCoinId,
}: CoinSelectorModalProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCoins = coins.filter((coin) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      coin.name.toLowerCase().includes(query) ||
      coin.symbol.toLowerCase().includes(query)
    );
  });

  const handleSelectCoin = (coinId: string) => {
    onSelectCoin(coinId);
    onClose();
    setSearchQuery("");
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-background-primary">
        {/* Header */}
        <View className="px-4 pt-4 pb-3 border-b border-border">
          <View className="flex-row items-center justify-between mb-4">
            <Text
              className="text-text-primary text-xl font-bold"
              style={{ fontFamily: "PlusJakartaSans_700Bold" }}
            >
              Select Coin
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={28} color="#111827" />
            </TouchableOpacity>
          </View>

          {/* Search */}
          <View className="flex-row items-center bg-background-secondary rounded-xl px-4 py-3 border border-border">
            <Ionicons name="search-outline" size={20} color="#6b7280" />
            <TextInput
              className="flex-1 ml-2 text-text-primary"
              placeholder="Search coins..."
              placeholderTextColor="#9ca3af"
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={{ fontFamily: "PlusJakartaSans_400Regular" }}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <Ionicons name="close-circle" size={20} color="#6b7280" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Coin List */}
        <FlatList
          data={filteredCoins}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleSelectCoin(item.id)}
              className="px-4 py-4 border-b border-border-light"
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-3 flex-1">
                  <Image
                    source={{ uri: item.image }}
                    style={{ width: 40, height: 40, borderRadius: 20 }}
                  />
                  <View className="flex-1">
                    <Text
                      className="text-text-primary text-base font-semibold"
                      style={{ fontFamily: "PlusJakartaSans_600SemiBold" }}
                    >
                      {item.symbol.toUpperCase()}
                    </Text>
                    <Text className="text-text-secondary text-sm">
                      {item.name}
                    </Text>
                  </View>
                </View>

                <View className="items-end">
                  <Text
                    className="text-text-primary text-sm font-medium"
                    style={{ fontFamily: "PlusJakartaSans_500Medium" }}
                  >
                    ${item.current_price.toLocaleString()}
                  </Text>
                  {currentCoinId === item.id && (
                    <Ionicons name="checkmark-circle" size={20} color="#3b82f6" />
                  )}
                </View>
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <View className="items-center justify-center py-12">
              <Text className="text-text-tertiary text-sm">
                No coins found
              </Text>
            </View>
          }
        />
      </View>
    </Modal>
  );
}

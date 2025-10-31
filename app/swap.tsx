import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { GetCoinsListWithMarketData } from "@/services/coingecko/coingecko.service";
import CoinSelectorModal from "@/components/swap/coin-selector-modal";

export default function SwapPage() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [fromCoinId, setFromCoinId] = useState("bitcoin");
  const [toCoinId, setToCoinId] = useState("tether");
  const [isFromModalVisible, setIsFromModalVisible] = useState(false);
  const [isToModalVisible, setIsToModalVisible] = useState(false);

  const { data: coins } = useQuery({
    queryKey: ["coins-for-swap"],
    queryFn: () =>
      GetCoinsListWithMarketData({
        per_page: 50,
        sparkline: false,
      }),
  });

  const fromCoin = coins?.find((c) => c.id === fromCoinId);
  const toCoin = coins?.find((c) => c.id === toCoinId);

  const handleSwapDirection = () => {
    setFromCoinId(toCoinId);
    setToCoinId(fromCoinId);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(2) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(2) + "K";
    } else if (num >= 1) {
      return num.toFixed(2);
    } else if (num > 0) {
      return num.toFixed(6);
    }
    return "0";
  };

  const calculateToAmount = (amount: string) => {
    if (!amount || !fromCoin || !toCoin) return "";
    const fromValue = parseFloat(amount) * fromCoin.current_price;
    const toValue = fromValue / toCoin.current_price;
    return formatNumber(toValue);
  };

  const handleFromAmountChange = (value: string) => {
    setFromAmount(value);
    setToAmount(calculateToAmount(value));
  };

  const exchangeRate =
    fromCoin && toCoin
      ? (fromCoin.current_price / toCoin.current_price).toFixed(2)
      : "0";

  return (
    <ScrollView
      className="flex-1 bg-background-primary"
      contentContainerStyle={{
        paddingTop: insets.top + 16,
        paddingBottom: insets.bottom + 100,
      }}
    >
      {/* Header */}
      <View className="px-4 pb-6">
        <View className="flex-row items-center mb-6">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-background-secondary border border-border items-center justify-center mr-3"
          >
            <Ionicons name="arrow-back" size={20} color="#111827" />
          </TouchableOpacity>
          <Text
            className="text-text-primary text-2xl font-bold"
            style={{ fontFamily: "PlusJakartaSans_700Bold" }}
          >
            Swap
          </Text>
        </View>
      </View>

      {/* From Section */}
      <View className="px-4 mb-2">
        <View className="bg-background-secondary rounded-2xl p-5 border border-border">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-text-secondary text-sm">From</Text>
            <Text className="text-text-secondary text-xs">
              Available: {fromCoin ? "0.00000000" : "0"}{" "}
              {fromCoin?.symbol.toUpperCase()}
            </Text>
          </View>

          <View className="flex-row items-center justify-between mb-3">
            <TouchableOpacity
              className="flex-row items-center gap-2"
              onPress={() => setIsFromModalVisible(true)}
            >
              {fromCoin?.image && (
                <Image
                  source={{ uri: fromCoin.image }}
                  style={{ width: 32, height: 32, borderRadius: 16 }}
                />
              )}
              <Text
                className="text-text-primary text-lg font-semibold"
                style={{ fontFamily: "PlusJakartaSans_600SemiBold" }}
              >
                {fromCoin?.symbol.toUpperCase()}
              </Text>
              <Ionicons name="chevron-down" size={16} color="#111827" />
            </TouchableOpacity>

            <TextInput
              className="text-text-primary text-right flex-1"
              placeholder="0.000076"
              placeholderTextColor="#9ca3af"
              keyboardType="decimal-pad"
              value={fromAmount}
              onChangeText={handleFromAmountChange}
              style={{
                fontFamily: "PlusJakartaSans_700Bold",
                fontSize: 32,
              }}
            />
          </View>

          <View className="flex-row items-center justify-between">
            <Text className="text-text-tertiary text-sm">
              ≈${fromCoin && fromAmount
                ? (parseFloat(fromAmount) * fromCoin.current_price).toLocaleString()
                : "0"}
            </Text>
            <TouchableOpacity>
              <Text
                className="text-orange-500 text-sm font-semibold"
                style={{ fontFamily: "PlusJakartaSans_600SemiBold" }}
              >
                MAX
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Swap Direction Button */}
      <View className="items-center my-2">
        <TouchableOpacity
          onPress={handleSwapDirection}
          className="w-12 h-12 bg-primary-600 rounded-full items-center justify-center"
        >
          <Ionicons name="swap-vertical" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>

      {/* To Section */}
      <View className="px-4 mb-6">
        <View className="bg-background-secondary rounded-2xl p-5 border border-border">
          <Text className="text-text-secondary text-sm mb-4">To</Text>

          <View className="flex-row items-center justify-between mb-3">
            <TouchableOpacity
              className="flex-row items-center gap-2"
              onPress={() => setIsToModalVisible(true)}
            >
              {toCoin?.image && (
                <Image
                  source={{ uri: toCoin.image }}
                  style={{ width: 32, height: 32, borderRadius: 16 }}
                />
              )}
              <Text
                className="text-text-primary text-lg font-semibold"
                style={{ fontFamily: "PlusJakartaSans_600SemiBold" }}
              >
                {toCoin?.symbol.toUpperCase()}
              </Text>
              <Ionicons name="chevron-down" size={16} color="#111827" />
            </TouchableOpacity>

            <Text
              className="text-text-primary text-right flex-1"
              numberOfLines={1}
              adjustsFontSizeToFit
              style={{
                fontFamily: "PlusJakartaSans_700Bold",
                fontSize: 32,
              }}
            >
              {toAmount || "0"}
            </Text>
          </View>

          <Text className="text-text-tertiary text-sm">
            ≈${toCoin && toAmount
              ? (parseFloat(toAmount) * toCoin.current_price).toLocaleString()
              : "0"}
          </Text>
        </View>
      </View>

      {/* Exchange Details */}
      <View className="px-4 mb-6">
        <View className="space-y-3">
          <View className="flex-row items-center justify-between py-2">
            <View className="flex-row items-center gap-2">
              <Ionicons name="refresh" size={20} color="#6b7280" />
              <Text className="text-text-secondary text-sm">Exchange price</Text>
            </View>
            <Text
              className="text-text-primary text-sm"
              style={{ fontFamily: "PlusJakartaSans_500Medium" }}
            >
              1 {fromCoin?.symbol.toUpperCase()} = {exchangeRate}{" "}
              {toCoin?.symbol.toUpperCase()}
            </Text>
          </View>

          <View className="flex-row items-center justify-between py-2">
            <View className="flex-row items-center gap-2">
              <Ionicons name="receipt-outline" size={20} color="#6b7280" />
              <Text className="text-text-secondary text-sm">Fees</Text>
              <Ionicons name="information-circle-outline" size={16} color="#9ca3af" />
            </View>
            <View className="flex-row items-center gap-2">
              <View className="bg-green-100 px-2 py-1 rounded">
                <Text
                  className="text-green-600 text-xs font-semibold"
                  style={{ fontFamily: "PlusJakartaSans_600SemiBold" }}
                >
                  Free
                </Text>
              </View>
              <Ionicons name="ellipsis-horizontal" size={20} color="#6b7280" />
            </View>
          </View>

          <View className="flex-row items-center justify-between py-2">
            <View className="flex-row items-center gap-2">
              <Ionicons name="speedometer-outline" size={20} color="#6b7280" />
              <Text className="text-text-secondary text-sm">Slippage Tolerance</Text>
              <Ionicons name="information-circle-outline" size={16} color="#9ca3af" />
            </View>
            <View className="flex-row items-center gap-2">
              <Text
                className="text-text-primary text-sm"
                style={{ fontFamily: "PlusJakartaSans_500Medium" }}
              >
                3%
              </Text>
              <Ionicons name="ellipsis-horizontal" size={20} color="#6b7280" />
            </View>
          </View>
        </View>
      </View>

      {/* Coin Selector Modals */}
      <CoinSelectorModal
        visible={isFromModalVisible}
        onClose={() => setIsFromModalVisible(false)}
        onSelectCoin={(coinId) => {
          setFromCoinId(coinId);
          setFromAmount("");
          setToAmount("");
        }}
        coins={coins}
        currentCoinId={fromCoinId}
      />

      <CoinSelectorModal
        visible={isToModalVisible}
        onClose={() => setIsToModalVisible(false)}
        onSelectCoin={(coinId) => {
          setToCoinId(coinId);
          setFromAmount("");
          setToAmount("");
        }}
        coins={coins}
        currentCoinId={toCoinId}
      />
    </ScrollView>
  );
}

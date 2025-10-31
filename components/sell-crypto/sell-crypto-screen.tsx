import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface SellCryptoScreenProps {
  onNext: (amount: string, coinAmount: string) => void;
  coinSymbol: string;
  coinPrice: number;
  holdings: number;
}

const PRESET_PERCENTAGES = ["25%", "50%", "75%", "100%"];

export default function SellCryptoScreen({
  onNext,
  coinSymbol,
  coinPrice,
  holdings,
}: SellCryptoScreenProps) {
  const router = useRouter();
  const [coinAmount, setCoinAmount] = useState("");

  const handlePresetPercentage = (preset: string) => {
    const percentage = parseFloat(preset.replace("%", "")) / 100;
    const value = (holdings * percentage).toFixed(8);
    setCoinAmount(value);
  };

  const usdAmount = coinAmount
    ? (parseFloat(coinAmount) * coinPrice).toFixed(2)
    : "0.00";

  const maxValue = holdings * coinPrice;

  return (
    <View className="flex-1 bg-background-primary px-4 pt-6">
      {/* Header with Back Button */}
      <View className="mb-6">
        <View className="flex-row items-center mb-4">
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
            Sell {coinSymbol}
          </Text>
        </View>
        <Text className="text-text-secondary text-sm">
          Available: {holdings.toFixed(8)} {coinSymbol} (${maxValue.toFixed(2)})
        </Text>
      </View>

      {/* Amount Display */}
      <View className="mb-8">
        <View className="flex-row items-end mb-2">
          <TextInput
            className="text-text-primary font-bold"
            placeholder="0.0000"
            placeholderTextColor="#9ca3af"
            keyboardType="decimal-pad"
            value={coinAmount}
            onChangeText={setCoinAmount}
            style={{
              fontFamily: "PlusJakartaSans_700Bold",
              fontSize: 48,
              lineHeight: 56,
              flex: 1,
              minWidth: 0,
            }}
            autoFocus
            numberOfLines={1}
          />
          <Text
            className="text-text-secondary text-3xl font-bold ml-2 mb-1"
            style={{ fontFamily: "PlusJakartaSans_700Bold" }}
          >
            {coinSymbol}
          </Text>
        </View>
        <Text className="text-text-tertiary text-sm">≈ ${usdAmount} USD</Text>
      </View>

      {/* Preset Percentages */}
      <View className="flex-row justify-between mb-8">
        {PRESET_PERCENTAGES.map((preset) => (
          <TouchableOpacity
            key={preset}
            onPress={() => handlePresetPercentage(preset)}
            className="bg-background-secondary border border-border rounded-full px-3 py-3 flex-1 mx-1"
          >
            <Text
              className="text-text-primary text-center text-sm font-semibold"
              style={{ fontFamily: "PlusJakartaSans_600SemiBold" }}
            >
              {preset}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Warning */}
      <View className="bg-orange-50 border border-orange-200 rounded-2xl p-4 mb-8">
        <View className="flex-row items-start gap-3">
          <Ionicons name="warning" size={20} color="#f97316" />
          <View className="flex-1">
            <Text
              className="text-orange-800 text-sm font-semibold mb-1"
              style={{ fontFamily: "PlusJakartaSans_600SemiBold" }}
            >
              Selling your crypto
            </Text>
            <Text
              className="text-orange-700 text-xs"
              style={{ fontFamily: "PlusJakartaSans_400Regular" }}
            >
              Once you sell, you won&apos;t be able to undo this transaction.
              Make sure you&apos;re comfortable with the amount.
            </Text>
          </View>
        </View>
      </View>

      {/* Next Button */}
      <TouchableOpacity
        onPress={() => onNext(usdAmount, coinAmount || "0")}
        className="bg-orange-500 py-4 rounded-2xl items-center"
        disabled={!coinAmount || parseFloat(coinAmount) <= 0}
        style={{
          opacity: !coinAmount || parseFloat(coinAmount) <= 0 ? 0.5 : 1,
        }}
      >
        <Text
          className="text-white text-lg font-semibold"
          style={{ fontFamily: "PlusJakartaSans_600SemiBold" }}
        >
          Next
        </Text>
      </TouchableOpacity>
    </View>
  );
}

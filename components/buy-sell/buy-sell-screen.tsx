import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface BuySellScreenProps {
  onNext: (amount: string, coinAmount: string) => void;
  coinSymbol: string;
  coinPrice: number;
}

const PRESET_AMOUNTS = ["$50", "$100", "$500", "$1,000"];

export default function BuySellScreen({
  onNext,
  coinSymbol,
  coinPrice,
}: BuySellScreenProps) {
  const router = useRouter();
  const [amount, setAmount] = useState("");

  const handlePresetAmount = (preset: string) => {
    const value = preset.replace(/[$,]/g, "");
    setAmount(value);
  };

  const coinAmount = amount ? (parseFloat(amount) / coinPrice).toFixed(8) : "0.00004884";

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
            Buy {coinSymbol}
          </Text>
        </View>
        <Text className="text-text-secondary text-sm">
          Available Balance: $12,461.23
        </Text>
      </View>

      {/* Amount Display */}
      <View className="mb-8">
        <View className="flex-row items-end mb-2">
          <TextInput
            className="text-text-primary font-bold flex-1"
            placeholder="5"
            placeholderTextColor="#9ca3af"
            keyboardType="decimal-pad"
            value={amount}
            onChangeText={setAmount}
            style={{
              fontFamily: "PlusJakartaSans_700Bold",
              fontSize: 56,
              lineHeight: 64,
            }}
            autoFocus
          />
          <Text
            className="text-text-secondary text-3xl font-bold ml-2 mb-1"
            style={{ fontFamily: "PlusJakartaSans_700Bold" }}
          >
            USD
          </Text>
        </View>
        <Text className="text-text-tertiary text-sm">
          ≈ {coinAmount} {coinSymbol}
        </Text>
      </View>

      {/* Preset Amounts */}
      <View className="flex-row justify-between mb-8">
        {PRESET_AMOUNTS.map((preset) => (
          <TouchableOpacity
            key={preset}
            onPress={() => handlePresetAmount(preset)}
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

      {/* Next Button */}
      <TouchableOpacity
        onPress={() => onNext(amount || "5", coinAmount)}
        className="bg-primary-600 py-4 rounded-2xl items-center"
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

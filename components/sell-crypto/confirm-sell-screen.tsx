import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ConfirmSellScreenProps {
  onConfirm: () => void;
  onBack: () => void;
  coinSymbol: string;
  coinAmount: string;
  usdAmount: string;
  coinPrice: number;
}

export default function ConfirmSellScreen({
  onConfirm,
  onBack,
  coinSymbol,
  coinAmount,
  usdAmount,
  coinPrice,
}: ConfirmSellScreenProps) {
  const [agreed, setAgreed] = useState(false);

  const fee = parseFloat(usdAmount) * 0.01; // 1% fee
  const total = parseFloat(usdAmount) - fee;

  return (
    <ScrollView className="flex-1 bg-background-primary px-4 pt-6">
      {/* Header */}
      <View className="mb-6">
        <View className="flex-row items-center mb-2">
          <TouchableOpacity
            onPress={onBack}
            className="w-10 h-10 rounded-full bg-background-secondary border border-border items-center justify-center mr-3"
          >
            <Ionicons name="arrow-back" size={20} color="#111827" />
          </TouchableOpacity>
          <Text
            className="text-text-primary text-2xl font-bold"
            style={{ fontFamily: "PlusJakartaSans_700Bold" }}
          >
            Confirm Sell
          </Text>
        </View>
      </View>

      {/* Order Summary */}
      <View className="bg-background-secondary rounded-2xl p-5 border border-border mb-6">
        <Text
          className="text-text-secondary text-sm mb-4"
          style={{ fontFamily: "PlusJakartaSans_500Medium" }}
        >
          Sell Summary
        </Text>

        <View className="items-center py-6 border-b border-border">
          <Text
            className="text-text-secondary text-sm mb-2"
            style={{ fontFamily: "PlusJakartaSans_400Regular" }}
          >
            You're selling
          </Text>
          <Text
            className="text-text-primary text-4xl font-bold mb-2"
            style={{ fontFamily: "PlusJakartaSans_700Bold" }}
          >
            {coinAmount} {coinSymbol}
          </Text>
          <Text className="text-text-tertiary text-sm">
            ≈ ${usdAmount}
          </Text>
        </View>

        <View className="pt-4 space-y-3">
          <View className="flex-row items-center justify-between py-2">
            <Text className="text-text-secondary text-sm">Price per {coinSymbol}</Text>
            <Text
              className="text-text-primary text-sm"
              style={{ fontFamily: "PlusJakartaSans_500Medium" }}
            >
              ${coinPrice.toLocaleString()}
            </Text>
          </View>

          <View className="flex-row items-center justify-between py-2">
            <View className="flex-row items-center gap-2">
              <Text className="text-text-secondary text-sm">Transaction Fee</Text>
              <Ionicons name="information-circle-outline" size={16} color="#9ca3af" />
            </View>
            <Text
              className="text-text-primary text-sm"
              style={{ fontFamily: "PlusJakartaSans_500Medium" }}
            >
              ${fee.toFixed(2)}
            </Text>
          </View>

          <View className="flex-row items-center justify-between py-3 border-t border-border">
            <Text
              className="text-text-primary text-base font-semibold"
              style={{ fontFamily: "PlusJakartaSans_600SemiBold" }}
            >
              You'll receive
            </Text>
            <Text
              className="text-text-primary text-base font-bold"
              style={{ fontFamily: "PlusJakartaSans_700Bold" }}
            >
              ${total.toFixed(2)}
            </Text>
          </View>
        </View>
      </View>

      {/* Payment Method */}
      <View className="bg-background-secondary rounded-2xl p-5 border border-border mb-6">
        <Text
          className="text-text-secondary text-sm mb-4"
          style={{ fontFamily: "PlusJakartaSans_500Medium" }}
        >
          Receiving Account
        </Text>
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-3">
            <View className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center">
              <Ionicons name="card" size={24} color="#2563eb" />
            </View>
            <View>
              <Text
                className="text-text-primary text-base font-semibold"
                style={{ fontFamily: "PlusJakartaSans_600SemiBold" }}
              >
                Bank Account
              </Text>
              <Text className="text-text-secondary text-sm">••••1234</Text>
            </View>
          </View>
          <TouchableOpacity>
            <Text
              className="text-primary-600 text-sm font-medium"
              style={{ fontFamily: "PlusJakartaSans_500Medium" }}
            >
              Change
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Terms */}
      <TouchableOpacity
        onPress={() => setAgreed(!agreed)}
        className="flex-row items-start gap-3 mb-6"
      >
        <View
          className={`w-6 h-6 rounded border-2 items-center justify-center ${
            agreed ? "bg-orange-500 border-orange-500" : "border-border"
          }`}
        >
          {agreed && <Ionicons name="checkmark" size={16} color="#ffffff" />}
        </View>
        <Text className="text-text-secondary text-sm flex-1">
          I understand that this transaction is final and cannot be reversed.
        </Text>
      </TouchableOpacity>

      {/* Confirm Button */}
      <TouchableOpacity
        onPress={onConfirm}
        className="bg-orange-500 py-4 rounded-2xl items-center mb-8"
        disabled={!agreed}
        style={{ opacity: agreed ? 1 : 0.5 }}
      >
        <Text
          className="text-white text-lg font-semibold"
          style={{ fontFamily: "PlusJakartaSans_600SemiBold" }}
        >
          Confirm Sell
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

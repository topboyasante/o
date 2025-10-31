import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ConfirmOrderScreenProps {
  onConfirm: () => void;
  onBack: () => void;
  coinSymbol: string;
  coinAmount: string;
  usdAmount: string;
  coinPrice: number;
}

export default function ConfirmOrderScreen({
  onConfirm,
  onBack,
  coinSymbol,
  coinAmount,
  usdAmount,
  coinPrice,
}: ConfirmOrderScreenProps) {
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const fee = (parseFloat(usdAmount) * 0.001).toFixed(2); // 0.1% fee
  const totalCost = (parseFloat(usdAmount) + parseFloat(fee)).toFixed(2);

  return (
    <ScrollView className="flex-1 bg-background-primary">
      <View className="px-4 pt-6">
        {/* Header */}
        <View className="flex-row items-center mb-6">
          <TouchableOpacity onPress={onBack} className="mr-4">
            <Ionicons name="arrow-back" size={24} color="#111827" />
          </TouchableOpacity>
          <Text
            className="text-text-primary text-xl font-bold"
            style={{ fontFamily: "PlusJakartaSans_700Bold" }}
          >
            Confirm Order
          </Text>
        </View>

        {/* Coin Amount Card */}
        <View className="rounded-2xl p-6 items-center mb-6">
          <View className="w-16 h-16 bg-orange-500 rounded-full items-center justify-center mb-4">
            <Text className="text-white text-2xl font-bold">₿</Text>
          </View>
          <Text
            className="text-text-primary text-2xl font-bold mb-2"
            style={{ fontFamily: "PlusJakartaSans_700Bold" }}
          >
            {coinSymbol} {coinAmount}
          </Text>
          <Text className="text-text-secondary text-sm">
            at ${coinPrice.toLocaleString()}
          </Text>
        </View>

        {/* Order Details */}
        <View className="mb-6">
          <View className="flex-row justify-between items-center py-4 border-b border-border">
            <Text className="text-text-secondary text-base">Amount</Text>
            <Text
              className="text-text-primary text-base font-semibold"
              style={{ fontFamily: "PlusJakartaSans_600SemiBold" }}
            >
              ${parseFloat(usdAmount).toLocaleString()}
            </Text>
          </View>

          <View className="flex-row justify-between items-center py-4 border-b border-border">
            <View className="flex-row items-center gap-2">
              <Text className="text-text-secondary text-base">Fee</Text>
              <Ionicons name="information-circle-outline" size={16} color="#9ca3af" />
            </View>
            <Text
              className="text-text-primary text-base font-semibold"
              style={{ fontFamily: "PlusJakartaSans_600SemiBold" }}
            >
              ${fee}
            </Text>
          </View>

          <View className="flex-row justify-between items-center py-4 border-b border-border">
            <Text
              className="text-text-primary text-base font-bold"
              style={{ fontFamily: "PlusJakartaSans_700Bold" }}
            >
              Total Cost
            </Text>
            <Text
              className="text-text-primary text-base font-bold"
              style={{ fontFamily: "PlusJakartaSans_700Bold" }}
            >
              ${totalCost}
            </Text>
          </View>

          <View className="flex-row justify-between items-center py-4">
            <Text className="text-text-secondary text-base">Pay with</Text>
            <View className="flex-row items-center gap-2">
              <Text
                className="text-text-primary text-base font-semibold"
                style={{ fontFamily: "PlusJakartaSans_600SemiBold" }}
              >
                Flux Wallet
              </Text>
              <Ionicons name="chevron-forward" size={16} color="#6b7280" />
            </View>
          </View>
        </View>

        {/* Terms Agreement */}
        <TouchableOpacity
          onPress={() => setAgreedToTerms(!agreedToTerms)}
          className="flex-row items-start mb-6"
        >
          <View
            className={`w-5 h-5 rounded border-2 mr-3 items-center justify-center ${
              agreedToTerms ? "bg-primary-600 border-primary-600" : "border-border"
            }`}
          >
            {agreedToTerms && (
              <Ionicons name="checkmark" size={14} color="#ffffff" />
            )}
          </View>
          <Text className="text-text-secondary text-sm flex-1">
            I understand that I won&apos;t able to withdraw this{"\n"}
            currency for 72 hours
          </Text>
        </TouchableOpacity>

        {/* Confirm Button */}
        <TouchableOpacity
          onPress={onConfirm}
          disabled={!agreedToTerms}
          className={`py-4 rounded-2xl items-center mb-6 ${
            agreedToTerms ? "bg-primary-600" : "bg-gray-300"
          }`}
        >
          <Text
            className={`text-lg font-semibold ${
              agreedToTerms ? "text-white" : "text-gray-500"
            }`}
            style={{ fontFamily: "PlusJakartaSans_600SemiBold" }}
          >
            Confirm Order
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

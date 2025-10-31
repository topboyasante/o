import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface SellSuccessScreenProps {
  onDone: () => void;
}

export default function SellSuccessScreen({ onDone }: SellSuccessScreenProps) {
  return (
    <View className="flex-1 bg-background-primary px-4 pt-6">
      {/* Close Button */}
      <View className="items-end mb-12">
        <TouchableOpacity onPress={onDone}>
          <Ionicons name="close" size={28} color="#111827" />
        </TouchableOpacity>
      </View>

      {/* Success Icon */}
      <View className="items-center mb-8">
        <View className="w-24 h-24 bg-green-500 rounded-full items-center justify-center mb-6">
          <Ionicons name="checkmark-circle" size={48} color="#ffffff" />
        </View>

        <Text
          className="text-text-primary text-2xl font-bold mb-2"
          style={{ fontFamily: "PlusJakartaSans_700Bold" }}
        >
          Sell Order Completed
        </Text>
        <Text className="text-text-secondary text-sm text-center">
          Your crypto has been sold successfully.{"\n"}Funds will arrive in 1-3 business days.
        </Text>
      </View>

      {/* Transaction Details */}
      <View className="bg-background-secondary rounded-2xl p-5 border border-border mb-6">
        <Text
          className="text-text-secondary text-sm mb-4"
          style={{ fontFamily: "PlusJakartaSans_500Medium" }}
        >
          Transaction Details
        </Text>

        <View className="space-y-3">
          <View className="flex-row items-center justify-between py-2">
            <Text className="text-text-secondary text-sm">Status</Text>
            <View className="bg-green-100 px-3 py-1 rounded-full">
              <Text
                className="text-green-600 text-xs font-semibold"
                style={{ fontFamily: "PlusJakartaSans_600SemiBold" }}
              >
                Completed
              </Text>
            </View>
          </View>

          <View className="flex-row items-center justify-between py-2">
            <Text className="text-text-secondary text-sm">Transaction ID</Text>
            <Text
              className="text-text-primary text-sm"
              style={{ fontFamily: "PlusJakartaSans_500Medium" }}
            >
              #TXN123456789
            </Text>
          </View>

          <View className="flex-row items-center justify-between py-2">
            <Text className="text-text-secondary text-sm">Date</Text>
            <Text
              className="text-text-primary text-sm"
              style={{ fontFamily: "PlusJakartaSans_500Medium" }}
            >
              {new Date().toLocaleDateString()}
            </Text>
          </View>
        </View>
      </View>

      {/* Actions */}
      <View className="flex-1 justify-end mb-8">
        <TouchableOpacity className="bg-background-secondary border border-border py-4 rounded-2xl items-center mb-3">
          <Text
            className="text-text-primary text-lg font-semibold"
            style={{ fontFamily: "PlusJakartaSans_600SemiBold" }}
          >
            View Transaction History
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onDone}
          className="bg-orange-500 py-4 rounded-2xl items-center"
        >
          <Text
            className="text-white text-lg font-semibold"
            style={{ fontFamily: "PlusJakartaSans_600SemiBold" }}
          >
            Done
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

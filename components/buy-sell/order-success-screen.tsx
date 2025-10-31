import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface OrderSuccessScreenProps {
  onDone: () => void;
}

export default function OrderSuccessScreen({ onDone }: OrderSuccessScreenProps) {
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
        <View className="w-24 h-24 bg-primary-600 rounded-full items-center justify-center mb-6">
          <Ionicons name="receipt-outline" size={48} color="#ffffff" />
        </View>

        <Text
          className="text-text-primary text-2xl font-bold mb-2"
          style={{ fontFamily: "PlusJakartaSans_700Bold" }}
        >
          Order submitted
        </Text>
        <Text className="text-text-secondary text-sm text-center">
          We'll email you once this order{"\n"}has been delivered
        </Text>
      </View>

      {/* Recommendations */}
      <View className="flex-1">
        <Text
          className="text-text-primary text-lg font-semibold mb-4"
          style={{ fontFamily: "PlusJakartaSans_600SemiBold" }}
        >
          You might also like
        </Text>

        <View className="bg-background-secondary rounded-2xl p-4 border border-border mb-4">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-3 flex-1">
              <View className="w-12 h-12 bg-blue-500 rounded-full items-center justify-center">
                <Ionicons name="newspaper-outline" size={24} color="#ffffff" />
              </View>
              <View className="flex-1">
                <Text
                  className="text-text-primary text-base font-semibold"
                  style={{ fontFamily: "PlusJakartaSans_600SemiBold" }}
                >
                  Check Out New Patch
                </Text>
                <Text className="text-text-secondary text-xs">
                  Something fresh from us!
                </Text>
              </View>
            </View>
            <TouchableOpacity className="bg-background-primary px-4 py-2 rounded-lg border border-border">
              <Text
                className="text-text-primary text-sm font-semibold"
                style={{ fontFamily: "PlusJakartaSans_600SemiBold" }}
              >
                Save it
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Done Button */}
      <TouchableOpacity
        onPress={onDone}
        className="bg-background-secondary border border-border py-4 rounded-2xl items-center mb-8"
      >
        <Text
          className="text-text-primary text-lg font-semibold"
          style={{ fontFamily: "PlusJakartaSans_600SemiBold" }}
        >
          Done
        </Text>
      </TouchableOpacity>
    </View>
  );
}

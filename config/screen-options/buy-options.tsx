import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

export const buyScreenOptions = {
  title: "Buy Crypto",
  headerShown: true,
  headerStyle: {
    backgroundColor: "#ffffff",
    height: 100,
  },
  headerTitle: "",
  headerLeft: () => (
    <View className="ml-6">
      <Text
        className="text-text-primary text-xl font-semibold"
        style={{ fontFamily: "PlusJakartaSans_600SemiBold", fontSize: 20 }}
      >
        Buy Crypto
      </Text>
    </View>
  ),
  headerRight: () => (
    <View className="flex-row items-center gap-6 mr-6">
      <TouchableOpacity>
        <Ionicons name="search-outline" size={24} color="#111827" />
      </TouchableOpacity>
    </View>
  ),
};

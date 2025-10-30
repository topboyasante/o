import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const walletScreenOptions = {
  title: "Home",
  headerShown: true,
  headerStyle: {
    backgroundColor: "#ffffff",
    height: 100,
  },
  headerTitleStyle: {
    fontSize: 22,
    fontWeight: "600" as const,
    color: "#000000",
    fontFamily: "PlusJakartaSans_600SemiBold",
  },
  headerShadowVisible: false,
  headerTitle: "",
  headerLeft: () => (
    <View className="ml-6">
      <Text style={{ fontFamily: "PlusJakartaSans_600SemiBold", fontSize: 20 }}>
        Hello, Adolf
      </Text>
    </View>
  ),
  headerRight: () => (
    <View className="flex-row items-center gap-6 mr-6">
      <TouchableOpacity>
        <Ionicons name="scan-outline" size={24} color="#000000" />
      </TouchableOpacity>
      <TouchableOpacity>
        <Ionicons name="settings-outline" size={24} color="#000000" />
      </TouchableOpacity>
    </View>
  ),
};

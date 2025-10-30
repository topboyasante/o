import React from "react";
import { ScrollView, View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      className="flex-1 bg-background-primary"
      contentContainerStyle={{ paddingBottom: insets.bottom + 50 }}
    >
      <View className="px-4 py-2">
        {/* Your wallet content goes here */}
        <Text>hi</Text>
      </View>
    </ScrollView>
  );
}

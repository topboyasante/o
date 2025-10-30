import { Stack } from "expo-router";
import React from "react";

export default function CoinLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="[id]"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#ffffff",
          },
          headerTitleStyle: {
            fontSize: 22,
            fontWeight: "600",
            color: "#000000",
            fontFamily: "PlusJakartaSans_600SemiBold",
          },
          headerShadowVisible: false,
          headerTitle: "",
        }}
      />
    </Stack>
  );
}

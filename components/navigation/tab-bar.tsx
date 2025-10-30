import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React from "react";
import { Pressable, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const tabConfig = [
  { name: "index", icon: "wallet" as const },
  { name: "market", icon: "trending-up" as const },
];

export default function CustomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  return (
    <View className="absolute bottom-0 left-0 right-0 pb-8 pt-4 px-4">
      <View className="flex-row items-center justify-between">
        {/* Left section - All tabs */}
        <View className="flex-row bg-slate-800 rounded-full px-2 py-2 items-center">
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            const label =
              options.title !== undefined ? options.title : route.name;
            const iconName =
              tabConfig.find((tab) => tab.name === route.name)?.icon || "apps";

            return (
              <Pressable
                key={route.key}
                onPress={onPress}
                className={`flex-row items-center px-4 py-2 rounded-full ${
                  isFocused ? "bg-white" : ""
                } ${index > 0 ? "ml-2" : ""}`}
              >
                <Ionicons
                  name={iconName}
                  size={20}
                  color={isFocused ? "#1e293b" : "#94a3b8"}
                />
                {isFocused && (
                  <Text className="ml-2 text-slate-900 font-semibold">
                    {label}
                  </Text>
                )}
              </Pressable>
            );
          })}
        </View>

        {/* Right section - Swap button */}
        <Pressable className="bg-slate-800 rounded-full p-4">
          <Ionicons name="swap-vertical" size={24} color="#ffffff" />
        </Pressable>
      </View>
    </View>
  );
}

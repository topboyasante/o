import { Tabs } from "expo-router";
import React from "react";
import CustomTabBar from "@/components/navigation/tab-bar";
import { walletScreenOptions } from "@/config/screen-options/wallet-options";
import { marketScreenOptions } from "@/config/screen-options/market-options";
import { buyScreenOptions } from "@/config/screen-options/buy-options";
import { sellScreenOptions } from "@/config/screen-options/sell-options";

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen name="index" options={walletScreenOptions} />
      <Tabs.Screen name="market" options={marketScreenOptions} />
      <Tabs.Screen name="buy" options={buyScreenOptions} />
      <Tabs.Screen name="sell" options={sellScreenOptions} />
    </Tabs>
  );
}

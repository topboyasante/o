import React, { useState } from "react";
import { View } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BuySellScreen from "@/components/buy-sell/buy-sell-screen";
import ConfirmOrderScreen from "@/components/buy-sell/confirm-order-screen";
import OrderSuccessScreen from "@/components/buy-sell/order-success-screen";

type BuySellStep = "enter-amount" | "confirm" | "success";

export default function BuySellPage() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ coinSymbol?: string; coinPrice?: string }>();

  const [step, setStep] = useState<BuySellStep>("enter-amount");
  const [usdAmount, setUsdAmount] = useState("");
  const [coinAmount, setCoinAmount] = useState("");

  const coinSymbol = params.coinSymbol || "BTC";
  const coinPrice = parseFloat(params.coinPrice || "50000");

  const handleNext = (amount: string, coinAmt: string) => {
    setUsdAmount(amount);
    setCoinAmount(coinAmt);
    setStep("confirm");
  };

  const handleConfirm = () => {
    setStep("success");
  };

  const handleDone = () => {
    router.back();
  };

  const handleBack = () => {
    setStep("enter-amount");
  };

  return (
    <View
      className="flex-1 bg-background-primary"
      style={{ paddingTop: insets.top }}
    >
      {step === "enter-amount" && (
        <BuySellScreen
          onNext={handleNext}
          coinSymbol={coinSymbol}
          coinPrice={coinPrice}
        />
      )}

      {step === "confirm" && (
        <ConfirmOrderScreen
          onConfirm={handleConfirm}
          onBack={handleBack}
          coinSymbol={coinSymbol}
          coinAmount={coinAmount}
          usdAmount={usdAmount}
          coinPrice={coinPrice}
        />
      )}

      {step === "success" && <OrderSuccessScreen onDone={handleDone} />}
    </View>
  );
}

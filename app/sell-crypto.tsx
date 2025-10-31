import React, { useState } from "react";
import { View } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SellCryptoScreen from "@/components/sell-crypto/sell-crypto-screen";
import ConfirmSellScreen from "@/components/sell-crypto/confirm-sell-screen";
import SellSuccessScreen from "@/components/sell-crypto/sell-success-screen";

type SellStep = "enter-amount" | "confirm" | "success";

export default function SellCryptoPage() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{
    coinSymbol?: string;
    coinPrice?: string;
    holdings?: string;
  }>();

  const [step, setStep] = useState<SellStep>("enter-amount");
  const [usdAmount, setUsdAmount] = useState("");
  const [coinAmount, setCoinAmount] = useState("");

  const coinSymbol = params.coinSymbol || "BTC";
  const coinPrice = parseFloat(params.coinPrice || "50000");
  const holdings = parseFloat(params.holdings || "0.5");

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
        <SellCryptoScreen
          onNext={handleNext}
          coinSymbol={coinSymbol}
          coinPrice={coinPrice}
          holdings={holdings}
        />
      )}

      {step === "confirm" && (
        <ConfirmSellScreen
          onConfirm={handleConfirm}
          onBack={handleBack}
          coinSymbol={coinSymbol}
          coinAmount={coinAmount}
          usdAmount={usdAmount}
          coinPrice={coinPrice}
        />
      )}

      {step === "success" && <SellSuccessScreen onDone={handleDone} />}
    </View>
  );
}

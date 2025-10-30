import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { CartesianChart, Line } from "victory-native";

interface PriceChartProps {
  data: [number, number][]; // [timestamp, price]
  isPositive: boolean;
  isLoading?: boolean;
}

export default function PriceChart({
  data,
  isPositive,
  isLoading = false,
}: PriceChartProps) {
  if (isLoading) {
    return (
      <View className="h-64 items-center justify-center">
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  if (!data || data.length === 0) {
    return (
      <View className="h-64 items-center justify-center">
        <Text className="text-text-tertiary">No chart data available</Text>
      </View>
    );
  }

  const chartData = data.map(([timestamp, price]) => ({
    x: timestamp,
    y: price,
  }));

  const color = isPositive ? "#22c55e" : "#ef4444";

  // Get min and max for better domain padding
  const prices = data.map(([, price]) => price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const priceRange = maxPrice - minPrice;
  const padding = priceRange * 0.1;

  return (
    <View style={{ height: 256 }}>
      <CartesianChart
        data={chartData}
        xKey="x"
        yKeys={["y"]}
        padding={16}
        domain={{
          y: [minPrice - padding, maxPrice + padding],
        }}
        axisOptions={{
          font: undefined,
          tickCount: { x: 4, y: 5 },
          lineColor: "#e5e7eb",
          labelColor: "#6b7280",
          formatXLabel: (value) => {
            const date = new Date(value);
            return `${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`;
          },
          formatYLabel: (value) => {
            if (value >= 1000) {
              return `$${(value / 1000).toFixed(1)}k`;
            }
            return `$${value.toFixed(0)}`;
          },
        }}
      >
        {({ points }) => (
          <Line
            points={points.y}
            color={color}
            strokeWidth={2}
            curveType="natural"
          />
        )}
      </CartesianChart>
    </View>
  );
}

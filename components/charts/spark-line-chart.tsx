import React from "react";
import { View } from "react-native";
import { CartesianChart, Line } from "victory-native";

interface SparklineChartProps {
  data: number[];
  isPositive: boolean;
  width?: number;
  height?: number;
}

export default function SparklineChart({
  data,
  isPositive,
  width,
  height = 40,
}: SparklineChartProps) {
  const chartData = data.map((value, index) => ({
    x: index,
    y: value,
  }));

  const color = isPositive ? "#22c55e" : "#ef4444";

  return (
    <View
      style={{
        width: width || 100,
        height: height,
      }}
    >
      <CartesianChart
        data={chartData}
        xKey="x"
        yKeys={["y"]}
        padding={0}
        domainPadding={{ top: 10, bottom: 10 }}
        axisOptions={{
          font: undefined,
          tickCount: 0,
          lineColor: "transparent",
          labelColor: "transparent",
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

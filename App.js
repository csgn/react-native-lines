import { StyleSheet, Text, View } from "react-native";
import "react-native-gesture-handler";
import Point from "./components/Point";
import { useMemo, useState } from "react";
import Line from "./components/Line";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const [points, setPoints] = useState([
    {
      initialXY: { x: 30, y: 30 },
      tag: "A",
      color: "#ff197d",
      r: 16,
    },
    {
      initialXY: { x: 150, y: 90 },
      tag: "B",
      color: "#19ff8c",
      r: 16,
    },
    {
      initialXY: { x: 174, y: 174 },
      tag: "C",
      color: "#19aeff",
      r: 16,
    },
    {
      initialXY: { x: 274, y: 274 },
      tag: "D",
      color: "purple",
      r: 16,
    },
    {
      initialXY: { x: 94, y: 274 },
      tag: "E",
      color: "orange",
      r: 16,
    },
    {
      initialXY: { x: 124, y: 182 },
      tag: "F",
      color: "yellow",
      r: 16,
    },
  ]);

  const [lines, setLines] = useState([]);

  const ps = useMemo(() => {
    return points.map((point, i) => (
      <Point
        key={i}
        tag={point.tag}
        maxW={330}
        maxH={330}
        r={point.r}
        initialXY={point.initialXY}
        color={point.color}
        onChange={(e) => {
          console.log(i, e);
          setLines((prev) => {
            const nextLines = [...prev];
            nextLines[i] = { dx: e.dx, dy: e.dy };
            return nextLines;
          });
        }}
      />
    ));
  }, []);

  const drawLines = () => {
    const lineComps = [];
    const to = lines.length;

    if (to === 1) return null;

    for (let i = 0; i < to; i++) {
      const p1 = lines[i];
      const p2 = i === to - 1 ? lines[0] : lines[i + 1];

      lineComps.push(<Line key={i} start={p1} end={p2} r={16} />);
    }

    if (to === 2) {
      lineComps.pop();
    }

    return lineComps;
  };

  console.log(lines);

  return (
    <>
      <StatusBar hidden />
      <View style={styles.container}>
        <View style={styles.box}>
          {ps}
          {drawLines()}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  box: {
    width: 330,
    height: 330,
    borderWidth: 0.5,
    borderColor: "gray",
  },
});

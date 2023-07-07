import { Svg, Line as L } from "react-native-svg";

export default function Line({ start, end, r }) {
  if (!start && !end) return null;

  return (
    <Svg
      width="100%"
      height="100%"
      strokeWidth={1}
      stroke={"black"}
      style={{
        position: "absolute",
      }}
    >
      <L
        x1={start.dx + r / 2}
        y1={start.dy + r / 2}
        x2={end.dx + r / 2}
        y2={end.dy + r / 2}
      />
    </Svg>
  );

  //   const d = Math.sqrt(
  //     Math.pow(end.dx - start.dx, 2) + Math.pow(end.dy - start.dy, 2)
  //   );

  //   const angle = Math.atan2(end.dy - start.dy, end.dx - start.dx);

  //   return (
  //     <Animated.View
  //       style={[
  //         {
  //           position: "absolute",
  //           borderWidth: 1.5,
  //           borderColor: "#000000",
  //           top: start.dy,
  //           left: start.dx,
  //           width: d,
  //           transform: [
  //             { translateX: start.dx / 2 },
  //             { translateY: start.dy / 2 },
  //             { rotateZ: `${angle}rad` },
  //             { translateX: -start.dx / 2 },
  //             { translateY: -start.dy / 2 },
  //           ],
  //         },
  //       ]}
  //     ></Animated.View>
  //   );
}

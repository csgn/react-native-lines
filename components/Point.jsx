import { useEffect, useRef, useState } from "react";
import { PanResponder, Text, Animated } from "react-native";

export default function Point({
  tag,
  color,
  initialXY,
  r = 16,
  maxW = -1,
  maxH = -1,
  showTag = true,
  onChange,
}) {
  const [dragging, setDragging] = useState(false);

  const pan = useRef(new Animated.ValueXY(initialXY)).current;

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: (e, gs) => {
      pan.setOffset({
        x: pan.x._value,
        y: pan.y._value,
      });
      pan.setValue({ x: 0, y: 0 });
    },
    onPanResponderMove: (e, gs) => {
      setDragging(true);
      Animated.event(
        [
          null,
          {
            dx: pan.x,
            dy: pan.y,
          },
        ],
        { useNativeDriver: false }
      )(e, gs);

      //const { pageX: dx, pageY: dy } = e.nativeEvent;

      const dx = pan.x._value + pan.x._offset;
      const dy = pan.y._value + pan.y._offset;

      onChange?.({ dx, dy });
    },
    onPanResponderRelease: (e, gs) => {
      pan.flattenOffset();

      if (maxW !== -1 && maxH !== -1) {
        const cx = pan.x._value + pan.x._offset;
        const cy = pan.y._value + pan.y._offset;

        let nx, ny;

        if (cx < 0) {
          nx = 0;
        } else if (cx >= maxW) {
          nx = maxW - r;
        } else {
          nx = pan.x._value;
        }

        if (cy < 0) {
          ny = 0;
        } else if (cy >= maxH) {
          ny = maxH - r;
        } else {
          ny = pan.y._value;
        }

        Animated.spring(pan, {
          toValue: { x: nx, y: ny },
          useNativeDriver: false,
          speed: 1000,
        }).start();

        onChange?.({ dx: nx, dy: ny });
      }

      setDragging(false);
    },
  });

  useEffect(() => {
    console.log(pan);
    onChange?.({ dx: pan.x._value, dy: pan.y._value });
  }, [pan]);

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          backgroundColor: color,
          borderRadius: 100,
          zIndex: 9,
          cursor: "pointer",
          width: r,
          height: r,
          transform: [{ translateX: pan.x }, { translateY: pan.y }],
        },
      ]}
      {...panResponder.panHandlers}
    >
      {showTag && (
        <Text
          pointerEvents="none"
          style={{
            position: "absolute",
            top: -24,
            left: -10,
            width: 200,
            userSelect: "none",
          }}
        >
          {tag}
          {/* ({pan.x._value.toFixed(1)}, {pan.y._value.toFixed(1)}) */}
        </Text>
      )}
    </Animated.View>
  );
}

import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import colors from '../theme/colors';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  useAnimatedReaction,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

const { height } = Dimensions.get('window');

type Props = {
  collapsedHeight: number;
  expandedHeight: number;
  children?: React.ReactNode;
  initial?: 'collapsed' | 'expanded';
  onToggle?: (expanded: boolean) => void;
};

export default function AnimatedBottomSheet({
  collapsedHeight,
  expandedHeight,
  children,
  initial = 'collapsed',
  onToggle,
}: Props) {
  const containerHeight = useSharedValue<number>(
    initial === 'collapsed' ? collapsedHeight : expandedHeight
  );
  const startHeight = useSharedValue<number>(containerHeight.value);

  const gesture = Gesture.Pan()
    .activeOffsetY([-12, 12])
    .onStart(() => {
      startHeight.value = containerHeight.value;
    })
    .onUpdate((event) => {
      const nextH = startHeight.value - event.translationY;
      if (nextH > expandedHeight) {
        const overshoot = nextH - expandedHeight;
        containerHeight.value = expandedHeight + overshoot * 0.35;
      } else if (nextH < collapsedHeight) {
        const overshoot = nextH - collapsedHeight;
        containerHeight.value = collapsedHeight + overshoot * 0.35;
      } else {
        containerHeight.value = nextH;
      }
    })
    .onEnd(() => {
      const mid = (collapsedHeight + expandedHeight) / 2;
      const target = containerHeight.value >= mid ? expandedHeight : collapsedHeight;
      containerHeight.value = withSpring(target, { damping: 18 });
    });

  // notify expanded/collapsed
  useAnimatedReaction(
    () => containerHeight.value,
    (value, previous) => {
      if (!onToggle) return;
      const expanded = value >= expandedHeight - 1;
      const prevExpanded = (previous ?? collapsedHeight) >= expandedHeight - 1;
      if (expanded !== prevExpanded) {
        runOnJS(onToggle)(expanded);
      }
    },
    [expandedHeight, collapsedHeight]
  );

  const animatedStyle = useAnimatedStyle(() => ({
    height: containerHeight.value,
  }));

  const overlayStyle = useAnimatedStyle(() => {
    const t = (containerHeight.value - collapsedHeight) / (expandedHeight - collapsedHeight);
    const clamped = Math.max(0, Math.min(1, t));
    return {
      opacity: 1 - clamped,
    };
  });

  return (
    <View style={styles.wrapper} pointerEvents="box-none">
      <Animated.View style={[styles.overlay, overlayStyle]} pointerEvents="none" />

      <Animated.View style={[styles.sheet, animatedStyle]}>
        <GestureDetector gesture={gesture}>
          <View style={styles.handleArea} pointerEvents="box-only">
            <View style={styles.handleBar} />
          </View>
        </GestureDetector>

        <View style={styles.content}>{children}</View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.overlay,
  },
  sheet: {
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.white,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    overflow: 'hidden',
  },
  handleArea: {
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 12,
    paddingBottom: 8,
  },
  handleBar: {
    width: 64,
    height: 6,
    borderRadius: 10,
    backgroundColor: colors.border,
  },
  content: {
    flex: 1,
  },
});

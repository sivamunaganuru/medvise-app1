import { View, Animated, Easing, StyleSheet } from 'react-native';
import React from 'react';

const dotAnimations = Array.from({ length: 10 }).map(
    () => new Animated.Value(1)
  );
  
const AnimatedSoundBars = ({ isAnimating, barColor = 'gray' }) => {
    const loopAnimation = (node) => {
        const keyframes = [1.2, 0.7, 1];

        const loop = Animated.sequence(
        keyframes.map((toValue) =>
            Animated.timing(node, {
            toValue,
            easing: Easing.ease,
            useNativeDriver: true,
            })
        )
        );

        return loop;
    };

    const loadAnimation = (nodes) =>
        Animated.loop(Animated.stagger(200, nodes.map(loopAnimation))).start();

    React.useEffect(() => {
        if (isAnimating) {
            loadAnimation(dotAnimations);
        } else {
            dotAnimations.forEach((animation) => animation.stopAnimation());
        }
        }, [isAnimating]);

    return (
        <View style={styles.row}>
        {dotAnimations.map((animation, index) => {
            return (
            <Animated.View
                key={`${index}`}
                style={[
                styles.bar,
                { backgroundColor: barColor },
                {
                    transform: [
                    {
                        scale: animation,
                    },
                    ],
                },
                ]}
            />
            );
        })}
        </View>
    );
};
  
const styles = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    bar: {
        height: 35,
        width: 25,
        borderRadius: 2,
        marginHorizontal: 2,
    },
});

export default AnimatedSoundBars;
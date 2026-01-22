import React, { useRef, useEffect } from 'react';
import { Box, Text } from '../ui';
import { ScrollView, StyleSheet, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';

interface AgePickerProps {
    value: number;
    onChange: (age: number) => void;
    minAge?: number;
    maxAge?: number;
}

const ITEM_HEIGHT = 80;
const VISIBLE_ITEMS = 3;
const CONTAINER_WIDTH = 227;
const CONTAINER_HEIGHT = 285;

export const AgePicker: React.FC<AgePickerProps> = ({
    value,
    onChange,
    minAge = 1,
    maxAge = 99,
}) => {
    const scrollViewRef = useRef<ScrollView>(null);
    const ages = Array.from({ length: maxAge - minAge + 1 }, (_, i) => minAge + i);

    // Initialize scroll position based on current value
    useEffect(() => {
        const index = value - minAge;
        if (scrollViewRef.current && index >= 0) {
            setTimeout(() => {
                scrollViewRef.current?.scrollTo({
                    y: index * ITEM_HEIGHT,
                    animated: false,
                });
            }, 100);
        }
    }, []);

    const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        const index = Math.round(offsetY / ITEM_HEIGHT);
        const selectedAge = minAge + Math.max(0, Math.min(index, ages.length - 1));

        if (selectedAge !== value) {
            onChange(selectedAge);
        }

        // Snap to closest item
        scrollViewRef.current?.scrollTo({
            y: index * ITEM_HEIGHT,
            animated: true,
        });
    };

    return (
        <Box
            w={CONTAINER_WIDTH}
            h={CONTAINER_HEIGHT}
            bg="#1A1A1A"
            borderRadius={20}
            borderWidth={1}
            borderColor="#00C3FF"
            overflow="hidden"
            alignItems="center"
            alignSelf="center"
        >
            <ScrollView
                ref={scrollViewRef}
                showsVerticalScrollIndicator={false}
                snapToInterval={ITEM_HEIGHT}
                decelerationRate="fast"
                onMomentumScrollEnd={handleScrollEnd}
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Top padding - space for one item above center */}
                <Box h={ITEM_HEIGHT} />

                {ages.map((age) => {
                    const isSelected = age === value;
                    return (
                        <Box
                            key={age}
                            h={ITEM_HEIGHT}
                            w={CONTAINER_WIDTH}
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Text
                                color={isSelected ? '#00C3FF' : '#6B7280'}
                                fontSize={isSelected ? 32 : 24}
                                fontWeight={isSelected ? '700' : '400'}
                            >
                                {age}
                            </Text>
                        </Box>
                    );
                })}

                {/* Bottom padding - space for one item below center */}
                <Box h={ITEM_HEIGHT} />
            </ScrollView>

            {/* Top selection indicator line (cyan) */}
            <Box
                position="absolute"
                top={ITEM_HEIGHT + 10}
                left={30}
                right={30}
                h={1}
                bg="#00C3FF"
            />

            {/* Bottom selection indicator line (cyan) */}
            <Box
                position="absolute"
                top={(ITEM_HEIGHT * 2) - 10}
                left={30}
                right={30}
                h={1}
                bg="#00C3FF"
            />
        </Box>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        height: ITEM_HEIGHT * VISIBLE_ITEMS,
        width: CONTAINER_WIDTH,
    },
    scrollContent: {
        alignItems: 'center',
    },
});


import React, { useRef, useEffect } from 'react';
import { Box, Text } from '../ui';
import { ScrollView, StyleSheet, Dimensions, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';

interface AgePickerProps {
    value: number;
    onChange: (age: number) => void;
    minAge?: number;
    maxAge?: number;
}

const ITEM_HEIGHT = 50;
const VISIBLE_ITEMS = 3;

export const AgePicker: React.FC<AgePickerProps> = ({
    value,
    onChange,
    minAge = 14,
    maxAge = 80,
}) => {
    const scrollViewRef = useRef<ScrollView>(null);
    const ages = Array.from({ length: maxAge - minAge + 1 }, (_, i) => minAge + i);

    // Initialize scroll position based on current value
    useEffect(() => {
        const index = value - minAge;
        if (scrollViewRef.current && index >= 0) {
            scrollViewRef.current.scrollTo({
                y: index * ITEM_HEIGHT,
                animated: false,
            });
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
            bg="surface.primary"
            borderRadius={20}
            borderWidth={1}
            borderColor="border.default"
            overflow="hidden"
            alignItems="center"
            w="80%"
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
                {/* Top padding */}
                <Box h={ITEM_HEIGHT} />

                {ages.map((age) => {
                    const isSelected = age === value;
                    return (
                        <Box
                            key={age}
                            h={ITEM_HEIGHT}
                            justifyContent="center"
                            alignItems="center"
                            style={isSelected ? styles.selectedItem : undefined}
                        >
                            <Text
                                color={isSelected ? 'accent.400' : 'text.tertiary'}
                                fontSize={isSelected ? '2xl' : 'xl'}
                                fontWeight={isSelected ? '600' : '400'}
                            >
                                {age}
                            </Text>
                        </Box>
                    );
                })}

                {/* Bottom padding */}
                <Box h={ITEM_HEIGHT} />
            </ScrollView>

            {/* Selection indicator lines */}
            <Box
                position="absolute"
                top={ITEM_HEIGHT}
                left={20}
                right={20}
                h={1}
                bg="border.default"
            />
            <Box
                position="absolute"
                top={ITEM_HEIGHT * 2}
                left={20}
                right={20}
                h={1}
                bg="border.default"
            />
        </Box>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        height: ITEM_HEIGHT * VISIBLE_ITEMS,
    },
    scrollContent: {
        alignItems: 'center',
    },
    selectedItem: {
        // Additional styling for selected item if needed
    },
});

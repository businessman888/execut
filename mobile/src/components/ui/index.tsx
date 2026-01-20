// Native-base replacement components using pure React Native
// This file provides drop-in replacements for native-base components

import React, { ReactNode, createContext, useContext } from 'react';
import {
    View,
    Text as RNText,
    ScrollView as RNScrollView,
    Pressable as RNPressable,
    Image as RNImage,
    TextInput,
    ActivityIndicator,
    StyleSheet,
    ViewStyle,
    TextStyle,
    ImageStyle,
    TouchableOpacity,
    DimensionValue,
} from 'react-native';

// Theme context
const ThemeContext = createContext<typeof theme | null>(null);

// Brand colors from design system
const BRAND = {
    50: '#E8EBF5',
    100: '#D1D7EB',
    200: '#A3AFD7',
    300: '#7587C3',
    400: '#475FAF',
    500: '#131F54',
    600: '#0F1943',
    700: '#0B1332',
    800: '#080D22',
    900: '#040611',
};

const ACCENT = {
    50: '#E6F9FF',
    100: '#CCF3FF',
    200: '#99E7FF',
    300: '#66DBFF',
    400: '#33CFFF',
    500: '#00C3FF',
    600: '#009CCC',
    700: '#007599',
    800: '#004E66',
    900: '#002733',
};

export const theme = {
    colors: {
        brand: BRAND,
        accent: ACCENT,
        background: {
            primary: '#0D0D0D',
            secondary: '#1A1A1A',
            tertiary: '#262626',
        },
        surface: {
            primary: '#1A1A1A',
            secondary: '#262626',
            tertiary: '#333333',
        },
        text: {
            primary: '#FFFFFF',
            secondary: '#9CA3AF',
            tertiary: '#6B7280',
        },
        border: {
            default: '#404040',
            strong: '#525252',
            subtle: '#2A2A2A',
        },
        success: {
            primary: '#10B981',
            light: '#064E3B',
        },
        warning: {
            primary: '#F59E0B',
            light: '#78350F',
        },
        error: {
            primary: '#EF4444',
            light: '#7F1D1D',
        },
        gamification: {
            xp: '#F59E0B',
            streak: '#FF6B35',
        },
    },
};

export type AppTheme = typeof theme;

// Hook to access theme
export const useTheme = () => {
    const themeContext = useContext(ThemeContext);
    return themeContext || theme;
};

// Theme Provider
interface NativeBaseProviderProps {
    children: ReactNode;
    theme?: typeof theme;
}

export const NativeBaseProvider: React.FC<NativeBaseProviderProps> = ({ children, theme: customTheme }) => {
    return (
        <ThemeContext.Provider value={customTheme || theme}>
            {children}
        </ThemeContext.Provider>
    );
};

// extendTheme helper (returns the theme with customizations)
export const extendTheme = (customTheme: any) => {
    return { ...theme, ...customTheme };
};

// Common style props interface
interface BoxProps {
    children?: ReactNode;
    style?: ViewStyle;
    bg?: string;
    backgroundColor?: string;
    p?: number;
    px?: number;
    py?: number;
    pt?: number;
    pb?: number;
    pl?: number;
    pr?: number;
    m?: number;
    mx?: number;
    my?: number;
    mt?: number;
    mb?: number;
    ml?: number;
    mr?: number;
    w?: number | string;
    h?: number | string;
    width?: number | string;
    height?: number | string;
    minW?: number | string;
    minH?: number | string;
    maxW?: number | string;
    maxH?: number | string;
    minWidth?: number | string;
    minHeight?: number | string;
    maxWidth?: number | string;
    maxHeight?: number | string;
    flex?: number;
    flexWrap?: ViewStyle['flexWrap'];
    flexGrow?: number;
    flexShrink?: number;
    borderRadius?: number | string;
    rounded?: string | number;
    borderTopLeftRadius?: number;
    borderTopRightRadius?: number;
    borderBottomLeftRadius?: number;
    borderBottomRightRadius?: number;
    borderWidth?: number;
    borderColor?: string;
    borderLeftWidth?: number;
    borderRightWidth?: number;
    borderTopWidth?: number;
    borderBottomWidth?: number;
    borderLeftColor?: string;
    borderRightColor?: string;
    borderTopColor?: string;
    borderBottomColor?: string;
    alignItems?: ViewStyle['alignItems'];
    justifyContent?: ViewStyle['justifyContent'];
    alignSelf?: ViewStyle['alignSelf'];
    position?: ViewStyle['position'];
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
    zIndex?: number;
    overflow?: ViewStyle['overflow'];
    opacity?: number;
    shadow?: number;
    safeArea?: boolean;
    safeAreaTop?: boolean;
    safeAreaBottom?: boolean;
}

const spacing = 4; // Base spacing unit

// Resolve color tokens like 'text.primary', 'background.secondary', 'accent.400' to actual color values
const resolveColor = (colorToken?: string): string | undefined => {
    if (!colorToken) return undefined;

    // If it's already a color value (starts with # or rgb), return as-is
    if (colorToken.startsWith('#') || colorToken.startsWith('rgb')) {
        return colorToken;
    }

    // Handle transparent
    if (colorToken === 'transparent') return 'transparent';

    // Parse token like 'text.primary' or 'accent.400'
    const parts = colorToken.split('.');
    if (parts.length < 2) return colorToken; // Not a token format

    const [category, key] = parts;
    const colors = theme.colors as any;

    if (colors[category]) {
        const value = colors[category][key];
        if (value) return value;
    }

    // Return undefined if not found (let React Native handle invalid colors)
    return colorToken;
};

const resolveSpacing = (value?: number) => value !== undefined ? value * spacing : undefined;

const resolveRounded = (value?: string | number) => {
    if (typeof value === 'number') return value;
    const map: Record<string, number> = {
        none: 0,
        sm: 4,
        md: 8,
        lg: 12,
        xl: 16,
        '2xl': 24,
        full: 9999,
    };
    return value ? map[value] || 0 : undefined;
};

const buildBoxStyle = (props: BoxProps): ViewStyle => ({
    backgroundColor: resolveColor(props.bg || props.backgroundColor),
    padding: resolveSpacing(props.p),
    paddingHorizontal: resolveSpacing(props.px),
    paddingVertical: resolveSpacing(props.py),
    paddingTop: resolveSpacing(props.pt),
    paddingBottom: resolveSpacing(props.pb),
    paddingLeft: resolveSpacing(props.pl),
    paddingRight: resolveSpacing(props.pr),
    margin: resolveSpacing(props.m),
    marginHorizontal: resolveSpacing(props.mx),
    marginVertical: resolveSpacing(props.my),
    marginTop: resolveSpacing(props.mt),
    marginBottom: resolveSpacing(props.mb),
    marginLeft: resolveSpacing(props.ml),
    marginRight: resolveSpacing(props.mr),
    width: (props.w || props.width) as DimensionValue | undefined,
    height: (props.h || props.height) as DimensionValue | undefined,
    minWidth: (props.minW || props.minWidth) as DimensionValue | undefined,
    minHeight: (props.minH || props.minHeight) as DimensionValue | undefined,
    maxWidth: (props.maxW || props.maxWidth) as DimensionValue | undefined,
    maxHeight: (props.maxH || props.maxHeight) as DimensionValue | undefined,
    flex: props.flex,
    flexWrap: props.flexWrap,
    flexGrow: props.flexGrow,
    flexShrink: props.flexShrink,
    borderRadius: resolveRounded(props.rounded) ?? resolveRounded(props.borderRadius),
    borderTopLeftRadius: props.borderTopLeftRadius,
    borderTopRightRadius: props.borderTopRightRadius,
    borderBottomLeftRadius: props.borderBottomLeftRadius,
    borderBottomRightRadius: props.borderBottomRightRadius,
    borderWidth: props.borderWidth,
    borderColor: resolveColor(props.borderColor),
    borderLeftWidth: props.borderLeftWidth,
    borderRightWidth: props.borderRightWidth,
    borderTopWidth: props.borderTopWidth,
    borderBottomWidth: props.borderBottomWidth,
    borderLeftColor: resolveColor(props.borderLeftColor),
    borderRightColor: resolveColor(props.borderRightColor),
    borderTopColor: resolveColor(props.borderTopColor),
    borderBottomColor: resolveColor(props.borderBottomColor),
    alignItems: props.alignItems,
    justifyContent: props.justifyContent,
    alignSelf: props.alignSelf,
    position: props.position,
    top: props.top,
    bottom: props.bottom,
    left: props.left,
    right: props.right,
    zIndex: props.zIndex,
    overflow: props.overflow,
    opacity: props.opacity,
});

// Box component
export const Box: React.FC<BoxProps> = ({ children, style, ...props }) => (
    <View style={[buildBoxStyle(props), style]}>
        {children}
    </View>
);

// VStack component (vertical stack)
interface VStackProps extends BoxProps {
    space?: number;
    reversed?: boolean;
}

export const VStack: React.FC<VStackProps> = ({ children, space, reversed, style, ...props }) => (
    <View
        style={[
            buildBoxStyle(props),
            {
                flexDirection: reversed ? 'column-reverse' : 'column',
                gap: resolveSpacing(space),
            },
            style,
        ]}
    >
        {children}
    </View>
);

// HStack component (horizontal stack)
interface HStackProps extends BoxProps {
    space?: number;
    reversed?: boolean;
}

export const HStack: React.FC<HStackProps> = ({ children, space, reversed, style, ...props }) => (
    <View
        style={[
            buildBoxStyle(props),
            {
                flexDirection: reversed ? 'row-reverse' : 'row',
                gap: resolveSpacing(space),
            },
            style,
        ]}
    >
        {children}
    </View>
);

// Center component
export const Center: React.FC<BoxProps> = ({ children, style, ...props }) => (
    <View
        style={[
            buildBoxStyle(props),
            { alignItems: 'center', justifyContent: 'center' },
            style,
        ]}
    >
        {children}
    </View>
);

// Text component
interface TextProps {
    children?: ReactNode;
    style?: TextStyle;
    color?: string;
    fontSize?: number | string;
    fontWeight?: TextStyle['fontWeight'];
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    textAlign?: TextStyle['textAlign'];
    numberOfLines?: number;
    lineHeight?: number;
    letterSpacing?: number;
    opacity?: number;
    mt?: number;
    mb?: number;
    ml?: number;
    mr?: number;
    mx?: number;
    my?: number;
}

const resolveFontSize = (size?: number | string) => {
    if (typeof size === 'number') return size;
    const map: Record<string, number> = {
        xs: 10,
        sm: 12,
        md: 14,
        lg: 16,
        xl: 18,
        '2xl': 20,
        '3xl': 24,
        '4xl': 30,
        '5xl': 36,
        '6xl': 48,
    };
    return size ? map[size] || 14 : undefined;
};

export const Text: React.FC<TextProps> = ({
    children,
    style,
    color,
    fontSize,
    fontWeight,
    bold,
    italic,
    underline,
    textAlign,
    numberOfLines,
    lineHeight,
    letterSpacing,
    opacity,
    mt,
    mb,
    ml,
    mr,
    mx,
    my,
}) => (
    <RNText
        numberOfLines={numberOfLines}
        style={[
            {
                color: resolveColor(color) || theme.colors.text.primary,
                fontSize: resolveFontSize(fontSize),
                fontWeight: bold ? 'bold' : fontWeight,
                fontStyle: italic ? 'italic' : undefined,
                textDecorationLine: underline ? 'underline' : undefined,
                textAlign,
                lineHeight,
                letterSpacing,
                opacity,
                marginTop: resolveSpacing(mt),
                marginBottom: resolveSpacing(mb),
                marginLeft: resolveSpacing(ml) || resolveSpacing(mx),
                marginRight: resolveSpacing(mr) || resolveSpacing(mx),
                marginVertical: resolveSpacing(my),
            },
            style,
        ]}
    >
        {children}
    </RNText>
);

// Heading component
interface HeadingProps extends TextProps {
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
}

const headingSizes: Record<string, number> = {
    xs: 14,
    sm: 16,
    md: 18,
    lg: 20,
    xl: 24,
    '2xl': 30,
    '3xl': 36,
    '4xl': 48,
};

export const Heading: React.FC<HeadingProps> = ({ size = 'lg', style, ...props }) => (
    <Text
        {...props}
        bold
        fontSize={headingSizes[size]}
        style={style}
    />
);

// Pressable component
interface PressableProps extends BoxProps {
    onPress?: () => void;
    onLongPress?: () => void;
    disabled?: boolean;
    _pressed?: { opacity?: number };
}

export const Pressable: React.FC<PressableProps> = ({
    children,
    onPress,
    onLongPress,
    disabled,
    style,
    _pressed,
    ...props
}) => (
    <RNPressable
        onPress={onPress}
        onLongPress={onLongPress}
        disabled={disabled}
        style={({ pressed }) => [
            buildBoxStyle(props),
            { opacity: pressed && _pressed?.opacity ? _pressed.opacity : 1 },
            style,
        ]}
    >
        {children}
    </RNPressable>
);

// Button component
interface ButtonProps extends BoxProps {
    onPress?: () => void;
    disabled?: boolean;
    isLoading?: boolean;
    isDisabled?: boolean;
    variant?: 'solid' | 'outline' | 'ghost';
    colorScheme?: string;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    size?: 'xs' | 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
    children,
    onPress,
    disabled,
    isLoading,
    isDisabled,
    variant = 'solid',
    colorScheme = 'accent',
    leftIcon,
    rightIcon,
    size = 'md',
    style,
    ...props
}) => {
    const isButtonDisabled = disabled || isDisabled || isLoading;
    const bgColor = variant === 'solid' ? theme.colors.accent[400] : 'transparent';
    const textColor = variant === 'solid' ? '#000' : theme.colors.accent[400];

    const sizeStyles: Record<string, { py: number; px: number; fontSize: number }> = {
        xs: { py: 1, px: 2, fontSize: 12 },
        sm: { py: 2, px: 3, fontSize: 14 },
        md: { py: 3, px: 4, fontSize: 16 },
        lg: { py: 4, px: 6, fontSize: 18 },
    };

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={isButtonDisabled}
            style={[
                buildBoxStyle(props),
                {
                    backgroundColor: bgColor,
                    paddingVertical: resolveSpacing(sizeStyles[size].py),
                    paddingHorizontal: resolveSpacing(sizeStyles[size].px),
                    borderRadius: 8,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: isButtonDisabled ? 0.5 : 1,
                    borderWidth: variant === 'outline' ? 1 : 0,
                    borderColor: theme.colors.accent[400],
                },
                style,
            ]}
        >
            {isLoading ? (
                <ActivityIndicator color={textColor} />
            ) : (
                <>
                    {leftIcon}
                    {typeof children === 'string' ? (
                        <RNText style={{ color: textColor, fontSize: sizeStyles[size].fontSize, fontWeight: '600' }}>
                            {children}
                        </RNText>
                    ) : (
                        children
                    )}
                    {rightIcon}
                </>
            )}
        </TouchableOpacity>
    );
};

// ScrollView component
interface ScrollViewProps extends BoxProps {
    horizontal?: boolean;
    showsVerticalScrollIndicator?: boolean;
    showsHorizontalScrollIndicator?: boolean;
    contentContainerStyle?: ViewStyle;
}

export const ScrollView: React.FC<ScrollViewProps> = ({
    children,
    horizontal,
    showsVerticalScrollIndicator = false,
    showsHorizontalScrollIndicator = false,
    contentContainerStyle,
    style,
    ...props
}) => (
    <RNScrollView
        horizontal={horizontal}
        showsVerticalScrollIndicator={showsVerticalScrollIndicator}
        showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
        contentContainerStyle={contentContainerStyle}
        style={[buildBoxStyle(props), style]}
    >
        {children}
    </RNScrollView>
);

// Input component
interface InputProps {
    value?: string;
    onChangeText?: (text: string) => void;
    placeholder?: string;
    placeholderTextColor?: string;
    secureTextEntry?: boolean;
    keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
    style?: TextStyle;
    isDisabled?: boolean;
    isInvalid?: boolean;
    InputLeftElement?: ReactNode;
    InputRightElement?: ReactNode;
    variant?: 'outline' | 'filled' | 'underlined';
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    w?: number | string;
    flex?: number;
    mt?: number;
    mb?: number;
    bg?: string;
    borderWidth?: number;
    borderRadius?: number | string;
    color?: string;
    px?: number;
    py?: number;
    // Note: _focus is not supported in pure React Native
}

export const Input: React.FC<InputProps> = ({
    value,
    onChangeText,
    placeholder,
    placeholderTextColor,
    secureTextEntry,
    keyboardType,
    autoCapitalize,
    style,
    isDisabled,
    isInvalid,
    InputLeftElement,
    InputRightElement,
    variant = 'outline',
    size = 'md',
    w,
    flex,
    mt,
    mb,
    bg,
    borderWidth: customBorderWidth,
    borderRadius: customBorderRadius,
    color,
    px,
    py,
}) => (
    <View
        style={{
            flexDirection: 'row',
            alignItems: 'center',
            flex: flex,
            borderWidth: customBorderWidth !== undefined ? customBorderWidth : (variant === 'outline' ? 1 : 0),
            borderColor: isInvalid ? theme.colors.error.primary : theme.colors.border.default,
            borderRadius: resolveRounded(customBorderRadius) || 8,
            backgroundColor: resolveColor(bg) || (variant === 'filled' ? theme.colors.surface.secondary : 'transparent'),
            borderBottomWidth: variant === 'underlined' ? 1 : undefined,
            width: w as DimensionValue | undefined,
            marginTop: resolveSpacing(mt),
            marginBottom: resolveSpacing(mb),
        }}
    >
        {InputLeftElement}
        <TextInput
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={resolveColor(placeholderTextColor) || theme.colors.text.tertiary}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            editable={!isDisabled}
            style={[
                {
                    flex: 1,
                    color: resolveColor(color) || theme.colors.text.primary,
                    paddingHorizontal: resolveSpacing(px) || 12,
                    paddingVertical: resolveSpacing(py) || (size === 'lg' ? 16 : size === 'sm' ? 8 : 12),
                    fontSize: size === 'lg' ? 18 : size === 'sm' ? 14 : 16,
                },
                style,
            ]}
        />
        {InputRightElement}
    </View>
);

// Image component
interface ImageProps {
    source: any;
    alt?: string;
    style?: ImageStyle;
    w?: number | string;
    h?: number | string;
    size?: number | string;
    borderRadius?: number;
    rounded?: string | number;
    resizeMode?: 'cover' | 'contain' | 'stretch' | 'center';
}

export const Image: React.FC<ImageProps> = ({
    source,
    alt,
    style,
    w,
    h,
    size,
    borderRadius,
    rounded,
    resizeMode = 'cover',
}) => (
    <RNImage
        source={source}
        accessibilityLabel={alt}
        resizeMode={resizeMode}
        style={[
            {
                width: size || w,
                height: size || h,
                borderRadius: resolveRounded(rounded) || borderRadius,
            },
            style,
        ]}
    />
);

// Progress component
interface ProgressProps {
    value?: number;
    max?: number;
    colorScheme?: string;
    bg?: string;
    size?: 'xs' | 'sm' | 'md' | 'lg';
    rounded?: string;
    w?: number | string;
}

export const Progress: React.FC<ProgressProps> = ({
    value = 0,
    max = 100,
    colorScheme = 'accent',
    bg = theme.colors.surface.tertiary,
    size = 'md',
    rounded = 'full',
    w,
}) => {
    const heights: Record<string, number> = { xs: 2, sm: 4, md: 6, lg: 8 };
    const progress = Math.min(Math.max((value / max) * 100, 0), 100);

    return (
        <View
            style={{
                width: w,
                height: heights[size],
                backgroundColor: bg,
                borderRadius: resolveRounded(rounded),
                overflow: 'hidden',
            }}
        >
            <View
                style={{
                    width: `${progress}%`,
                    height: '100%',
                    backgroundColor: theme.colors.accent[400],
                    borderRadius: resolveRounded(rounded),
                }}
            />
        </View>
    );
};

// Radio component (basic implementation)
interface RadioProps {
    value: string;
    isChecked?: boolean;
    onChange?: (value: string) => void;
    children?: ReactNode;
}

export const Radio: React.FC<RadioProps> = ({ value, isChecked, onChange, children }) => (
    <TouchableOpacity
        onPress={() => onChange?.(value)}
        style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 4 }}
    >
        <View
            style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                borderWidth: 2,
                borderColor: isChecked ? theme.colors.accent[400] : theme.colors.border.default,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 8,
            }}
        >
            {isChecked && (
                <View
                    style={{
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: theme.colors.accent[400],
                    }}
                />
            )}
        </View>
        {typeof children === 'string' ? (
            <RNText style={{ color: theme.colors.text.primary }}>{children}</RNText>
        ) : (
            children
        )}
    </TouchableOpacity>
);

// Radio.Group component
interface RadioGroupProps {
    value?: string;
    onChange?: (value: string) => void;
    children?: ReactNode;
    name?: string;
}

Radio.Group = ({ value, onChange, children }: RadioGroupProps) => (
    <View>
        {React.Children.map(children, (child) => {
            if (React.isValidElement<RadioProps>(child)) {
                return React.cloneElement(child, {
                    isChecked: child.props.value === value,
                    onChange,
                });
            }
            return child;
        })}
    </View>
);

// useToast hook (basic implementation)
export const useToast = () => {
    return {
        show: ({ title, description, status }: { title?: string; description?: string; status?: string }) => {
            // In a real implementation, this would show a toast notification
            console.log(`Toast: ${title} - ${description} (${status})`);
        },
        close: () => { },
        closeAll: () => { },
    };
};

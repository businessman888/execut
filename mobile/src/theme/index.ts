// Theme configuration - standalone version without native-base dependency

// Brand colors from design system
const BRAND = {
    50: '#E8EBF5',
    100: '#D1D7EB',
    200: '#A3AFD7',
    300: '#7587C3',
    400: '#475FAF',
    500: '#131F54', // PRIMARY
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
    400: '#33CFFF', // Electric Cyan - Primary accent
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
        // Dark theme backgrounds
        background: {
            primary: '#0D0D0D',
            secondary: '#1A1A1A',
            tertiary: '#262626',
        },
        // Card surfaces
        surface: {
            primary: '#1A1A1A',
            secondary: '#262626',
            tertiary: '#333333',
        },
        // Text colors for dark theme
        text: {
            primary: '#FFFFFF',
            secondary: '#9CA3AF',
            tertiary: '#6B7280',
        },
        // Border colors
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
    fontConfig: {
        Inter: {
            400: { normal: 'Inter-Regular' },
            500: { normal: 'Inter-Medium' },
            600: { normal: 'Inter-SemiBold' },
            700: { normal: 'Inter-Bold' },
        },
        Poppins: {
            400: { normal: 'Poppins-Regular' },
            500: { normal: 'Poppins-Medium' },
            600: { normal: 'Poppins-SemiBold' },
            700: { normal: 'Poppins-Bold' },
        },
    },
    fonts: {
        heading: 'Poppins',
        body: 'Poppins',
        mono: 'JetBrainsMono',
    },
    config: {
        initialColorMode: 'dark',
    },
};

export type AppTheme = typeof theme;

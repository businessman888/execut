import { extendTheme } from 'native-base';

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
    400: '#33CFFF',
    500: '#00C3FF', // Electric Cyan
    600: '#009CCC',
    700: '#007599',
    800: '#004E66',
    900: '#002733',
};

export const theme = extendTheme({
    colors: {
        brand: BRAND,
        accent: ACCENT,
        background: {
            primary: '#FFFFFF',
            secondary: '#FAFBFC',
            tertiary: '#F4F5F7',
        },
        surface: {
            primary: '#FFFFFF',
            secondary: '#F9FAFB',
            tertiary: '#F3F4F6',
        },
        text: {
            primary: '#1F2937',
            secondary: '#6B7280',
            tertiary: '#9CA3AF',
        },
        border: {
            default: '#E5E7EB',
            strong: '#D1D5DB',
        },
        success: {
            primary: '#10B981',
            light: '#D1FAE5',
        },
        warning: {
            primary: '#F59E0B',
            light: '#FEF3C7',
        },
        error: {
            primary: '#EF4444',
            light: '#FEE2E2',
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
    },
    fonts: {
        heading: 'Inter',
        body: 'Inter',
        mono: 'JetBrainsMono',
    },
    components: {
        Button: {
            baseStyle: {
                rounded: 'lg',
            },
            defaultProps: {
                colorScheme: 'brand',
            },
        },
        Input: {
            baseStyle: {
                rounded: 'lg',
            },
        },
    },
    config: {
        initialColorMode: 'light',
    },
});

export type AppTheme = typeof theme;

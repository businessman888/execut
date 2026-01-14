App de Gestão de Objetivos para Empreendedores Digitais  
Cor Principal da Marca: \#131F54 (Deep Blue)

2\. PALETA DE CORES \- COMPLETA  
2.1 Brand Primary (Deep Blue)  
typescriptexport const BRAND \= {  
  50: '\#E8EBF5',   // Muito claro \- backgrounds sutis  
  100: '\#D1D7EB',  // Claro \- hover states  
  200: '\#A3AFD7',  // Médio claro  
  300: '\#7587C3',  // Médio  
  400: '\#475FAF',  // Médio escuro  
  500: '\#131F54',  // COR PRINCIPAL DA MARCA  
  600: '\#0F1943',  // Escuro \- pressed states  
  700: '\#0B1332',  // Muito escuro  
  800: '\#080D22',  // Ultra escuro  
  900: '\#040611',  // Quase preto  
  950: '\#020308',  // Máximo escuro  
}  
2.2 Paleta Secundária (Accent)  
Para complementar o Deep Blue, paleta de acento em Electric Cyan:  
typescriptexport const ACCENT \= {  
  50: '\#E6F9FF',  
  100: '\#CCF3FF',  
  200: '\#99E7FF',  
  300: '\#66DBFF',  
  400: '\#33CFFF',  
  500: '\#00C3FF',  // Electric Cyan \- CTA secundário  
  600: '\#009CCC',  
  700: '\#007599',  
  800: '\#004E66',  
  900: '\#002733',  
}  
2.3 Cores Completas do Sistema  
typescript// colors.ts  
export const COLORS\_LIGHT \= {  
  // Brand  
  brand: BRAND,  
  accent: ACCENT,  
    
  // Backgrounds  
  background: {  
    primary: '\#FFFFFF',  
    secondary: '\#FAFBFC',  
    tertiary: '\#F4F5F7',  
    elevated: '\#FFFFFF',  
    overlay: 'rgba(19, 31, 84, 0.5)',  
  },  
    
  // Surfaces (Cards, containers)  
  surface: {  
    primary: '\#FFFFFF',  
    secondary: '\#F9FAFB',  
    tertiary: '\#F3F4F6',  
    glass: 'rgba(255, 255, 255, 0.7)',  
    brand: BRAND\[50\],  
  },  
    
  // Textos  
  text: {  
    primary: '\#1F2937',      // Gray-800  
    secondary: '\#6B7280',    // Gray-500  
    tertiary: '\#9CA3AF',     // Gray-400  
    disabled: '\#D1D5DB',     // Gray-300  
    inverse: '\#FFFFFF',  
    brand: BRAND\[600\],  
    accent: ACCENT\[600\],  
  },  
    
  // Borders  
  border: {  
    subtle: '\#F3F4F6',       // Gray-100  
    default: '\#E5E7EB',      // Gray-200  
    strong: '\#D1D5DB',       // Gray-300  
    brand: BRAND\[200\],  
  },  
    
  // Semantic (mantido do design anterior)  
  success: {  
    primary: '\#10B981',  
    light: '\#D1FAE5',  
    dark: '\#065F46',  
  },  
  warning: {  
    primary: '\#F59E0B',  
    light: '\#FEF3C7',  
    dark: '\#92400E',  
  },  
  error: {  
    primary: '\#EF4444',  
    light: '\#FEE2E2',  
    dark: '\#991B1B',  
  },  
  info: {  
    primary: '\#3B82F6',  
    light: '\#DBEAFE',  
    dark: '\#1E40AF',  
  },  
    
  // Gamification  
  gamification: {  
    xp: {  
      primary: '\#F59E0B',     // Amber  
      glow: '\#FCD34D',  
      background: '\#FEF3C7',  
    },  
    level: {  
      bronze: '\#CD7F32',  
      silver: '\#C0C0C0',  
      gold: '\#FFD700',  
      platinum: '\#E5E4E2',  
      diamond: '\#B9F2FF',  
    },  
    achievement: {  
      unlocked: '\#10B981',  
      locked: '\#9CA3AF',  
    },  
    streak: '\#FF6B35',        // Laranja vibrante para streak  
  },  
}

export const COLORS\_DARK \= {  
  // Brand (ajustado para dark mode)  
  brand: {  
    ...BRAND,  
    500: '\#475FAF',  // Versão mais clara para dark mode  
  },  
  accent: ACCENT,  
    
  // Backgrounds  
  background: {  
    primary: '\#0A0A0A',  
    secondary: '\#131313',  
    tertiary: '\#1A1A1A',  
    elevated: '\#1F1F1F',  
    overlay: 'rgba(0, 0, 0, 0.7)',  
  },  
    
  // Surfaces  
  surface: {  
    primary: '\#131313',  
    secondary: '\#1A1A1A',  
    tertiary: '\#262626',  
    glass: 'rgba(26, 26, 26, 0.7)',  
    brand: BRAND\[900\],  
  },  
    
  // Textos (invertidos)  
  text: {  
    primary: '\#F9FAFB',  
    secondary: '\#D1D5DB',  
    tertiary: '\#9CA3AF',  
    disabled: '\#6B7280',  
    inverse: '\#0A0A0A',  
    brand: BRAND\[300\],  
    accent: ACCENT\[400\],  
  },  
    
  // Borders  
  border: {  
    subtle: '\#262626',  
    default: '\#404040',  
    strong: '\#525252',  
    brand: BRAND\[800\],  
  },  
    
  // Semantic  
  success: {  
    primary: '\#34D399',  
    light: '\#064E3B',  
    dark: '\#D1FAE5',  
  },  
  warning: {  
    primary: '\#FCD34D',  
    light: '\#78350F',  
    dark: '\#FEF3C7',  
  },  
  error: {  
    primary: '\#F87171',  
    light: '\#7F1D1D',  
    dark: '\#FEE2E2',  
  },  
  info: {  
    primary: '\#60A5FA',  
    light: '\#1E3A8A',  
    dark: '\#DBEAFE',  
  },  
    
  // Gamification (ajustado)  
  gamification: {  
    xp: {  
      primary: '\#FCD34D',  
      glow: '\#FBBF24',  
      background: '\#78350F',  
    },  
    level: {  
      bronze: '\#D4A574',  
      silver: '\#D4D4D4',  
      gold: '\#FFE066',  
      platinum: '\#F5F5F5',  
      diamond: '\#D4F1F9',  
    },  
    achievement: {  
      unlocked: '\#34D399',  
      locked: '\#6B7280',  
    },  
    streak: '\#FF8C61',  
  },  
}  
2.4 Gradientes Premium  
typescriptexport const GRADIENTS \= {  
  // Hero / Onboarding  
  hero: {  
    light: \`linear-gradient(135deg, ${BRAND\[500\]} 0%, ${BRAND\[700\]} 100%)\`,  
    dark: \`linear-gradient(135deg, ${BRAND\[400\]} 0%, ${BRAND\[600\]} 100%)\`,  
  },  
    
  // Brand com accent  
  brandAccent: {  
    light: \`linear-gradient(135deg, ${BRAND\[500\]} 0%, ${ACCENT\[500\]} 100%)\`,  
    dark: \`linear-gradient(135deg, ${BRAND\[400\]} 0%, ${ACCENT\[400\]} 100%)\`,  
  },  
    
  // Subtle backgrounds  
  subtle: {  
    light: 'linear-gradient(180deg, \#FFFFFF 0%, \#F9FAFB 100%)',  
    dark: 'linear-gradient(180deg, \#0A0A0A 0%, \#131313 100%)',  
  },  
    
  // XP Bar (mantido \- Amber/Gold)  
  xp: 'linear-gradient(90deg, \#F59E0B 0%, \#FBBF24 50%, \#FCD34D 100%)',  
    
  // Glass Cards  
  glass: {  
    light: 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 100%)',  
    dark: 'linear-gradient(135deg, rgba(26,26,26,0.8) 0%, rgba(26,26,26,0.4) 100%)',  
  },  
    
  // Achievement unlock  
  achievement: 'linear-gradient(135deg, \#10B981 0%, \#34D399 100%)',  
    
  // Premium / Pro features  
  premium: {  
    light: \`linear-gradient(135deg, ${BRAND\[500\]} 0%, ${ACCENT\[500\]} 50%, ${BRAND\[700\]} 100%)\`,  
    dark: \`linear-gradient(135deg, ${BRAND\[400\]} 0%, ${ACCENT\[400\]} 50%, ${BRAND\[600\]} 100%)\`,  
  }  
}

3\. COMPONENTES ATUALIZADOS COM COR DA MARCA  
3.1 Buttons com Brand Color  
typescript// components/buttons.ts  
export const BUTTON\_PRIMARY \= {  
  container: {  
    height: 48,  
    paddingHorizontal: 24,  
    borderRadius: 12,  
    backgroundColor: BRAND\[500\], // \#131F54  
    justifyContent: 'center',  
    alignItems: 'center',  
      
    // Shadow específico para deep blue  
    shadowColor: BRAND\[700\],  
    shadowOffset: { width: 0, height: 4 },  
    shadowOpacity: 0.3,  
    shadowRadius: 8,  
    elevation: 4,  
  },  
    
  hover: {  
    backgroundColor: BRAND\[600\],  
    elevation: 6,  
  },  
    
  pressed: {  
    backgroundColor: BRAND\[700\],  
    elevation: 2,  
  },  
    
  disabled: {  
    backgroundColor: COLORS\_LIGHT.text.disabled,  
    opacity: 0.38,  
  },  
    
  text: {  
    fontSize: 14,  
    lineHeight: 20,  
    fontFamily: 'Inter-SemiBold',  
    color: '\#FFFFFF',  
    letterSpacing: 0.1,  
  }  
}

export const BUTTON\_SECONDARY \= {  
  container: {  
    height: 48,  
    paddingHorizontal: 24,  
    borderRadius: 12,  
    borderWidth: 2,  
    borderColor: BRAND\[500\],  
    backgroundColor: 'transparent',  
    justifyContent: 'center',  
    alignItems: 'center',  
  },  
    
  hover: {  
    backgroundColor: BRAND\[50\],  
    borderColor: BRAND\[600\],  
  },  
    
  text: {  
    fontSize: 14,  
    lineHeight: 20,  
    fontFamily: 'Inter-SemiBold',  
    color: BRAND\[600\],  
  }  
}

export const BUTTON\_ACCENT \= {  
  container: {  
    height: 48,  
    paddingHorizontal: 24,  
    borderRadius: 12,  
    backgroundColor: ACCENT\[500\], // Electric Cyan  
    justifyContent: 'center',  
    alignItems: 'center',  
  },  
    
  text: {  
    fontSize: 14,  
    lineHeight: 20,  
    fontFamily: 'Inter-SemiBold',  
    color: BRAND\[900\], // Contraste perfeito  
  }  
}  
3.2 Cards Premium com Glassmorphism  
typescriptexport const CARD\_PREMIUM \= {  
  container: {  
    borderRadius: 16,  
    padding: 20,  
    overflow: 'hidden',  
      
    // Light mode  
    light: {  
      backgroundColor: 'rgba(255, 255, 255, 0.7)',  
      borderWidth: 1,  
      borderColor: 'rgba(19, 31, 84, 0.1)',  
        
      // Shimmer effect overlay  
      '::before': {  
        background: \`linear-gradient(90deg,   
          transparent 0%,   
          rgba(19, 31, 84, 0.05) 50%,   
          transparent 100%)\`,  
      }  
    },  
      
    // Dark mode  
    dark: {  
      backgroundColor: 'rgba(26, 26, 26, 0.7)',  
      borderWidth: 1,  
      borderColor: 'rgba(71, 95, 175, 0.2)',  
    }  
  }  
}  
3.3 Progress Indicators  
typescript// Progress Ring (Circular) com brand colors  
export const PROGRESS\_RING \= {  
  size: {  
    small: 64,  
    medium: 120,  
    large: 200,  
  },  
    
  colors: {  
    light: {  
      background: COLORS\_LIGHT.border.default,  
      progress: BRAND\[500\],  
      glow: BRAND\[300\], // Efeito de brilho  
    },  
    dark: {  
      background: COLORS\_DARK.border.default,  
      progress: BRAND\[400\],  
      glow: BRAND\[500\],  
    }  
  },  
    
  strokeWidth: {  
    small: 6,  
    medium: 10,  
    large: 14,  
  },  
    
  label: {  
    fontSize: 24,  
    fontFamily: 'JetBrainsMono-Medium',  
    color: BRAND\[600\],  
  }  
}

// Linear Progress Bar  
export const PROGRESS\_BAR \= {  
  container: {  
    height: 8,  
    borderRadius: 4,  
    backgroundColor: COLORS\_LIGHT.surface.tertiary,  
    overflow: 'hidden',  
  },  
    
  fill: {  
    height: '100%',  
    borderRadius: 4,  
      
    // Gradiente brand  
    background: \`linear-gradient(90deg,   
      ${BRAND\[500\]} 0%,   
      ${BRAND\[400\]} 50%,   
      ${ACCENT\[500\]} 100%)\`,  
      
    // Animação de brilho  
    animation: 'shimmer 2s infinite',  
  }  
}  
3.4 Badge de Nível (Gamificação)  
typescriptexport const LEVEL\_BADGE \= {  
  container: {  
    width: 56,  
    height: 56,  
    borderRadius: 28,  
    justifyContent: 'center',  
    alignItems: 'center',  
      
    // Gradiente brand \+ accent  
    background: \`linear-gradient(135deg,   
      ${BRAND\[500\]} 0%,   
      ${ACCENT\[500\]} 100%)\`,  
      
    // Borda com glow  
    borderWidth: 3,  
    borderColor: '\#FFFFFF',  
      
    shadowColor: BRAND\[500\],  
    shadowOffset: { width: 0, height: 4 },  
    shadowOpacity: 0.4,  
    shadowRadius: 12,  
  },  
    
  levelText: {  
    fontSize: 20,  
    fontFamily: 'Inter-Bold',  
    color: '\#FFFFFF',  
  },  
    
  labelText: {  
    fontSize: 10,  
    fontFamily: 'Inter-Medium',  
    color: BRAND\[100\],  
    textTransform: 'uppercase',  
    letterSpacing: 1,  
  }  
}

4\. TELAS ESPECÍFICAS \- APLICAÇÃO DA COR  
4.1 Onboarding Screens  
typescriptexport const ONBOARDING \= {  
  background: {  
    // Gradiente hero full screen  
    light: GRADIENTS.hero.light,  
    dark: GRADIENTS.hero.dark,  
  },  
    
  illustration: {  
    // Ilustrações com tons de brand  
    primaryColor: BRAND\[500\],  
    secondaryColor: ACCENT\[500\],  
    accentColor: BRAND\[300\],  
  },  
    
  title: {  
    fontSize: 32,  
    lineHeight: 40,  
    fontFamily: 'ClashDisplay-Bold',  
    color: '\#FFFFFF',  
    textAlign: 'center',  
    marginBottom: 12,  
  },  
    
  description: {  
    fontSize: 16,  
    lineHeight: 24,  
    fontFamily: 'Inter-Regular',  
    color: 'rgba(255, 255, 255, 0.9)',  
    textAlign: 'center',  
  },  
    
  // Indicadores de progresso (dots)  
  progressDot: {  
    width: 8,  
    height: 8,  
    borderRadius: 4,  
    backgroundColor: 'rgba(255, 255, 255, 0.3)',  
      
    active: {  
      width: 24,  
      backgroundColor: '\#FFFFFF',  
    }  
  }  
}  
4.2 Home Screen (Dashboard)  
typescriptexport const HOME\_SCREEN \= {  
  header: {  
    backgroundColor: {  
      light: COLORS\_LIGHT.background.primary,  
      dark: COLORS\_DARK.background.primary,  
    },  
    paddingTop: 44, // Safe area  
    paddingHorizontal: 20,  
    paddingBottom: 16,  
  },  
    
  greeting: {  
    fontSize: 28,  
    lineHeight: 36,  
    fontFamily: 'ClashDisplay-SemiBold',  
    color: {  
      light: COLORS\_LIGHT.text.primary,  
      dark: COLORS\_DARK.text.primary,  
    }  
  },  
    
  // Card de progresso semanal (destaque)  
  weeklyProgressCard: {  
    borderRadius: 20,  
    padding: 20,  
    marginHorizontal: 20,  
    marginBottom: 24,  
      
    // Gradiente brand sutil  
    background: {  
      light: \`linear-gradient(135deg,   
        ${BRAND\[50\]} 0%,   
        ${ACCENT\[50\]} 100%)\`,  
      dark: \`linear-gradient(135deg,   
        ${BRAND\[900\]} 0%,   
        ${BRAND\[800\]} 100%)\`,  
    },  
      
    borderWidth: 1,  
    borderColor: {  
      light: BRAND\[100\],  
      dark: BRAND\[700\],  
    }  
  },  
    
  // Seção de tarefas  
  tasksSection: {  
    paddingHorizontal: 20,  
  },  
    
  sectionTitle: {  
    fontSize: 18,  
    lineHeight: 24,  
    fontFamily: 'Inter-SemiBold',  
    color: {  
      light: COLORS\_LIGHT.text.primary,  
      dark: COLORS\_DARK.text.primary,  
    },  
    marginBottom: 12,  
  }  
}  
4.3 Task Item (Lista de Tarefas)  
typescriptexport const TASK\_ITEM \= {  
  container: {  
    borderRadius: 12,  
    padding: 16,  
    marginBottom: 8,  
    backgroundColor: {  
      light: COLORS\_LIGHT.surface.primary,  
      dark: COLORS\_DARK.surface.primary,  
    },  
      
    borderWidth: 1,  
    borderColor: {  
      light: COLORS\_LIGHT.border.default,  
      dark: COLORS\_DARK.border.default,  
    },  
      
    // Estado completo  
    completed: {  
      backgroundColor: {  
        light: COLORS\_LIGHT.surface.brand,  
        dark: COLORS\_DARK.surface.brand,  
      },  
      borderColor: BRAND\[200\],  
    }  
  },  
    
  checkbox: {  
    width: 24,  
    height: 24,  
    borderRadius: 6,  
    borderWidth: 2,  
    borderColor: {  
      light: COLORS\_LIGHT.border.strong,  
      dark: COLORS\_DARK.border.strong,  
    },  
      
    checked: {  
      backgroundColor: BRAND\[500\],  
      borderColor: BRAND\[500\],  
    }  
  },  
    
  title: {  
    fontSize: 15,  
    lineHeight: 20,  
    fontFamily: 'Inter-Medium',  
    color: {  
      light: COLORS\_LIGHT.text.primary,  
      dark: COLORS\_DARK.text.primary,  
    },  
      
    completed: {  
      textDecorationLine: 'line-through',  
      color: {  
        light: COLORS\_LIGHT.text.tertiary,  
        dark: COLORS\_DARK.text.tertiary,  
      }  
    }  
  },  
    
  xpBadge: {  
    height: 24,  
    paddingHorizontal: 8,  
    borderRadius: 12,  
    backgroundColor: COLORS\_LIGHT.gamification.xp.background,  
      
    text: {  
      fontSize: 12,  
      fontFamily: 'JetBrainsMono-Medium',  
      color: COLORS\_LIGHT.gamification.xp.primary,  
    }  
  }  
}  
4.4 Hall da Fama  
typescriptexport const HALL\_OF\_FAME \= {  
  header: {  
    background: {  
      light: GRADIENTS.subtle.light,  
      dark: GRADIENTS.subtle.dark,  
    },  
    paddingTop: 44,  
    paddingBottom: 20,  
  },  
    
  title: {  
    fontSize: 28,  
    fontFamily: 'ClashDisplay-Bold',  
    color: {  
      light: COLORS\_LIGHT.text.primary,  
      dark: COLORS\_DARK.text.primary,  
    },  
    paddingHorizontal: 20,  
  },  
    
  postCard: {  
    borderRadius: 16,  
    padding: 16,  
    marginHorizontal: 20,  
    marginBottom: 12,  
    backgroundColor: {  
      light: COLORS\_LIGHT.surface.primary,  
      dark: COLORS\_DARK.surface.primary,  
    },  
      
    borderLeftWidth: 4,  
    borderLeftColor: BRAND\[500\], // Destaque brand  
      
    shadowColor: BRAND\[900\],  
    shadowOffset: { width: 0, height: 2 },  
    shadowOpacity: 0.1,  
    shadowRadius: 8,  
  },  
    
  likeButton: {  
    active: {  
      color: SEMANTIC.error.primary, // Coração vermelho  
    },  
    inactive: {  
      color: COLORS\_LIGHT.text.tertiary,  
    }  
  }  
}

5\. ANIMAÇÕES COM COR DA MARCA  
5.1 Lottie Animations (Celebrações)  
typescript// Configuração de cores para Lottie files  
export const LOTTIE\_COLORS \= {  
  levelUp: {  
    primary: BRAND\[500\],  
    secondary: ACCENT\[500\],  
    accent: BRAND\[300\],  
    glow: '\#FFFFFF',  
  },  
    
  achievement: {  
    primary: COLORS\_LIGHT.gamification.achievement.unlocked,  
    secondary: BRAND\[500\],  
    particles: ACCENT\[500\],  
  },  
    
  confetti: {  
    colors: \[  
      BRAND\[500\],  
      BRAND\[400\],  
      ACCENT\[500\],  
      ACCENT\[400\],  
      COLORS\_LIGHT.gamification.xp.primary,  
    \]  
  }  
}  
5.2 Skeleton Loaders  
typescriptexport const SKELETON \= {  
  baseColor: {  
    light: COLORS\_LIGHT.surface.secondary,  
    dark: COLORS\_DARK.surface.secondary,  
  },  
    
  highlightColor: {  
    light: BRAND\[50\], // Shimmer com brand color  
    dark: BRAND\[900\],  
  },  
    
  animation: {  
    duration: 1500,  
    easing: 'ease-in-out',  
  }  
}

6\. DARK MODE \- TRANSIÇÃO SUAVE  
6.1 Configuração de Tema  
typescript// hooks/useTheme.ts  
import { useColorScheme } from 'react-native'  
import { COLORS\_LIGHT, COLORS\_DARK } from '@/theme/colors'

export const useTheme \= () \=\> {  
  const colorScheme \= useColorScheme()  
  const isDark \= colorScheme \=== 'dark'  
    
  return {  
    colors: isDark ? COLORS\_DARK : COLORS\_LIGHT,  
    isDark,  
    colorScheme,  
  }  
}  
6.2 Animação de Transição  
typescript// Smooth transition entre light/dark  
export const THEME\_TRANSITION \= {  
  duration: 300,  
  easing: 'ease-in-out',  
    
  // Animar propriedades específicas  
  animatedProperties: \[  
    'backgroundColor',  
    'color',  
    'borderColor',  
    'shadowColor',  
  \]  
}

7\. TOKENS PARA IMPLEMENTAÇÃO  
7.1 Arquivo de Tokens Completo  
typescript// theme/tokens.ts  
export const TOKENS \= {  
  colors: {  
    brand: {  
      50: '\#E8EBF5',  
      100: '\#D1D7EB',  
      200: '\#A3AFD7',  
      300: '\#7587C3',  
      400: '\#475FAF',  
      500: '\#131F54', // PRIMARY  
      600: '\#0F1943',  
      700: '\#0B1332',  
      800: '\#080D22',  
      900: '\#040611',  
      950: '\#020308',  
    },  
    accent: {  
      500: '\#00C3FF',  
      // ... outras  
    },  
  },  
    
  spacing: {  
    xs: 4,  
    sm: 8,  
    md: 12,  
    lg: 16,  
    xl: 20,  
    '2xl': 24,  
    '3xl': 32,  
    '4xl': 40,  
    '5xl': 48,  
  },  
    
  borderRadius: {  
    sm: 6,  
    md: 8,  
    lg: 12,  
    xl: 16,  
    '2xl': 20,  
    full: 9999,  
  },  
    
  typography: {  
    fontFamily: {  
      primary: 'Inter',  
      display: 'ClashDisplay',  
      mono: 'JetBrainsMono',  
    },  
    fontSize: {  
      xs: 11,  
      sm: 12,  
      md: 14,  
      lg: 16,  
      xl: 18,  
      '2xl': 20,  
      '3xl': 24,  
      '4xl': 28,  
      '5xl': 32,  
      '6xl': 40,  
    },  
    lineHeight: {  
      tight: 1.2,  
      normal: 1.5,  
      relaxed: 1.75,  
    },  
  },  
    
  shadows: {  
    sm: {  
      shadowColor: BRAND\[900\],  
      shadowOffset: { width: 0, height: 1 },  
      shadowOpacity: 0.05,  
      shadowRadius: 2,  
      elevation: 1,  
    },  
    md: {  
      shadowColor: BRAND\[900\],  
      shadowOffset: { width: 0, height: 2 },  
      shadowOpacity: 0.1,  
      shadowRadius: 4,  
      elevation: 2,  
    },  
    lg: {  
      shadowColor: BRAND\[900\],  
      shadowOffset: { width: 0, height: 4 },  
      shadowOpacity: 0.15,  
      shadowRadius: 8,  
      elevation: 4,  
    },  
    xl: {  
      shadowColor: BRAND\[900\],  
      shadowOffset: { width: 0, height: 8 },  
      shadowOpacity: 0.2,  
      shadowRadius: 16,  
      elevation: 6,  
    },  
  }  
}

8\. GUIA DE USO \- QUICK REFERENCE  
8.1 Quando Usar Cada Cor  
ContextoCorUsoCTAs PrincipaisBRAND\[500\]Botões primários, links importantesCTAs SecundáriosACCENT\[500\]Botões de ação alternativaBackgroundsCOLORS.background.primaryFundo de telasCardsCOLORS.surface.primaryContainers, cardsTextos PrincipaisCOLORS.text.primaryTítulos, corpo de textoTextos SecundáriosCOLORS.text.secondaryLabels, descriçõesBorders SutisCOLORS.border.subtleSeparadores discretosSuccessSEMANTIC.success.primaryConfirmações, tarefas completasXP/GamificaçãoGAMIFICATION.xp.primaryBarra de XP, recompensasDestaques PremiumGRADIENTS.premiumFeatures pagas, upgrades  
8.2 Combinações Recomendadas  
typescript// Exemplo: Card de tarefa com destaque  
{  
  backgroundColor: COLORS.surface.primary,  
  borderLeftWidth: 4,  
  borderLeftColor: BRAND\[500\], // Destaque brand  
  borderRadius: 12,  
}

// Exemplo: Botão com gradiente  
{  
  background: GRADIENTS.brandAccent.light,  
  color: '\#FFFFFF',  
}

// Exemplo: Badge de nível  
{  
  background: \`linear-gradient(135deg, ${BRAND\[500\]}, ${ACCENT\[500\]})\`,  
  borderColor: '\#FFFFFF',  
}

✅ DESIGN SYSTEM COMPLETO \- PRONTO PARA DESENVOLVIMENTO  
Entregáveis:

✅ Paleta completa baseada em \#131F54  
✅ Todos os componentes estilizados  
✅ Light & Dark mode configurados  
✅ Tokens exportáveis  
✅ Gradientes premium  
✅ Guia de implementação
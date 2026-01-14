import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme, Icon } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

// Screens
import { HomeScreen } from '../screens/home/HomeScreen';
import { GoalsScreen } from '../screens/goals/GoalsScreen';
import { ProgressScreen } from '../screens/progress/ProgressScreen';
import { HallOfFameScreen } from '../screens/hall-of-fame/HallOfFameScreen';
import { ProfileScreen } from '../screens/profile/ProfileScreen';

export type MainTabParamList = {
    Home: undefined;
    Goals: undefined;
    Progress: undefined;
    HallOfFame: undefined;
    Profile: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

export function MainNavigator() {
    const { colors } = useTheme();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: colors.brand[500],
                tabBarInactiveTintColor: colors.gray[400],
                tabBarStyle: {
                    backgroundColor: colors.background.primary,
                    borderTopColor: colors.border.default,
                },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: keyof typeof Ionicons.glyphMap;

                    switch (route.name) {
                        case 'Home':
                            iconName = focused ? 'home' : 'home-outline';
                            break;
                        case 'Goals':
                            iconName = focused ? 'flag' : 'flag-outline';
                            break;
                        case 'Progress':
                            iconName = focused ? 'stats-chart' : 'stats-chart-outline';
                            break;
                        case 'HallOfFame':
                            iconName = focused ? 'trophy' : 'trophy-outline';
                            break;
                        case 'Profile':
                            iconName = focused ? 'person' : 'person-outline';
                            break;
                        default:
                            iconName = 'home-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Início' }} />
            <Tab.Screen name="Goals" component={GoalsScreen} options={{ title: 'Metas' }} />
            <Tab.Screen name="Progress" component={ProgressScreen} options={{ title: 'Progresso' }} />
            <Tab.Screen name="HallOfFame" component={HallOfFameScreen} options={{ title: 'Hall' }} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Perfil' }} />
        </Tab.Navigator>
    );
}

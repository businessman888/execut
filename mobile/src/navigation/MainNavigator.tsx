import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'native-base';

// Screens
import { HomeScreen } from '../screens/home/HomeScreen';
import { GoalsScreen } from '../screens/goals/GoalsScreen';
import { YearDetailScreen } from '../screens/goals/YearDetailScreen';
import { MonthDetailScreen } from '../screens/goals/MonthDetailScreen';
import { WeekDetailScreen } from '../screens/goals/WeekDetailScreen';
import { ProgressScreen } from '../screens/progress/ProgressScreen';
import { HallOfFameScreen } from '../screens/hall-of-fame/HallOfFameScreen';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { UserProfileScreen } from '../screens/profile/UserProfileScreen';

// Nav Icons
import {
    NavHomeIcon,
    NavDashboardIcon,
    NavCalendarIcon,
    NavTrophyIcon,
    NavLightningIcon,
} from '../components/icons/NavIcons';

// Type definitions
export type GoalsStackParamList = {
    GoalsMain: undefined;
    YearDetail: {
        yearNumber: number;
        phase: string;
        title: string;
        revenue: string;
    };
    MonthDetail: {
        month: string;
        yearNumber: number;
    };
    WeekDetail: {
        weekNumber: number;
        dateRange: string;
        month: string;
    };
};

export type HomeStackParamList = {
    HomeMain: undefined;
    UserProfile: undefined;
};

export type ProfileStackParamList = {
    ProfileMain: undefined;
    UserProfile: undefined;
};

export type MainTabParamList = {
    Home: undefined;
    Goals: undefined;
    Progress: undefined;
    HallOfFame: undefined;
    Profile: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();
const GoalsStack = createNativeStackNavigator<GoalsStackParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();

// Goals Stack Navigator
function GoalsStackNavigator() {
    return (
        <GoalsStack.Navigator screenOptions={{ headerShown: false }}>
            <GoalsStack.Screen name="GoalsMain" component={GoalsScreen} />
            <GoalsStack.Screen name="YearDetail" component={YearDetailScreen} />
            <GoalsStack.Screen name="MonthDetail" component={MonthDetailScreen} />
            <GoalsStack.Screen name="WeekDetail" component={WeekDetailScreen} />
        </GoalsStack.Navigator>
    );
}

// Home Stack Navigator
function HomeStackNavigator() {
    return (
        <HomeStack.Navigator screenOptions={{ headerShown: false }}>
            <HomeStack.Screen name="HomeMain" component={HomeScreen} />
            <HomeStack.Screen name="UserProfile" component={UserProfileScreen} />
        </HomeStack.Navigator>
    );
}

// Profile/Mindset Stack Navigator
function ProfileStackNavigator() {
    return (
        <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
            <ProfileStack.Screen name="ProfileMain" component={ProfileScreen} />
            <ProfileStack.Screen name="UserProfile" component={UserProfileScreen} />
        </ProfileStack.Navigator>
    );
}

export function MainNavigator() {
    const { colors } = useTheme();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: '#33CFFF',
                tabBarInactiveTintColor: '#6B7280',
                tabBarStyle: {
                    backgroundColor: '#0D0D0D',
                    borderTopColor: '#2A2A2A',
                    borderTopWidth: 1,
                    height: 80,
                    paddingBottom: 20,
                    paddingTop: 10,
                },
                tabBarLabelStyle: {
                    fontSize: 10,
                    fontWeight: '500',
                },
                tabBarShowLabel: false,
                tabBarIcon: ({ focused, color, size }) => {
                    const iconColor = focused ? '#33CFFF' : '#F9FAFB';
                    const iconSize = 24;

                    switch (route.name) {
                        case 'Home':
                            return <NavHomeIcon color={iconColor} size={iconSize} />;
                        case 'Goals':
                            return <NavDashboardIcon color={iconColor} size={iconSize} />;
                        case 'Progress':
                            return <NavCalendarIcon color={iconColor} size={iconSize} />;
                        case 'HallOfFame':
                            return <NavTrophyIcon color={iconColor} size={iconSize} />;
                        case 'Profile':
                            return <NavLightningIcon color={iconColor} size={iconSize} />;
                        default:
                            return <NavHomeIcon color={iconColor} size={iconSize} />;
                    }
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeStackNavigator} options={{ title: '' }} />
            <Tab.Screen name="Goals" component={GoalsStackNavigator} options={{ title: '' }} />
            <Tab.Screen name="Progress" component={ProgressScreen} options={{ title: '' }} />
            <Tab.Screen name="HallOfFame" component={HallOfFameScreen} options={{ title: '' }} />
            <Tab.Screen name="Profile" component={ProfileStackNavigator} options={{ title: '' }} />
        </Tab.Navigator>
    );
}

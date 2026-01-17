import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

interface NavIconProps {
    color?: string;
    size?: number;
}

// Home icon for nav bar
export const NavHomeIcon: React.FC<NavIconProps> = ({ color = '#F9FAFB', size = 24 }) => (
    <Svg width={size} height={size * 1.05} viewBox="0 0 20 21" fill="none">
        <Path
            d="M0.750122 10.2396V12.75C0.750122 16.0498 0.750122 17.6997 1.77525 18.7249C2.80037 19.75 4.45029 19.75 7.75012 19.75H11.7501C15.0499 19.75 16.6998 19.75 17.725 18.7249C18.7501 17.6997 18.7501 16.0498 18.7501 12.75V10.2396C18.7501 8.5583 18.7501 7.71773 18.3942 6.99005C18.0383 6.26237 17.3748 5.74628 16.0477 4.71411L14.0477 3.15855C11.9832 1.55285 10.951 0.75 9.75012 0.75C8.54922 0.75 7.51701 1.55285 5.45254 3.15855L3.45253 4.71411C2.12545 5.74628 1.46191 6.26237 1.10602 6.99005C0.750122 7.71773 0.750122 8.5583 0.750122 10.2396Z"
            stroke={color}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

// Dashboard icon (4 circles) for nav bar - Goals/Planning page
export const NavDashboardIcon: React.FC<NavIconProps> = ({ color = '#F9FAFB', size = 24 }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Circle
            cx="17.25"
            cy="6.75"
            r="3.75"
            stroke={color}
            strokeWidth={1.5}
            strokeLinejoin="round"
        />
        <Circle
            cx="6.75"
            cy="6.75"
            r="3.75"
            stroke={color}
            strokeWidth={1.5}
            strokeLinejoin="round"
        />
        <Circle
            cx="17.25"
            cy="17.25"
            r="3.75"
            stroke={color}
            strokeWidth={1.5}
            strokeLinejoin="round"
        />
        <Circle
            cx="6.75"
            cy="17.25"
            r="3.75"
            stroke={color}
            strokeWidth={1.5}
            strokeLinejoin="round"
        />
    </Svg>
);

// Calendar icon for nav bar - Progress page
export const NavCalendarIcon: React.FC<NavIconProps> = ({ color = '#F9FAFB', size = 24 }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M8 18L10 16C10.2726 15.7274 10.4089 15.5911 10.556 15.5182C10.8358 15.3796 11.1642 15.3796 11.444 15.5182C11.5911 15.5911 11.7274 15.7274 12 16C12.2726 16.2726 12.4089 16.4089 12.556 16.4818C12.8358 16.6204 13.1642 16.6204 13.444 16.4818C13.5911 16.4089 13.7274 16.2726 14 16L16 14"
            stroke={color}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M3 10H21"
            stroke={color}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M16 2V6M8 2V6"
            stroke={color}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M13 4H11C7.22876 4 5.34315 4 4.17157 5.17157C3 6.34315 3 8.22876 3 12V14C3 17.7712 3 19.6569 4.17157 20.8284C5.34315 22 7.22876 22 11 22H13C16.7712 22 18.6569 22 19.8284 20.8284C21 19.6569 21 17.7712 21 14V12C21 8.22876 21 6.34315 19.8284 5.17157C18.6569 4 16.7712 4 13 4Z"
            stroke={color}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

// Trophy icon for nav bar - Hall of Fame page
export const NavTrophyIcon: React.FC<NavIconProps> = ({ color = '#F9FAFB', size = 24 }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M12 17C10.3264 17 8.86971 18.265 8.11766 20.1312C7.75846 21.0225 8.27389 22 8.95877 22H15.0412C15.7261 22 16.2415 21.0225 15.8823 20.1312C15.1303 18.265 13.6736 17 12 17Z"
            stroke={color}
            strokeWidth={1.5}
            strokeLinecap="round"
        />
        <Path
            d="M18.5 5H19.7022C20.9031 5 21.5035 5 21.8168 5.37736C22.13 5.75472 21.9998 6.32113 21.7393 7.45395L21.3485 9.15307C20.7609 11.7086 18.6109 13.6088 16 14"
            stroke={color}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M5.5 5H4.29779C3.09692 5 2.49649 5 2.18324 5.37736C1.86999 5.75472 2.00024 6.32113 2.26075 7.45395L2.65148 9.15307C3.23914 11.7086 5.38912 13.6088 8 14"
            stroke={color}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M12 17C15.0208 17 17.565 12.3379 18.3297 5.99089C18.5412 4.23558 18.647 3.35793 18.0868 2.67896C17.5267 2 16.6223 2 14.8134 2H9.18658C7.37775 2 6.47333 2 5.91317 2.67896C5.35301 3.35793 5.45875 4.23558 5.67025 5.99089C6.435 12.3379 8.97923 17 12 17Z"
            stroke={color}
            strokeWidth={1.5}
            strokeLinecap="round"
        />
    </Svg>
);

// Lightning icon for nav bar - Profile/Actions page
export const NavLightningIcon: React.FC<NavIconProps> = ({ color = '#F9FAFB', size = 24 }) => (
    <Svg width={size * 0.73} height={size} viewBox="0 0 16 22" fill="none">
        <Path
            d="M0.975516 10.0792L7.97376 1.09627C8.52106 0.393726 9.54696 0.830996 9.54696 1.76683V8.7197C9.54696 9.28026 9.94926 9.73476 10.4456 9.73476H13.8494C14.6227 9.73476 15.0349 10.7647 14.524 11.4204L7.52576 20.4033C6.97846 21.1058 5.95256 20.6686 5.95256 19.7327V12.7799C5.95256 12.2193 5.55024 11.7648 5.05396 11.7648H1.65011C0.876866 11.7648 0.464696 10.7349 0.975516 10.0792Z"
            stroke={color}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

// Chevron back icon
export const ChevronBackIcon: React.FC<NavIconProps> = ({ color = '#F9FAFB', size = 24 }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M15 18L9 12L15 6"
            stroke={color}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

// Bell notification icon
export const BellIcon: React.FC<NavIconProps> = ({ color = '#33CFFF', size = 24 }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"
            fill={color}
        />
        <Path
            d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21"
            stroke={color}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

// Edit/Pencil icon
export const EditIcon: React.FC<NavIconProps> = ({ color = '#F9FAFB', size = 24 }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13"
            stroke={color}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z"
            stroke={color}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

// Dollar/Money bag icon
export const MoneyBagIcon: React.FC<NavIconProps> = ({ color = '#33CFFF', size = 24 }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M12 2C12 2 14.5 5 14.5 7C14.5 7 16 7 17 8C18 9 19 11 19 13C19 15 18 17 16 19C14 21 12 22 12 22C12 22 10 21 8 19C6 17 5 15 5 13C5 11 6 9 7 8C8 7 9.5 7 9.5 7C9.5 5 12 2 12 2Z"
            fill={color}
        />
        <Path
            d="M12 10V16M9.5 13H14.5"
            stroke="#0D0D0D"
            strokeWidth={2}
            strokeLinecap="round"
        />
    </Svg>
);

// Celebration icon
export const CelebrationIcon: React.FC<NavIconProps> = ({ color = '#F59E0B', size = 24 }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M4 21L6.5 12L12 17.5L4 21Z"
            fill={color}
        />
        <Path
            d="M9.5 11L11 7L15 9.5L9.5 11Z"
            fill={color}
        />
        <Path
            d="M18 3L17 6L14 7L17 8L18 11L19 8L22 7L19 6L18 3Z"
            fill={color}
        />
        <Path
            d="M12 3L11.5 4.5L10 5L11.5 5.5L12 7L12.5 5.5L14 5L12.5 4.5L12 3Z"
            fill={color}
        />
    </Svg>
);

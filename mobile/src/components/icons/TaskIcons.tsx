import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface IconProps {
    size?: number;
    color?: string;
}

// Icon for "Revisar Social Ads" task
export const ReviewSocialAdsIcon: React.FC<IconProps> = ({ size = 24, color = '#9CA3AF' }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M20.6775 17.0765L14.761 4.38802C14.4247 3.66689 13.8157 3.1089 13.068 2.83678C12.3203 2.56467 11.4951 2.60072 10.774 2.93702C10.0529 3.27331 9.49488 3.8823 9.22277 4.63C8.95065 5.37771 8.98671 6.20289 9.323 6.92402L15.24 19.612C15.5762 20.3331 16.1852 20.8912 16.9328 21.1633C17.6805 21.4355 18.5056 21.3995 19.2268 21.0633C19.9479 20.727 20.5059 20.1181 20.7781 19.3705C21.0502 18.6228 21.0137 17.7976 20.6775 17.0765Z"
            fill={color}
            stroke={color}
            strokeWidth={2}
        />
        <Path
            d="M11.719 13.268L8.76 19.612C8.5935 19.9691 8.35829 20.2899 8.06781 20.556C7.77733 20.8222 7.43726 21.0285 7.06703 21.1633C6.6968 21.298 6.30365 21.3585 5.91004 21.3413C5.51643 21.3241 5.13006 21.2295 4.773 21.063C4.05198 20.7267 3.49406 20.1178 3.22195 19.3702C2.94984 18.6226 2.98583 17.7976 3.322 17.0765L9.187 4.5"
            stroke={color}
            strokeWidth={2}
            strokeLinecap="round"
        />
        <Path
            d="M4.77364 21.0629C6.27526 21.7631 8.0602 21.1134 8.76042 19.6118C9.46063 18.1102 8.81097 16.3252 7.30935 15.625C5.80773 14.9248 4.02279 15.5745 3.32257 17.0761C2.62235 18.5777 3.27202 20.3627 4.77364 21.0629Z"
            fill={color}
            stroke={color}
            strokeWidth={2}
        />
    </Svg>
);

// Icon for "Follow-up 5 Leads" task
export const FollowUp5LeadsIcon: React.FC<IconProps> = ({ size = 24, color = '#9CA3AF' }) => (
    <Svg width={size} height={size} viewBox="0 0 23 14" fill="none">
        <Path
            d="M18.75 12.75V13.5H21C21.3978 13.5 21.7794 13.342 22.0607 13.0607C22.342 12.7794 22.5 12.3978 22.5 12V9.75H21.75C20.9546 9.75087 20.1921 10.0672 19.6296 10.6296C19.0672 11.1921 18.7509 11.9546 18.75 12.75ZM21.75 3.75H22.5V1.5C22.5 1.10218 22.342 0.720644 22.0607 0.43934C21.7794 0.158035 21.3978 0 21 0H18.75V0.75C18.7509 1.54538 19.0672 2.30794 19.6296 2.87036C20.1921 3.43278 20.9546 3.74913 21.75 3.75ZM3.75 0.75V0H1.5C1.10218 0 0.720644 0.158035 0.43934 0.43934C0.158035 0.720644 0 1.10218 0 1.5V3.75H0.75C1.54538 3.74913 2.30794 3.43278 2.87036 2.87036C3.43278 2.30794 3.74913 1.54538 3.75 0.75Z"
            fill={color}
        />
    </Svg>
);

// Icon for "Sprint Planning" task
export const SprintPlanningIcon: React.FC<IconProps> = ({ size = 22, color = '#9CA3AF' }) => (
    <Svg width={size * 0.73} height={size} viewBox="0 0 16 22" fill="none">
        <Path
            d="M14.6667 0H1.33333C0.979711 0 0.640573 0.140476 0.390524 0.390524C0.140476 0.640573 0 0.979711 0 1.33333V20C0 20.3536 0.140476 20.6928 0.390524 20.9428C0.640573 21.1929 0.979711 21.3333 1.33333 21.3333H14.6667C15.0203 21.3333 15.3594 21.1929 15.6095 20.9428C15.8595 20.6928 16 20.3536 16 20V1.33333C16 0.979711 15.8595 0.640573 15.6095 0.390524C15.3594 0.140476 15.0203 0 14.6667 0ZM4.66667 16H3.33333V14.6667H4.66667V16ZM4.66667 13.3333H3.33333V12H4.66667V13.3333ZM4.66667 10.6667H3.33333V9.33333H4.66667V10.6667ZM4.66667 8H3.33333V6.66667H4.66667V8ZM4.66667 5.33333H3.33333V4H4.66667V5.33333ZM12.6667 16H6V14.6667H12.6667V16ZM12.6667 13.3333H6V12H12.6667V13.3333ZM12.6667 10.6667H6V9.33333H12.6667V10.6667ZM12.6667 8H6V6.66667H12.6667V8ZM12.6667 5.33333H6V4H12.6667V5.33333Z"
            fill={color}
        />
    </Svg>
);

// Timer icon
export const TimerIcon: React.FC<IconProps> = ({ size = 24, color = '#33CFFF' }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
            stroke={color}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M12 6V12L16 14"
            stroke={color}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

// Fire/Streak icon
export const FireIcon: React.FC<IconProps> = ({ size = 24, color = '#FF6B35' }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M12 23C16.1421 23 19.5 19.6421 19.5 15.5C19.5 13.7636 18.9091 12.1636 17.9091 10.8636C17.4545 10.2727 17.0909 9.59091 16.9091 8.81818C16.7273 8.04545 16.7273 7.18182 16.9091 6.31818C17.0909 5.45455 17.4545 4.68182 17.9091 4C16.3636 4.72727 15 5.81818 13.9091 7.18182C12.8182 8.54545 12 10.1818 11.5455 12C11.0909 10.1818 10.0909 8.63636 8.72727 7.45455C8.72727 9.31818 8.27273 10.9091 7.36364 12.2273C6.45455 13.5455 5 14.5909 4.5 15.5C4.5 19.6421 7.85786 23 12 23Z"
            fill={color}
        />
    </Svg>
);

// Three dots menu icon
export const ThreeDotsIcon: React.FC<IconProps> = ({ size = 24, color = '#9CA3AF' }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
            fill={color}
            stroke={color}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z"
            fill={color}
            stroke={color}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z"
            fill={color}
            stroke={color}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

// Lightbulb/Idea icon for AI Insight
export const IdeaIcon: React.FC<IconProps> = ({ size = 24, color = '#33CFFF' }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M9 21H15M12 3C8.68629 3 6 5.68629 6 9C6 11.2208 7.2066 13.1599 9 14.1973V17C9 17.5523 9.44772 18 10 18H14C14.5523 18 15 17.5523 15 17V14.1973C16.7934 13.1599 18 11.2208 18 9C18 5.68629 15.3137 3 12 3Z"
            stroke={color}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

// Chevron right icon
export const ChevronRightIcon: React.FC<IconProps> = ({ size = 24, color = '#9CA3AF' }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M9 18L15 12L9 6"
            stroke={color}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

// Checkmark icon
export const CheckmarkIcon: React.FC<IconProps> = ({ size = 24, color = '#33CFFF' }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M20 6L9 17L4 12"
            stroke={color}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

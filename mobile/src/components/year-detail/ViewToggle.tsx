import React from 'react';
import { Box, HStack, Pressable } from 'native-base';
import Svg, { Path, Rect } from 'react-native-svg';

interface ViewToggleProps {
    activeView: 'grid' | 'list';
    onViewChange: (view: 'grid' | 'list') => void;
}

// Grid view icon
const GridViewIcon = ({ color = '#6B7280' }: { color?: string }) => (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
        <Rect x={3} y={3} width={8} height={8} rx={2} fill={color} />
        <Rect x={13} y={3} width={8} height={8} rx={2} fill={color} />
        <Rect x={3} y={13} width={8} height={8} rx={2} fill={color} />
        <Rect x={13} y={13} width={8} height={8} rx={2} fill={color} />
    </Svg>
);

// List view icon
const ListViewIcon = ({ color = '#6B7280' }: { color?: string }) => (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
        <Rect x={3} y={4} width={18} height={4} rx={1} fill={color} />
        <Rect x={3} y={10} width={18} height={4} rx={1} fill={color} />
        <Rect x={3} y={16} width={18} height={4} rx={1} fill={color} />
    </Svg>
);

export const ViewToggle: React.FC<ViewToggleProps> = ({
    activeView,
    onViewChange,
}) => {
    return (
        <HStack space={2}>
            <Pressable
                onPress={() => onViewChange('grid')}
                p={2}
                borderRadius="md"
                bg={activeView === 'grid' ? 'surface.secondary' : 'transparent'}
            >
                <GridViewIcon color={activeView === 'grid' ? '#FFFFFF' : '#6B7280'} />
            </Pressable>
            <Pressable
                onPress={() => onViewChange('list')}
                p={2}
                borderRadius="md"
                bg={activeView === 'list' ? 'surface.secondary' : 'transparent'}
            >
                <ListViewIcon color={activeView === 'list' ? '#FFFFFF' : '#6B7280'} />
            </Pressable>
        </HStack>
    );
};

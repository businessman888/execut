import React, { useState } from 'react';
import { Box, HStack, VStack, Text, Pressable } from '../ui';
import { Image as RNImage, View, Alert, ActionSheetIOS, Platform } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import * as ImagePicker from 'expo-image-picker';

interface ProfileCardProps {
    avatar?: string;
    name: string;
    role: string;
    level: number;
    isTopPercent?: boolean;
    topPercent?: number;
    onAvatarChange?: (uri: string) => void;
}

// Edit badge icon (pencil in circle)
const EditBadge = ({ size = 24 }: { size?: number }) => (
    <View style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: '#33CFFF',
        alignItems: 'center',
        justifyContent: 'center',
    }}>
        <Svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24" fill="none">
            <Path
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                stroke="#0D0D0D"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    </View>
);

// User icon placeholder when no avatar
const UserIcon = ({ size = 40 }: { size?: number }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
            fill="#6B7280"
        />
    </Svg>
);

export const ProfileCard: React.FC<ProfileCardProps> = ({
    avatar,
    name,
    role,
    level,
    isTopPercent = false,
    topPercent = 1,
    onAvatarChange,
}) => {
    const avatarSize = 70;
    const [localAvatar, setLocalAvatar] = useState<string | undefined>(avatar);

    const requestPermissions = async () => {
        const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
        const { status: libraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (cameraStatus !== 'granted' || libraryStatus !== 'granted') {
            Alert.alert(
                'Permissões necessárias',
                'Precisamos de acesso à câmera e galeria para você adicionar uma foto de perfil.',
                [{ text: 'OK' }]
            );
            return false;
        }
        return true;
    };

    const pickFromGallery = async () => {
        const hasPermission = await requestPermissions();
        if (!hasPermission) return;

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });

        if (!result.canceled && result.assets[0]) {
            const uri = result.assets[0].uri;
            setLocalAvatar(uri);
            onAvatarChange?.(uri);
        }
    };

    const takePhoto = async () => {
        const hasPermission = await requestPermissions();
        if (!hasPermission) return;

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });

        if (!result.canceled && result.assets[0]) {
            const uri = result.assets[0].uri;
            setLocalAvatar(uri);
            onAvatarChange?.(uri);
        }
    };

    const handleAvatarPress = () => {
        if (Platform.OS === 'ios') {
            ActionSheetIOS.showActionSheetWithOptions(
                {
                    options: ['Cancelar', 'Tirar foto', 'Escolher da galeria'],
                    cancelButtonIndex: 0,
                },
                (buttonIndex) => {
                    if (buttonIndex === 1) {
                        takePhoto();
                    } else if (buttonIndex === 2) {
                        pickFromGallery();
                    }
                }
            );
        } else {
            Alert.alert(
                'Foto de perfil',
                'Escolha uma opção',
                [
                    { text: 'Cancelar', style: 'cancel' },
                    { text: 'Tirar foto', onPress: takePhoto },
                    { text: 'Escolher da galeria', onPress: pickFromGallery },
                ]
            );
        }
    };

    const displayAvatar = localAvatar || avatar;

    return (
        <HStack space={4} alignItems="center">
            {/* Avatar with edit badge */}
            <Pressable onPress={handleAvatarPress} _pressed={{ opacity: 0.8 }}>
                <Box position="relative">
                    <Box
                        w={avatarSize}
                        h={avatarSize}
                        borderRadius={avatarSize / 2}
                        borderWidth={2}
                        borderColor="#33CFFF"
                        overflow="hidden"
                        bg="#1A1A1A"
                        alignItems="center"
                        justifyContent="center"
                    >
                        {displayAvatar ? (
                            <RNImage
                                source={{ uri: displayAvatar }}
                                style={{
                                    width: avatarSize - 4,
                                    height: avatarSize - 4,
                                    borderRadius: (avatarSize - 4) / 2,
                                }}
                                resizeMode="cover"
                            />
                        ) : (
                            <UserIcon size={40} />
                        )}
                    </Box>
                    {/* Edit badge positioned at bottom-right */}
                    <Box position="absolute" bottom={-2} right={-2}>
                        <EditBadge size={24} />
                    </Box>
                </Box>
            </Pressable>

            {/* Info */}
            <VStack>
                <Text color="#FFFFFF" fontSize={20} fontWeight="bold">
                    {name}
                </Text>
                <Text color="#9CA3AF" fontSize={14} mb={2}>
                    {role}
                </Text>
                <HStack space={2}>
                    <Box
                        bg="#33CFFF"
                        borderRadius={20}
                        px={3}
                        py={1}
                    >
                        <Text color="#0D0D0D" fontSize={12} fontWeight="bold">
                            LVL {level}
                        </Text>
                    </Box>
                    {isTopPercent && (
                        <Box
                            bg="#33CFFF"
                            borderRadius={20}
                            px={3}
                            py={1}
                        >
                            <Text color="#0D0D0D" fontSize={12} fontWeight="bold">
                                TOP {topPercent}%
                            </Text>
                        </Box>
                    )}
                </HStack>
            </VStack>
        </HStack>
    );
};

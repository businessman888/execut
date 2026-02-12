import React, { useState } from 'react';
import {
    Modal,
    View,
    TextInput,
    TouchableOpacity,
    Image as RNImage,
    Alert,
    ActionSheetIOS,
    Platform,
    KeyboardAvoidingView,
    ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Box, HStack, VStack, Text, Pressable } from '../ui';
import Svg, { Path } from 'react-native-svg';
import * as ImagePicker from 'expo-image-picker';
import { useAuthStore } from '../../store/authStore';

interface EditProfileModalProps {
    visible: boolean;
    onClose: () => void;
}

// Camera icon for avatar overlay
const CameraIcon = ({ size = 20 }: { size?: number }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M23 19C23 19.5304 22.7893 20.0391 22.4142 20.4142C22.0391 20.7893 21.5304 21 21 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V8C1 7.46957 1.21071 6.96086 1.58579 6.58579C1.96086 6.21071 2.46957 6 3 6H7L9 3H15L17 6H21C21.5304 6 22.0391 6.21071 22.4142 6.58579C22.7893 6.96086 23 7.46957 23 8V19Z"
            stroke="#0D0D0D"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M12 17C14.2091 17 16 15.2091 16 13C16 10.7909 14.2091 9 12 9C9.79086 9 8 10.7909 8 13C8 15.2091 9.79086 17 12 17Z"
            stroke="#0D0D0D"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

// User placeholder icon
const UserIcon = ({ size = 40 }: { size?: number }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
            fill="#6B7280"
        />
    </Svg>
);

// Close icon
const CloseIcon = ({ size = 24, color = '#F9FAFB' }: { size?: number; color?: string }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M18 6L6 18M6 6l12 12"
            stroke={color}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

export const EditProfileModal: React.FC<EditProfileModalProps> = ({ visible, onClose }) => {
    const { profile } = useAuthStore();

    const [name, setName] = useState(profile?.fullName || '');
    const [age, setAge] = useState(profile?.age?.toString() || '');
    const [bio, setBio] = useState(profile?.bio || '');
    const [avatar, setAvatar] = useState<string | undefined>(profile?.avatarUrl);

    // Sync state when modal opens
    React.useEffect(() => {
        if (visible) {
            setName(profile?.fullName || '');
            setAge(profile?.age?.toString() || '');
            setBio(profile?.bio || '');
            setAvatar(profile?.avatarUrl);
        }
    }, [visible]);

    const requestPermissions = async () => {
        const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
        const { status: libraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (cameraStatus !== 'granted' || libraryStatus !== 'granted') {
            Alert.alert('Permissões necessárias', 'Precisamos de acesso à câmera e galeria.');
            return false;
        }
        return true;
    };

    const pickFromGallery = async () => {
        const ok = await requestPermissions();
        if (!ok) return;
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });
        if (!result.canceled && result.assets[0]) setAvatar(result.assets[0].uri);
    };

    const takePhoto = async () => {
        const ok = await requestPermissions();
        if (!ok) return;
        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });
        if (!result.canceled && result.assets[0]) setAvatar(result.assets[0].uri);
    };

    const handleAvatarPress = () => {
        if (Platform.OS === 'ios') {
            ActionSheetIOS.showActionSheetWithOptions(
                { options: ['Cancelar', 'Tirar foto', 'Escolher da galeria'], cancelButtonIndex: 0 },
                (i) => { if (i === 1) takePhoto(); else if (i === 2) pickFromGallery(); }
            );
        } else {
            Alert.alert('Foto de perfil', 'Escolha uma opção', [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Tirar foto', onPress: takePhoto },
                { text: 'Escolher da galeria', onPress: pickFromGallery },
            ]);
        }
    };

    const handleSave = () => {
        const currentProfile = useAuthStore.getState().profile;
        useAuthStore.getState().setProfile({
            ...currentProfile,
            id: currentProfile?.id || '',
            fullName: name || currentProfile?.fullName || '',
            currentLevel: currentProfile?.currentLevel ?? 0,
            totalXp: currentProfile?.totalXp ?? 0,
            streak: currentProfile?.streak ?? 0,
            isPublic: currentProfile?.isPublic ?? false,
            avatarUrl: avatar,
            bio,
            age: age ? parseInt(age, 10) : undefined,
        });

        // Also update user fullName
        const currentUser = useAuthStore.getState().user;
        if (currentUser) {
            useAuthStore.getState().setUser({ ...currentUser, fullName: name });
        }

        onClose();
    };

    const avatarSize = 90;

    return (
        <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
            <SafeAreaView style={{ flex: 1, backgroundColor: '#0D0D0D' }}>
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                >
                    {/* Header */}
                    <HStack
                        alignItems="center"
                        justifyContent="space-between"
                        px={4}
                        py={3}
                    >
                        <Pressable onPress={onClose} p={2} _pressed={{ opacity: 0.7 }}>
                            <CloseIcon size={24} color="#F9FAFB" />
                        </Pressable>
                        <Text color="#FFFFFF" fontSize="lg" fontWeight="600">
                            Informações Pessoais
                        </Text>
                        <Box w={40} />
                    </HStack>

                    <ScrollView
                        style={{ flex: 1 }}
                        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40 }}
                        showsVerticalScrollIndicator={false}
                    >
                        {/* Avatar */}
                        <View style={{ alignItems: 'center', marginTop: 20, marginBottom: 32 }}>
                            <Pressable onPress={handleAvatarPress} _pressed={{ opacity: 0.8 }}>
                                <View style={{ position: 'relative' }}>
                                    <View
                                        style={{
                                            width: avatarSize,
                                            height: avatarSize,
                                            borderRadius: avatarSize / 2,
                                            borderWidth: 2,
                                            borderColor: '#33CFFF',
                                            overflow: 'hidden',
                                            backgroundColor: '#1A1A1A',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {avatar ? (
                                            <RNImage
                                                source={{ uri: avatar }}
                                                style={{
                                                    width: avatarSize - 4,
                                                    height: avatarSize - 4,
                                                    borderRadius: (avatarSize - 4) / 2,
                                                }}
                                                resizeMode="cover"
                                            />
                                        ) : (
                                            <UserIcon size={48} />
                                        )}
                                    </View>
                                    <View
                                        style={{
                                            position: 'absolute',
                                            bottom: 0,
                                            right: 0,
                                            width: 30,
                                            height: 30,
                                            borderRadius: 15,
                                            backgroundColor: '#33CFFF',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <CameraIcon size={16} />
                                    </View>
                                </View>
                            </Pressable>
                            <Text color="#33CFFF" fontSize="sm" mt={2}>
                                Alterar foto
                            </Text>
                        </View>

                        {/* Name field */}
                        <View style={{ marginBottom: 20 }}>
                            <Text color="#9CA3AF" fontSize="sm" mb={1} style={{ marginBottom: 8 }}>
                                Nome
                            </Text>
                            <TextInput
                                value={name}
                                onChangeText={setName}
                                placeholder="Seu nome"
                                placeholderTextColor="#6B7280"
                                style={{
                                    backgroundColor: '#1A1A1A',
                                    borderRadius: 12,
                                    borderWidth: 1,
                                    borderColor: '#2A2A2A',
                                    color: '#FFFFFF',
                                    fontSize: 16,
                                    paddingHorizontal: 16,
                                    paddingVertical: 14,
                                }}
                            />
                        </View>

                        {/* Age field */}
                        <View style={{ marginBottom: 20 }}>
                            <Text color="#9CA3AF" fontSize="sm" mb={1} style={{ marginBottom: 8 }}>
                                Idade
                            </Text>
                            <TextInput
                                value={age}
                                onChangeText={setAge}
                                placeholder="Sua idade"
                                placeholderTextColor="#6B7280"
                                keyboardType="numeric"
                                maxLength={3}
                                style={{
                                    backgroundColor: '#1A1A1A',
                                    borderRadius: 12,
                                    borderWidth: 1,
                                    borderColor: '#2A2A2A',
                                    color: '#FFFFFF',
                                    fontSize: 16,
                                    paddingHorizontal: 16,
                                    paddingVertical: 14,
                                }}
                            />
                        </View>

                        {/* Bio field */}
                        <View style={{ marginBottom: 32 }}>
                            <Text color="#9CA3AF" fontSize="sm" mb={1} style={{ marginBottom: 8 }}>
                                Biografia
                            </Text>
                            <TextInput
                                value={bio}
                                onChangeText={setBio}
                                placeholder="Conte um pouco sobre você..."
                                placeholderTextColor="#6B7280"
                                multiline
                                numberOfLines={4}
                                maxLength={200}
                                style={{
                                    backgroundColor: '#1A1A1A',
                                    borderRadius: 12,
                                    borderWidth: 1,
                                    borderColor: '#2A2A2A',
                                    color: '#FFFFFF',
                                    fontSize: 16,
                                    paddingHorizontal: 16,
                                    paddingVertical: 14,
                                    minHeight: 100,
                                    textAlignVertical: 'top',
                                }}
                            />
                            <Text
                                color="#6B7280"
                                fontSize="xs"
                                style={{ textAlign: 'right', marginTop: 4 }}
                            >
                                {bio.length}/200
                            </Text>
                        </View>

                        {/* Save button */}
                        <TouchableOpacity
                            onPress={handleSave}
                            activeOpacity={0.85}
                            style={{
                                backgroundColor: '#33CFFF',
                                borderRadius: 40,
                                paddingVertical: 16,
                                alignItems: 'center',
                            }}
                        >
                            <Text
                                color="#0D0D0D"
                                fontSize="lg"
                                fontWeight="bold"
                                style={{ color: '#0D0D0D' }}
                            >
                                Salvar
                            </Text>
                        </TouchableOpacity>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </Modal>
    );
};

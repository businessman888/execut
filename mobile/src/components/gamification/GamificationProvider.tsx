import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { useGamificationStore, PendingReward } from '../../store/gamificationStore';
import { LevelUpModal } from './LevelUpModal';
import { AchievementToast } from './AchievementToast';
import { useAuthStore } from '../../store/authStore';

/**
 * GamificationProvider: wraps the app and listens for pending rewards
 * from the gamification store, rendering level-up modals and achievement toasts.
 */
export const GamificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useAuthStore();
    const { pendingRewards, consumeReward, fetchAchievements, fetchUserStats, fetchUserAchievements } =
        useGamificationStore();

    const [currentReward, setCurrentReward] = useState<PendingReward | null>(null);
    const [showLevelUp, setShowLevelUp] = useState(false);
    const [showAchievement, setShowAchievement] = useState(false);

    // Initialize gamification data on mount
    useEffect(() => {
        if (user?.id) {
            fetchAchievements();
            fetchUserStats(user.id);
            fetchUserAchievements(user.id);
        }
    }, [user?.id]);

    // Watch for new pending rewards
    useEffect(() => {
        if (pendingRewards.length > 0 && !currentReward) {
            const reward = consumeReward();
            if (reward) {
                setCurrentReward(reward);
                if (reward.type === 'level_up') {
                    setShowLevelUp(true);
                } else if (reward.type === 'achievement') {
                    setShowAchievement(true);
                }
            }
        }
    }, [pendingRewards.length, currentReward]);

    const handleDismissLevelUp = useCallback(() => {
        setShowLevelUp(false);
        setCurrentReward(null);
    }, []);

    const handleDismissAchievement = useCallback(() => {
        setShowAchievement(false);
        setCurrentReward(null);
    }, []);

    return (
        <View style={styles.container}>
            {children}

            {/* Level Up Modal */}
            <LevelUpModal
                visible={showLevelUp}
                newLevel={currentReward?.data?.newLevel ?? 0}
                onDismiss={handleDismissLevelUp}
            />

            {/* Achievement Toast */}
            <AchievementToast
                visible={showAchievement}
                title={currentReward?.data?.achievementTitle ?? ''}
                iconSlug={currentReward?.data?.achievementIcon ?? 'star'}
                onDismiss={handleDismissAchievement}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

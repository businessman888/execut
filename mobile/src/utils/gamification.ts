// ============================================
// XP & LEVEL CALCULATION UTILITIES
// ============================================

/**
 * XP required to advance FROM level n TO level n+1.
 *
 * Progressão aritmética:
 *   n = 1..9   → 800 + (n-1) × 100
 *   n = 10..19 → R9 + (n-9) × 250
 *   n ≥ 20     → R19 + (n-19) × 350
 */
export function xpRequiredForLevel(n: number): number {
    if (n < 1) return 0;

    if (n < 10) {
        // Level 1→2: 800, Level 2→3: 900, ..., Level 9→10: 1600
        return 800 + (n - 1) * 100;
    }

    // R9 = 800 + 8*100 = 1600
    const R9 = 1600;

    if (n < 20) {
        // Level 10→11: 1600+250=1850, Level 11→12: 1600+500=2100, ...
        return R9 + (n - 9) * 250;
    }

    // R19 = 1600 + 10*250 = 4100
    const R19 = R9 + 10 * 250;

    // Level 20→21: 4100+350=4450, ...
    return R19 + (n - 19) * 350;
}

/**
 * Total XP needed from level 1 to reach level n.
 * Sum of xpRequiredForLevel(1) + ... + xpRequiredForLevel(n-1).
 */
export function totalXpForLevel(level: number): number {
    let total = 0;
    for (let i = 1; i < level; i++) {
        total += xpRequiredForLevel(i);
    }
    return total;
}

export interface LevelUpResult {
    newXP: number;
    newLevel: number;
    levelsGained: number;
    xpForCurrentLevel: number;     // XP accumulated in current level
    xpRequiredCurrent: number;     // XP required to reach next level
}

/**
 * Calculate the result of gaining XP.
 * Handles multi-level jumps (e.g. achievement + XP overflows multiple levels).
 *
 * @param currentXP     - Total accumulated XP before this gain
 * @param currentLevel  - Current level before this gain
 * @param xpGain        - Amount of XP being awarded
 */
export function calculateLevelUp(
    currentXP: number,
    currentLevel: number,
    xpGain: number
): LevelUpResult {
    let newXP = currentXP + xpGain;
    let newLevel = currentLevel;

    // Keep leveling up while we have enough XP
    let xpNeeded = xpRequiredForLevel(newLevel);
    let xpInLevel = newXP - totalXpForLevel(newLevel);

    while (xpInLevel >= xpNeeded && xpNeeded > 0) {
        newLevel++;
        xpNeeded = xpRequiredForLevel(newLevel);
        xpInLevel = newXP - totalXpForLevel(newLevel);
    }

    return {
        newXP,
        newLevel,
        levelsGained: newLevel - currentLevel,
        xpForCurrentLevel: Math.max(0, xpInLevel),
        xpRequiredCurrent: xpNeeded,
    };
}

// Constants
export const XP_PER_TASK = 100;
export const XP_PER_ACHIEVEMENT = 500;

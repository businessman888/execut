import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../services/supabase/client';

interface User {
    id: string;
    email: string;
    fullName?: string;
}

interface Profile {
    id: string;
    fullName: string;
    username?: string;
    avatarUrl?: string;
    currentLevel: number;
    totalXp: number;
    isPublic: boolean;
}

interface AuthState {
    user: User | null;
    profile: Profile | null;
    session: any | null;
    isAuthenticated: boolean;
    isAnonymous: boolean;
    isLoading: boolean;

    // Actions
    setUser: (user: User | null) => void;
    setProfile: (profile: Profile | null) => void;
    setSession: (session: any | null) => void;
    setLoading: (loading: boolean) => void;
    signInAnonymously: () => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    signUp: (email: string, password: string, fullName: string) => Promise<void>;
    logout: () => Promise<void>;
    initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            profile: null,
            session: null,
            isAuthenticated: false,
            isAnonymous: false,
            isLoading: true,

            setUser: (user) => set({ user, isAuthenticated: !!user }),
            setProfile: (profile) => set({ profile }),
            setSession: (session) => set({ session }),
            setLoading: (isLoading) => set({ isLoading }),

            signInAnonymously: async () => {
                // Only sign in if not already authenticated
                const currentState = get();
                if (currentState.isAuthenticated && currentState.user) {
                    console.log('Already authenticated, skipping anonymous sign-in');
                    return;
                }

                console.log('Signing in anonymously...');
                const { data, error } = await supabase.auth.signInAnonymously();

                if (error) {
                    console.error('Anonymous sign-in error:', error);
                    throw error;
                }

                if (data.user) {
                    console.log('Anonymous user created:', data.user.id);
                    set({
                        user: {
                            id: data.user.id,
                            email: '',
                        },
                        session: data.session,
                        isAuthenticated: true,
                        isAnonymous: true,
                    });
                }
            },

            login: async (email, password) => {
                const { data, error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });

                if (error) throw error;

                set({
                    user: {
                        id: data.user!.id,
                        email: data.user!.email!,
                    },
                    session: data.session,
                    isAuthenticated: true,
                    isAnonymous: false,
                });
            },

            signUp: async (email, password, fullName) => {
                const currentState = get();

                // If currently anonymous, convert to permanent user
                if (currentState.isAnonymous && currentState.user) {
                    console.log('Converting anonymous user to permanent...');

                    // Update user with email (this links the identity)
                    const { error: updateError } = await supabase.auth.updateUser({
                        email,
                        data: { full_name: fullName },
                    });

                    if (updateError) throw updateError;

                    // After email verification, set the password
                    // For now, we try to set password immediately (works if email confirmation is disabled)
                    const { error: passwordError } = await supabase.auth.updateUser({
                        password,
                    });

                    if (passwordError) {
                        console.warn('Password update pending email verification:', passwordError);
                    }

                    set({
                        user: {
                            id: currentState.user.id,
                            email,
                            fullName,
                        },
                        isAnonymous: false,
                    });
                } else {
                    // Normal signup flow
                    const { data, error } = await supabase.auth.signUp({
                        email,
                        password,
                        options: {
                            data: { full_name: fullName },
                        },
                    });

                    if (error) throw error;

                    if (data.user) {
                        set({
                            user: {
                                id: data.user.id,
                                email: data.user.email!,
                                fullName,
                            },
                            isAnonymous: false,
                        });
                    }
                }
            },

            logout: async () => {
                await supabase.auth.signOut();
                set({
                    user: null,
                    profile: null,
                    session: null,
                    isAuthenticated: false,
                    isAnonymous: false,
                });
            },

            initialize: async () => {
                try {
                    const { data: { session } } = await supabase.auth.getSession();

                    if (session?.user) {
                        const isAnon = session.user.is_anonymous ?? false;
                        set({
                            user: {
                                id: session.user.id,
                                email: session.user.email || '',
                            },
                            session,
                            isAuthenticated: true,
                            isAnonymous: isAnon,
                        });
                    }
                } catch (error) {
                    console.error('Auth initialization error:', error);
                } finally {
                    set({ isLoading: false });
                }
            },
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => AsyncStorage),
            partialize: (state) => ({
                user: state.user,
                isAuthenticated: state.isAuthenticated,
                isAnonymous: state.isAnonymous,
            }),
        }
    )
);


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
    isLoading: boolean;

    // Actions
    setUser: (user: User | null) => void;
    setProfile: (profile: Profile | null) => void;
    setSession: (session: any | null) => void;
    setLoading: (loading: boolean) => void;
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
            isLoading: true,

            setUser: (user) => set({ user, isAuthenticated: !!user }),
            setProfile: (profile) => set({ profile }),
            setSession: (session) => set({ session }),
            setLoading: (isLoading) => set({ isLoading }),

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
                });
            },

            signUp: async (email, password, fullName) => {
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
                    });
                }
            },

            logout: async () => {
                await supabase.auth.signOut();
                set({
                    user: null,
                    profile: null,
                    session: null,
                    isAuthenticated: false,
                });
            },

            initialize: async () => {
                try {
                    const { data: { session } } = await supabase.auth.getSession();

                    if (session?.user) {
                        set({
                            user: {
                                id: session.user.id,
                                email: session.user.email!,
                            },
                            session,
                            isAuthenticated: true,
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
            }),
        }
    )
);

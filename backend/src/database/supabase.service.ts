import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService implements OnModuleInit {
    private supabase: SupabaseClient;
    private supabaseAdmin: SupabaseClient;

    constructor(private configService: ConfigService) { }

    onModuleInit() {
        const supabaseUrl = this.configService.get<string>('SUPABASE_URL');
        const supabaseAnonKey = this.configService.get<string>('SUPABASE_ANON_KEY');
        const supabaseServiceKey = this.configService.get<string>('SUPABASE_SERVICE_ROLE_KEY');

        if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceKey) {
            throw new Error('Missing Supabase configuration');
        }

        // Client for user operations (respects RLS)
        this.supabase = createClient(supabaseUrl, supabaseAnonKey);

        // Admin client for server-side operations (bypasses RLS)
        this.supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

        console.log('✅ Supabase clients initialized');
    }

    /**
     * Get the Supabase client (respects RLS)
     */
    get client(): SupabaseClient {
        return this.supabase;
    }

    /**
     * Get the admin Supabase client (bypasses RLS)
     * Use with caution - only for server-side operations
     */
    get admin(): SupabaseClient {
        return this.supabaseAdmin;
    }

    /**
     * Get a client authenticated as a specific user
     */
    getClientWithToken(accessToken: string): SupabaseClient {
        const supabaseUrl = this.configService.get<string>('SUPABASE_URL');
        const supabaseAnonKey = this.configService.get<string>('SUPABASE_ANON_KEY');

        return createClient(supabaseUrl!, supabaseAnonKey!, {
            global: {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            },
        });
    }
}

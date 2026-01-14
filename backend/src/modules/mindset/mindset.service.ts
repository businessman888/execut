import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../../database/supabase.service';

@Injectable()
export class MindsetService {
    constructor(private readonly supabase: SupabaseService) { }

    async getVision(userId: string) {
        const { data, error } = await this.supabase.admin
            .from('mindset_visions')
            .select('*')
            .eq('user_id', userId)
            .single();

        if (error && error.code !== 'PGRST116') {
            throw new Error(error.message);
        }

        return data;
    }

    async saveVision(userId: string, visionData: any) {
        // Check if vision exists
        const existing = await this.getVision(userId);

        if (existing) {
            // Update
            const { data, error } = await this.supabase.admin
                .from('mindset_visions')
                .update({
                    future_description: visionData.futureDescription,
                    lifestyle: visionData.lifestyle,
                    achievements: visionData.achievements,
                    habits: visionData.habits,
                    values: visionData.values,
                    image_url: visionData.imageUrl,
                    updated_at: new Date().toISOString(),
                })
                .eq('user_id', userId)
                .select()
                .single();

            if (error) throw new Error(error.message);
            return data;
        }

        // Create
        const { data, error } = await this.supabase.admin
            .from('mindset_visions')
            .insert({
                user_id: userId,
                future_description: visionData.futureDescription,
                lifestyle: visionData.lifestyle,
                achievements: visionData.achievements,
                habits: visionData.habits,
                values: visionData.values,
                image_url: visionData.imageUrl,
            })
            .select()
            .single();

        if (error) throw new Error(error.message);
        return data;
    }
}

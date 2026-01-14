import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../../database/supabase.service';

@Injectable()
export class WellnessService {
    constructor(private readonly supabase: SupabaseService) { }

    async getRecords(userId: string, startDate?: string, endDate?: string) {
        let query = this.supabase.admin
            .from('wellness_tracking')
            .select('*')
            .eq('user_id', userId)
            .order('date', { ascending: false });

        if (startDate) query = query.gte('date', startDate);
        if (endDate) query = query.lte('date', endDate);

        const { data, error } = await query;
        if (error) throw new Error(error.message);
        return data || [];
    }

    async createRecord(userId: string, data: any) {
        const today = new Date().toISOString().split('T')[0];

        // Check if record exists for today
        const { data: existing } = await this.supabase.admin
            .from('wellness_tracking')
            .select('id')
            .eq('user_id', userId)
            .eq('date', today)
            .single();

        if (existing) {
            // Update existing record
            const { data: updated, error } = await this.supabase.admin
                .from('wellness_tracking')
                .update({
                    sun_exposure_minutes: data.sunExposureMinutes,
                    sleep_hours: data.sleepHours,
                    energy_level: data.energyLevel,
                    exercised: data.exercised,
                    notes: data.notes,
                })
                .eq('id', existing.id)
                .select()
                .single();

            if (error) throw new Error(error.message);
            return updated;
        }

        // Create new record
        const { data: created, error } = await this.supabase.admin
            .from('wellness_tracking')
            .insert({
                user_id: userId,
                date: today,
                sun_exposure_minutes: data.sunExposureMinutes,
                sleep_hours: data.sleepHours,
                energy_level: data.energyLevel,
                exercised: data.exercised,
                notes: data.notes,
            })
            .select()
            .single();

        if (error) throw new Error(error.message);
        return created;
    }

    async getWeeklySummary(userId: string) {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const records = await this.getRecords(
            userId,
            sevenDaysAgo.toISOString().split('T')[0],
        );

        if (records.length === 0) {
            return {
                avgSleepHours: 0,
                avgEnergyLevel: 0,
                totalSunExposure: 0,
                exerciseDays: 0,
                daysTracked: 0,
            };
        }

        const avgSleepHours = records.reduce((sum, r) => sum + (r.sleep_hours || 0), 0) / records.length;
        const avgEnergyLevel = records.reduce((sum, r) => sum + (r.energy_level || 0), 0) / records.length;
        const totalSunExposure = records.reduce((sum, r) => sum + (r.sun_exposure_minutes || 0), 0);
        const exerciseDays = records.filter(r => r.exercised).length;

        return {
            avgSleepHours: Math.round(avgSleepHours * 10) / 10,
            avgEnergyLevel: Math.round(avgEnergyLevel * 10) / 10,
            totalSunExposure,
            exerciseDays,
            daysTracked: records.length,
        };
    }
}

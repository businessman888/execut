import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../../database/supabase.service';

@Injectable()
export class NotificationsService {
    constructor(private readonly supabase: SupabaseService) { }

    async sendNotification(userId: string, title: string, body: string, data?: Record<string, string>) {
        // TODO: Integrate with Expo Push Notifications / FCM
        console.log(`Notification for ${userId}: ${title} - ${body}`);

        // Save to notifications table
        const { error } = await this.supabase.admin.from('notifications').insert({
            user_id: userId,
            title,
            body,
            data: data || {},
            read: false,
        });

        if (error) {
            console.error('Failed to save notification:', error);
        }

        return { sent: true, title, body };
    }

    async getNotifications(userId: string, unreadOnly = false) {
        let query = this.supabase.admin
            .from('notifications')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        if (unreadOnly) {
            query = query.eq('read', false);
        }

        const { data, error } = await query.limit(50);
        if (error) throw new Error(error.message);
        return data || [];
    }

    async markAsRead(notificationId: string) {
        const { error } = await this.supabase.admin
            .from('notifications')
            .update({ read: true })
            .eq('id', notificationId);

        if (error) throw new Error(error.message);
        return { marked: true };
    }

    async markAllAsRead(userId: string) {
        const { error } = await this.supabase.admin
            .from('notifications')
            .update({ read: true })
            .eq('user_id', userId)
            .eq('read', false);

        if (error) throw new Error(error.message);
        return { marked: true };
    }
}

import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../../database/supabase.service';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class HallOfFameService {
    constructor(private readonly supabase: SupabaseService) { }

    async getPosts(page: number, limit: number) {
        const offset = (page - 1) * limit;

        const { data, error, count } = await this.supabase.admin
            .from('hall_posts')
            .select(`
        *,
        profiles:user_id (id, full_name, username, avatar_url, current_level)
      `, { count: 'exact' })
            .order('created_at', { ascending: false })
            .range(offset, offset + limit - 1);

        if (error) throw new Error(error.message);

        return {
            posts: data || [],
            total: count || 0,
            page,
            limit,
        };
    }

    async createPost(dto: CreatePostDto) {
        // Check if user is public
        const { data: profile } = await this.supabase.admin
            .from('profiles')
            .select('is_public')
            .eq('id', dto.userId)
            .single();

        if (!profile?.is_public) {
            throw new ForbiddenException('Ative seu perfil público para postar no Hall da Fama');
        }

        const { data, error } = await this.supabase.admin
            .from('hall_posts')
            .insert({
                user_id: dto.userId,
                content: dto.content,
                post_type: dto.postType,
                likes_count: 0,
            })
            .select()
            .single();

        if (error) throw new Error(error.message);
        return data;
    }

    async toggleLike(postId: string, userId: string) {
        // Check if already liked
        const { data: existingLike } = await this.supabase.admin
            .from('post_likes')
            .select('id')
            .eq('post_id', postId)
            .eq('user_id', userId)
            .single();

        if (existingLike) {
            // Unlike
            await this.supabase.admin
                .from('post_likes')
                .delete()
                .eq('id', existingLike.id);

            await this.supabase.admin
                .from('hall_posts')
                .update({ likes_count: this.supabase.admin.rpc('decrement', { x: 1 }) })
                .eq('id', postId);

            return { liked: false };
        } else {
            // Like
            await this.supabase.admin
                .from('post_likes')
                .insert({ post_id: postId, user_id: userId });

            await this.supabase.admin
                .from('hall_posts')
                .update({ likes_count: this.supabase.admin.rpc('increment', { x: 1 }) })
                .eq('id', postId);

            return { liked: true };
        }
    }

    async getPublicProfile(userId: string) {
        const { data: profile, error } = await this.supabase.admin
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .eq('is_public', true)
            .single();

        if (error || !profile) {
            throw new NotFoundException('Perfil não encontrado ou não é público');
        }

        // Get user posts
        const { data: posts } = await this.supabase.admin
            .from('hall_posts')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false })
            .limit(10);

        return {
            profile,
            posts: posts || [],
        };
    }
}

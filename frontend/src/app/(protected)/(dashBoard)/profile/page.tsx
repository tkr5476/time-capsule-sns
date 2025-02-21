"use client";

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { profileApi, type Profile, type UpdateProfileData } from '@/features/auth/api/profile';
import { toast } from 'react-hot-toast';

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { register, handleSubmit, reset } = useForm<UpdateProfileData>();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await profileApi.getProfile();
        setProfile(data);
        reset(data);
      } catch (error) {
        toast.error('プロフィールの取得に失敗しました');
      }
    };
    fetchProfile();
  }, [reset]);

  const onSubmit = async (data: UpdateProfileData) => {
    try {
      const updatedProfile = await profileApi.updateProfile(data);
      setProfile(updatedProfile);
      setIsEditing(false);
      toast.success('プロフィールを更新しました');
    } catch (error) {
      toast.error('プロフィールの更新に失敗しました');
    }
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">プロフィール</h1>
      
      {isEditing ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">名前</label>
            <input
              {...register('name')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">自己紹介</label>
            <textarea
              {...register('bio')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">プロフィール画像</label>
            <input
              type="file"
              {...register('avatar')}
              className="mt-1 block w-full"
              accept="image/*"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 border rounded-md"
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              保存
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          {/* プロフィール表示部分 */}
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            編集
          </button>
        </div>
      )}
    </div>
  );
}
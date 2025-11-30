"use client"

import ProductCard from '@/components/ProductCard'
import React from 'react'
import RatingLog from './RatingLog'
import { UserRatingHistory } from '../../../../shared/src/types'
import { RatingHook } from '@/hooks/useRating'
import { useAuth } from '@/hooks/useAuth'
import LoadingSpinner from '@/components/LoadingSpinner'
import { useMemo } from 'react'

const RatingPage = () => {
    // --- Custom Hook ---
    const userId = useAuth();
    const { data: userRating, isLoading, error } = RatingHook.useGetRating(Number(userId.user?.id))

    // --- React Hook ---
    const positiveRatingPercent = useMemo(() => {
        if (!userRating || !userRating.logs.length) return 0;

        const positiveCount = userRating.logs.filter((log: any) => log.rating >= 0).length;
        const total = userRating.logs.length;

        return Math.round((positiveCount / total) * 100);
    }, [userRating]);

    const sumPositiveRating = useMemo(() => {
        if (!userRating || !userRating.logs.length) return 0;

        return userRating.logs.filter((log: any) => log.rating >= 0).length;
    }, [userRating]);

    const sumRating = useMemo(() => {
        return userRating?.logs.length || 0;
    }, [userRating]);

    // --- Exception ---
    if (isLoading) return <LoadingSpinner />;
    if (error) return <p>Lỗi tải dữ liệu</p>;
    if (!userRating) return <p>Không tìm thấy thông tin người dùng</p>;

    return <div className="background-user flex flex-col gap-2">
        <h1 className="text-2xl font-medium">Chi tiết đánh giá</h1>
        <div className="mt-4 bg-slate-100 py-7 flex flex-row justify-evenly rounded-lg border-2 border-slate-300">
            <div className="flex flex-col items-center gap-1">
                <p className="text-4xl font-bold text-green-700">{positiveRatingPercent}%</p>
                <p className="text-sm text-gray-500">Điểm tích cực</p>
            </div>
            <div className="flex flex-col items-center gap-1">
                <p className="text-4xl font-bold text-slate-600">{sumPositiveRating}</p>
                <p className="text-sm text-gray-500">Đánh giá tích cực</p>
            </div>
            <div className="flex flex-col items-center gap-1">
                <p className="text-4xl font-bold text-slate-600">{sumRating}</p>
                <p className="text-sm text-gray-500">Tổng đánh giá</p>
            </div>
        </div>

        <h2 className="mt-6 text-xl font-medium">Những đánh giá gần đây</h2>
        <div className="mt-2 flex flex-col gap-4">
            {userRating.logs.map((log: any) => <RatingLog key={log.id} ratingLog={log} />)}
        </div>

        {/* pagination */}
    </div>
}

export default RatingPage
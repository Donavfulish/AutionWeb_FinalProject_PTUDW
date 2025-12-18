import React from 'react';

type StatusType = 'approved' | 'expired' | 'pending' | 'rejected' | 'none';

interface StatusBadgeProps {
    status: StatusType;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
    const statusConfig = {
        approved: {
            bg: 'bg-green-100',
            text: 'text-green-800',
            label: 'Đang hoạt động'
        },
        expired: {
            bg: 'bg-red-100',
            text: 'text-red-800',
            label: 'Đã hết hạn'
        },
        pending: {
            bg: 'bg-yellow-100',
            text: 'text-yellow-800',
            label: 'Đang chờ chấp nhận'
        },
        rejected: {
            bg: 'bg-red-500',
            text: 'text-white',
            label: 'Yêu cầu bị từ chối'
        },
        none: {
            bg: 'bg-gray-100',
            text: 'text-gray-800',
            label: 'Chưa có quyền'
        }
    };

    const config = statusConfig[status];

    return (
        <span className={`px-4 py-2 ${config.bg} ${config.text} text-md font-semibold rounded-full`}>
            {config.label}
        </span>
    );
};

export default StatusBadge;
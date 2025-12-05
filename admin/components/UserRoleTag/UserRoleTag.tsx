import { Icon, View } from 'lucide-react';
import React from 'react'
import { Shield, Store } from 'lucide-react';

type Props = {
    role: 'Seller' | 'Buyer';
};

const roleStyle = {
    'Buyer': {
        text: 'text-gray-800',
        bg: 'bg-gray-300',
        label: 'Buyer',
        icon: <Store/>,
    },
    'Seller': {
        text: 'text-blue-800',
        bg: 'bg-blue-200',
        label: 'Seller',
        icon: <Shield/>,
    },
}
export const UserRoleTag = ({ role = 'Buyer' }: Props) => {
    
    const style = roleStyle[role];

    return (
        <div className={`flex flex-row gap-2 p-2 rounded-md font-semibold ${style.bg} ${style.text}`}>
            {style.icon}
            {style.label}
        </div>
    )
}

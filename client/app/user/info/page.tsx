"use client"

import React, { useState } from 'react'
import ViewDetail from './ViewDetail'
import PrimaryButton from '@/components/PrimaryButton'
import { EditIcon } from 'lucide-react'
import SecondaryButton from '@/components/SecondaryButton'
import { LogoutIcon } from '@/components/icons'
import EditDetail from './EditDetail'

const InfoPage = () => {
  const [inEditMode, setInEditMode] = useState<boolean>(false);

  function handleEditButton() {
    setInEditMode(true);
  }

  function handleLogout() {
    console.log('Clicked on log out button');
  }

  function handleSaveButton() {
    // Call API here
    setInEditMode(false);
  }

  function handleCancelEditButton() {
    setInEditMode(false);
  }

  return <div className="bg-white w-full h-full border-2 border-gray-200 shadow-md rounded-lg p-7">
    <p className="text-2xl font-medium">Thông tin tài khoản</p>
    <div>
      {inEditMode ? <div>
        <EditDetail />
      </div> : <div>
        <ViewDetail />
      </div>}

      {inEditMode ? <div>
        <section className="flex flex-row gap-5 mt-10 max-w-80">
          <PrimaryButton
            text="Lưu thay đổi"
            onClick={handleSaveButton}
          />
          <SecondaryButton
            text="Hủy"
            textColor="#FF0505"
            hoverTextColor="#FFFFFF"
            hoverBackgroundColor="#FF5555"
            onClick={handleCancelEditButton}
          />
        </section>
      </div> : <div>
        <section className="flex flex-row gap-5 mt-10 max-w-80">
          <PrimaryButton
            text="Chỉnh sửa"
            icon={() => <EditIcon className="text-white" />}
            onClick={handleEditButton}
          />
          <SecondaryButton
            text="Đăng xuất"
            icon={() => <LogoutIcon className="text-red-[#FF0505]" />}
            textColor="#FF0505"
            hoverTextColor="#FFFFFF"
            hoverBackgroundColor="#FF5555"
            onClick={handleLogout}
          />
        </section>
      </div>
      }
    </div>
  </div>
}

export default InfoPage
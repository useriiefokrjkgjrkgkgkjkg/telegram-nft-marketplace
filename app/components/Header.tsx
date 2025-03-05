'use client';

import Image from 'next/image';

export default function Header() {
  return (
    <div className="bg-[#1C1E22] px-4 py-3 flex items-center justify-between">
      {/* Левая часть с балансом и кнопками */}
      <div className="flex items-center gap-3">
        {/* Баланс с иконкой TON */}
        <div className="flex items-center gap-2 bg-[#252A31] rounded-xl px-4 py-2.5 cursor-pointer">
          <Image 
            src="/ton.svg" 
            alt="TON" 
            width={20} 
            height={20}
            className="brightness-75"
          />
          <span className="text-white text-xl font-medium">0</span>
          <svg className="w-4 h-4 text-gray-500 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {/* Кнопка + */}
        <button className="w-11 h-11 bg-[#0098EA] rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>

        {/* Кнопка - */}
        <button className="w-11 h-11 bg-[#0098EA] rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>

        {/* Кнопка профиля */}
        <button className="w-11 h-11 bg-[#0098EA] rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </button>
      </div>

      {/* Правая часть с кнопкой Connect Wallet */}
      <button className="bg-[#0098EA] text-white px-8 py-3 rounded-full flex items-center gap-3">
        <Image 
          src="/ton.svg" 
          alt="TON" 
          width={20} 
          height={20}
          className="brightness-75"
        />
        <span className="text-lg font-medium tracking-wide">Connect Wallet</span>
      </button>
    </div>
  );
} 
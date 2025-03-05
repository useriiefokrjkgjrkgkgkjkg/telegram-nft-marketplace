'use client';

export default function Header() {
  return (
    <div className="flex justify-between items-center p-2">
      <div className="flex items-center gap-2 bg-[#252A31] rounded-full px-3 py-1.5">
        <div className="flex items-center gap-1">
          <div className="w-[18px] h-[18px]">
            <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-80">
              <path d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z" fill="#0098EA"/>
              <path d="M14.8438 5.9375L10 3.75L5.15625 5.9375L10 8.125L14.8438 5.9375Z" fill="white"/>
              <path d="M5.15625 5.9375V10.4688L10 12.7083V8.125L5.15625 5.9375Z" fill="white"/>
              <path d="M10 8.125V12.7083L14.8438 10.4688V5.9375L10 8.125Z" fill="white"/>
              <path d="M10 13.4375L5.15625 11.1979V13.4375L10 15.6771V13.4375Z" fill="white"/>
              <path d="M10 13.4375L14.8438 11.1979V13.4375L10 15.6771V13.4375Z" fill="white"/>
            </svg>
          </div>
          <span className="text-white text-base">0</span>
          <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        <button className="w-8 h-8 bg-[#0098EA] rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>

        <button className="w-8 h-8 bg-[#0098EA] rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>

        <button className="w-8 h-8 bg-[#0098EA] rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </button>
      </div>

      <button className="flex items-center gap-2 bg-[#0098EA] rounded-full px-4 py-2">
        <div className="w-[18px] h-[18px]">
          <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z" fill="#FFFFFF"/>
            <path d="M14.8438 5.9375L10 3.75L5.15625 5.9375L10 8.125L14.8438 5.9375Z" fill="#0098EA"/>
            <path d="M5.15625 5.9375V10.4688L10 12.7083V8.125L5.15625 5.9375Z" fill="#0098EA"/>
            <path d="M10 8.125V12.7083L14.8438 10.4688V5.9375L10 8.125Z" fill="#0098EA"/>
            <path d="M10 13.4375L5.15625 11.1979V13.4375L10 15.6771V13.4375Z" fill="#0098EA"/>
            <path d="M10 13.4375L14.8438 11.1979V13.4375L10 15.6771V13.4375Z" fill="#0098EA"/>
          </svg>
        </div>
        <span className="text-white font-medium">Connect Wallet</span>
      </button>
    </div>
  );
} 
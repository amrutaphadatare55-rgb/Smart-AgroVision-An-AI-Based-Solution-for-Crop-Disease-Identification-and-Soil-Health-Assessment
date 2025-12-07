export function AgroVisionLogo({ size = 40, showText = true }) {
  return (
    <div className="flex items-center gap-2">
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        {/* Background circle */}
        <circle cx="50" cy="50" r="48" fill="#f0fdf4" stroke="#10a853" strokeWidth="2" />

        {/* Green leaf - left */}
        <path
          d="M 30 50 Q 25 40 25 30 Q 25 20 35 15 Q 45 20 45 30 Q 45 40 40 50"
          fill="#10a853"
          stroke="#059669"
          strokeWidth="1.5"
        />

        {/* Teal leaf - right */}
        <path
          d="M 70 50 Q 75 40 75 30 Q 75 20 65 15 Q 55 20 55 30 Q 55 40 60 50"
          fill="#06b6d4"
          stroke="#0891b2"
          strokeWidth="1.5"
        />

        {/* Center leaf - top */}
        <path
          d="M 50 45 Q 45 35 45 25 Q 45 15 50 10 Q 55 15 55 25 Q 55 35 50 45"
          fill="#34d399"
          stroke="#10b981"
          strokeWidth="1.5"
        />

        {/* Soil element - bottom */}
        <rect x="25" y="60" width="50" height="20" rx="4" fill="#f59e0b" opacity="0.7" />
        <circle cx="35" cy="68" r="2" fill="#d97706" />
        <circle cx="50" cy="72" r="2" fill="#d97706" />
        <circle cx="65" cy="70" r="2" fill="#d97706" />

        {/* Water droplet - accent */}
        <path
          d="M 50 55 Q 48 58 48 62 Q 48 66 50 68 Q 52 66 52 62 Q 52 58 50 55"
          fill="#06b6d4"
          opacity="0.6"
        />
      </svg>

      {showText && (
        <div className="flex flex-col leading-tight">
          <span className="text-lg font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            AgroVision
          </span>
          <span className="text-xs text-cyan-600 font-semibold">Smart Farming</span>
        </div>
      )}
    </div>
  )
}

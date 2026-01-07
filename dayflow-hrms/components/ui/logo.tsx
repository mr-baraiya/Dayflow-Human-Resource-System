import Image from "next/image"

interface LogoProps {
  className?: string
  size?: number
  showText?: boolean
}

export function Logo({ className = "", size = 32, showText = true }: LogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg 
          viewBox="0 0 200 200" 
          fill="none" 
          width={size} 
          height={size}
          className="text-primary"
        >
          {/* Outer gear */}
          <path 
            d="M100 20L110 30L120 20L125 35L140 30L140 45L155 45L150 60L165 65L155 75L165 90L150 90L155 105L140 105L140 120L125 115L120 130L110 120L100 130L90 120L80 130L75 115L60 120L60 105L45 105L50 90L35 85L45 75L35 60L50 60L45 45L60 45L60 30L75 35L80 20L90 30L100 20Z" 
            stroke="currentColor" 
            strokeWidth="4" 
            fill="none"
          />
          
          {/* Inner circle */}
          <circle cx="100" cy="100" r="45" stroke="currentColor" strokeWidth="4" fill="none"/>
          
          {/* People icons */}
          {/* Person 1 (left) */}
          <circle cx="75" cy="90" r="8" fill="currentColor"/>
          <path d="M75 100C68 100 62 106 62 113V118H88V113C88 106 82 100 75 100Z" fill="currentColor"/>
          
          {/* Person 2 (center) */}
          <circle cx="100" cy="85" r="9" fill="currentColor"/>
          <path d="M100 96C92 96 85 102 85 110V116H115V110C115 102 108 96 100 96Z" fill="currentColor"/>
          
          {/* Person 3 (right) */}
          <circle cx="125" cy="90" r="8" fill="currentColor"/>
          <path d="M125 100C118 100 112 106 112 113V118H138V113C138 106 132 100 125 100Z" fill="currentColor"/>
          
          {/* Arrows */}
          <path d="M170 100L180 90L180 110Z" fill="currentColor"/>
          <path d="M30 100L20 90L20 110Z" fill="currentColor"/>
        </svg>
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className="text-xl font-bold leading-tight">Dayflow</span>
          <span className="text-xs text-muted-foreground font-medium leading-tight">HRMS Platform</span>
        </div>
      )}
    </div>
  )
}

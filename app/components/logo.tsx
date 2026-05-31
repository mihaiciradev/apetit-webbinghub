export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* rising steam — fresh, just served */}
      <path
        d="M13 4.6c1-.7 1-1.7 0-2.4M16 4.2c1-.7 1-1.7 0-2.4M19 4.6c1-.7 1-1.7 0-2.4"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        opacity="0.45"
      />
      {/* knob */}
      <circle cx="16" cy="7.4" r="1.5" fill="currentColor" />
      <path d="M16 8.9v2.1" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      {/* cloche dome */}
      <path
        d="M5.5 22.4C5.5 15.6 10 11 16 11s10.5 4.6 10.5 11.4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      {/* inner sheen for depth */}
      <path
        d="M9.6 21.4c.3-4.1 3-7.1 6-7.3"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.4"
      />
      {/* plate */}
      <path d="M3.6 22.6h24.8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path
        d="M6.6 25.6h18.8"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        opacity="0.45"
      />
    </svg>
  );
}

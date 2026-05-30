export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* plate */}
      <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1.6" opacity="0.35" />
      <circle cx="16" cy="16" r="9.5" stroke="currentColor" strokeWidth="1.6" />
      {/* leaf / sprout in the center */}
      <path
        d="M16 21c0-3.4 1.9-6 4.6-7.2-.2 3.5-2 6-4.6 7.2Z"
        fill="currentColor"
      />
      <path
        d="M16 21c0-3.4-1.9-6-4.6-7.2.2 3.5 2 6 4.6 7.2Z"
        fill="currentColor"
        opacity="0.55"
      />
      <path d="M16 21v-9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

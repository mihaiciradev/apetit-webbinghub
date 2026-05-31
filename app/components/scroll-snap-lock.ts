// Tiny shared flag so in-page anchor navigation can temporarily suspend the
// 3D section's scroll-snap. Both `anchor-scroll.tsx` (static import) and
// `dinner-section.tsx` (dynamic import) reference this same module instance,
// so the lock is shared without leaking onto `window`.
let locked = false;

export const snapLock = {
  get: () => locked,
  set: (value: boolean) => {
    locked = value;
  },
};

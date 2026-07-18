/**
 * Route transition: content rises in while a thin scanline sweeps down.
 * template.tsx remounts on every navigation, so this plays per-route.
 * Pure CSS so the SSR tree is identical for every visitor (no hydration
 * divergence, and content stays visible without JavaScript).
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div
        aria-hidden
        className="template-scan pointer-events-none fixed inset-x-0 top-0 z-[150] h-px bg-phosphor/70 motion-reduce:hidden"
      />
      <div className="template-rise">{children}</div>
    </>
  );
}

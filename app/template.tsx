/**
 * Route transition: a quiet rise on every navigation. Pure CSS so the SSR
 * tree is identical for every visitor and content stays visible without JS.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="template-rise">{children}</div>;
}

export default function MdxLayout({ children }: { children: React.ReactNode }) {
  // Create any shared layout or styles here
  return <div className="w-full justify-center p-10 md:flex">
    {children}
  </div>
}
export default function MdxLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full min-w-0 overflow-x-clip px-4 py-10 sm:px-6 md:flex md:justify-center md:py-16">
      {children}
    </div>
  );
}

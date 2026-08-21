import { ContentHeader } from "@/components/content/ContentHeader";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <ContentHeader label="Blog" />
      {children}
    </div>
  );
}

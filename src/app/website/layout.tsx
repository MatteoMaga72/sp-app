export default function WebsiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className="w-full max-w-none mx-0"
      style={{ maxWidth: "none" }}
    >
      {children}
    </div>
  );
}

// Lo Studio Sanity gestisce il proprio stile — isola dal layout root
export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

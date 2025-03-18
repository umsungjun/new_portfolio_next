export default async function MainLayout({
  side,
  chat,
}: {
  children: React.ReactNode;
  side: React.ReactNode;
  chat: React.ReactNode;
}) {
  return (
    <section className="flex justify-center gap-32 overflow-hidden">
      {side}
      {chat}
    </section>
  );
}

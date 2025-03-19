import { ReactNode } from "react";

interface MainLayoutProps {
  side: ReactNode;
  chat: React.ReactNode;
}

export default async function MainLayout({ side, chat }: MainLayoutProps) {
  return (
    <section className="flex justify-center gap-32 overflow-hidden">
      {side}
      {chat}
    </section>
  );
}

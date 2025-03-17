import ChatHeader from "./header";

export default async function Chat() {
  return (
    <section className="max-w-[475px] w-[475px] h-dvh border border-solid border-y-0 border-slate-200 bg-gradient-to-r from-[#d7e5fa] via-[#ede9f8] to-[#d7e5fa] bg-[length:200%_100%] animate-gradientAnimation">
      <ChatHeader />
    </section>
  );
}

import Side from "./side/page";

export default async function MainPage() {
  return (
    <section className="flex justify-center gap-32 overflow-hidden">
      {/* 메인 페이지 사이드 */}
      <Side />
    </section>
  );
}

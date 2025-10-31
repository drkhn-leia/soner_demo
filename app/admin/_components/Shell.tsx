import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Shell({
  children,
  userEmail,
}: {
  children: React.ReactNode;
  userEmail: string;
}) {
  return (
    <div className="flex flex-col min-w-full min-h-screen">
      <Header userEmail={userEmail} />
      <main className="flex flex-row h-full">
        <Sidebar />
        {/* Orta alan */}
        <section className="flex-1 p-12">{children}</section>
      </main>
    </div>
  );
}

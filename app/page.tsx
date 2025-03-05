import Header from './components/Header';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#1C1E22]">
      <Header />
      <div className="flex items-center justify-center h-[calc(100vh-48px)]">
        <h1 className="text-white text-6xl font-bold">Soon...</h1>
      </div>
    </main>
  );
} 
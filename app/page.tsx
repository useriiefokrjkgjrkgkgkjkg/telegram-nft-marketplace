import Header from './components/Header';

export default function Home() {
  return (
    <main className="max-w-[390px] mx-auto min-h-screen bg-[#1C1E22] flex flex-col">
      <Header />
      <div className="flex-1" />
      <div className="h-1 bg-[#252A31] rounded-full mx-auto w-32 mb-2" />
    </main>
  );
} 
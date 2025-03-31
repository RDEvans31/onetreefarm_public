import Hero from "@/components/homepage/hero";
import InProgress from "@/components/inprogress";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px]">
      <main>
        <Hero />
        <InProgress />
      </main>
    </div>
  );
}

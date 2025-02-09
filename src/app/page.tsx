import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="mx-auto"
          src="/otf-logo.png"
          alt="One Tree Farm logo"
          width={180}
          height={38}
          priority
        />
        <div className="flex flex-col gap-4 items-center">
          <h1 className="text-2xl font-bold">Coming soon 🚀</h1>
          <p>
            We're working on some changes to the site. We'll be back soon!
          </p>
          <p>
            In the meantime, if you have any questions,<br />
            please contact us at{" "}
            <a href="mailto:hello@onetreefarm.org" className="text-blue-600 underline underline-offset-4">hello@onetreefarm.org</a>.
          </p>
        </div>
      </main>
    </div>
  );
}

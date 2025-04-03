import Image from 'next/image';

export default function InProgress() {
  return (
    <div className="flex flex-col py-8 px-4 sm:px-16 gap-8 items-center justify-center">
      <Image
        className="mx-auto w-[140px] sm:w-[180px]"
        src="/otf-logo.png"
        alt="One Tree Farm logo"
        width={180}
        height={38}
        priority
      />
      <div className="flex flex-col gap-4 items-center mx-auto text-center max-w-sm sm:max-w-md">
        <h1 className="text-xl sm:text-2xl font-bold">Coming soon 🚀</h1>
        <p className="px-4 sm:px-0">
          We&apos;re working on some changes to the site. We&apos;ll be back
          soon!
        </p>
        <p className="px-4 sm:px-0">
          In the meantime, if you have any questions,
          <br />
          please contact us at{' '}
          <a
            href="mailto:hello@onetreefarm.org"
            className="text-blue-600 underline underline-offset-4 break-words"
          >
            hello@onetreefarm.org
          </a>
          .
        </p>
      </div>
    </div>
  );
}

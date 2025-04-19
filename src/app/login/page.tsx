'use client';

import { useState } from 'react';
import Image from 'next/image';
import { signInWithMagicLink } from '@/lib/actions';

export default function LoginPage(props: {
  searchParams: {
    callbackUrl: string | undefined;
  };
}) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden w-full max-w-[1200px] flex">
        {/* Left side - Login Form */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12">
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-bold mb-8">Welcome 👋</h1>
            <p className="text-gray-600 mb-8">
              Please enter your email and we&apos;ll send you a link to log in.
            </p>

            <form action={signInWithMagicLink}>
              <div className="space-y-6">
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#064526]"
                  />
                </div>
                <button type="submit" className="btn-primary w-full">
                  Log in
                </button>
              </div>
            </form>

            <p className="text-center mt-8 text-gray-600">
              If you don&apos;t have an account, one will be created for you.
            </p>
          </div>
        </div>

        {/* Right side - Illustration */}
        <div className="hidden lg:block w-1/2 relative">
          <div className="absolute inset-0">
            <Image
              src="/otf-login.png"
              alt="Kids and parents working in the garden."
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

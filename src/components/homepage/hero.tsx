import React from 'react';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative h-[100svh] w-full overflow-hidden">
      {/* Background Image - positioned absolutely */}
      <div className="absolute inset-0">
        <Image
          src="https://members.onetreefarm.org/wp-content/uploads/2024/06/74fea7f5-4ac9-4d07-859d-651913fabe98-1.jpg"
          alt="One Tree Farm"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay to ensure text visibility */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      {/* Content container - positioned relatively */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center items-center sm:items-start h-full pt-20">
          <div className="max-w-2xl animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-serif leading-tight">
              Real people <br className="mb-2" />
              Real food <br className="mb-2" />
              The way it should be
            </h1>
            <p className="text-xl text-white mb-8 max-w-xl">
              Community-owned off-grid regenerative farm.
            </p>
          </div>

          {/* Opening Hours Information Card */}
          <div className="fixed top-0 left-0 right-0 bg-white bg-opacity-90 p-2 shadow-lg w-full max-h-[80px] sm:max-h-[80px] overflow-hidden">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-green-800 font-serif font-bold text-lg">
                    Opening Hours
                  </h3>
                  <p className="text-gray-700 text-sm">
                    Closed for visits during the winter. Opening Spring 2025
                  </p>
                </div>
                <div className="border-l border-green-200 pl-4 ml-4">
                  <p className="text-green-700 font-medium whitespace-nowrap">
                    Spring 2025
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

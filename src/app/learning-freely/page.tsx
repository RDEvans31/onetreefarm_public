import Link from 'next/link';
import Image from 'next/image';

export default function LearningFreely() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/learning-freely-cover.webp"
            alt="Kids playing"
            fill
            className="object-cover brightness-75"
          />
        </div>
        
        {/* Hero Content */}
        <div className="relative h-full flex flex-col justify-center px-6 md:px-12 max-w-6xl mx-auto">
          <p className="text-white mb-4">
            &quot;Play is the highest form of research&quot;
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 max-w-3xl">
            Learning Freely
          </h1>
          <p className="text-white mb-2">
            Thursdays 10am - 2pm
          </p>
          <p className="text-white mb-4">
            &pound;5 per child
          </p>
          <Link
            href="#booking-form"
            className="bg-white text-black px-6 py-3 rounded-full w-fit hover:bg-gray-100 transition-colors"
          >
            BOOK NOW
          </Link>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-12 gap-8 items-center">
            {/* Images */}
            <div className="md:col-span-6 gap-4">
              <div className="aspect-[3/4] relative">
                <Image
                  src="https://members.onetreefarm.org/wp-content/uploads/2024/04/Screenshot_20240418-0000022-1.png"
                  alt="Worker cutting wood"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>

            {/* Content */}
            <div className="md:col-span-6 md:pl-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Our Philosophy
              </h2>
              <p className="text-gray-600 mb-8">
                <b>Self Directed Learning:</b> We believe children are capable of constructing and directing their own learning and that allowing them to decide how they spend their time makes them feel that they are trusted, empowers them, and builds confidence and self-esteem.
              </p>
              
              <p className="text-gray-600 mb-8">
                <b>Environment:</b> We offer opportunities, provocations, encouragement and support, and provide a rich variety of resources, but our role is to nuture alongside our young people, rather than to direct them. Offerings are open-ended, based on the interests of the young people, rather than pre-conceived ideas about what they &quot;should&quot; be doing or learning. These offerings are experienced by the individual in whichever way is meaningful to them. The learner is always the best person to know in which direction they need to go next.
              </p>

              <p className="text-gray-600 mb-8">
                <b>Facilitation:</b> The adults in the project are learning alongside the children. We are lifelong learners and we must be willing to examine, challenge and, where necessary, change the beliefs we hold. We are all affected by our own programming and most of us need to go through a process of &quot;deschooling&quot; before we can truly let go of long-held beliefs about what learning looks like and what children need to spend their time doing to grow up to be successful individuals and valuable members of society. This deschooling can last a lifetime and is a deep process of unlearning that each member of our facilitation team commits to when they join.
              </p>
              <Link
                href="#booking-form"
                className="bg-[#2F3E36] text-white px-6 py-3 rounded-full inline-block hover:bg-[#3a4d42] transition-colors"
              >
                BOOK NOW
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 px-6 md:px-12 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-2">Session Rhythm</h2>
          <p className="mb-12">Every Thursday</p>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-green-500"></div>

            {/* Timeline Items */}
            <div className="space-y-8">
              {/* Item 1 */}
              <div className="relative pl-10">
                <div className="absolute left-0 w-4 h-4 bg-black rounded-full"></div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <p className="text-green-700 font-semibold mb-2">10:00am</p>
                  <h3 className="text-green-700 text-xl font-semibold">Arrival and Check in</h3>
                </div>
              </div>

              <div className="relative pl-10">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-green-700 text-xl font-semibold">Free Play</h3>
                </div>
              </div>

              {/* Item 2 */}
              <div className="relative pl-10">
                <div className="absolute left-0 bottom-0 w-4 h-4 bg-black rounded-full"></div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <p className="text-green-700 font-semibold mb-2">1:50pm</p>
                  <h3 className="text-green-700 text-xl font-semibold">Tidy up</h3>
                </div>
              </div>

              {/* Item 3 */}
              <div className="relative pl-10">
                <div className="absolute left-0 bottom-0 w-4 h-4 bg-black rounded-full"></div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <p className="text-green-700 font-semibold mb-2">2:00pm</p>
                  <h3 className="text-green-700 text-xl font-semibold">Session Ends and Good-byes</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

            {/* About Us Section */}
            <section className="py-24 px-6 md:px-12 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">About Us</h2>
          
          <div className="space-y-6">
            <p className="text-gray-600">
              Learning Freely is a farm-based, self-directed learning community where curiosity, autonomy, confidence, sovereignty, and a deep connection with nature are nurtured. Here, young people are empowered to explore their unique interests, passions, and skills at their own pace.
            </p>

            <p className="text-gray-600">
              We provide a safe, welcoming space where children thrive within a mixed-age peer group — experiencing the freedom to play, learn, and grow while immersed in sustainable, low-impact food production and unstructured time in a nature-rich environment.
            </p>

            <p className="text-gray-600 italic">
              If you have any questions or would like to learn more, feel free to reach out to Cindy at{' '}
              <a 
                href="mailto:hello@learningfreely.co.uk" 
                className="text-green-700 hover:text-green-800 underline"
              >
                hello@learningfreely.co.uk
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Google Form Section */}
      <section id="booking-form" className="py-24 px-6 md:px-12 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Please fill out this form</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
                You&apos;ll only have to do this once for each child. If you&apos;ve already filled it out then you will have received a booking link.
            </p>
          </div>
          <div className="w-full max-w-4xl mx-auto flex justify-center">
          <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSeioLJucQssI_1iRRakoR2Oh9FwWw9aPvo-HldZ0dt8Eqv8Tw/viewform?embedded=true" width="640" height="2000">Loading…</iframe>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {/* <section className="py-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="text-4xl md:text-5xl font-bold mb-2">20+</h3>
              <p className="text-gray-600">Years of experience</p>
            </div>
            <div>
              <h3 className="text-4xl md:text-5xl font-bold mb-2">1.5M</h3>
              <p className="text-gray-600">Cubic Metres of Log</p>
            </div>
            <div>
              <h3 className="text-4xl md:text-5xl font-bold mb-2">15K</h3>
              <p className="text-gray-600">Happy Customers</p>
            </div>
            <div>
              <h3 className="text-4xl md:text-5xl font-bold mb-2">1.2M</h3>
              <p className="text-gray-600">Made of wood</p>
            </div>
          </div>
        </div>
      </section> */}
    </main>
  );
} 
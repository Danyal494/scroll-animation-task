'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScholarshipFinder() {
  const containerRef = useRef(null);
  const imagesRef = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const scholarshipData = {
    title: "Australia Student Scholarship Opportunity",
    description:
      "Unlock your future with an Australia Student Scholarship – empowering bright minds to achieve academic excellence abroad. Apply now and take the first step toward your global journey!",
    destinations: [
      {
        id: 1,
        name: "London",
        image:
          "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2670&auto=format&fit=crop",
        description: "Explore academic excellence in the heart of London, UK.",
      },
      {
        id: 2,
        name: "San Francisco",
        image:
          "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=2532&auto=format&fit=crop",
        description:
          "Study in the innovative city of San Francisco, California.",
      },
      {
        id: 3,
        name: "Sydney",
        image:
          "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=2670&auto=format&fit=crop",
        description: "Experience world-class education in sunny Sydney, Australia.",
      },
      {
        id: 4,
        name: "Dubai",
        image:
          "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2670&auto=format&fit=crop",
        description: "Discover new opportunities in futuristic Dubai, UAE.",
      },
      {
        id: 5,
        name: "Tokyo",
        image:
          "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2670&auto=format&fit=crop",
        description: "Dive into tech-driven education in vibrant Tokyo, Japan.",
      },
    ],
  };

  useEffect(() => {
    const totalImages = scholarshipData.destinations.length;
    const totalScrollDistance = window.innerHeight * 2;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: `+=${totalScrollDistance}`,
        pin: true,
        anticipatePin: 1,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const index = Math.floor(progress * (totalImages - 1));
          setActiveIndex(index);
        },
      });

      scholarshipData.destinations.forEach((_, index) => {
        const progress = index / (totalImages - 1);

        gsap.fromTo(
          imagesRef.current[index],
          { width: 160, height: 160 },
          {
            width: 400,
            height: 400,
            ease: 'power1.inOut',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top top',
              end: `+=${totalScrollDistance}`,
              scrub: true,
              onUpdate: (self) => {
                const selfProgress = self.progress;
                const distanceFromPeak = Math.abs(selfProgress - progress);
                const normalizedSize = 1 - Math.min(distanceFromPeak / 0.15, 1);
                const size = 160 + normalizedSize * 240;

                gsap.set(imagesRef.current[index], {
                  width: size,
                  height: size,
                });
              },
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="bg-blue-50 px-8 pt-20 min-h-screen flex flex-col justify-between items-start overflow-hidden"
      >
        {/* Header */}
        <div className="pb-8">
          <h1 className="text-5xl md:text-7xl font-bold">
            <span className="text-black">Find</span>{' '}
            <span className="text-gray-700">Scholarship</span>
          </h1>

          <div className="w-96 absolute right-10 top-28">
            <h2 className="text-3xl font-bold mt-8 mb-4">
              {scholarshipData.title}
            </h2>
            <p className="text-gray-700 mb-4">
              {scholarshipData.destinations[activeIndex]?.description}
            </p>
          </div>
        </div>

        {/* Image Row */}
        <div className="flex gap-6 justify-center items-center">
          {scholarshipData.destinations.map((destination, index) => (
            <div
              key={destination.id}
              ref={(el) => (imagesRef.current[index] = el)}
              className="bg-white rounded-lg shadow-md overflow-hidden w-[160px] h-[160px] flex-shrink-0 transition-all duration-300"
            >
              <img
                src={destination.image}
                alt={destination.name}
                className="w-full h-full object-cover"
              />
              <div className="p-2 text-center font-semibold text-sm">
                {destination.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const images = [
    'https://picsum.photos/id/231/800/800',
    'https://picsum.photos/id/232/800/800',
    'https://picsum.photos/id/233/800/800',
    'https://picsum.photos/id/234/800/800',
    'https://picsum.photos/id/235/800/800',
];

export default function ScholarshipScroll() {
  const containerRef = useRef(null);
  const imagesRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=3000', // Adjust based on scroll length
        pin: true,
        scrub: true,
      });

      imagesRef.current.forEach((img, i) => {
        if (!img) return;
        gsap.fromTo(
          img,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: i === images.length - 1 ? 1.5 : 1,
            scrollTrigger: {
              trigger: containerRef.current,
              start: `${i * 20}% center`,
              end: `${(i + 1) * 20}% center`,
              scrub: true,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="h-[100vh] w-full bg-blue-50 overflow-hidden relative">
      <div className=" h-full space-y-10">
        <h1 className="text-7xl font-bold">
          <span className="text-black">Find</span>{' '}
          <span className="text-gray-700">Scholarship</span>
        </h1>
        <div className=" flex gap-6">
          {images.map((src, index) => (
            <img
              key={index}
              ref={(el) => (imagesRef.current[index] = el)}
              src={src}
              alt={`Scholarship Image ${index + 1}`}
              className="w-40 h-60 object-cover rounded-xl shadow-lg transition-transform duration-300"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

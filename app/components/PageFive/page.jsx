'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const imageUrls = [
  'https://picsum.photos/id/231/800/800',
  'https://picsum.photos/id/232/800/800',
  'https://picsum.photos/id/233/800/800',
  'https://picsum.photos/id/234/800/800',
  'https://picsum.photos/id/235/800/800',
];

const titles = [
  'Mountain Bliss',
  'Urban Exploration',
  'Serenity Lake',
  'Desert Mirage',
  'Sunset Dreams',
];

export default function PageFive() {
  const containerRef = useRef(null);
  const imageRefs = useRef([]);
  const [expandedIndexes, setExpandedIndexes] = useState([0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          id: 'gallery-scroll',
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${imageUrls.length * 400}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const index = Math.floor(self.progress * (titles.length - 1));
            setExpandedIndexes([index]);
            expandOnly(index);
          },
        },
      });

      const expandOnly = (indexToExpand) => {
        imageRefs.current.forEach((img, i) => {
          gsap.to(img, {
            width: i === indexToExpand ? '24rem' : '10rem',
            duration: 0.2,
            ease: 'power2.out',
          });
        });
      };

      // Set initial expansion
      expandOnly(0);

      imageRefs.current.forEach((img, i) => {
        img.addEventListener('mouseenter', () => {
          gsap.to(img, {
            width: '24rem',
            duration: 0.2,
            ease: 'power2.out',
          });
          setExpandedIndexes((prev) => Array.from(new Set([...prev, i])));
        });

        img.addEventListener('mouseleave', () => {
          const scrollTrigger = ScrollTrigger.getById('gallery-scroll');
          const scrollIndex = Math.floor(
            (scrollTrigger?.progress || 0) * (titles.length - 1)
          );

          if (i !== scrollIndex) {
            gsap.to(img, {
              width: '10rem',
              duration: 0.2,
              ease: 'power2.out',
            });
            setExpandedIndexes((prev) => prev.filter((id) => id !== i));
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const mainIndex = expandedIndexes[expandedIndexes.length - 1] ?? 0;

  return (
    <>
      <section
        ref={containerRef}
        className="h-screen w-full py-6 bg-black text-white"
      >
        <div className="text-center text-3xl font-bold mb-3 transition-all">
          {titles[mainIndex]}
        </div>

        <div className="flex h-full justify-center mb-4 gap-4">
          {imageUrls.map((img, index) => (
            <div
              key={index}
              ref={(el) => (imageRefs.current[index] = el)}
              className="w-40 h-full flex-shrink-0 flex items-center relative group transition-all duration-300"
            >
              <img
                src={img}
                alt={`Gallery image ${index}`}
                className="w-full h-full object-cover rounded-xl shadow-xl pointer-events-auto"
              />
              <div
                className={`absolute inset-0 flex items-center justify-center  bg-opacity-50 text-center transition-opacity duration-300 ${
                  expandedIndexes.includes(index)
                    ? 'opacity-100'
                    : 'opacity-0'
                }`}
              >
                <span className="text-white text-xl font-semibold">
                  {titles[index]}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* extra scrollable space */}
          
    </>
  );
}

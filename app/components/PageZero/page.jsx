'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PageZero = () => {
  const sectionRef = useRef(null);
  const galleryRef = useRef(null);

  useEffect(() => {
    // Make sure we've loaded GSAP and ScrollTrigger
    if (typeof window !== 'undefined') {
      // Create the pinning and rotation effect
      const ctx = gsap.context(() => {
        // Pin the entire section
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top", 
          end: "+=300%", // Makes the section stay pinned for 3x its height of scrolling
          pin: true,
          pinSpacing: true,
        });
        
        // Rotate the gallery as we scroll
        gsap.to('.GG', {
          rotateY: 360,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=300%", // Match the pinning duration
            scrub: 1, // Smooth scrubbing
          }
        });
      }, sectionRef);
      
      return () => {
        // Clean up all ScrollTriggers when component unmounts
        ctx.revert();
        ScrollTrigger.getAll().forEach(st => st.kill());
      };
    }
  }, []);

  const imageUrls = [
    'https://picsum.photos/id/231/800/800',
    'https://picsum.photos/id/232/800/800',
    'https://picsum.photos/id/233/800/800',
    'https://picsum.photos/id/234/800/800',
    'https://picsum.photos/id/235/800/800',
    'https://picsum.photos/id/236/800/800',
    'https://picsum.photos/id/237/800/800',
    'https://picsum.photos/id/238/800/800',
    'https://picsum.photos/id/239/800/800',
    'https://picsum.photos/id/240/800/800'
  ];

  return (
    <>
      {/* The section that will be pinned */}
      <h1 className='text-9xl font-bold pt-2  text-center w-full'>DO IT</h1>

      <section 
        ref={sectionRef}
        className="w-full h-screen bg-white  flex items-center justify-center overflow-hidden"
      >
        <div 
          ref={galleryRef}
          className="w-[1200px] h-[1200px] [perspective:2000px]"
        >
          <div 
            className="GG relative w-full h-full [transform-style:preserve-3d]"
            style={{ border: 'none', outline: 'none' }}
          >
            {imageUrls.map((url, i) => (
              <div
                key={i}
                className="absolute w-full h-full"
                style={{
                  transform: `rotateY(${i * 36}deg) translateZ(2500px)`,
                  border: 'none',
                  outline: 'none'
                }}
              >
                <img
                  src={url}
                  alt={`Gallery image ${i + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                  style={{ border: 'none', outline: 'none' }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      
     
    </>
  );
};

export default PageZero;
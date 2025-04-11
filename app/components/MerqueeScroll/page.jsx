'use client';
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Observer } from 'gsap/Observer';

gsap.registerPlugin(Observer);

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
  'https://picsum.photos/id/240/800/800',
];

const GalleryComponent = () => {
  const galleryRef = useRef(null);
  const rotation = useRef({ y: 0 });
  const velocity = useRef({ speed: 1 });

  useEffect(() => {
    const gallery = galleryRef.current;

    const update = () => {
      rotation.current.y += 0.1 * velocity.current.speed;
      gsap.set(gallery, {
        rotationY: rotation.current.y % 360,
      });
    };

    gsap.ticker.add(update);

    Observer.create({
      target: window,
      type: 'wheel,touch',
      onChangeY(self) {
        const direction = self.deltaY > 0 ? 1 : -1;
        const newSpeed = 35 * direction;

        gsap.fromTo(
          velocity.current,
          { speed: newSpeed },
          {
            speed: 6,
            duration: 1.2,
            ease: 'power2.out',
            overwrite: true,
          }
        );
      },
      preventDefault: false,
      capture: false,
      tolerance: 10,
    });

    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <>
      {/* Top Header */}
      <section className="relative w-full bg-white pb-20 overflow-hidden">
        <div className="text-center max-w-5xl mx-auto py-24 px-6">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800">
            Discover Vibrant Cities For <br />
            Top QS Ranked Courses
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            From the bustling streets of New York to the historic charm of Paris,<br />
            explore the most iconic cities around the world.
          </p>
        </div>

        {/* Curved wave using SVG */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] rotate-180 z-10">
          <svg
            viewBox="0 0 500 80"
            preserveAspectRatio="none"
            className="w-full h-32"
          >
            <path
              d="M0,30 C150,80 350,0 500,30 L500,00 L0,0 Z"
              className="fill-blue-100"
            />
          </svg>
        </div>
      </section>

      {/* Gallery Carousel */}
      <section className="w-full h-screen bg-blue-100 flex items-center justify-center overflow-hidden relative">
        <div className="w-[1200px] h-[1200px] [perspective:2000px]">
          <div
            ref={galleryRef}
            className="relative w-full h-full [transform-style:preserve-3d]"
          >
            {imageUrls.map((url, i) => (
              <div
                key={i}
                className="absolute w-full h-full"
                style={{
                  transform: `rotateY(${i * 36}deg) translateZ(2500px)`,
                }}
              >
                <div className='w-[3000px] h-[1200px] -top-0 left-0 absolute -z-10 bg-amber-300'>

                    </div>
                <img
                  src={url}
                  alt={`Gallery image ${i + 1}`}
                  className="w-full h-[1200px] object-cover rounded-xl shadow-xl"
                  />
                  </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default GalleryComponent;

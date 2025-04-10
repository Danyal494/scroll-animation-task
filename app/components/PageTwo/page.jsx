'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default function PageTwo() {
  const containerRef = useRef(null);
  const sectionsRef = useRef([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeImage, setActiveImage] = useState(null); // Initialize as null, not 1
  const [scrollDirection, setScrollDirection] = useState('down');
  const prevScrollY = useRef(0);
  
  const images = [
    '/img1.png',
    '/img2.png',
    '/img3.png',
    '/img4.png',
    '/img5.png',
    '/img6.png',
    '/img7.png',
    '/img8.png',
  ];

  const imageNames = [
    'Restaurant & Coffee',
    'Office Entrance',
    'Meeting Rooms',
    'Common Areas',
    'Work Spaces',
    'Event Space',
    'Rooftop Terrace',
    'Bike Storage'
  ];

  // Set active image based on both hover and scroll
  const displayedImage = activeImage || currentPage;

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Track scroll direction
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > prevScrollY.current) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
      prevScrollY.current = currentScrollY;
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Set up scroll triggers for each section
    sectionsRef.current.forEach((section, i) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => {
          setScrollDirection('down');
          setCurrentPage(i + 1);
        },
        onEnterBack: () => {
          setScrollDirection('up');
          setCurrentPage(i + 1);
        },
      });
    });

    // Force initial ScrollTrigger refresh to ensure triggers are properly set up
    ScrollTrigger.refresh();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="w-full flex flex-row">
      {/* Left side fixed content */}
      <div className="w-1/3 h-screen sticky top-0 text-black z-10 bg-white">
        <div className="flex h-full flex-col justify-between items-center p-8">
          <div className="w-full">
            <p className="font-semibold text-3xl mb-4">The One with an attractive atmosphere that invites you to step into the office.</p>
            <p>In addition, we strive to build a strong sense of community that matches the vibrant culture of the NDSM wharf. By creating opportunities and spaces for collaboration, networking and spontaneous interactions, we make our tenants feel part of something bigger.</p>
          </div>
          <div className="flex justify-between items-center gap-6 w-full">
            <p>The colors indicate the side of the ➊ that has those amenities.</p>
            <div className="w-80">
              <ul className="space-y-2">
                {imageNames.map((name, index) => (
                  <li 
                    key={index}
                    className={`cursor-pointer py-2 px-4 rounded-md transition-all ${displayedImage === index + 1 ? 'bg-gray-200 font-semibold' : 'hover:bg-gray-100'}`}
                    onMouseEnter={() => setActiveImage(index + 1)}
                    onMouseLeave={() => setActiveImage(null)}
                  >
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right side container with image and scroll sections */}
      <div className="w-full relative" ref={containerRef}>
        {/* Current image - animates in from top or bottom */}
        <div className="sticky top-1 left-0 w-full h-[99vh] border-8 border-white overflow-hidden">
          {images.map((src, i) => (
            <div 
              key={i}
              className="absolute top-0 left-0 w-full h-screen"
              style={{
                opacity: displayedImage === i + 1 ? 1 : 0,
                transform: activeImage ? 'translateY(0)' : `translateY(${
                  currentPage === i + 1 
                    ? '0' 
                    : (scrollDirection === 'up' && i + 1 > currentPage) || (scrollDirection === 'down' && i + 1 < currentPage)
                      ? '100%' 
                      : '-100%'
                })`,
                transition: 'opacity 0.5s ease, transform 0.5s ease',
                zIndex: displayedImage === i + 1 ? 30 : 10
              }}
            >
              <img
                src={src}
                alt={`Panel ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        
        {/* Empty sections for scroll tracking */}
        {images.map((_, i) => (
          <div 
            key={i}
            ref={(el) => (sectionsRef.current[i] = el)}
            className="h-screen w-full opacity-0"
          />
        ))}
      </div>
    </div>
  );
}
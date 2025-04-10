'use client'
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function PageOne() {
  const containerRef = useRef();
  
  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    const panels = document.querySelectorAll('.scroll-panel');
    
    if (panels.length === 0) return;
    
    // Calculate total scroll height needed for all panels
    const totalPanels = panels.length + 1; // +1 for the first panel
    
    // Set initial position for panels (off-screen)
    gsap.set(panels, { xPercent: 100 });
    
    // Create a single ScrollTrigger for the entire sequence
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: `+=${window.innerHeight * totalPanels}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        // markers: true, // Enable for debugging
      }
    });
    
    // Add each panel animation to the timeline sequentially
    panels.forEach((panel) => {
      tl.to(panel, { 
        xPercent: 0, 
        ease: "power2.inOut",
        duration: 1 // Each panel takes the same portion of the timeline
      });
    });
    
    // Clean up
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  return (
    <div 
      ref={containerRef} 
      className="h-screen relative overflow-hidden"
    >
      {/* Panel ONE */}
      <div className="absolute w-full h-screen bg-red-500 align-text-bottom text-[800px]  text-white  font-bold">

      1
      </div>
      
      {/* Panel TWO */}
      <div className="scroll-panel absolute top-0 left-40 w-full h-screen bg-yellow-500  text-white align-text-bottom text-[800px] font-bold">
    2
      </div>
      
      {/* Panel THREE */}
      <div className="scroll-panel absolute top-0 left-60 w-full h-screen bg-green-700  text-white align-text-bottom text-[800px] font-bold">
        3
      </div>
      
      {/* Panel FOUR */}
      <div className="scroll-panel absolute top-0 left-80 w-full h-screen bg-blue-600  text-white align-text-bottom text-[800px] font-bold">
     4
      </div>
    </div>
  );
}
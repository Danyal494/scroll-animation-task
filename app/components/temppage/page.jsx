"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const scholarships = [
  {
    id: 1,
    title: "Australia Student Scholarship Opportunity",
    description:
      "Unlock your future with an Australia Student Scholarship - empowering bright minds to achieve academic excellence abroad. Apply now and take the first step toward your global journey.",
    description2:
      "Unlock your future with an Australia Student Scholarship - empowering bright minds to achieve academic excellence abroad. Apply now and take the first step toward your global journey.",
    mainImage: "/placeholder.svg?height=500&width=600",
    alt: "Sydney Opera House",
  },
  {
    id: 2,
    title: "UK Academic Excellence Scholarship",
    description:
      "Study at prestigious British institutions with the UK Academic Excellence Scholarship. Designed for outstanding students looking to expand their horizons in one of the world's educational capitals.",
    description2:
      "Benefit from world-class teaching, diverse cultural experiences, and extensive networking opportunities that will shape your future career.",
    mainImage: "/placeholder.svg?height=500&width=600",
    alt: "St. Paul's Cathedral",
  },
  {
    id: 3,
    title: "USA Innovation Scholarship Program",
    description:
      "Join America's leading universities with the USA Innovation Scholarship. This program supports talented international students pursuing degrees in technology, business, and creative fields.",
    description2:
      "Experience cutting-edge research facilities and collaborative learning environments that foster innovation and entrepreneurship.",
    mainImage: "/placeholder.svg?height=500&width=600",
    alt: "Golden Gate Bridge",
  },
  {
    id: 4,
    title: "Global Cities Academic Scholarship",
    description:
      "Explore educational opportunities in the world's most dynamic urban centers with the Global Cities Scholarship. This program connects ambitious students with universities in international hub cities.",
    description2:
      "Immerse yourself in diverse cultural environments while receiving quality education that prepares you for a global career.",
    mainImage: "/placeholder.svg?height=500&width=600",
    alt: "City Skyline",
  },
  {
    id: 5,
    title: "Dubai Future Leaders Scholarship",
    description:
      "Shape tomorrow's innovations with the Dubai Future Leaders Scholarship. This prestigious program invites exceptional students to study in one of the world's fastest-growing global cities.",
    description2:
      "Gain exposure to cutting-edge developments in business, technology, and sustainable urban planning in this dynamic international hub.",
    mainImage: "/placeholder.svg?height=500&width=600",
    alt: "Burj Al Arab",
  },
]

export default function TempPage() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const mainCardRef = useRef(null)
  const contentRef = useRef(null)
  const smallImagesRef = useRef(null)
  const titleRef = useRef(null)
  const descriptionRef = useRef(null)
  const description2Ref = useRef(null)

  const [activeScholarship, setActiveScholarship] = useState(0)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const total = scholarships.length

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${100 * total}%`,
          scrub: true,
          pin: true,
          markers: true,
        },
      })

      for (let i = 0; i < total; i++) {
        scrollTl
          .call(() => changeScholarship(i))
          .to({}, { duration: 1 }) 
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      )

      gsap.fromTo(
        mainCardRef.current,
        { x: 200, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          delay: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      )

      gsap.fromTo(
        contentRef.current,
        { x: 200, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          delay: 0.4,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      )

      gsap.fromTo(
        smallImagesRef.current?.children,
        { x: 200, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          delay: 0.6,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const changeScholarship = (index) => {
    // if (index === activeScholarship) return

    const timeline = gsap.timeline()

    timeline.to(
      [titleRef.current, descriptionRef.current, description2Ref.current],
      {
        opacity: 0,
        y: -20,
        duration: 0.3,
        stagger: 0.05,
        onComplete: () => {
          setActiveScholarship(index)
        },
      }
    )
  }

  useEffect(() => {
    const image = mainCardRef.current?.querySelector("img")

    gsap.fromTo(
      image,
      { opacity: 0.5, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.5 }
    )

    gsap.fromTo(
      [titleRef.current, descriptionRef.current, description2Ref.current],
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 }
    )
  }, [activeScholarship])

  return (
    <section
      ref={sectionRef}
      className="bg-slate-100 py-16 px-4 md:px-8 lg:px-16 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div ref={headerRef} className="mb-10">
          <h2 className="text-5xl font-bold">
            <span className="text-black">Find</span>
            <span className="font-normal ml-2">Scholarship</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div ref={mainCardRef} className="rounded-3xl overflow-hidden">
            <Image
              src={scholarships[activeScholarship].mainImage}
              alt={scholarships[activeScholarship].alt}
              width={600}
              height={500}
              className="w-full h-full object-cover transition-transform duration-500"
            />
          </div>

          <div ref={contentRef} className="flex flex-col justify-center">
            <h3 ref={titleRef} className="text-3xl font-bold mb-4">
              {scholarships[activeScholarship].title}
            </h3>
            <p ref={descriptionRef} className="text-gray-700 mb-3">
              {scholarships[activeScholarship].description}
            </p>
            <p ref={description2Ref} className="text-gray-700 mb-3">
              {scholarships[activeScholarship].description2}
            </p>
          </div>
        </div>

        <div
          ref={smallImagesRef}
          className="grid grid-cols-2 sm:grid-cols-5 gap-4"
        >
          {scholarships.map((scholarship, index) => (
            <div
              key={scholarship.id}
              className={`rounded-xl overflow-hidden h-28 cursor-pointer transition-all duration-300 ${
                activeScholarship === index
                  ? "ring-4 ring-offset-2 ring-teal-500 scale-105"
                  : "hover:scale-105"
              }`}
              onMouseEnter={() => changeScholarship(index)}
            >
              <Image
                src="/placeholder.svg?height=112&width=150"
                alt={scholarship.alt}
                width={150}
                height={112}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

"use client"

import DomeGallery from "@/components/DomeGallery"

export default function EventsSection() {
  // Event photos from the events folder
  const eventImages = [
    {
      src: "/events/DSC09518 (1).JPG",
      alt: "Event 1"
    },
    {
      src: "/events/DSC09573 (1).JPG",
      alt: "Event 2"
    },
    {
      src: "/events/IMG_6200 (1).JPG",
      alt: "Event 3"
    },
    {
      src: "/events/IMG_6376 (1).JPG",
      alt: "Event 4"
    },
    {
      src: "/events/IMG_7355 (2).JPG",
      alt: "Event 5"
    },
    {
      src: "/events/WhatsApp Image 2025-12-29 at 00.28.25.jpeg",
      alt: "Event 6"
    }
  ]

  return (
    <section id="events" className="bg-black min-h-screen">
      <div className="container mx-auto py-20">
        <h1 className="text-5xl md:text-7xl font-bold text-center mb-10 text-white">
          Events
        </h1>
      </div>
      <div style={{ width: '100vw', height: '80vh' }}>
        <DomeGallery 
          images={eventImages}
          grayscale={false}
          enlargeTransitionMs={400}
        />
      </div>
    </section>
  )
}

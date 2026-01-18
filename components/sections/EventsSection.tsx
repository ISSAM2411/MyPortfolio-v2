"use client"

import ScrollStack, { ScrollStackItem } from "@/components/ScrollStack"

export default function EventsSection() {
  // Event photos from the events folder
  const events = [
    {
      id: 1,
      src: "/events/DSC09518 (1).JPG",
      title: "Event 1"
    },
    {
      id: 2,
      src: "/events/DSC09573 (1).JPG",
      title: "Event 2"
    },
    {
      id: 3,
      src: "/events/IMG_6200 (1).JPG",
      title: "Event 3"
    },
    {
      id: 4,
      src: "/events/IMG_6376 (1).JPG",
      title: "Event 4"
    },
    {
      id: 5,
      src: "/events/IMG_7355 (2).JPG",
      title: "Event 5"
    },
    {
      id: 6,
      src: "/events/WhatsApp Image 2025-12-29 at 00.28.25.jpeg",
      title: "Event 6"
    }
  ]

  return (
    <section id="events" className="bg-black">
      <div className="container mx-auto py-20">
        <h1 className="text-5xl md:text-7xl font-bold text-center mb-20 text-white">
          Events
        </h1>
      </div>
      <ScrollStack>
        {events.map((event, index) => (
          <ScrollStackItem key={event.id} index={index} total={events.length}>
            <div className="bg-neutral-900/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl border border-neutral-800">
              <div className="relative aspect-[4/5] md:aspect-[3/4] lg:aspect-video">
                <img
                  src={event.src}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-6 left-6 bg-black/70 backdrop-blur-md px-6 py-3 rounded-full">
                  <h2 className="text-[#8df0cc] font-mono text-2xl md:text-3xl font-bold">
                    {event.title}
                  </h2>
                </div>
              </div>
            </div>
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </section>
  )
}

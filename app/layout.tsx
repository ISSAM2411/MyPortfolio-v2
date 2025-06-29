import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono, Playfair_Display, Poppins } from "next/font/google"
import "./globals.css"

// Police principale pour le texte
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

// Police pour les titres élégants
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

// Police moderne pour les titres principaux
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
})

// Police monospace pour le code
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Boussebata Issam - Software Engineer Portfolio",
  description:
    "4th Year Student at Higher National School of Computer Science | President of CSE Club | Frontend Developer at Ourquilane",
  keywords: ["Software Engineer", "Full Stack Developer", "React", "Next.js", "Portfolio"],
  authors: [{ name: "Boussebata Issam" }],
  creator: "Boussebata Issam",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://issam-portfolio.vercel.app",
    title: "Boussebata Issam - Software Engineer Portfolio",
    description: "Découvrez mon parcours et mes projets en tant qu'ingénieur logiciel",
    siteName: "Issam Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Boussebata Issam - Software Engineer Portfolio",
    description: "Découvrez mon parcours et mes projets en tant qu'ingénieur logiciel",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable} ${poppins.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}

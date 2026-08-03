import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "HARSHA OS 2030 | Korivi Harsha Vardhan | AI & ML Engineer Portfolio",
  description: "Futuristic portfolio & interactive AI Operating System of Korivi Harsha Vardhan. Discover cutting-edge machine learning models, computer vision systems, and robust software architectures.",
  keywords: ["Korivi Harsha Vardhan", "Harsha OS", "AI Engineer", "Machine Learning Portfolio", "Computer Vision Developer", "Python Expert", "Software Engineer Hyderabad", "Awwwards Portfolio"],
  authors: [{ name: "Korivi Harsha Vardhan" }],
  metadataBase: new URL("https://harsha-os.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "HARSHA OS 2030 | The Future of Intelligent Engineering",
    description: "Experience the interactive AI Operating System portfolio of Korivi Harsha Vardhan, featuring computer vision, deep learning pipelines, and full-stack software systems.",
    url: "https://harsha-os.vercel.app",
    siteName: "HARSHA OS",
    locale: "en_US",
    type: "profile",
    firstName: "Harsha Vardhan",
    lastName: "Korivi",
    username: "koriviharshavardhan",
    gender: "male",
  },
  twitter: {
    card: "summary_large_image",
    title: "HARSHA OS 2030 | AI & ML Engineer Portfolio",
    description: "Step into an immersive, futuristic AI Operating System showcasing Korivi Harsha Vardhan's engineering expertise.",
    creator: "@harsha_korivi",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Korivi Harsha Vardhan",
    "jobTitle": "Artificial Intelligence & Machine Learning Engineer",
    "alumniOf": {
      "@type": "CollegeOrUniversity",
      "name": "Malla Reddy College of Engineering and Technology, Hyderabad"
    },
    "knowsAbout": ["Artificial Intelligence", "Machine Learning", "Computer Vision", "Deep Learning", "Python", "TensorFlow", "Software Engineering"],
    "sameAs": [
      "https://github.com/koriviharshavardhan",
      "https://www.linkedin.com/in/korivi-harsha-vardhan-87b97b2b7"
    ],
    "url": "https://harsha-os.vercel.app"
  };

  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${ibmPlexMono.variable} dark h-full antialiased`}
      style={{ colorScheme: "dark" }}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#04070B] text-white min-h-full font-sans antialiased overflow-x-hidden selection:bg-[#00E5FF]/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}


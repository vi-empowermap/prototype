import { Inter } from "next/font/google";
import "./globals.css";
import RecoilContextProvider from "./components/recoilContextProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PADLAS",
  description: "PADLAS description",
  openGraph: {
    title: "PADLAS",
    description: "A description for PADLAS",
    type: "website",
    url: "https://yourdomain.com", // Replace with your actual site URL
    images: [
      {
        url: "/images/og-image.png", // Path to your Open Graph image in the public directory
        width: 1200,                 // Optional: specify width
        height: 630,                 // Optional: specify height
        alt: "A descriptive alt text", // Optional: alt text for the image
      },
    ],
  },

};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
      <link rel="icon" href="/images/favicon.ico" sizes="any" />
      <meta name="title" content={"We want them Back! makes information about Ancestral Remains of ancestors from colonial contexts accessible and visible."} />
      </head>
      <body suppressHydrationWarning={true} className={inter.className}>
        <RecoilContextProvider>{children}</RecoilContextProvider>
      </body>
    </html>
  );
}

import { Outfit } from "next/font/google";
import "./globals.css";
import { AppContextProvider } from "../context/AppContext";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from '@clerk/nextjs'

const outfit = Outfit({ subsets: ['latin'], weight: ["300", "400", "500"] })

export const metadata = {
  title: "Zenotech",
  description: "An application where you find electronic items at lowest price ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <body className={`${outfit.className} antialiased text-gray-700`} >
        <ClerkProvider>
          <Toaster />
          <AppContextProvider>
            {children}
          </AppContextProvider>
      </ClerkProvider>
        </body>
      </html>
  );
}

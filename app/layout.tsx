import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { QueryClientProvider } from "@/providers/queryProvider";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import GlobalSearchBar from "@/components/SearchBar/globalSearchBar";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Recipe Finder",
  description: "Find the best recipe",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <QueryClientProvider>
          <Header/>
          <GlobalSearchBar/>
          <main className="flex-1">
            {children}
          </main>
        </QueryClientProvider>
      </body>
    </html>
  );
}

import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Codename-pixa",
  description: "Stay tuned",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="h-screen overflow-hidden flex flex-col items-center">
            <div className="flex-1 w-full flex flex-col items-center gap-4">
              <nav className="sticky top-0 z-50 bg-background w-full flex justify-center h-16">
                <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
                  <HeaderAuth />
                </div>
              </nav>
              <div className="bg-zinc-100 dark:bg-zinc-900 rounded-xl h-[calc(100vh-100px)] w-[calc(100vw-48px)] overflow-y-auto flex flex-col p-5">
                {children}
              </div>
            </div>
          </main>
          <ToastContainer />
        </ThemeProvider>
      </body>
    </html>
  );
}

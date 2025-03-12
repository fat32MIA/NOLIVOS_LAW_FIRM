import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Api-settings | Nolivos Law",
  description: "Admin Api-settings for Nolivos Law Firm",
}

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  )
}

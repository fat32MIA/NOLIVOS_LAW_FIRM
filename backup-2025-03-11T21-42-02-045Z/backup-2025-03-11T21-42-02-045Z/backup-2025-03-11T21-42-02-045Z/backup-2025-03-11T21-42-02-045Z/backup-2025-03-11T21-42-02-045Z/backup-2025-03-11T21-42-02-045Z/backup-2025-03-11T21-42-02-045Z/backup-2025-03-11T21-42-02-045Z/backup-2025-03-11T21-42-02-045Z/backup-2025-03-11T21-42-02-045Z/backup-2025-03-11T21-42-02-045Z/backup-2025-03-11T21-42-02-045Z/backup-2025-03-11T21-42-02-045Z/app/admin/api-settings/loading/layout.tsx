import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Api-settings Loading | Nolivos Law",
  description: "Admin Api-settings Loading for Nolivos Law Firm",
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

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Legal-assistant | Nolivos Law",
  description: "Legal-assistant for Nolivos Law Firm",
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

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Client Dashboard Loading | Nolivos Law",
  description: "Client Dashboard Loading for Nolivos Law Firm",
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

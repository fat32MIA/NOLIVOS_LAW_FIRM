import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Lawyer Dashboard Loading | Nolivos Law",
  description: "Lawyer Dashboard Loading for Nolivos Law Firm",
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

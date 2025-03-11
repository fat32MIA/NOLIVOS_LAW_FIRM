import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Paralegal Dashboard Loading | Nolivos Law",
  description: "Paralegal Dashboard Loading for Nolivos Law Firm",
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

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Api Documents Questions | Nolivos Law",
  description: "Api Documents Questions for Nolivos Law Firm",
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

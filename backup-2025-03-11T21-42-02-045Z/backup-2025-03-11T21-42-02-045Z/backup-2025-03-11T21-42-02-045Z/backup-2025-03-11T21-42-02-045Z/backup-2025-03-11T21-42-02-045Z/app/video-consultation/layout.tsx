import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Video-consultation | Nolivos Law",
  description: "Video-consultation for Nolivos Law Firm",
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

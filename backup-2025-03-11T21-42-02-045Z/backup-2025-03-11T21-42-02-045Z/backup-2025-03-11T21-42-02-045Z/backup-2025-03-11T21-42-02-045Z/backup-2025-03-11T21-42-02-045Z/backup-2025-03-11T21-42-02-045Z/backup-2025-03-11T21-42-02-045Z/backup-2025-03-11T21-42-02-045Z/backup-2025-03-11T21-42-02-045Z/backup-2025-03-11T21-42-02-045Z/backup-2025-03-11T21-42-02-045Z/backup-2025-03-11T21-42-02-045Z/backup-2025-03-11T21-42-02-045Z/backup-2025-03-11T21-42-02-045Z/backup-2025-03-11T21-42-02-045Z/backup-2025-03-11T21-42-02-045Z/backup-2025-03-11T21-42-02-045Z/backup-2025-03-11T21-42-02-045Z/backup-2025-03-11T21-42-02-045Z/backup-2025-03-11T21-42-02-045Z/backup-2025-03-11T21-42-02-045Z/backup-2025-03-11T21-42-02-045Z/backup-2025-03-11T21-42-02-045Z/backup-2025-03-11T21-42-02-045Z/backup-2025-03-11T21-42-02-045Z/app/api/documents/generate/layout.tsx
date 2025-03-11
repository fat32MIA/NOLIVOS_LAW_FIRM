import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Api Documents Generate | Nolivos Law",
  description: "Api Documents Generate for Nolivos Law Firm",
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

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Api Analyze-document | Nolivos Law",
  description: "Api Analyze-document for Nolivos Law Firm",
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

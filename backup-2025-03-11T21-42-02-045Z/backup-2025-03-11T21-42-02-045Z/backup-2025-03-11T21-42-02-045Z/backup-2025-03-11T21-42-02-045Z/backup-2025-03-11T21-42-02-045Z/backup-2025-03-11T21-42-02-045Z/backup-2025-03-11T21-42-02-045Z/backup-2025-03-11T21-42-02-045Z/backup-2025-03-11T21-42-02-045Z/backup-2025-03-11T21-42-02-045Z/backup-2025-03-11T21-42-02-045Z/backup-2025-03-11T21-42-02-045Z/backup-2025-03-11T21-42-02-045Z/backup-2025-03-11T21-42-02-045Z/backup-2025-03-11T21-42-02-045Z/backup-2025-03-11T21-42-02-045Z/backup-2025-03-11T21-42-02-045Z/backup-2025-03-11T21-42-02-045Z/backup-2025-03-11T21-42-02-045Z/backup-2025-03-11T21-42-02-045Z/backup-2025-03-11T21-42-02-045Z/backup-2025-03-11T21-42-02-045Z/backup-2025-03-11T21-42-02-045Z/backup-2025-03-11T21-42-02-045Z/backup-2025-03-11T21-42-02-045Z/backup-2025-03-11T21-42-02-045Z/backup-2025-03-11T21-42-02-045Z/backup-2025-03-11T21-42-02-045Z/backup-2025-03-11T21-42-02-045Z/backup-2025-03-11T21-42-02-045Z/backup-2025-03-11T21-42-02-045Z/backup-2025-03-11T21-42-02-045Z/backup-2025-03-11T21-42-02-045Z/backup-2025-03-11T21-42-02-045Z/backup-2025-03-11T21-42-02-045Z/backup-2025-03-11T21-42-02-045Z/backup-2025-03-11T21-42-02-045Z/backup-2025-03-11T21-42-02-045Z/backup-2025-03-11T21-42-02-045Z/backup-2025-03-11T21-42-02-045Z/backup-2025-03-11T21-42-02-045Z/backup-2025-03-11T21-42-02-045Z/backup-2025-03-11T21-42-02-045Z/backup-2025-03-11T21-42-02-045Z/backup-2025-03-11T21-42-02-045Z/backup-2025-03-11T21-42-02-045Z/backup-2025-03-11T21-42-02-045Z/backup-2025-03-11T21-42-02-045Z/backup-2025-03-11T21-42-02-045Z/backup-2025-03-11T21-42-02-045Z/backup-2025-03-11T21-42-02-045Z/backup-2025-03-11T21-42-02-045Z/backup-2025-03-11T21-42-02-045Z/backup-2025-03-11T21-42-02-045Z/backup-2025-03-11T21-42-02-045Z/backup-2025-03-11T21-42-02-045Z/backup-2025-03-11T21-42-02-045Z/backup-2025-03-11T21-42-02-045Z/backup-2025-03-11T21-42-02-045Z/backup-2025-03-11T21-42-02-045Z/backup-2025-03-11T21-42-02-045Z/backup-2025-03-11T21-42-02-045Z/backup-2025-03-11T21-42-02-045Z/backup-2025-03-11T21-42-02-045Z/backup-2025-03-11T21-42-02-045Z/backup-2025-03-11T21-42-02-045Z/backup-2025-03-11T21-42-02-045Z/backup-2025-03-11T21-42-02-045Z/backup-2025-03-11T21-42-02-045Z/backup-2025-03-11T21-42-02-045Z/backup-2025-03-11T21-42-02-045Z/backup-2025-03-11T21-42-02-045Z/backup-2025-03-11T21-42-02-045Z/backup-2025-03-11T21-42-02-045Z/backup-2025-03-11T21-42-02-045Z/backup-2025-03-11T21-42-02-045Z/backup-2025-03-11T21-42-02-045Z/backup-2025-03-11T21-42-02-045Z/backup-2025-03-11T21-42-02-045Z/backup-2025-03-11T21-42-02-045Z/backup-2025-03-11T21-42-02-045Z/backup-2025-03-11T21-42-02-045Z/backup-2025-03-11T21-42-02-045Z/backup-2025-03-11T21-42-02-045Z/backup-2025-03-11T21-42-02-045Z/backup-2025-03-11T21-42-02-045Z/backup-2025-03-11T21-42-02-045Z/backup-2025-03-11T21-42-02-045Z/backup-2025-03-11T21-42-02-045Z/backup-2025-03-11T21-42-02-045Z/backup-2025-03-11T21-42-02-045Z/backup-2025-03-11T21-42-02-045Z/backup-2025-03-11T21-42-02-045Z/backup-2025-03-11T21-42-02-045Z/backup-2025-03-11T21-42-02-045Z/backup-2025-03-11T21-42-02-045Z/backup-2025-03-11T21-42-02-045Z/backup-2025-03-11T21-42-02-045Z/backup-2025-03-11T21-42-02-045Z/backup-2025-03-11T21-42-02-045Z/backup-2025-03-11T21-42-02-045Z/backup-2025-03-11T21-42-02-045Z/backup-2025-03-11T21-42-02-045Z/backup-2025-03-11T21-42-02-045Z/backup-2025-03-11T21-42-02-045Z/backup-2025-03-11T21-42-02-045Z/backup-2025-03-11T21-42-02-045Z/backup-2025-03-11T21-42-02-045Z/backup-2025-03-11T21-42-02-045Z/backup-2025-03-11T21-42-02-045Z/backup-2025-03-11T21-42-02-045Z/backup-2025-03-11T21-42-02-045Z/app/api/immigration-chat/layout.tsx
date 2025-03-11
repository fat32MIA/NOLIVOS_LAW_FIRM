import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Api Immigration-chat | Nolivos Law",
  description: "Api Immigration-chat for Nolivos Law Firm",
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

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Clients | Nolivos Law",
  description: "Admin Clients for Nolivos Law Firm",
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

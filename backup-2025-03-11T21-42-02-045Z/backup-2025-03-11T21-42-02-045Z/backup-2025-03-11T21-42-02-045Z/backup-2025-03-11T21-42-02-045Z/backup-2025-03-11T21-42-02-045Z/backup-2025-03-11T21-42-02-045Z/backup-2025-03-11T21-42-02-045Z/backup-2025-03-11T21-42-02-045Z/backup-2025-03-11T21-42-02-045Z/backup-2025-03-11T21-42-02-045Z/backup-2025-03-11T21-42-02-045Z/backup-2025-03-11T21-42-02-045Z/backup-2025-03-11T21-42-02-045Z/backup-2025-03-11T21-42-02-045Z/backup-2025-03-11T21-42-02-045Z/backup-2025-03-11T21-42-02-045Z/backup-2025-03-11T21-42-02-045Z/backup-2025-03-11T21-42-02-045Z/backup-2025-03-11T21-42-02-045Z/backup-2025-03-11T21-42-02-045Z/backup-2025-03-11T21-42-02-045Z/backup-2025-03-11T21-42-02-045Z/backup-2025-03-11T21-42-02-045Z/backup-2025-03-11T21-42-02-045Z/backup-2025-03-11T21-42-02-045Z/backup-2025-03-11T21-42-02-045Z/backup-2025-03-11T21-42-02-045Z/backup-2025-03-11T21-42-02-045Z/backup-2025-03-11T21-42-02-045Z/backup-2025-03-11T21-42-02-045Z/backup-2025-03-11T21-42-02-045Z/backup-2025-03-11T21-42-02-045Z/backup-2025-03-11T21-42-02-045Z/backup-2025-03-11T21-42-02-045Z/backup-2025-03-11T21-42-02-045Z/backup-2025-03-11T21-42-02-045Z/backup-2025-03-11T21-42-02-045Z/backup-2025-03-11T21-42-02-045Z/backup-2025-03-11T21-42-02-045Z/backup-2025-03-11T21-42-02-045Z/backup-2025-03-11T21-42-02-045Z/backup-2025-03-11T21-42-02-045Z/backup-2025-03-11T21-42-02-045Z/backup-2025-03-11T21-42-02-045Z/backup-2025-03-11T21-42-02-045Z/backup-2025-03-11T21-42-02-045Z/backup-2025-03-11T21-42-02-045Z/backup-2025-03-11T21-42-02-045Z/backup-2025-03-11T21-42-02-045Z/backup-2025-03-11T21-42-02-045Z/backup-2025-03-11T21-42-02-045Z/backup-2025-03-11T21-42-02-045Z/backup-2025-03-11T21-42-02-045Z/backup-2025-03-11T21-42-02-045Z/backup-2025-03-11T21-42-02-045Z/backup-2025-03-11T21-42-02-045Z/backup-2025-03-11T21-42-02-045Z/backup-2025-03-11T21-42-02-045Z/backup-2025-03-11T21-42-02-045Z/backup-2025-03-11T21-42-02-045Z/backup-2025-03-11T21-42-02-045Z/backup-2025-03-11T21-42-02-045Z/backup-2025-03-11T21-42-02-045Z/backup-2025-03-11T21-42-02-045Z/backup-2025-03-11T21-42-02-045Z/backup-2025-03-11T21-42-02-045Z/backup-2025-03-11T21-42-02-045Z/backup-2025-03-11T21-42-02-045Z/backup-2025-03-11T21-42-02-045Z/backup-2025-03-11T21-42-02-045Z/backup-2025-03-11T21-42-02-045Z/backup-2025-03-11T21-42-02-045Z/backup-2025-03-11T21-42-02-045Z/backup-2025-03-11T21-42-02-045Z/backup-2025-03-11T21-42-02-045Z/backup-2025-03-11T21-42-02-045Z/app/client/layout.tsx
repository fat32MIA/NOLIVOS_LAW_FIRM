// app/client/layout.tsx
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Client Dashboard | Nolivos Law",
  description: "Client portal for Nolivos Law Firm",
}

export default function ClientLayout({
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

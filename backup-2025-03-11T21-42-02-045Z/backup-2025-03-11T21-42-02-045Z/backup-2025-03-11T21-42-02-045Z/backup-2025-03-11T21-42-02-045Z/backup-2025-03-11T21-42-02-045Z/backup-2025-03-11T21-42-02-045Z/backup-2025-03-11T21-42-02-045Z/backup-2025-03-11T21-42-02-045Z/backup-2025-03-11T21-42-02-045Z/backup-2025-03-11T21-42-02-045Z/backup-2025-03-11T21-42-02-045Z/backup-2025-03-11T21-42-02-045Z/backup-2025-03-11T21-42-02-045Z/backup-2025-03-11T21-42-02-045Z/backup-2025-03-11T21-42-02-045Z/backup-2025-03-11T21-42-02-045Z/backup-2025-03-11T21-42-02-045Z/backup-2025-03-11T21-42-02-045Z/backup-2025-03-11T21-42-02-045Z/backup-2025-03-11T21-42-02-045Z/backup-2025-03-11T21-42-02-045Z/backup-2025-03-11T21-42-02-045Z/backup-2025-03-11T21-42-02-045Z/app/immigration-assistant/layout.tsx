// app/immigration-assistant/layout.tsx
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Immigration Assistant | Nolivos Law",
  description: "Get information about immigration processes, visas, naturalization, and more",
}

export default function ImmigrationAssistantLayout({
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

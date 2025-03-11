// app/document-scanner/layout.tsx
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Document Scanner | Nolivos Law",
  description: "Scan and analyze legal documents with OCR technology",
}

export default function DocumentScannerLayout({
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

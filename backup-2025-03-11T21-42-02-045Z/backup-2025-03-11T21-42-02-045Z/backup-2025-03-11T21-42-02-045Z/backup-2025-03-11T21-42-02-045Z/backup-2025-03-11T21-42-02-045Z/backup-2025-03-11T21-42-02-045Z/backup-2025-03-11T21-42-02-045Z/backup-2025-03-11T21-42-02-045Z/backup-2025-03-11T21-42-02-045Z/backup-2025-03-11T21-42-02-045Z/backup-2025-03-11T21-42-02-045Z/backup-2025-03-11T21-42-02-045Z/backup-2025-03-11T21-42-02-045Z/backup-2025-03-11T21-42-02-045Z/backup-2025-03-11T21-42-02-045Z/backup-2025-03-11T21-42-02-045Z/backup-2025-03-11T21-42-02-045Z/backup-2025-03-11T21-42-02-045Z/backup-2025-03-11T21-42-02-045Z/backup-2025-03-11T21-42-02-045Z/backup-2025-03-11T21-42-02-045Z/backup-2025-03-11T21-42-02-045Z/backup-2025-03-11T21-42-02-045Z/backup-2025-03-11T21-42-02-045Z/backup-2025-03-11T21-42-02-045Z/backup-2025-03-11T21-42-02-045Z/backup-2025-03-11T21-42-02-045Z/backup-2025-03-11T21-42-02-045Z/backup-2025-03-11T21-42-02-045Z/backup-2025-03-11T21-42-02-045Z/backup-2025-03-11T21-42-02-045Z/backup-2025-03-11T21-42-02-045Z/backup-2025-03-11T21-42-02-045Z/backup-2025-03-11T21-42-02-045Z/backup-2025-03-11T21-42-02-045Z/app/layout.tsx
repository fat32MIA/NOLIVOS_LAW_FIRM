import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Nolivos Law Firm',
  description: 'Servicios legales de inmigración',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className + " min-h-screen flex flex-col"} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
import { PHProvider } from '@/providers/posthog'
import './globals.css'

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return <PHProvider>{children}</PHProvider>
}

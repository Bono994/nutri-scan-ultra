import "./globals.css"
export const metadata = { title: "Nutri-Scan Ultra", description: "Le Yuka en 10x mieux" }
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="fr"><body>{children}</body></html>
}

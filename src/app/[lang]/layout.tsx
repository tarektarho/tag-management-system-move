import "../../styles/globals.scss"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Locale, i18n } from "@/i18n.config"
import Header from "./components/Header"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Tag Managment System"
}
export const generateStaticParams = async () => {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

const RootLayout = ({ children, params }:
  {
    children: React.ReactNode
    params: { lang: Locale }
  }) => {
  return (
    <html lang={params.lang}>
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  )
}

export default RootLayout

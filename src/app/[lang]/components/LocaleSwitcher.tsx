'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { i18n } from '@/i18n.config'
import { redirectedPathName } from "@/utils"

const LocaleSwitcher = () => {
  const pathName = usePathname()

  return (
    <ul className='flex gap-x-3'>
      {i18n.locales.map(locale => {
        return (
          <li className="text-sm" key={locale}>
            <Link
              href={redirectedPathName(locale, pathName)}
              className='rounded-md border bg-black px-3 py-2 text-white glass'
            >
              {locale.toLocaleUpperCase()}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export default LocaleSwitcher

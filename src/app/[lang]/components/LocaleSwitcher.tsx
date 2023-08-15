'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { i18n } from '@/i18n.config' // Import the internationalization configuration
import { redirectedPathName } from "@/utils" // Import a utility function for handling redirected paths

// Define the LocaleSwitcher functional component.
const LocaleSwitcher = () => {
  // Get the current pathname using the usePathname hook from Next.js.
  const pathName = usePathname()

  return (
    <ul className='flex gap-x-3'>
      {/* Map over available locales and create a list item for each. */}
      {i18n.locales.map(locale => {
        return (
          <li className="text-sm" key={locale}>
            {/* Create a link with the redirected path for each locale. */}
            <Link
              href={redirectedPathName(locale, pathName)}
              className='rounded-md border bg-black px-3 py-2 text-white glass'
            >
              {/* Display the locale in uppercase */}
              {locale.toLocaleUpperCase()}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export default LocaleSwitcher

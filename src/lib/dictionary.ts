// Import the module 'server-only', likely containing server-specific functionality.
import 'server-only'

// Import the type 'Locale' from the module '@/i18n.config'.
import type { Locale } from '@/i18n.config'

// Create an object 'dictionaries' that maps language codes to functions.
const dictionaries = {
  // For English language ('en'), create a function that imports the 'en.json' dictionary file asynchronously.
  en: () => import('@/dictionaries/en.json').then(module => module.default),

  // For Dutch language ('nl'), create a function that imports the 'nl.json' dictionary file asynchronously.
  nl: () => import('@/dictionaries/nl.json').then(module => module.default)
}

// Export a function 'getDictionary' that takes a 'locale' parameter of type 'Locale'.
export const getDictionary = async (locale: Locale) => dictionaries[locale]()

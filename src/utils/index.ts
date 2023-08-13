import { ITag } from "@/types/tags"

export const generateUUID = (): string => {
  const uuidFormat = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
  return uuidFormat.replace(/[xy]/g, (char: string) => {
    const random = Math.random() * 16 | 0
    const value = char === 'x' ? random : (random & 0x3 | 0x8) // For "4" in uuid
    return value.toString(16)
  })
}


export const formatISODateToHumanReadable = (isoDateString: string): string => {
  const isoDate = new Date(isoDateString)

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }

  const humanReadableDate = isoDate.toLocaleString('en-GB', options)
  return humanReadableDate as ITag['createdAt'] | ITag['updatedAt']
}


export const redirectedPathName = (locale: string, pathName: string) => {
  if (!pathName) return '/'
  const segments = pathName.split('/')
  segments[1] = locale
  return segments.join('/')
}

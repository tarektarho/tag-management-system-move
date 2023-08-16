
export const getCurrentTimestamp = (): number => {
  return Math.floor(Date.now() / 1000)
}

export const formatTimestampToHumanReadable = (timestamp: number): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }

  const formattedDate = new Date(timestamp * 1000).toLocaleDateString('en-GB', options)
  return formattedDate
}

export const redirectedPathName = (locale: string, pathName: string) => {
  if (!pathName) return '/'
  const segments = pathName.split('/')
  segments[1] = locale
  return segments.join('/')
}

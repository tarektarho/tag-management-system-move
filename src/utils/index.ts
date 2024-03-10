import * as Sentry from "@sentry/browser"

Sentry.init({
  dsn: "https://f3bd82cf6bdb1a3646ad6df9a894f7e9@o4506017367654400.ingest.sentry.io/4506017370144768",
})
export const getCurrentTimestamp = (): number => {
  return Math.floor(Date.now() / 1000)
}

export const formatTimestampToHumanReadable = (timestamp: number): string => {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZone: timeZone, // Get current time zone
  }

  const formattedDate = new Date(timestamp * 1000).toLocaleDateString("en-GB", options)
  return formattedDate
}

export const redirectedPathName = (locale: string, pathName: string) => {
  if (!pathName) return "/"
  const segments = pathName.split("/")
  segments[1] = locale
  return segments.join("/")
}

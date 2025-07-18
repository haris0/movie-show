export const formatDate = (
  dateStr?: string, 
  locale: Intl.LocalesArgument = 'en-US', 
  option: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
) => {
  if (!dateStr) return '';

  const date = new Date(dateStr);
  return date.toLocaleDateString(locale, option)
}


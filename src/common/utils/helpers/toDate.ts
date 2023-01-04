export default function toDate({
  dateString,
  options,
}: {
  dateString: string;
  options?: {
    show: {
      weekday?: Intl.DateTimeFormatOptions['weekday'];
      year?: Intl.DateTimeFormatOptions['year'];
      month?: Intl.DateTimeFormatOptions['month'];
      day?: Intl.DateTimeFormatOptions['day'];
      hour?: Intl.DateTimeFormatOptions['hour'];
      minute?: Intl.DateTimeFormatOptions['minute'];
    };
  };
}) {
  if (dateString) {
    if (options) {
      return new Date(dateString.replace(/-/g, '/')).toLocaleDateString(
        'en-US',
        options.show,
      );
    }
  } else return dateString;
}

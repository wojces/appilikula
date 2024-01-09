function timestampToDate(timestamp: number): string {
  const unix_timestamp = timestamp;
  const date = new Date(unix_timestamp * 1000);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const fullDate = day + "." + month + "." + year;

  return fullDate;
}

export default timestampToDate;

export function Format(date: Date, fmt: string) {
  fmt = fmt.length > 0 ? fmt : "yyyy-mm-dd"
  const template = {
    "m+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "i+": date.getMinutes(),
    "s+": date.getSeconds(),
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      date
        .getFullYear()
        .toString()
        .substr(4 - RegExp.$1.length)
    )
  }
  for (const k in template) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let checkStr =
        RegExp.$1.length == 1
          ? template[k]
          : `00${template[k]}`.substr(template[k].toString().length)
      fmt = fmt.replace(RegExp.$1, checkStr)
    }
  }
  return fmt
}

export function toDate() {
  return ""
}

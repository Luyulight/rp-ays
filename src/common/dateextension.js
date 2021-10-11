Date.prototype.Format = function (fmt) {
  fmt = arguments[0] ? arguments[0] : "yyyy-mm-dd"
  var o = {
    "m+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "i+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    )
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      )
    }
  }

  return fmt
}

Date.prototype.getLastMonday = function () {
  let day = this.getDate()
  let week = this.getDay()
  let monday = day - ((week == 0 ? 7 : week % 7) - 1)
  //返回值<=0表示在上一个月
  return monday
}
Date.prototype.getNextMonday = function () {
  let day = this.getDate()
  let week = this.getDay()
  let monday = day + ((8 - week) % 7)
  return monday
}

String.prototype.toDate = function (fmt) {
  fmt = arguments[0] ? arguments[0] : "yyyy-mm-dd"
  var o = ["y+", "m+", "d+", "h+", "i+", "s+"]
  var times = []
  let now = new Date()
  for (var i in o) {
    reg = new RegExp("(" + o[i] + ")")
    let time = ""
    if (reg.test(fmt)) {
      time = this.substr(fmt.match(reg)["index"], RegExp.$1.length)
    }
    if (time == "") {
      time = i == 0 ? now.getFullYear() : i <= 2 ? "01" : "00"
    }
    times.push(time)
  }
  //safari不兼容 2019-10-10 只能2019/10/10
  return new Date(
    [times.slice(0, 3).join("/"), times.slice(3).join(":")].join(" ")
  )
}

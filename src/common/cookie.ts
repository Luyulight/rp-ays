
export function getCookie(name:string) {
  let cname = name + '='
  let arr = document.cookie.split(';')
  let res = ""
  for(let i = 0; i < arr.length; i++){
    let str = arr[i].trim()
    if(str.indexOf(cname) == 0){
      res = str.substring(cname.length,str.length)
    }
  }
  return res
}


export function setCookie(name:string, value:string, exdays:number) {
  let date = new Date()
  date.setTime(date.getTime() + exdays*24*60*60*1000)
  let expires = "expires=" + date.toUTCString()
  document.cookie = `${name}=${value}; ${expires}`
}

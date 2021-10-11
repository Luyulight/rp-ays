interface Options {
  startDate?:string,
  endDate?:string,
  viewType?:viewType
  parent?:string,
  positionFixed?:boolean
}

enum viewType {
  YEAR = 0,
  MONTH,
  DAY,
}

const Datepicker = (props:Options) => {
  let options = {}
}


export default Datepicker
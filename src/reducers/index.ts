
const initState = {
  currentReportid:'',
  isEdit:true
}

const todos =  (state:any = initState,action:any) => {
  switch (action.type){
    case 'change_report':
      console.log('inReducers',state,action)
      return {currentReportid:action.id,isEdit:action.isEdit}
    default:
      return state
  }
}

export default todos
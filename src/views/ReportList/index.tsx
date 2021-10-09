import React from "react"
import { ReportListItem, ReportItem } from "./Ireportlist"
import { ReportStatus } from "./Ireportlist"
import { connect } from "react-redux"
import './index.css'
import './activePointer.css'


const mapDispatchToProps = (dispatch:any) => {
  return {
    changeReport: (reportid:string,flag:boolean) => {
      dispatch({
        type:'change_report',
        id:reportid,
        isEdit:flag
      })
    }
  }
}


const ReportList: React.FC = () => {

  let data:Array<ReportListItem> = [
    {
      id:'ly-1',
      data:{
        user:'luyu',
        createTime:new Date('2021/9/27'),
        reportid:'001',
        status:ReportStatus.PENDING
      }
    },
    {
      id:'ly-2',
      data:{
        user:'luyu',
        createTime:new Date('2021/9/27'),
        reportid:'002',
        status:ReportStatus.NORMAL
      }
    },
    {
      id:'ly-3',
      data:{
        user:'luyu',
        createTime:new Date('2021/9/27'),
        reportid:'003',
        status:ReportStatus.ERROR
      }
    }
  ]

  return (
      <div className="report-list">
        <ReportUl listData={data} />
      </div> 
  )

}


//
type Props = {listData:Array<ReportListItem>,changeReport?:any}

let ReportUl: React.FC<Props> = (props) => {
  let { listData} = props 

  const handleAdd = ()=>{
    console.log('ReportUl',props)
    props.changeReport('',true)
  }

  let listItems  = listData.map((item)=>
    <ReportLi key={item.id} itemData={item.data}  />
  )
  return (
    <ul className="report-ul">
        <i className="active-report-pointer" style={{display:'block'}}></i>
        <li className="report-li add-li">
            <button onClick={handleAdd} className="btn-view-form btn btn-primary light-hover">
                <i className="ic ic-plus"></i>Create Report
            </button>
        </li>
        {listItems}
    </ul>
  )
}

ReportUl = connect(null,mapDispatchToProps)(ReportUl)


//
type reportLiProps = {itemData:ReportItem, changeReport?:any}

let ReportLi: React.FC<reportLiProps> = (props) => {
  let {itemData} = props

  const handleView = ()=>{
    console.log('ReportLi',props)
    props.changeReport(itemData.reportid, false)
  }

  return (
    <li className="report-li animation-to-left-2x" >
      <div className="report-operation-container">
          <a className={"report-operation btn circle-btn light-hover " + (true?'a':'b') } href="#top" draggable="false">
              <i className="my-index link-icon"></i>
          </a>
          <button onClick={handleView} className="btn-view-form report-operation btn circle-btn light-hover my-index-btn">
            <i className="my-index detail-icon"></i>
          </button>
          <button className="report-operation btn circle-btn light-hover my-index-btn">
            <i className="my-index delete-icon"></i>
          </button>
      </div>
      <div className="report-name text-bold">test luyu</div>
      <div className="report-info-container">
        <div className="report-info text-sm">{itemData.createTime.toLocaleString()}</div>
      </div>
    </li>
  )
}
ReportLi = connect(null,mapDispatchToProps)(ReportLi)

//2021-09-16 22:37:59



export default ReportList 
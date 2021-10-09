import { connect } from "react-redux"
import React from 'react';
import  styles from './index.module.less'
import WordInput from "../../components/WordInput"

const mapStateToProps = (state:any)=>{
  console.log('CreateForm',state)
  return state
}

const CreateForm = (props:any) => {
  console.log('createform',styles)
  let editable = props.isEdit
  console.log(props)
  return (
    <>
    {/* <div>当前reportid是{props.currentReportid}，是否可编辑{props.isEdit.toString()}</div> */}
    <div id="report-form" className={`${styles['report-form']} ${styles['animation-active']} transparent-index-scroll`}>
      <div className={styles['form-container']}>
        
      </div>
      <div>
        <WordInput />
      </div>
    </div>
    </>
  )
}

export default connect(mapStateToProps)(CreateForm)
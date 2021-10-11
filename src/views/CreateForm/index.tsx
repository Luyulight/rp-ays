import * as ReactRedux from "react-redux"
import { connect } from "react-redux"
import React, { useState } from "react"
import styles from "./index.module.less"
import common from "./../common.module.less"
import { Format } from "./../../common/DateExtension"
import WordInput from "../../components/WordInput"

const mapStateToProps = (state: any) => {
  console.log("CreateForm", state)
  return state
}

console.log(ReactRedux)

const CreateForm = (props: any) => {
  console.log("createform", styles)
  let editable = props.isEdit
  console.log(props)
  return (
    <>
      {/* <div>当前reportid是{props.currentReportid}，是否可编辑{props.isEdit.toString()}</div> */}
      <div
        id="report-form"
        className={`${styles["report-form"]} ${styles["animation-active"]} transparent-index-scroll`}
      >
        <div className={`${styles["form-container"]} ${common.panel}`}>
          <Header editable={editable} />
          <Body editable={editable} />
        </div>
      </div>
    </>
  )
}

let Header = (props: any) => {
  let { editable } = props
  return (
    <div
      className={`${styles.header} ${common["no-border"]} ${common["no-padding"]}`}
    >
      <span
        className={`${styles["title-span"]} ${common["text-bold"]} ${common["padding-2x-vertical"]}`}
      >
        Create Report
      </span>
      <div
        className={`${styles["absolute-right-near"]} ${common["hover-float"]} ${
          editable ? common.visible : common.invisible
        } `}
      >
        <i
          className={`ic ic-zoom-in ${common["text-lg-2x"]} ${common["cursor-pointer"]} ${common["text-muted"]}`}
        ></i>
      </div>
      <div className={`${styles["absolute-right"]} ${common["hover-float"]}`}>
        <i
          className={`ic ic-close-circle-fill ${common["text-lg-2x"]} ${common["cursor-pointer"]} ${common["text-muted"]} ${common["hover-danger"]}`}
        ></i>
      </div>
    </div>
  )
}

let Body = (props: any) => {
  let { editable } = props
  const [name, setName] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const handleSubmit = () => {
    console.log(name)
  }

  let date = new Date()
  let dateFormat = "yyyy-mm"
  let tagData = [
    {
      startDate: Format(
        new Date(date.getFullYear() - 1, date.getMonth() + 1),
        dateFormat
      ),
      endDate: Format(date, dateFormat),
      text: "Nearly a year",
    },
    {
      startDate: Format(
        new Date(date.getFullYear() - 2, date.getMonth() + 1),
        dateFormat
      ),
      endDate: Format(date, dateFormat),
      text: "The last two years",
    },
    {
      startDate: Format(
        new Date(date.getFullYear() - 3, date.getMonth() + 1),
        dateFormat
      ),
      endDate: Format(date, dateFormat),
      text: "Nearly three years",
    },
  ]
  let tagItems = tagData.map(item => (
    <span className="my-tag text-bold">{item.text}</span>
  ))

  return (
    <div className={styles["panel-body"]}>
      <div className={styles.row}>
        <div className={`${styles["input-title"]} col-sm-12 col-md-2`}>
          <span>Report Name:</span>
        </div>
        <div className={`${styles["input-group"]} col-sm-12 col-md-10`}>
          <input
            name="reportName"
            onChange={e => setName(e.target.value)}
            defaultValue={name}
            type="text"
            className={`${styles["input-bottom-border"]}`}
            placeholder=""
            disabled={!editable}
          />
          <i className={`ic ic-detail ${styles["input-icon"]}`}></i>
        </div>
      </div>
      <br />
      <div className={styles.row}>
        <div className={`${styles["input-title"]} col-sm-12 col-md-2`}>
          <span>Date Group:</span>
        </div>
        <div className={`${styles["input-group"]} col-sm-12 col-md-5`}>
          <input
            name="startDate"
            type="text"
            className={`${styles["input-bottom-border"]}`}
            placeholder=""
            disabled={!editable}
          />
          <i className={`ic ic-calendar ${styles["input-icon"]}`}></i>
        </div>
        <div className={`${styles["input-group"]} col-sm-12 col-md-5`}>
          <input
            name="endDate"
            type="text"
            className={`${styles["input-bottom-border"]}`}
            placeholder=""
            disabled={!editable}
          />
          <i className={`ic ic-calendar ${styles["input-icon"]}`}></i>
        </div>
      </div>
      <div className={styles.row}>
        <div className={`${styles["input-title"]} col-md-2 mobile-hide`}></div>
        <div className="input-group col-md-10 col-sm-12">{tagItems}</div>
      </div>
      <br />
      <div
        className={`${styles["input-group"]} ${styles["flex-container"]} ${styles["flex-wrap"]} col-sm-12 col-md-12 `}
      >
        <button
          onClick={handleSubmit}
          className={`btn btn-gradient-primary btn-primary light-hover col-sm-10 col-md-5 btn-shadow-bottom`}
        >
          Save & Load &nbsp;
          <i
            v-show="!reportUploading"
            className="ic ic-cloud-upload ic-scale"
          ></i>
        </button>
      </div>
    </div>
  )
}

export default connect(mapStateToProps)(CreateForm)

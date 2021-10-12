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
  const [markets, setMarkets] = useState([0, 1, 2])
  const handleSubmit = () => {
    console.log(name, startDate, endDate, markets)
  }
  const setTagDate = (start, end) => {
    setStartDate(start)
    setEndDate(end)
  }
  const handleSelectMarket = value => {
    let arr = markets
    if (arr.includes(value)) {
      arr.splice(arr.indexOf(value), 1)
    } else {
      arr.push(value)
    }
    setMarkets(arr)
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
    {
      startDate: Format(new Date(date.getFullYear() - 1, 0, 1), dateFormat),
      endDate: Format(new Date(date.getFullYear() - 1, 11, 1), dateFormat),
      text: (date.getFullYear() - 1).toString(),
    },
    {
      startDate: Format(new Date(date.getFullYear() - 2, 0, 1), dateFormat),
      endDate: Format(new Date(date.getFullYear() - 2, 11, 1), dateFormat),
      text: (date.getFullYear() - 2).toString(),
    },
  ]
  let tagItems = tagData.map(item => (
    <span
      className={`${common["my-tag"]} text-bold`}
      onClick={() => setTagDate(item.startDate, item.endDate)}
    >
      {item.text}
    </span>
  ))

  let labelData = [
    { name: "rakuten", value: 0 },
    { name: "yahoo", value: 1 },
    { name: "amazon", value: 2 },
  ]
  let labelItems = labelData.map(item => (
    <>
      <input
        id={`market-${item.value}`}
        type="checkbox"
        name="market"
        value={item.value}
        hidden={true}
        disabled={!editable}
        defaultChecked={markets.includes(item.value)}
        onClick={() => handleSelectMarket(item.value)}
      />
      <label
        htmlFor={`market-${item.value}`}
        className={`${common["my-checkbox"]} ${common["my-checkbox-radius"]}`}
      >
        <i className={`icon-${item.name}`}></i>
      </label>
    </>
  ))

  let listData = [
    { cid: 2501, market: 1, cname: "コスメ、美容、ヘアケア", group: false },
    {
      cid: 2502,
      market: 1,
      cname: "スマホ、タブレット、パソコン",
      group: false,
    },
    {
      cid: 2497,
      market: 1,
      cname: "ベビー、キッズ、マタニティ",
      group: false,
    },
    {
      cid: 465392,
      market: 2,
      cname: "本",
      group: false,
    },
    {
      cid: 134,
      market: -1,
      cname: "test group",
      group: true,
    },
    {
      cid: 100227,
      market: 0,
      cname: "食品",
      group: false,
    },
  ]
  let listItems = listData.map(item => (
    <li className={styles["form-list-li"]}>
      <span>
        <i
          className={
            item.market < 0
              ? "icon-group margin-horizon"
              : item.market < 1
              ? "icon-rakuten-sm"
              : item.market < 2
              ? "icon-yahoo-sm"
              : "icon-amazon-sm"
          }
        ></i>
        <span className={common["text-bold"]}>{item.cname}</span>
      </span>
      <div className={styles["form-list-edit-container"]}>
        <i
          className={`ic ic-close-circle-fill ${common["text-danger"]} ${
            editable ? "" : common["hide"]
          }`}
        ></i>
      </div>
    </li>
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
            placeholder="Please enter report name"
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
            defaultValue={startDate}
            placeholder="2014-09"
            disabled={!editable}
          />
          <i className={`ic ic-calendar ${styles["input-icon"]}`}></i>
        </div>
        <div className={`${styles["input-group"]} col-sm-12 col-md-5`}>
          <input
            name="endDate"
            type="text"
            className={`${styles["input-bottom-border"]}`}
            defaultValue={endDate}
            placeholder="2022-10"
            disabled={!editable}
          />
          <i className={`ic ic-calendar ${styles["input-icon"]}`}></i>
        </div>
      </div>
      <div className={`${styles.row} ${editable ? "" : common["hide"]}`}>
        <div className={`${styles["input-title"]} col-md-2 mobile-hide`}></div>
        <div className={`${styles["input-group"]} col-md-10 col-sm-12`}>
          {tagItems}
        </div>
      </div>
      <br />
      <div className={styles.row}>
        <div className={`${styles["input-title"]} col-sm-12 col-md-2`}>
          <span>Target Market:</span>
        </div>
        <div className={`${styles["input-group"]} col-md-10 col-sm-12 text-sm`}>
          {labelItems}
        </div>
      </div>
      <br />
      <div className={styles.row}>
        <div className={`${styles["input-title"]} col-sm-12 col-md-2`}>
          <span className={styles["self-align-top"]}>Categories:</span>
        </div>
        <div className={`${styles["input-group"]} col-md-10 col-sm-12 text-sm`}>
          <ul className={styles["form-list-ul"]}>{listItems}</ul>
          <div
            className={`${common["animation-fade-in"]} ${
              listItems.length == 0 ? "" : common["hide"]
            }`}
          >
            no category selected
          </div>
        </div>
      </div>
      <div className={styles.row}>
        <div className={`${styles["input-title"]} col-sm-12 col-md-2`}></div>
        <div className={`${styles["input-group"]} col-md-10 col-sm-12`}>
          <button className="btn btn-primary btn-gradient-primary btn-dashed text-bold col-sm-12 col-md-12 light-hover text-sm no-radius">
            <i className="ic ic-plus"></i>Add Category
          </button>
        </div>
      </div>
      <br />
      <div></div>
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

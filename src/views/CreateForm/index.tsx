import { connect } from "react-redux"
import React, { useState } from "react"
import styles from "./index.module.less"
import common from "./../common.module.less"
import { Format } from "./../../common/DateExtension"
import tempData from "./tempData"

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
  const [categories, setCategories] = useState(tempData.categories)
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
  const deleteCategroy = index => {
    console.log("indeletecategory")
    console.log(categories)
    let tempCate = categories
    tempCate.splice(index, 1)
    setCategories(tempCate)
    console.log(tempCate, categories)
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

  let listData = tempData.categories

  return (
    <div className={styles["panel-body"]}>
      <Row rowName="Report Name:">
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
      </Row>
      <br />
      <Row rowName="Date Group:">
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
      </Row>
      <Row shown={!editable}>
        <div className={`${styles["input-group"]} col-md-10 col-sm-12`}>
          {tagItems}
        </div>
      </Row>
      <br />
      <Row rowName="Target Market:">
        <div className={`${styles["input-group"]} col-md-10 col-sm-12 text-sm`}>
          {labelItems}
        </div>
      </Row>
      <br />
      <Row rowName="Categories:" alignTop={true}>
        <div className={`${styles["input-group"]} col-md-10 col-sm-12 text-sm`}>
          <CategroyList
            listData={categories}
            editable={editable}
            closeFunc={deleteCategroy}
          />
          <div
            className={`${common["animation-fade-in"]} ${
              listData.length == 0 ? "" : common["hide"]
            }`}
          >
            no category selected
          </div>
        </div>
      </Row>
      <Row>
        <div className={`${styles["input-group"]} col-md-10 col-sm-12`}>
          <button className="btn btn-primary btn-gradient-primary btn-dashed text-bold col-sm-12 col-md-12 light-hover text-sm no-radius">
            <i className="ic ic-plus"></i>Add Category
          </button>
        </div>
      </Row>
      <br />
      <Row shown={!editable}>
        <div className={`${styles["input-group"]} col-sm-12 col-md-10`}>
          <input
            name="reportName"
            type="text"
            className={`${styles["input-bottom-border"]}`}
            placeholder="Input to search makers"
          />
          <i className={`ic ic-search ${styles["input-icon"]}`}></i>
        </div>
      </Row>
      <Row rowName="Makers:" alignTop={true}>
        <div className={`${styles["input-group"]} col-md-10 col-sm-12 text-sm`}>
          <CategroyList listData={listData} editable={editable} />
          <div
            className={`${common["animation-fade-in"]} ${
              listData.length == 0 ? "" : common["hide"]
            }`}
          >
            no maker selected
          </div>
        </div>
      </Row>
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

// 重复的行代码封装成Row组件
interface RowContent {
  rowName?: string
  shown?: boolean
  alignTop?: boolean
  children: object
}
const Row = (props: RowContent) => {
  let { rowName, shown, alignTop } = props
  return (
    <div className={`${styles.row} ${shown ? common.hide : ""}`}>
      <div className={`${styles["input-title"]} col-sm-12 col-md-2`}>
        <span className={alignTop ? styles["self-align-top"] : ""}>
          {rowName}
        </span>
      </div>
      {props.children}
    </div>
  )
}

// Category列表封装成组件
interface CategroyItem {
  cid: number
  market: number
  cname: string
  group: boolean
}
type CloseFunc = (index: number) => void
interface CategoryProp {
  listData: Array<CategroyItem>
  editable: boolean
  closeFunc?: CloseFunc
}
const CategroyList = (props: CategoryProp) => {
  let { listData, editable, closeFunc } = props

  let listItems = listData.map((item, index) => (
    <li key={index} className={styles["form-list-li"]}>
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
      <div
        className={`${styles["form-list-edit-container"]} ${
          editable ? "" : common["hide"]
        }`}
        onClick={() => closeFunc(index)}
      >
        <i className={`ic ic-close-circle-fill ${common["text-danger"]}`}></i>
      </div>
    </li>
  ))

  return <ul className={styles["form-list-ul"]}>{listItems}</ul>
}

export default connect(mapStateToProps)(CreateForm)

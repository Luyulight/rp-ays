// interfaces
export interface ReportListItem {
  id:string
  data:ReportItem
}

export enum ReportStatus {
	PENDING = 0,
	NORMAL = 1,
	ERROR = 2,
}

export interface ReportItem {
  user:string
  createTime:Date
  reportid:string
  status:ReportStatus
}
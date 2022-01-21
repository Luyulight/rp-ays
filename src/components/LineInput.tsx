import React, {forwardRef, RefObject, useImperativeHandle, useState } from "react";
import styles from './LineInput.module.less'

export enum Mode {
  mobile='mobile',
  email='email',
  password='password',
  giftcode='giftcode',
  smscode='smscode'
}

export enum CheckOppo {
  change='change',
  blur='blur'
}

export interface ILineInputProps {
  className?:string
  type?:string
  readonly?: boolean
	disabled?: boolean
	autoComplete?: boolean
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  onFocus?: React.FocusEventHandler
  onBlur?: React.FocusEventHandler<HTMLInputElement>
  mode?:Mode //传入此属性则开启默认验证规则
  checkOppo?:CheckOppo
  checkPattern?:RegExp //传入此属性则开启额外格式验证
  notEmpty?:boolean //开启非空验证
  darkMode?:boolean //是否暗色模式
  hasIcon?:boolean  //是否带ICON
  error?:boolean //是否带有验证失败
}

// type useRefProps  {
//   aprop:ILineInputProps
//   ref: RefObject<HTMLLIElement>
// }

const LineInput: React.FC<ILineInputProps> = ({
  className,
  type='text',
  readonly = false,
	disabled = false,
  autoComplete = true,
  onChange,
  onFocus,
  onBlur,
  mode,
  checkOppo = CheckOppo.change,
  checkPattern,
  notEmpty = false,
  darkMode=false,
  hasIcon=false,
  error=false,
  children, //添加的icon元素
}) =>{

  
  const [errState, seterrState] = useState(false)
  const [msgArr, setmsgArr] = useState({errmsg:'错误信息'})

  // useImperativeHandle(ref, ()=>({
  //   typeFields:{
  //     errState
  //   }
  // }))

  const changeHanlder = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(checkOppo == CheckOppo.change){
      valueCheck(e.target.value)
    }
    onChange&&onChange(e)
  }

  const focusHandler = (e: React.FocusEvent) => {
    onFocus&&onFocus(e)
  }

  const blurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    if(checkOppo == CheckOppo.blur){
      valueCheck(e.target.value)
    }
    onBlur&&onBlur(e)
  }


  return (
    <div className={`${styles.inputGroup} ${(mode||checkPattern||notEmpty)?styles.withmsg:''} ${(error||errState)?styles.error:''}`} {...msgArr} >
      <input 
        type={type}
        readOnly={readonly}
				disabled={disabled}
        autoComplete={autoComplete ? "on" : "off"}
        className={`${darkMode?styles.dark:styles.light} ${hasIcon?styles.withIcon:''} ${(error||errState)?styles.error:''} ${className?className:''}`} 
        onChange={changeHanlder}
        onFocus={focusHandler}
        onBlur={blurHandler}
      />
      { hasIcon && (
        <span>{children}</span>
      )}
    </div>
  )

  function valueCheck(inputVal:string){
    let testReg
    let msgStr = ''
    if(notEmpty && inputVal.length == 0){
      seterrState(true)
      setmsgArr({errmsg: defaultTransalte.notempty})
    }else{
      if(mode){
        testReg = defaultReg[mode]
        msgStr += defaultTransalte[mode]
      }else if(checkPattern){
        testReg = checkPattern
      }
      if(testReg && !testReg.test(inputVal)){
        seterrState(true)
        setmsgArr({errmsg: msgStr + defaultTransalte.unmatch})
      }else{
        seterrState(false)
      }
    }
  }
}


const defaultReg = {
  mobile: /^1\d{10}$/,
	email: /^([A-Za-z0-9_\-\.])+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
	password: /^[a-zA-Z\d!#$%&*,.:;<>?@^_`~]{8,16}$/,
	giftcode: /^[0-9A-Z]{16,20}$/,
	smscode: /^\d{6}$/,
}
const defaultTransalte = {
  mobile: '手机号',
	email: '邮箱',
	password: '密码',
	passwordnolength: '密码',
	giftcode: '兑换码',
	smscode: '验证码',
  notempty: '不能为空',
  unmatch: '格式不正确'
}



export default LineInput
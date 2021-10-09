import React from 'react'
import styles from './index.module.less'

const WordInput = () => {
  console.log('styles',styles['input-title'])
  return (
    <div className={styles.row + 'word-input'}>
      <div className={styles['input-title']}></div>
      <div></div>
    </div>
  )
}

export default WordInput
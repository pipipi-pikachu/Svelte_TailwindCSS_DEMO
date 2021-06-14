import { padStart } from 'lodash'

export const createRandomCode = (len = 6) => {
  const charset = `0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz`
  const maxLen = charset.length
  let ret = ''
  for(let i = 0; i < len; i++) {
    const randomIndex = Math.floor(Math.random() * maxLen)
    ret += charset[randomIndex]
  }
  return ret
}

interface GetDateTimeProps {
  dateTime?: string;
  format?: string;
}
export const getDateTime = ({ dateTime, format = 'yyyy-MM-dd hh:mm:ss' }: GetDateTimeProps) => {
  const date = dateTime ? new Date(dateTime) : new Date()

  const formatMap = {
    'y+': date.getFullYear(),
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
  }

  for(const item of Object.keys(formatMap)) {
    if(new RegExp('(' + item + ')').test(format)) {
      const formated = (formatMap[item] + '').length < RegExp.$1.length ? padStart('' + formatMap[item], RegExp.$1.length, '0') : formatMap[item]
      format = format.replace(RegExp.$1, formated)
    }
  }
  return format
}
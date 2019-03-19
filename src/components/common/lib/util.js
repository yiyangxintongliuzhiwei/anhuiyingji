/**
 * 日期转字符串
 * @param time
 * @returns {string}
 */
export function dateToStr(time) {
  if (time !== '') {
    let date = new Date(time);
    let year = date.getFullYear();
    let month = (date.getMonth() + 1) >= 10 ? `${date.getMonth() + 1}` : `0${date.getMonth() + 1}`;
    let day = date.getDate() >= 10 ? `${date.getDate()}` : `0${date.getDate()}`;
    let hour = date.getHours() >= 10 ? `${date.getHours()}` : `0${date.getHours()}`;
    let min = date.getMinutes() >= 10 ? `${date.getMinutes()}` : `0${date.getMinutes()}`;
    let sec = date.getSeconds() >= 10 ? `${date.getSeconds()}` : `0${date.getSeconds()}`;
    return `${year}-${month}-${day} ${hour}:${min}:${sec}`;
  } else {
    return time
  }
}

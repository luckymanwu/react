import axios from "axios";
import jwt_decode from 'jwt-decode'
export const getCookieItem = (sKey) => {
	return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[-.+*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
};
// export function getUserId(){
//   const token:any = getCookieItem('token')
//   const decoded:any = jwt_decode(token)
//   return Number(decoded.userId) 
  
// } 
// export function setLocalStorage(key,value,sTime){
// 	let obj = {
// 		data: value,
// 		time: Date.now(),
// 		storageTime: sTime
// 	}
// 	localStorage.setItem(key, JSON.stringify(obj))
// }

// // 取值
// export function GetLocalStorage(key){
// 	let obj:any = localStorage.getItem(key)
// 	obj = JSON.parse(obj)
// 	if(Date.now()-obj.time>obj.storageTime){
// 		localStorage.removeItem(key);
// 		return null
// 	}
// 	return obj.data
// }

  

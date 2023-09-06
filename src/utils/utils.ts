import { Toast } from 'native-base';
import moment from "moment";

export function ValidateEmailOrNumber(text) {
  if (text.includes('@')) {
    var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (regex.test(text)) {
      return true;
    } else {
      return false;
    }
  } else {
    var regex = /^[0-9]+$/;
    if (regex.test(text)) {
      return true;
    } else {
      return false;
    }
  }
}

export function isNumberOnly(text) {
  var regex = /^[0-9]+$/;
  if (regex.test(text)) {
    return true;
  } else {
    return false;
  }
}

// export function isNumberOnly(text) {
//   var regex = /^[0-9a-zA-Z -_*:'+#@!&$.,"|]+$/;
//   if (regex.test(text)) {
//     return true;
//   } else {
//     return false;
//   }
// }

export function isTextAndNumberOnly(text) {
  var regex = /^[a-zA-z0-9]+$/;
  if (regex.test(text)) {
    return true;
  } else {
    return false;
  }
}

export function isTextAndNumberSpaceOnly(text) {
  var regex = /^[a-zA-z0-9 ]+$/;
  if (regex.test(text)) {
    return true;
  } else {
    return false;
  }
}

export function isTextOnly(text) {
  var regex = /^[a-zA-z0-9]+$/;
  if (regex.test(text)) {
    return true;
  } else {
    return false;
  }
}

export function isValidName(text) {
  var regex = /^[a-zA-Z]+((['. -][a-zA-Z ])?[a-zA-Z]*)*$/;
  if (regex.test(text)) {
    return true;
  } else {
    return false;
  }
}

export function isValidMobileNumber(text) {
  var regex = /^[0-9]+$/;
  if (regex.test(text)) {
    return true;
  } else {
    return false;
  }
}

export function isValidEmail(text) {
  var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (regex.test(text)) {
    return true;
  } else {
    return false;
  }
}

export function isEmailId(text) {
  if (text.includes('@')) {
    return true
  } else {
    return false;
  }
}

export function showToast(msg) {
  Toast.show({
    title: msg,
    duration: 2000
  });
}

export function showToastTill(msg, time) {
  Toast.show({
    title: msg,
    duration: time
  });
}

// export function showOkAlert(message:string) {
//   Alert.alert(
//     message,
//     '',
//     [
//       {
//         text: 'OK', onPress: () => {
//           ////console.log('OK Pressed') 
//         },
//       },
//     ],
//     { cancelable: true },
//   );
// }


export function getMinutes(dateTime) {
  var h = dateTime.hours();
  var m = dateTime.minutes();
  return h + m * 60;
}

export function showToastMessage(msg, time) {
  Toast.show({
    title: msg,
    duration: time
  });
}


export function time_ago(time) {

  var REFERENCE = moment();
  var TODAY = REFERENCE.clone().startOf('day');
  var YESTERDAY = REFERENCE.clone().subtract(1, 'days').startOf('day');
  var A_WEEK_OLD = REFERENCE.clone().subtract(7, 'days').startOf('day');
  var momentDate = moment(time);
  var onlyTime = momentDate.format('LT')
  var isToday = momentDate.isSame(TODAY, 'd');
  var isYesterday = momentDate.isSame(YESTERDAY, 'd');
  var isWithinAWeek = momentDate.isAfter(A_WEEK_OLD);
  var returnVal = "";
  if(isToday){
    returnVal =  "Today "+onlyTime
  }else if(isYesterday){
    returnVal =  "Yesterday "+onlyTime
  }else if(isWithinAWeek){
    returnVal = momentDate.format("dddd h:mm a")
  }else{
    returnVal = momentDate.format("L") + " " + onlyTime
  }

  return returnVal;
}

export function formatDate(inputDate){
  var momentDate = moment(inputDate);
  return momentDate.format("ll");
}


export function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}



export function getImageSourcePath(path){
  return {uri:path}
}  


export function textRandId() {
  return 'xxxxxxxx-xxxx-4xx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(20);
  });
}



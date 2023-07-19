export const utilityService = {
    getDayName
}

function getDayName(date) {
    date = date.substring(0, date.indexOf('T'));
    let day
    switch (new Date(date).getDay()) {
        case 0:
          day = "Sunday";
          break;
        case 1:
          day = "Monday";
          break;
        case 2:
          day = "Tuesday";
          break;
        case 3:
          day = "Wednesday";
          break;
        case 4:
          day = "Thursday";
          break;
        case 5:
          day = "Friday";
          break;
        case 6:
          day = "Saturday";
      }
      return day
}
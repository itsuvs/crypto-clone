function numberFormatter(num) {
 if (num != null){
    if (num > 999 && num < 1000000) {
        return num.toFixed(2);
      } else if (num > 1000000 && num < 1000000000) {
        return (num / 1000000).toFixed(2) + " m";
      } else if (num > 1000000000) {
        return (num / 1000000000).toFixed(2) + " b";
      } else if (num < 900) {
        return num.toFixed(2)
      }
 }
}

export default numberFormatter;

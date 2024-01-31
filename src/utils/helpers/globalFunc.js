import $ from "jquery";

export const inputCodeNext = () => {
  $(document).on("keyup", ".instructionMessageInputCodes", function (e) {
    var target = e.srcElement || e.target;
    var valuee = e.target.value;
    // var allValue = "";

    var regex = /^[a-zA-Z]+$/;

    if (valuee.match(regex)) {
      e.target.value = "";
    } else {
      var maxLength = parseInt(target.attributes["maxlength"].value, 10);
      var myLength = target.value.length;
      if (myLength >= maxLength) {
        var next = target;

        // eslint-disable-next-line no-cond-assign
        while ((next = next.nextElementSibling)) {
          // console.log(next);
          // allValue = allValue + target.value;
          // console.log(allValue);
          if (next == null) break;
          if (next.tagName.toLowerCase() === "input") {
            next.focus();
            break;
          }
        }
      }
      // Move to previous field if empty (user pressed backspace)
      else if (myLength === 0) {
        var previous = target;
        // eslint-disable-next-line no-cond-assign
        while ((previous = previous.previousElementSibling)) {
          if (previous == null) break;
          if (previous.tagName.toLowerCase() === "input") {
            previous.focus();
            break;
          }
        }
      }
    }
  });
};

export const removeFormatDate = (date) => {
  var d = new Date(date);
  let month = d.getMonth() + 1;
  let day = d.getDate();
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }

  let returnedDate = day + "-" + month + "-" + d.getFullYear();

  return returnedDate;
};

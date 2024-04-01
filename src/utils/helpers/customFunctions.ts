import { destroyCookie, setCookie } from "nookies";

export const validEmail = (email: string) => {
  var emailReg = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailReg.test(email);
};

export const addLineBreak = (text: string) => {
  var newText = text.replace(/(?:\r\n|\r|\n)/g, "<br>");

  return newText;
};

export const removeLineBreak = (text: string) => {
  let newText = text.replace(/<br\s*[\/]?>/gi, "\n");
  return newText;
};

export const addComma = (value: any) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const getLocalCookie = (name: string): string | undefined => {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + "=")) {
      return cookie.substring(name.length + 1);
    }
  }
  return undefined;
};

export function deleteCookie(name: string) {
  document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;";
}

export const deleteCookies = () => {
  destroyCookie(null, "token");
  destroyCookie(null, "user");
  deleteCookie("token");
  deleteCookie("user");
  const pastDate = new Date(0); // Set the expiry date to a past date
  setCookie(null, "token", "", { expires: pastDate }); // Delete the token cookie
  setCookie(null, "user", "", { expires: pastDate });
  console.log("has remove toke");
  location.reload();
};

export const handleAxiosReduxError = (error: any) => {
  let newError = error?.errors[0];
  console.log("error", error);
  console.log("newError", newError);
  if (newError === "Invalid token") {
    deleteCookies();
    console.log("show remove toke");
  }
};

export const formateDayMonth = (dateString: string) => {
  const date: Date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long" };
  const dayWithOrdinal: string = new Intl.DateTimeFormat(
    "en-US",
    options
  ).format(date);

  const formattedDate: string = dayWithOrdinal.replace(/\d{1,2}/, (day) => {
    const dayNum: number = parseInt(day, 10);
    const suffix: string =
      dayNum >= 11 && dayNum <= 13
        ? "th"
        : { "1": "st", "2": "nd", "3": "rd" }[day.charAt(day.length - 1)] ||
          "th";
    return `${dayNum}${suffix}`;
  });

  const formattedDateWithYear: string = `${formattedDate}, ${date.getFullYear()}`;

  return formattedDateWithYear;
};

export function base64ToImage(base64String: string, fileName: string): void {
  const base64Data = base64String.split(",")[1]; // Remove the header
  const byteCharacters = atob(base64Data); // Decode base64 string

  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: "image/png" }); // Create Blob object

  const urlCreator = window.URL || window.webkitURL;
  const imageUrl = urlCreator.createObjectURL(blob);

  // Releasing the object URL resource
  urlCreator.revokeObjectURL(imageUrl);
}

export const removeDuplicate = (arr: any) => {
  return arr
    .map((e: any) => e["original_filename"])
    .map((e: any, i: any, final: any) => final.indexOf(e) === i && i)
    .filter((obj: any) => arr[obj])
    .map((e: any) => arr[e]);
};

export const htmlEmailTemp = (
  image: any,
  signantureImage: any,
  title: string,
  des: string
) => {
  return `<div
  class="boatWrapper"
  style="
    font-family: 'DM Sans', sans-serif;
    width: 100%;
    max-height: max-content;
    max-width: 680px;
    margin: auto;
    box-sizing: border-box;
    position: relative;
    background: #fff;
  "
>
  <table
    width="100%"
    cellspacing="0"
    style="margin: 0 auto; max-width: 680px; padding: 20px 80px"
  >
    <tbody>
      <tr>
        <td cellpadding="0" cellspacing="0">
          <div style="margin-top: 50px; margin-bottom: 30px">
            <img class="tripBoat" src="${image}" />
          </div>
        </td>
      </tr>
      <tr>
        <td cellpadding="0" cellspacing="0">
          <br />
          <h2 class="headerTitle" style="font-size: 20px">${title}</h2>
        </td>
      </tr>

      <tr>
        <td cellpadding="0" cellspacing="0">
          <p class="__">
          ${des}
          </p>
        </td>
      </tr>
      <tr>
        <td cellpadding="0" cellspacing="0">
          <p class="__">
          Happy investing!
          </p>
        </td>
      </tr>
      <tr>
        <td cellpadding="0" cellspacing="0">
          <p class="__">
          
FUND10X Investment Team.
          </p>
        </td>
      </tr>

      <tr>
        <td cellpadding="0" cellspacing="0">
          <div style="margin-top: 50px">
            <hr style="color: #dcdcdc !important; width: 100%" />
          </div>
        </td>
      </tr>
      <tr>
        <td cellpadding="0" cellspacing="0">
          <div class="footerDiv">
            <img
              src="${signantureImage}"
              height="35"
              style="height: 38px"
              class="CToWUd"
            />
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</div>`;
};

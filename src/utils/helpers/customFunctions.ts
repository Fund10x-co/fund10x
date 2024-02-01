import { destroyCookie, setCookie } from "nookies";

export const validEmail = (email: string) => {
  var emailReg = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailReg.test(email);
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

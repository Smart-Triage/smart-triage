export default function isCompatiblePhoneAndBrowser() {
  if (
    navigator.userAgent.match(
      [/Android/i, /webOS/i, /iPhone/i, /iPad/i, /iPod/i] &&
        !(
          (/Chrome/.test(navigator.userAgent) &&
            /Google Inc/.test(navigator.vendor)) ||
          (/Safari/.test(navigator.userAgent) &&
            /Apple Computer/.test(navigator.vendor))
        )
    )
  ) {
    return false
  }
  return true
}

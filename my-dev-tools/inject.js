import { io } from "https://cdn.socket.io/4.7.4/socket.io.esm.min.js";
const socket = io()

socket.on("code-changed", () => {
  window.location.reload()
})

socket.on("build-failed", (err) => {
  window.document.body.innerHTML = `
    <h1>Build Failed</h1>
    <pre>${escapeHtml(err.message)}</pre>
    <pre>${escapeHtml(err.stack)}</pre>

  `
  
})
function escapeHtml(unsafe)
{
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
 }
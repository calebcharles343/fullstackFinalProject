// import { useEffect } from "react";
// import { gapi } from "gapi-script";

// const CLIENT_ID = "YOUR_CLIENT_ID";
// const API_KEY = "YOUR_API_KEY";
// const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

// function authenticate() {
//   return gapi.auth2
//     .getAuthInstance()
//     .signIn({ scope: SCOPES })
//     .then(() => console.log("Sign-in successful"))
//     .catch((err) => console.error("Error signing in", err));
// }

// function loadClient() {
//   // gapi.client.setApiKey(API_KEY);
//   return gapi.client
//     .load("https://content.googleapis.com/discovery/v1/apis/calendar/v3/rest")
//     .then(() => console.log("GAPI client loaded for API"))
//     .catch((err) => console.error("Error loading GAPI client for API", err));
// }

// function initClient() {
//   gapi.load("client:auth2", () => {
//     gapi.auth2.init({ client_id: CLIENT_ID });
//   });
// }

// useEffect(() => {
//   initClient();
// }, []);

// export { authenticate, loadClient };

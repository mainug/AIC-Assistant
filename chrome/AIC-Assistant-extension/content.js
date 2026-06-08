const script = document.createElement("script");
script.src = chrome.runtime.getURL("injected.js");
script.onload = () => script.remove();

(document.head || document.documentElement).appendChild(script);

window.addEventListener("message", (event) => {
  if (event.source !== window) return;

  const message = event.data;

  if (!message || message.source !== "AIC-Assistant") return;

  if (message.type === "USER_GAME_DATA_DETECTED") {
    console.log(
      "[AIC-Assistant/content] received user-game-data",
      message.payload,
    );

    chrome.storage.local.set({
      latestUserGameData: message.payload,
    });
  }
});

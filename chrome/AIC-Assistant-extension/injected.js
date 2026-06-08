(function () {
  const originalFetch = window.fetch;

  window.fetch = async function (...args) {
    const response = await originalFetch.apply(this, args);

    try {
      const url = typeof args[0] === "string" ? args[0] : args[0]?.url;

      if (url && url.includes("user-game-data")) {
        const cloned = response.clone();

        cloned.json().then((data) => {
          console.log("[AIC-Assistant] user-game-data detected");
          console.log(data);

          const userGameData = data?.data?.userGameData;

          if (!userGameData) return;

          const chars = userGameData.userChars || {};
          const weapons = userGameData.userWeapons || {};

          const payload = {
            roleId: userGameData.roleId,
            charactersCount: Object.keys(chars).length,
            weaponsCount: Object.keys(weapons).length,
            userChars: chars,
            userWeapons: weapons,
            detectedAt: new Date().toISOString(),
          };

          console.log("[AIC-Assistant] roleId:", payload.roleId);
          console.log("[AIC-Assistant] characters:", payload.charactersCount);
          console.log("[AIC-Assistant] weapons:", payload.weaponsCount);

          window.postMessage(
            {
              source: "AIC-Assistant",
              type: "USER_GAME_DATA_DETECTED",
              payload,
            },
            "*",
          );
        });
      }
    } catch (err) {
      console.warn("[AIC-Assistant] fetch hook error", err);
    }

    return response;
  };

  console.log("[AIC-Assistant] fetch hook installed");
})();

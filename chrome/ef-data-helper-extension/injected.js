(function () {
  const originalFetch = window.fetch;

  window.fetch = async function (...args) {
    const response = await originalFetch.apply(this, args);

    try {
      const url = typeof args[0] === "string" ? args[0] : args[0]?.url;

      if (url && url.includes("user-game-data")) {
        const cloned = response.clone();

        cloned.json().then((data) => {
          console.log("[EF Data Helper] user-game-data detected");
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

          console.log("[EF Data Helper] roleId:", payload.roleId);
          console.log("[EF Data Helper] characters:", payload.charactersCount);
          console.log("[EF Data Helper] weapons:", payload.weaponsCount);

          window.postMessage(
            {
              source: "EF_DATA_HELPER",
              type: "USER_GAME_DATA_DETECTED",
              payload,
            },
            "*",
          );
        });
      }
    } catch (err) {
      console.warn("[EF Data Helper] fetch hook error", err);
    }

    return response;
  };

  console.log("[EF Data Helper] fetch hook installed");
})();

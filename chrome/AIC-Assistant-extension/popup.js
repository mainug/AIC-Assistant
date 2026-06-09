const FRONT_BASE_URL = AIC_CONFIG.FRONT_BASE_URL;
const API_BASE_URL = AIC_CONFIG.API_BASE_URL;
const REC_TEAM_URL = AIC_CONFIG.REC_TEAM_URL;
const SIGN_IN_URL = AIC_CONFIG.SIGN_IN_URL;

document.addEventListener("DOMContentLoaded", async () => {
  const result = await chrome.storage.local.get("latestUserGameData");
  const data = result.latestUserGameData;

  const status = document.getElementById("status");
  const dataBox = document.getElementById("dataBox");
  const syncButton = document.getElementById("syncButton");
  const openPageButton = document.getElementById("openPageButton");
  const openStatisticsButton = document.getElementById("openStatisticsButton");
  const openRecTeamButton = document.getElementById("openRecTeamButton");
  const openSignInButton = document.getElementById("openSignInButton");
  const clearButton = document.getElementById("clearButton");

  if (!data) {
    status.textContent = "아직 감지된 게임 데이터가 없습니다.";
    dataBox.classList.add("hidden");
    syncButton.disabled = true;
    openPageButton.disabled = true;
  } else {
    status.textContent = "게임 데이터 감지됨";
    dataBox.classList.remove("hidden");

    document.getElementById("roleId").textContent = data.roleId || "-";
    document.getElementById("charactersCount").textContent =
      `${data.charactersCount ?? 0}명`;
    document.getElementById("weaponsCount").textContent =
      `${data.weaponsCount ?? 0}개`;
    document.getElementById("detectedAt").textContent = formatDateTime(
      data.detectedAt,
    );
  }

  syncButton.addEventListener("click", async () => {
    if (!data) {
      alert("감지된 데이터가 없습니다.");
      return;
    }

    try {
      syncButton.disabled = true;
      syncButton.textContent = "공유 중...";

      const response = await fetch(
        `${API_BASE_URL}/api/endfield/import/user-game-data`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            roleId: data.roleId,
            userChars: data.userChars,
            userWeapons: data.userWeapons,
            detectedAt: data.detectedAt,
          }),
        },
      );

      const responseText = await response.text();

      if (!response.ok) {
        console.error("[AIC Assistant] server error", {
          status: response.status,
          body: responseText,
        });

        syncButton.disabled = false;
        syncButton.textContent = "AIC Assistant에 공유하기";

        alert(`공유 실패: 서버 응답 ${response.status}`);
        return;
      }

      console.log("[AIC Assistant] sync success", responseText);

      syncButton.textContent = "공유 완료";
      syncButton.disabled = true;

      alert("AIC Assistant에 공유 완료");
    } catch (error) {
      console.error("[AIC Assistant] sync failed", error);

      syncButton.disabled = false;
      syncButton.textContent = "AIC Assistant에 공유하기";

      alert(`공유 실패: ${error.message}`);
    }
  });

  openPageButton.addEventListener("click", () => {
    if (!data?.roleId) {
      alert("roleId가 없습니다.");
      return;
    }

    chrome.tabs.create({
      url: `${FRONT_BASE_URL}/my/endfield/${data.roleId}`,
    });
  });

  openStatisticsButton.addEventListener("click", () => {
    const statisticsUrl = data?.roleId
      ? `${FRONT_BASE_URL}/endfield/statistics?roleId=${encodeURIComponent(
          data.roleId,
        )}`
      : `${FRONT_BASE_URL}/endfield/statistics`;

    chrome.tabs.create({
      url: statisticsUrl,
    });
  });

  openRecTeamButton.addEventListener("click", () => {
    chrome.tabs.create({
      url: REC_TEAM_URL,
    });
  });

  openSignInButton.addEventListener("click", () => {
    chrome.tabs.create({
      url: SIGN_IN_URL,
    });
  });

  clearButton.addEventListener("click", async () => {
    await chrome.storage.local.remove("latestUserGameData");
    alert("감지 데이터를 초기화했습니다.");
    window.location.reload();
  });
});

function formatDateTime(value) {
  if (!value) return "-";

  try {
    return new Date(value).toLocaleString("ko-KR", {
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  } catch {
    return value;
  }
}

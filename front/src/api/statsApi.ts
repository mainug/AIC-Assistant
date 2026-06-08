import axiosInstance from "./axiosInstance";

// TypeScript의 진가: 백엔드에서 내려줄 오퍼레이터 통계 데이터의 타입을 미리 정의합니다.
export interface OperatorStat {
  charId: string;
  pickRate: number;
  weaponId: string;
}

// 전체 오퍼레이터 픽률 데이터를 가져오는 API 함수
export const getGlobalOperatorStats = async (): Promise<OperatorStat[]> => {
  const response = await axiosInstance.get<OperatorStat[]>("/api/global-stats");
  return response.data;
};

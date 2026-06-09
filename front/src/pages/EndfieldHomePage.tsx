import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../api/config";
import "../styles/endfield.css";

type Summary = {
  totalUsers: number;
  totalCharacters: number;
  totalWeapons: number;
};

function EndfieldHomePage() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/endfield/statistics/summary`,
        );

        if (!response.ok) {
          throw new Error("요약 통계 조회 실패");
        }

        setSummary(await response.json());
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  return (
    <div className="page">
      <main className="page-inner">
        <section className="home-hero">
          <div className="home-hero-content">
            <div className="home-eyebrow">ARKNIGHTS: ENDFIELD DATA HUB</div>

            <h1 className="home-title">AIC Assistant</h1>

            <p className="home-description">
              명일방주: 엔드필드 유저 데이터를 기반으로 캐릭터와 무기 보유율,
              정예화 단계, 주요 레벨 구간을 확인하는 통계 사이트입니다.
            </p>

            <div className="home-actions">
              <Link className="home-primary-button" to="/endfield/statistics">
                통계 보기
              </Link>

              <a
                className="home-secondary-button"
                href="https://game.skport.com/tools/endfield/rec-team?header=0&ctr_orientation=landscape&routeId=0"
                target="_blank"
                rel="noreferrer"
              >
                추천 팀 편성 열기
              </a>
            </div>

            <p className="home-note">
              내 데이터는 브라우저 확장 프로그램에서 게임 데이터를 감지한 뒤
              공유하면 확인할 수 있습니다.
            </p>
          </div>

          <div className="home-hero-card">
            <div className="home-card-label">CURRENT DATASET</div>

            {loading ? (
              <div className="home-loading">불러오는 중...</div>
            ) : (
              <div className="home-stats">
                <HomeStat
                  label="등록 유저"
                  value={`${summary?.totalUsers ?? 0}명`}
                />
                <HomeStat
                  label="캐릭터 데이터"
                  value={`${summary?.totalCharacters ?? 0}개`}
                />
                <HomeStat
                  label="무기 데이터"
                  value={`${summary?.totalWeapons ?? 0}개`}
                />
              </div>
            )}
          </div>
        </section>

        <section className="section">
          <h2 className="section-title">주요 기능</h2>

          <div className="home-feature-grid">
            <FeatureCard
              title="전체 보유율 통계"
              description="공유된 유저 데이터를 기준으로 캐릭터와 무기 보유율을 확인합니다."
            />
            <FeatureCard
              title="캐릭터 상세 통계"
              description="캐릭터별 보유율, 정예화 단계 분포, 주요 레벨 구간을 확인합니다."
            />
            <FeatureCard
              title="메타데이터 필터"
              description="성급, 속성, 직업군, 사용 무기 타입 기준으로 데이터를 필터링합니다."
            />
          </div>
        </section>
      </main>
    </div>
  );
}

function HomeStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="home-stat-item">
      <div className="home-stat-label">{label}</div>
      <div className="home-stat-value">{value}</div>
    </div>
  );
}

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <article className="home-feature-card">
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );
}

export default EndfieldHomePage;

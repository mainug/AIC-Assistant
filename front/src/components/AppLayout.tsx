import { Link, Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div>
      <header className="site-header">
        <div className="site-header-inner">
          <Link className="site-logo" to="/">
            AIC Assistant
          </Link>

          <nav className="site-nav">
            <Link to="/">홈</Link>
            <Link to="/endfield/statistics">통계</Link>
            <a
              href="https://game.skport.com/tools/endfield/rec-team?header=0&ctr_orientation=landscape&routeId=0"
              target="_blank"
              rel="noreferrer"
            >
              추천 팀 편성
            </a>
          </nav>
        </div>
      </header>

      <Outlet />

      <footer className="site-footer">
        <div className="site-footer-inner">
          <p>
            AIC Assistant는 비공식 팬 메이드 통계 서비스입니다. Arknights:
            Endfield 관련 권리는 Hypergryph / GRYPHLINE 및 각 원 권리자에게
            있으며, 본 프로젝트는 학습 및 포트폴리오 목적으로 제작되었습니다.
          </p>

          <p>
            통계는 AIC Assistant에 공유된 유저 데이터를 기준으로 하며, 전체 유저
            통계를 의미하지 않습니다.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default AppLayout;

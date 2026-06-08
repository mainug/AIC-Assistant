import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import EndfieldHomePage from "./pages/EndfieldHomePage";
import EndfieldMyDataPage from "./pages/EndfieldMyDataPage";
import EndfieldStatisticsPage from "./pages/EndfieldStatisticsPage";
import EndfieldCharacterStatisticsDetailPage from "./pages/EndfieldCharacterStatisticsDetailPage";
import EndfieldWeaponStatisticsDetailPage from "./pages/EndfieldWeaponStatisticsDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<EndfieldHomePage />} />
          <Route path="/endfield" element={<EndfieldHomePage />} />
          <Route path="/my/endfield/:roleId" element={<EndfieldMyDataPage />} />
          <Route
            path="/endfield/statistics"
            element={<EndfieldStatisticsPage />}
          />
          <Route
            path="/endfield/statistics/characters/:charId"
            element={<EndfieldCharacterStatisticsDetailPage />}
          />
          <Route
            path="/endfield/statistics/weapons/:weaponId"
            element={<EndfieldWeaponStatisticsDetailPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

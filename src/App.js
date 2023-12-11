import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SurveyPage } from "./components/surveyPage/surveyPage";
import { SideMenu } from "./components/sideMenu/sideMenu";
import {StatisticPage} from "./components/statisticPage/statistic"

function App() {
  return (
    <BrowserRouter>
      <div className="appMainContainer">
        <SideMenu />
        <Routes>
          <Route path="/" element={<SurveyPage />} />
          <Route path = "/statistic" element = {<StatisticPage/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {FormPage} from "../src/anketaPage/index"
import {StatisticPage} from './statisticPage/index'
function App() {
  return (
    <BrowserRouter>
      <div className="appMainContainer">
        <Routes>
          <Route path="/" element={<FormPage />} />
          <Route path="/statistic" element={<StatisticPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
 
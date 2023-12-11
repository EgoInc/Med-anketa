import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import StatisticsPerAnswer from './allCharts/statisticPerAnswers'
function StatisticPage() {


  return (
    <div style={{marginLeft: '400px'}}>
      <h2>
        Statistic page
      </h2>
      <StatisticsPerAnswer/>
    </div>
  );
}

export { StatisticPage };

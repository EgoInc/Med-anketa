// StatisticsPage.jsx

import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";

const StatisticsPage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Загрузите данные с сервера (замените URL на свой)
    fetch("http://localhost:5000/getSurveyData")
      .then((response) => response.json())
      .then((surveyData) => {
        console.log(surveyData)
        // Обработка данных для графика
        const question1Data = getChartData(surveyData, 4);
        const question2Data = getChartData(surveyData, 5);
        const question3Data = getChartData(surveyData, 6);
        const question4Data = getChartData(surveyData, 7);
        const question5Data = getChartData(surveyData, 8);

        console.log("For 1", question1Data)
        // Установка данных для графика
        setData({
          labels: ["Нет", "Скорее нет, чем да", "Скорее да, чем нет", "Да"],
          datasets: [
            {
              label: "Вопрос 1",
              data: question1Data,
              backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50"],
            },
            {
              label: "Вопрос 2",
              data: question2Data,
              backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50"],
            },
            {
              label: "Вопрос 3",
              data: question3Data,
              backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50"],
            },
            {
              label: "Вопрос 4",
              data: question4Data,
              backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50"],
            },
            {
              label: "Вопрос 5",
              data: question5Data,
              backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50"],
            },
          ],
        });
      })
      .catch((error) => console.error("Ошибка:", error));
  }, []);

  const getChartData = (surveyData, answerIndex) => {
    const answers = surveyData.map((data) => data[answerIndex]);
    const counts = answers.reduce((acc, answer) => {
      const label = answer === undefined ? "Не ответил(а)" : answer;
      acc[label] = (acc[label] || 0) + 1;
      return acc;
    }, {});
    return Object.values(counts);
  };
  
  return (
    <div>
      <h2>Статистика по вопросам</h2>
      {data && (
        <>
          <Doughnut data={data} />
          <p>График для каждого вопроса</p>
        </>
      )}
    </div>
  );
};

export default StatisticsPage;

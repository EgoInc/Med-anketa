// StatisticPerAge.js
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

const StatisticPerAge = () => {
  const [chartData, setChartData] = useState({});
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/get-statistic-by-age');
        const data = response.data;

        if (data) {
          const ages = Object.keys(data);
          const counts = Object.values(data);

          setChartData({
            labels: ages,
            datasets: [
              {
                label: 'Количество людей по возрасту',
                data: counts,
                backgroundColor: 'rgba(75,192,192,0.6)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
              },
            ],
          });
        } else {
          console.error('Данные статистики не получены');
        }
      } catch (error) {
        console.error('Ошибка при получении статистики', error);
      }
    };

    fetchData();

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [chartInstance]);

  return (
    <div>
      <h3>Статистика по возрасту</h3>
      <div style={{ width: '80%', margin: '20px auto' }}>
        {chartData.labels && chartData.labels.length > 0 ? (
          <Bar
            data={chartData}
            options={{
              scales: {
                x: {
                  type: 'category',
                  labels: chartData.labels,
                },
                y: {
                  beginAtZero: true,
                  precision: 0, // Display only integer values
                  ticks: {
                      stepSize: 1, // Ensure the step size is 1 for integer values
                  }, 
                },
              },
            }}
            id="ageChart"
            onElementsClick={() => setChartInstance(chartInstance)}
          />
        ) : (
          <p>Нет данных для отображения</p>
        )}
      </div>
    </div>
  );
};

export {StatisticPerAge};

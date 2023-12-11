// StatisticPage.js
import React from 'react';
import {StatisticPerAge} from './statiscticPerAge';
import {StatisticPerName} from './statisticPerName';

const StatisticPage = () => {
  return (
    <div>
      <h2>Общая статистика</h2>
      <StatisticPerAge />
      <StatisticPerName />
    </div>
  );
};

export {StatisticPage};

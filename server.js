// server.js
const express = require('express');
const bodyParser = require('body-parser');
const XLSX = require('xlsx');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Путь к файлу
const filePath = './public/data.xlsx';

app.post('/api/save-data', (req, res) => {
  const { name, age } = req.body;

  // Чтение существующей таблицы или создание новой
  let workbook;
  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath);
    workbook = XLSX.read(fileContent, { type: 'buffer' });
  } else {
    workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet([['Name', 'Age']]), 'Sheet1');
  }

  // Добавление новых данных
  const sheet = workbook.Sheets['Sheet1'];
  const newRow = [name, age];
  XLSX.utils.sheet_add_aoa(sheet, [newRow], { origin: -1 });

  // Запись обновленной таблицы обратно в файл
  const updatedContent = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
  
  // Создание папки public, если её нет
  if (!fs.existsSync('./public')) {
    fs.mkdirSync('./public');
  }

  fs.writeFileSync(filePath, updatedContent);

  res.status(200).send('Данные успешно сохранены в таблице');
});

app.get('/api/get-statistic-by-age', (req, res) => {
    console.log("Кто-то пришел за данными")
    // Чтение данных из файла
    const fileContent = fs.readFileSync(filePath);
    const workbook = XLSX.read(fileContent, { type: 'buffer' });
    const sheet = workbook.Sheets['Sheet1'];
    const data = XLSX.utils.sheet_to_json(sheet);
  
    // Создание объекта для хранения статистики
    const statistic = {};
  
    // Подсчет количества людей разного возраста
    data.forEach((row) => {
      const age = row.Age.toString(); // Приводим к строке, чтобы быть уверенными в формате
      statistic[age] = (statistic[age] || 0) + 1;
    });
  
    res.json(statistic);
  });

app.get('/api/get-statistic-by-name', (req, res) => {
    const fileContent = fs.readFileSync(filePath);
    const workbook = XLSX.read(fileContent, { type: 'buffer' });
    const sheet = workbook.Sheets['Sheet1'];
    const data = XLSX.utils.sheet_to_json(sheet);
  
    const statistic = {};
  
    data.forEach((row) => {
      const name = row.Name;
      statistic[name] = (statistic[name] || 0) + 1;
    });
  
    res.json(statistic);
  });


app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});

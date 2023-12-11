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
const filePath = "surveys.xlsx";
// Ваш код server.js

app.post("/saveData", (req, res) => {
  const { name, age, hospital, doctor, answers } = req.body;

  // Проверка наличия файла
  const fileExists = fs.existsSync(filePath);

  // Если файл не существует, создаем новую книгу
  let wb;
  if (!fileExists) {
    wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet([], { header: ["name", "age", "hospital", "doctor", "question1", "question2", "question3", "question4", "question5"] }), "Sheet1");
  } else {
    // Если файл существует, читаем его
    const fileData = fs.readFileSync(filePath);
    wb = XLSX.read(fileData, { type: "buffer" });
  }

  // Добавляем новую анкету
  const ws = wb.Sheets["Sheet1"];
  const newRow = [name, age, hospital, doctor];
  for (let i=0; i<answers.length; i++){
    newRow.push(answers[i])
  }
  console.log("All answers", newRow)
  XLSX.utils.sheet_add_aoa(ws, [newRow], { origin: -1 });


  // Сохраняем книгу в файл
  XLSX.writeFile(wb, filePath);

  res.send("Данные успешно сохранены!");
});


app.get("/getSurveyData", (req, res) => {
  // Путь к файлу Excel
  const filePath = "surveys.xlsx";

  // Проверка наличия файла
  const fileExists = fs.existsSync(filePath);

  if (!fileExists) {
    return res.status(404).send("Файл с данными не найден");
  }

  // Если файл существует, читаем его
  const fileData = fs.readFileSync(filePath);
  const wb = XLSX.read(fileData, { type: "buffer" });

  // Получаем данные из листа "Анкеты"
  const ws = wb.Sheets["Sheet1"];
  const surveyData = XLSX.utils.sheet_to_json(ws, { header: 1 });
  console.log("Я отправляю", surveyData)
  res.json(surveyData.slice(1)); // Исключаем заголовки колонок из данных
});


app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});

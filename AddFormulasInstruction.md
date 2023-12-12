Чтобы добавить формулы в Excel-файл на сервере, вы можете использовать библиотеку `excel4node`. Вам нужно установить эту библиотеку, если еще этого не сделали:

```bash
npm install excel4node
```

Далее, вы можете обновить свой код сервера для включения формул. Вот пример, как это можно сделать:

```javascript
const express = require("express");
const XLSX = require("xlsx");
const Excel = require("excel4node");
const fs = require("fs");

const app = express();
const port = 3001;

app.use(express.json());

// Остальной код приложения

app.post("/saveData", (req, res) => {
  const { name, age, hospital, doctor, answers } = req.body;

  // Путь к файлу Excel
  const filePath = "surveys.xlsx";

  // Проверка наличия файла
  const fileExists = fs.existsSync(filePath);

  // Если файл не существует, создаем новую книгу
  let wb;
  if (!fileExists) {
    wb = new Excel.Workbook();
    const ws = wb.addWorksheet("Анкеты");

    // Добавляем заголовки колонок
    ws.cell(1, 1).string("name");
    ws.cell(1, 2).string("age");
    ws.cell(1, 3).string("hospital");
    ws.cell(1, 4).string("doctor");
    ws.cell(1, 5).string("question1");
    ws.cell(1, 6).string("question2");
    ws.cell(1, 7).string("question3");
    ws.cell(1, 8).string("question4");
    ws.cell(1, 9).string("question5");
    ws.cell(1, 10).string("SumQuestion2and4"); // Новая колонка для формулы
    ws.cell(1, 11).string("SumQuestion5"); // Новая колонка для формулы
  } else {
    // Если файл существует, читаем его
    wb = XLSX.readFile(filePath);
  }

  // Создаем объект с ответами
  const answersObject = {};
  for (let i = 0; i < answers.length; i++) {
    answersObject[`question${i + 1}`] = marks[answers[i]].label;
  }

  // Добавляем новую анкету
  const ws = wb.Sheets["Анкеты"];
  const newRow = [
    name,
    age,
    hospital,
    doctor,
    ...Object.values(answersObject),
    { formula: `SUM(F${ws["!ref"].split(":")[0].substring(1)}:F${ws["!ref"].split(":")[1].substring(1)}) / B${ws["!ref"].split(":")[0].substring(1)}`, result: 0 }, // Формула для суммы вопросов 2 и 4 деленная на возраст
    { formula: `SUM(I${ws["!ref"].split(":")[0].substring(1)}:I${ws["!ref"].split(":")[1].substring(1)})`, result: 0 }, // Формула для суммы вопроса 5
  ];
  ws.addRow(newRow);

  // Сохраняем книгу в файл
  XLSX.writeFile(wb, filePath);

  res.send("Данные успешно сохранены!");
});

// Остальной код приложения

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
```

В этом примере, я добавил две новые колонки в Excel-файл для хранения результатов формул. Я использовал библиотеку `excel4node` для добавления формул к ячейкам. Формулы добавляются в виде объектов `{ formula: 'ваша формула', result: 0 }`. Когда файл сохраняется, формулы вычисляются, и результаты записываются в соответствующие ячейки. В данном примере, `SUM(F${ws["!ref"].split(":")[0].substring(1)}:F${ws["!ref"].split(":")[1].substring(1)}) / B${ws["!ref"].split(":")[0].substring(1)}` - это формула для суммы вопросов 2 и 4 деленной на возраст, и `SUM(I${ws["!ref"].split(":")[0].substring(1)}:I${ws["!ref"].split(":")[1].substring(1)})` - формула для суммы вопроса 5.

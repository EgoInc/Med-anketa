import React, { useState } from "react";
import "./surveyPage.css";
import { QuestionContainer } from "./questionContainer";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

function SurveyPage() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [hospital, setHospital] = useState("");
  const [doctor, setDoctor] = useState("");
  const [answers, setAnswers] = useState([]);

  const surveyQustions = [
    "Я доволен (довольна) результатами проводимого лечения.",
    "Мне не помогают лекарства которыми меня лечат.",
    "Результаты лечения не такие, как я ожидал (ожидала).",
    "У лекарств, которыми меня лечат, непереносимые побочные эффекты.",
    "В результате лечения у меня улучшается самочувствие."
  ];

  const scrollToTop = () => {
    const duration = 1000; // Длительность анимации в миллисекундах

    const easeInOutCubic = (t) =>
      t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

    const startTime = performance.now();
    const startPosition = window.scrollY;

    const scroll = () => {
      const currentTime = performance.now();
      const timeElapsed = currentTime - startTime;

      window.scrollTo(
        0,
        easeInOutCubic(timeElapsed / duration) * (0 - startPosition) +
          startPosition
      );

      if (timeElapsed < duration) {
        requestAnimationFrame(scroll);
      }
    };

    requestAnimationFrame(scroll);
  };


  const handleSliderChange = (index, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    console.log("Answers", updatedAnswers)
    setAnswers(updatedAnswers);
  };

  const saveForm = async () => {
    let clearAnswers = []
    console.log("Start", answers)
    for (let i=0; i<answers.length; i++){
      clearAnswers[i]=answers[i].target.value 
    }
    const data = {
      name: name,
      age: age,
      hospital: hospital,
      doctor: doctor,
      answers: clearAnswers,
    };
  
    console.log("I am sending", data)
    try {
      const response = await fetch("http://localhost:5000/saveData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        console.log("Данные успешно сохранены");
      } else {
        console.error("Ошибка сохранения данных");
      }
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  return (
    <div className="mainContainer">
      <div className="innerContainer">
        <h2>Опросник удовлетворенности пациента</h2>

        {/* Имя */}
        <TextField
          label="Имя"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />

        {/* Возраст */}
        <TextField
          label="Возраст"
          variant="outlined"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          fullWidth
          margin="normal"
        />

        {/* Выбор больницы */}
        <TextField
          select
          label="Выберите больницу"
          variant="outlined"
          value={hospital}
          onChange={(e) => setHospital(e.target.value)}
          fullWidth
          margin="normal"
        >
          <MenuItem value="Больница А">Больница А</MenuItem>
          <MenuItem value="Больница Б">Больница Б</MenuItem>
          {/* Добавьте другие больницы по необходимости */}
        </TextField>

        {/* Выбор врача */}
        <TextField
          select
          label="Выберите врача"
          variant="outlined"
          value={doctor}
          onChange={(e) => setDoctor(e.target.value)}
          fullWidth
          margin="normal"
        >
          <MenuItem value="Врач1">Врач1</MenuItem>
          <MenuItem value="Врач2">Врач2</MenuItem>
          {/* Добавьте других врачей по необходимости */}
        </TextField>

        {surveyQustions.map((question, ind) => (
          <div className="questionRow" key={ind}>
            <QuestionContainer
              questionLabel={question}
              questionInd={ind}
              answersHandler={handleSliderChange}
            />
          </div>
        ))}

        <div className="surveyButtons">
          <Button onClick={saveForm} variant="contained">
            Сохранить
          </Button>
          <Button onClick={scrollToTop}>Вернуться наверх</Button>
        </div>
      </div>
    </div>
  );
}

export { SurveyPage };
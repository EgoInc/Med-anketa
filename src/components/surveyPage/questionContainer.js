import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

function QuestionContainer({ questionLabel, questionInd, answersHandler }) {
  const marks = [
    {
      value: 0,
      label: "Нет",
    },
    {
      value: 1,
      label: "Скорее нет, чем да",
    },
    {
      value: 2,
      label: "Скорее да, чем нет",
    },
    {
      value: 3,
      label: "Да",
    },
  ];

  function valuetext(value) {
    return `${value}`;
  }

  return (
    <div className="mainQuestionContainer">
      <Box sx={{ width: 500 }}>
        <p>{questionLabel}</p>

        <Slider
          aria-label="Custom marks"
          defaultValue={0}
          getAriaValueText={valuetext}
          step={1}
          min={0}
          max={3}
          valueLabelDisplay="auto"
          marks={marks}
          onChange={(value) => answersHandler(questionInd, value)}
        />
      </Box>
    </div>
  );
}

export { QuestionContainer };

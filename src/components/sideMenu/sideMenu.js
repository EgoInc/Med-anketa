import "./sideMenu.css";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useNavigate } from 'react-router-dom';

function SideMenu() {
  const navigate = useNavigate();


  return (
    <div className="mainContainer_sideMenu">
      <div className="innerSideMenu">
        <ButtonGroup
          orientation="vertical"
          aria-label="vertical contained button group"
          variant="text"
        >
          <Button sx={{ justifyContent: "left" }} key="questionaire" onClick={() => navigate('/')}>
            Опросник
          </Button>
          <Button sx={{ justifyContent: "left" }} key="stat" onClick={() => navigate('/statistic')}>
            Статистика
          </Button>
          <Button sx={{ justifyContent: "left" }} key="logout">
            Выйти из аккаунта
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}

export { SideMenu };

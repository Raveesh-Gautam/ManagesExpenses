import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../App/features/theme/ThemeSlice";

const ToggleButton = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <button onClick={() => dispatch(toggleTheme())}>
      {darkMode ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
};

export default ToggleButton;

import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./hooks/useTheme";
import HomePage from "./pages/HomePage";
import ConfigurationPage from "./pages/ConfigurationPage";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/config" element={<ConfigurationPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;

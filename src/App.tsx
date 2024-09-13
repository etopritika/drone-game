import { FC, lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { PrivateRoute } from "./private-route";
import { Toaster } from "./components/ui/toaster";

const StartGamePage = lazy(() => import("./pages/start-game"));
const GamePage = lazy(() => import("./pages/game"));
const FinishGamePage = lazy(() => import("./pages/finish-game"));

const App: FC = (): JSX.Element => {
  return (
    <Suspense fallback={<div>Loading page...</div>}>
      <Routes>
        <Route path="/" element={<Navigate to="/start-game" replace />} />
        <Route path="/start-game" element={<StartGamePage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/game" element={<GamePage />} />
          <Route path="/finish-game" element={<FinishGamePage />} />
        </Route>
      </Routes>
      <Toaster />
    </Suspense>
  );
};

export default App;

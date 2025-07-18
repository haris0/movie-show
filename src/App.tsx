import { FavoriteContextProvider } from "./context/FavoriteProvider";
import AppRoutes from "./routes"
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <FavoriteContextProvider>
        <AppRoutes />
      </FavoriteContextProvider>
    </BrowserRouter>
  )
}

export default App

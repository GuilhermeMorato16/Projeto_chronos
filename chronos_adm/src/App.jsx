import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { QueryClientProvider } from 'react-query';
import { Paths } from "./routes";
import { queryClient } from './services';
import { AuthContext } from './context/AuthContext';
import { useState } from 'react';



const App = () => {

  const [isLogged, setIsLogged] = useState(true);

  return (
    <>
      <AuthContext.Provider value={{isLogged, setIsLogged}}>
        <QueryClientProvider client={queryClient}>
          <Paths />
        </QueryClientProvider>
      </AuthContext.Provider>
    </>
  )
}

export default App

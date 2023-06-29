import { useContext } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import 'normalize.css';
import { AnimatePresence } from 'framer-motion';

import GlobalStyle from './styles/globalStyles';
import Header from './components/Header/Header';
import Home from './pages/Home';
import ErrorBoundary from "./ErrorBoundary";

import { lightTheme, darkTheme } from './styles/theme';

import { AppContext } from './context/AppContext';

function App() {
    const location = useLocation();
    const { theme, isDrawerOpen } = useContext(AppContext);

    return (
        <div className="App">
            <ErrorBoundary>
            <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
                <GlobalStyle isDrawerOpen={isDrawerOpen} />
                <Header />
                <AnimatePresence mode='wait'>
                    <Routes location={location} key={location.pathname}>
                        <Route path="/" element={<Home />} />
                    </Routes>
                </AnimatePresence>
            </ThemeProvider>
            </ErrorBoundary>
        </div>
    );
}

export default App;

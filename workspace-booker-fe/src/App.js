import { useContext } from 'react';
import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import 'normalize.css';
import { AnimatePresence } from 'framer-motion';


import GlobalStyle from './styles/globalStyles';
import Header from './components/Header/Header';
import Home from './pages/Home';
import Drawer from './components/Drawer';
import WorkspaceBookingFormContainer from './components/WorkspaceBookingForm/WorkspaceBookingFormContainer';

import { lightTheme, darkTheme } from './styles/theme';
import ErrorBoundary from "./ErrorBoundary";
import { AppContext } from './context/AppContext';

function App() {
    const [data, setData] = useState(null);
    const location = useLocation();
    const { theme, isDrawerOpen } = useContext(AppContext);

    // useEffect(() => {
    //     fetch('https://workspacebooker.azurewebsites.net/api/workers')
    //         .then((response) => response.json())
    //         .then((data) => setData(data));
    // }, []);
    // if (data === null) {
    //     return 'Loading...';
    // }

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
                <Drawer isOpen={isDrawerOpen}>
                    <WorkspaceBookingFormContainer />
                </Drawer>
            </ThemeProvider>
            </ErrorBoundary>
        </div>
    );
}

export default App;

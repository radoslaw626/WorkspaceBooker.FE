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
import BookingDetails from "./pages/BookingDetails";

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
                        <Route path="/:workspaceId" element={<BookingDetails />} />
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

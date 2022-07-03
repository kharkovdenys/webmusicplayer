import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Player, SearchBar } from '../components';
import { LoginPage, RegisterPage, SearchPage } from '../views';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ClientSideRendering({ children }: any): JSX.Element {
  const [csrReady, setCsrReady] = useState(false);
  useEffect(() => {
    setCsrReady(true);
  }, []);
  return csrReady ? children : null;
}

export default function App(): JSX.Element {
  return (
    <>
      <ClientSideRendering>
        <BrowserRouter>
          <SearchBar />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <h1>Welcome!</h1>
                </>
              }
            />
            <Route
              path="/search"
              element={
                <SearchPage />
              }
            />
            <Route
              path="/register"
              element={
                <RegisterPage />
              }
            />
            <Route
              path="/login"
              element={
                <LoginPage />
              }
            />
            <Route
              path="/*"
              element={
                <>
                  <h1>404</h1>
                </>
              }
            />
          </Routes>
        </BrowserRouter>
      </ClientSideRendering >
      <Player></Player>
    </>
  );
}
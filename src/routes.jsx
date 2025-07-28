
import React from "react";
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { VistaDetalle } from "./pages/VistaDetalle";

export const router = createBrowserRouter(
    createRoutesFromElements(
      // ruta raiz
      <Route path="/" element={<Layout />} errorElement={<h1>¡Página no encontrada!</h1>}>
        <Route index element={<Home />} />
        <Route path="/characters/:id" element={<VistaDetalle />} />
        <Route path="/planets/:id" element={<VistaDetalle />} />
      </Route>
    )
);
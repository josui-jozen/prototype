import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router";
import App from "./app/App.tsx";
import TypesetDemo from "./app/TypesetDemo.tsx";
import { I18nProvider, isLocale, type Locale } from "./i18n";
import "./styles/index.css";

function LocaleRoute({ locale }: { locale: Locale }) {
  return (
    <I18nProvider locale={locale}>
      <App />
    </I18nProvider>
  );
}

function LocaleRouteFromParam() {
  const { locale } = useParams<{ locale: string }>();
  if (locale && isLocale(locale)) {
    return <LocaleRoute locale={locale} />;
  }
  return <Navigate to="/" replace />;
}

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LocaleRoute locale="ja" />} />
      <Route path="/:locale" element={<LocaleRouteFromParam />} />
      <Route path="/typeset" element={<TypesetDemo />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);

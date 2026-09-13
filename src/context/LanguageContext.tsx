"use client";

import React, { createContext, useContext, useState } from "react";

type Language = "ID" | "EN";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "ID",
  toggleLanguage: () => {},
});

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>("ID");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "ID" ? "EN" : "ID"));
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
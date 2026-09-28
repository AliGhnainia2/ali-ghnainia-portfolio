import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";

// Self-hosted at build time by next/font; no runtime requests to Google.
const sans = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: "italic", variable: "--font-instrument", display: "swap" });

export const fontVariables = `${sans.variable} ${mono.variable} ${serif.variable}`;

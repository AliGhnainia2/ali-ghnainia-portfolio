export type Theme = "light" | "dark";
export const themeStorageKey = "ali:theme";

// Runs before the first paint so a saved preference never flashes the other theme.
export const themeBootstrapScript = `(()=>{let theme;try{theme=localStorage.getItem(${JSON.stringify(themeStorageKey)})}catch{}if(theme!=="light"&&theme!=="dark")theme=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.dataset.theme=theme})()`;

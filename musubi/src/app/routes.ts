import { createBrowserRouter } from "react-router";
import RootLayout from "./components/RootLayout";
import WriteListScreen from "./components/screens/WriteListScreen";
import ReceivedScreen from "./components/screens/ReceivedScreen";
import SentScreen from "./components/screens/SentScreen";
import SettingsScreen from "./components/screens/SettingsScreen";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: WriteListScreen },
      { path: "received", Component: ReceivedScreen },
      { path: "sent", Component: SentScreen },
      { path: "settings", Component: SettingsScreen },
    ],
  },
]);

import { Outlet, NavLink } from "react-router";
import { PenLine, Inbox, Mail, Settings } from "lucide-react";

export default function RootLayout() {
  return (
    <div className="w-full max-w-md mx-auto bg-app-bg text-app-text min-h-[100dvh] relative shadow-2xl" style={{ fontFamily: '"Zen Maru Gothic", sans-serif' }}>
      <div className="py-36">
        <Outlet />
      </div>

      <nav className="fixed bottom-4 left-4 right-4 max-w-md mx-auto bg-white rounded-full shadow-lg flex items-center justify-around h-20 px-2 z-[70]">
        <NavItem to="/" icon={<PenLine className="hand-drawn-icon" size={24} />} label="書く" />
        <NavItem to="/received" icon={<Inbox className="hand-drawn-icon" size={24} />} label="届いた" />
        <NavItem to="/sent" icon={<Mail className="hand-drawn-icon" size={24} />} label="便箋" />
        <NavItem to="/settings" icon={<Settings className="hand-drawn-icon" size={24} />} label="設定" />
      </nav>
    </div>
  );
}

function NavItem({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex flex-col items-center justify-center w-16 h-full gap-1 transition-colors ${
          isActive ? "text-app-accent" : "text-app-sub"
        }`
      }
    >
      <div className="flex items-center justify-center">
        {icon}
      </div>
      <span className="text-[11px] font-medium mt-1">{label}</span>
    </NavLink>
  );
}

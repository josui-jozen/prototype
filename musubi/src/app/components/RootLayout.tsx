import { Outlet, NavLink } from "react-router";
import { PenLine, Inbox, Mail, Settings } from "lucide-react";
import { useBlockWheel } from "./useBlockWheel";

export default function RootLayout() {
  const navRef = useBlockWheel<HTMLElement>();

  return (
    <div className="flex flex-col h-[100dvh] w-full max-w-md mx-auto bg-app-bg text-app-text relative overflow-hidden shadow-2xl" style={{ fontFamily: '"Zen Maru Gothic", sans-serif' }}>
      <div className="flex-1 overflow-hidden relative">
        <Outlet />
      </div>

      <nav ref={navRef} className="shrink-0 bg-white border-t border-app-sub/20 flex items-center justify-around h-[96px] pb-6 pt-2 px-2 z-40">
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

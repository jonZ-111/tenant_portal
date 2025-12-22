import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import "./Layout.css";
import "./Sidebar.css";

export default function DashboardLayout({ children }) {
  return (
    <div className="d-flex">
      <Sidebar />

      <div className="flex-grow-1">
        <Topbar />
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
}

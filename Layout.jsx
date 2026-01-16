import CuteBugs from "./CuteBugs";

export default function Layout({ children }) {
  return (
    <div className="layout-container">
      <CuteBugs />
      <div className="layout-card">
        {children}
      </div>
    </div>
  );
}

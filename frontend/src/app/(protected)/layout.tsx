import RightSideBar from "../../components/protected/rightSideBar/rightSideBar";
import SideBar from "../../components/protected/sideBar/sideBar";

export default function ProtectedLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SideBar />
      {children}
      <RightSideBar />
    </>
  );
}
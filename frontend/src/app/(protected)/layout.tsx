import RightSideBar from "./rightSideBar/rightSideBar";
import SideBar from "./sideBar/sideBar";

export default function ProtectedLayout() {
  return (
    <>
      <SideBar />
      {/* ここにメインコンテンツを呼び出す */}
      {/* <MainContents /> */}
      <RightSideBar />
    </>
  );
}

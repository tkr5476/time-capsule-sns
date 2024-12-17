export default function Layout({
  children,
  sideBar,
  rightSideBar,
}: {
  children: React.ReactNode;
  sideBar: React.ReactNode;
  rightSideBar: React.ReactNode;
}) {
  return (
    <>
      <div>
        {sideBar}
        <main>{children}</main>
        {rightSideBar}
      </div>
    </>
  )
}

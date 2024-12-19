import { Button } from "@mui/material";

export default function posts() {
  return(
    <>
      <h1>投稿コンテンツ</h1>
      <Button variant="outlined" sx={{ color: "rgb(0, 127, 255)" }}>投稿する</Button>
      <Button variant="outlined" sx={{ color: "rgb(127, 127, 255)" }}>投稿する</Button>
    </>
  );
}
import { Player, Search } from "../components/index";

export default function Home(): JSX.Element {
  return (
    <div>
      <Search placeholder="Search Music" />
      <Player id={""} img={"https://lh3.googleusercontent.com"} name={""} album={""} artists={""}></Player>
    </div>
  );
}

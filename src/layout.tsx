import Nav from "src/components/nav";
import { LayoutGroup } from "framer-motion";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/router";
import { Home, User } from "react-iconly";
import { Props } from "src/types";

export default function Layout({ children }: Props) {
  return (
    <LayoutGroup>
      <main>{children}</main>
      <Tabs />
    </LayoutGroup>
  );
}

function Tabs() {
  return (
    <Nav>
      <NavLink href='/' Icon={Home} />
      <NavLink href='/user' Icon={User} />
    </Nav>
  );
}

function NavLink(props: Props) {
  const { route } = useRouter();
  const { theme } = useTheme();
  const active = route === props.href;
  const color = theme === "light" ? "black" : "white";

  return (
    <Link href={props.href} passHref>
      <props.Icon set='curved' size={30} primaryColor={active ? color : "currentColor"} />
    </Link>
  );
}

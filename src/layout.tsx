import { AnimateSharedLayout } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { HouseSimple, MagnifyingGlass, User } from "phosphor-react";
import { useEffect, useState } from "react";
import { Props } from "src/types";

export default function Layout({ children, title }: Props) {
  const router = useRouter();
  const route = router.route.slice(1)
  console.log(route);

  const [inputFocus, setInputFocus] = useState(false);
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    setInputFocus(document.activeElement?.tagName === "input");
    setIsDark(matchMedia("(prefers-color-scheme: dark)").matches);
    matchMedia("(prefers-color-scheme: dark)").onchange = () =>
      setIsDark(matchMedia("(prefers-color-scheme: dark)").matches);
  }, []);
  const navColor = isDark ? "white" : "black";

  return (
    <AnimateSharedLayout>
      <main>{children}</main>
      <nav className="nav" hidden={inputFocus}>
        <Link href="/" passHref>
          <HouseSimple color={route ? "currentColor" : navColor} />
        </Link>
        <Link href="/search" passHref>
          <MagnifyingGlass
            color={route === "search" ? navColor : "currentColor"}
          />
        </Link>
        <Link href="/user" passHref>
          <User color={route === "user" ? navColor : "currentColor"} />
        </Link>
      </nav>
    </AnimateSharedLayout>
  );
}

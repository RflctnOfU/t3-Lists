import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import Nav from "@/components/Nav";
import { ThemeToggle } from "./ThemeToggle";
import Link from "next/link";
import { useSession } from "next-auth/react";
function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <Nav />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <Link
              href="https://github.com/RflctnOfu"
              target="_blank"
              rel="noreferrer"
            >
              <div className={buttonVariants({ size: "sm", variant: "ghost" })}>
                <Icons.github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;

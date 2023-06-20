import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import Header from "@/components/Header";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();

  if (!sessionData) {
    return (
      <>
        <main className="flex min-h-screen flex-col items-center justify-center">
          <span>
            <Button variant="ghost" onClick={() => void signIn()}>
              Sign In
            </Button>{" "}
            to get Started
          </span>
        </main>
      </>
    );
  } else
    return (
      <>
        <Header />
        <main className="flex min-h-screen flex-col items-center justify-center gap-2">
          <h1>Welcome Back {sessionData.user.name}</h1>
          <Button onClick={() => void signOut()}>Sign Out</Button>
          <Button asChild>
            <Link href={"/dashboard"}>Get Started</Link>
          </Button>
        </main>
      </>
    );
};

export default Home;

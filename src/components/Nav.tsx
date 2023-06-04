import { useSession } from "next-auth/react";
function Nav() {
  const { data: sessionData } = useSession();
  return (
    <div className="my-2 rounded-lg border p-4 shadow-sm shadow-foreground">
      Welcome to Lists, {sessionData?.user.name}
    </div>
  );
}

export default Nav;

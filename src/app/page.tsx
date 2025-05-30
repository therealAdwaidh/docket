import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import AuthForm from "../components/AuthForm";
import TodoList from "../components/TodoList";
import LogoutButton from "../components/LogoutButton";


export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen">
         {session && <LogoutButton />}
        {session ? <TodoList /> : <AuthForm />}
      </body>
    </html>
  );
}

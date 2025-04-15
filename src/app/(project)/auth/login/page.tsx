import SignIn from "@/app/components/sign-in";
import { auth } from "@/app/lib/auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">login page</h1>
      <SignIn />
    </div>
  );
}

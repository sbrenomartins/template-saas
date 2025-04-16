import SignOut from "@/app/components/sign-out";
import { auth } from "@/app/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
      <p className="text-lg mb-2">Bem-vindo ao painel de controle!</p>
      <p className="text-md">
        {session?.user?.email ? session.user.email : "Usuário não está logado"}
      </p>
      <SignOut />
      <Link href="/payments">Gerenciar pagamentos</Link>
    </div>
  );
}

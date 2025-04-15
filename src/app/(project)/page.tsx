import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">landing page</h1>
      <Link href="/auth/login">
        <button>Login</button>
      </Link>
    </div>
  );
}

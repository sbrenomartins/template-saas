import { handleSignIn } from "@/app/actions/handle-login";

export default function SignIn() {
  return (
    <form action={handleSignIn}>
      <button className="border rounded-sm p-2 cursor-pointer" type="submit">
        Signin with Google
      </button>
    </form>
  );
}

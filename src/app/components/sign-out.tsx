import { handleSignOut } from "../actions/handle-logout";

export default function SignOut() {
  return (
    <form action={handleSignOut}>
      <button className="border rounded-sm p-2 cursor-pointer" type="submit">
        Logout
      </button>
    </form>
  );
}

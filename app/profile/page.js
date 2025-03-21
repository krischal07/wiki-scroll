import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Profile() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const { user } = session;
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center p-4">
      <div className="card w-full max-w-md p-6 bg-white dark:bg-gray-800">
        <h1 className="text-2xl font-bold mb-4 text-black dark:text-white">
          Your Profile
        </h1>
        <p className="text-lg text-black dark:text-white">
          Email: <span className="font-semibold">{user.email}</span>
        </p>
      </div>
    </div>
  );
}
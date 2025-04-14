'use client';
import { signIn, signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (session && session.user && session.user.email) {
      router.push("/dashboard");
    }
  }, [session, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (response.ok) {
        alert("Logged in successfully");
      } else {
        alert(response.error);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <main className="p-6 flex flex-col items-center">
      {session ? (
  <>  </>
      ) : (
        <>
              <h1 className="text-4xl mb-4">Login</h1>
          <form onSubmit={handleSubmit} className="mb-4">
            <label htmlFor="email" className="block mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full"
            />
            <label htmlFor="password" className="block mb-2 mt-4">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-4 w-full">
              Login
            </button>
            <p className="text-center mt-4">
              Don't have an account?{" "}
              <Link href="/pages/register" className="text-blue-500">
                Register
              </Link>
            </p>
          </form>
          <p className="text-center mb-4">or</p>
          <button onClick={() => signIn("github")} className="bg-black text-white px-4 py-2 rounded">
            Sign in with GitHub
          </button>
        </>
      )}
    </main>
  );
}


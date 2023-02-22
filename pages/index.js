import Head from "next/head";
import { useSession, signOut, getSession } from "next-auth/react";
import Link from "next/link";
import Navbar from "@/components/NavBar";

const GuestDisplay = () => {
  return (
    <main className="max-w-xl rounded overflow-hidden shadow-lg m-auto mt-5 bg-red-800 p-4 z-10">
      <div className=" text-3xl">
        This website is made by NextJs, which is an awesome production framework
        of React. Login to know more about the website...
      </div>
      <div className="flex items-center justify-center mt-3">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          <Link href="/login">Sign In</Link>
        </button>
      </div>
    </main>
  );
};

const UserDisplay = () => {
  return (
    <>
    <Navbar/>
      <main className="max-w-xl rounded overflow-hidden shadow-lg m-auto mt-5 bg-slate-600 text-white p-4 z-10">
        <div className=" text-3xl">
          This website is made by NextJs, which is an awesome production
          framework of React. The webiste uses NextAuth library of nextjs for
          authentication. The NextAuth library makes it easy to integrate
          authentication system in web modern web applications.
        </div>
        <div className="flex items-center justify-around mt-3 ">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            <Link href="/profile">Profile</Link>
          </button>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => signOut()}
          >
            Sign Out
          </button>
        </div>
      </main>
    </>
  );
};

export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Homepage - NextAuth App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {session ? UserDisplay() : GuestDisplay()}
    </>
  );
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

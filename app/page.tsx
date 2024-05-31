import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1 className="title text-2xl">Home Page</h1>
      <Link href="/contact" className="text-white  bg-blue-800 mt-30 hover:bg-red-500 font-medium tounded-sm text-sm w-full px-5 py-3 text-centeropacity-50 cursor-progress"> Go To Todo Page </Link>
    </main>

  );
}

import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <div>Hello World</div>
      </main>
      <footer className="bg-gray-800 text-white text-center py-4">
        <p>&copy; 2026 Dev Tinder. All rights reserved.</p>
      </footer>
    </div>
  );
}


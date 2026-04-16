'use client'

import Link from "next/link";
import { useEffect } from "react";
import { redirect, useRouter } from "next/navigation";

export default function Home(){
  redirect ('/main')
  
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Sito Agenzia Web
      </h1>
      <p className="text-xl mb-8 text-center max-w-2xl mx-auto">
        edit visuale drag & drop
      </p>
      <div className="text-center">
        <Link
          href="/main"
          className="px-8 py-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600"
        >
          Inizia edit
        </Link>
      </div>
    </div>
  );
}
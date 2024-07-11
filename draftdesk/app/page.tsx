'use client'
import Header from "@/components/Header";
import TextEditor from "@/components/TextEditor";
import Image from "next/image";

export default function Home() {
  return (
    <main className='relative'>
      <div>
        <Header onFontChange={function (font: string): void {
          throw new Error("Function not implemented.");
        } } />
        <TextEditor />
      </div>
    </main>
  );
}

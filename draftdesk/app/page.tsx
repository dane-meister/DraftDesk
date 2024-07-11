import TextEditor from "@/components/TextEditor";
import Image from "next/image";

export default function Home() {
  return (
    <main className='relative'>  
      <div> 
        <h1>DraftDesk</h1>
      </div>
      <TextEditor />
    </main>
  );
}

  import Aboutus from "./_components/Aboutus";
import Features from "./_components/Features";
import Herosection from "./_components/Herosection";
import { HowItWorks } from "./_components/Howitworks";
import Pricing from "./_components/Pricing";


  export default async function Home() {
    return (
            <main className="">
              <Herosection/>
              <Features/>
              <HowItWorks/>
              <Pricing/>
              <Aboutus/>
        </main>
    
    )
  }

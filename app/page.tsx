import Header from "@/components/sections/Header"
import Hero from "@/components/sections/Hero"
import Problems from "@/components/sections/Problems"
import HowItWorks from "@/components/sections/HowItWorks"
import Pricing from "@/components/sections/Pricing"
import Calculator from "@/components/sections/Calculator"
import Advantages from "@/components/sections/Advantages"
import Cases from "@/components/sections/Cases"
import FAQ from "@/components/sections/FAQ"
import Footer from "@/components/sections/Footer"
import ChatWidget from "@/components/ChatWidget"

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Problems />
        <HowItWorks />
        <Pricing />
        <Calculator />
        <Advantages />
        <Cases />
        <FAQ />
      </main>
      <Footer />
      <ChatWidget />
    </>
  )
}

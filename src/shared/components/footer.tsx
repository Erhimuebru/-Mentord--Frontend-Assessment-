import { Facebook, Instagram, Linkedin, Mail, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="relative text-white">
      {/* Top Wave Vector */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="relative w-full h-full min-h-[660px] lg:min-h-0">
          <Image
            fill
            src="/images/Vector 20 (2).png"
            alt="Wave Mobile"
            className="object-cover object-center block lg:hidden"
            priority
          />
          <Image
            fill
            src="/images/Vector 20.png"
            alt="Wave Desktop"
            className="object-cover object-center hidden lg:block"
            priority
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 pt-24 sm:pt-28 lg:pt-32 pb-6 sm:pb-8 lg:pb-10 min-h-[400px]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start space-y-8 lg:space-y-0">
            {/* Logo and Socials */}
            <div className="flex gap-2">
              <h2 className="text-xl sm:text-3xl font-bold mb-4 font-epilogue">
              Blessedstore
              </h2>
            
            </div>
          </div>

          {/* Row with left and right aligned items */}
          <div className="w-full flex flex-col lg:flex-row lg:items-center lg:justify-between mt-6 sm:mt-10 gap-4 text-sm sm:text-base font-nunito">
            {/* Left: Email, Icon, Handle */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-sm sm:text-base font-nunito text-white">
              <div className="flex flex-wrap items-center gap-2">

      

                <Link   target="_blank" href="#" aria-label="Instagram">
                <Instagram className="w-5 h-5" />

                </Link>
                <Link   target="_blank" href="#" aria-label="Facebok"
                 className='bg-[#242941] p-1.5 rounded-full transition duration-200'>
                <Facebook className="w-5 h-5" />
                  
                </Link>
                <Link   target="_blank" href="#" aria-label="X">
                <Twitter className="w-5 h-5" />
                </Link>
                <Link   target="_blank" href="#" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
                </Link>
           
                <div className="flex items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                <Mail className="w-5 h-5" />
                     <Link href="mailto:erhimuebru87@gmail.com" className="break-all text-[16px]">
               erhimuebru87@gmail.com
              </Link>
                
                </div>
              </div>
            </div>

            {/* Right: Nav Links */}

  <ul className="flex flex-col space-y-2 text-[16px] font-nunito text-white lg:hidden">
    <li className="mt-2">
      <Link href="/#">Home</Link>
    </li>
    <li className="pt-2">
      <Link href="/products">Products</Link>
    </li>
    <li className="pt-2">
      <Link href="/cart">Cart</Link>
    </li>
    <li className="pt-2">
    <Link href="#"> {"Men's Wear"}</Link>
    </li>

    <li className="pt-2">
      <Link   href="#">{"Women's Wear"}</Link>
    </li>
    <li className="pt-2">
      <Link  href="#">Jewelery</Link>
    </li>
  
    <li className="pt-2">
      <Link href="#">Electronics</Link>
    </li>
   
    <li className="pt-2">
      <Link href="#">About Us</Link>
    </li>
    <li className="pt-2">
      <Link href="#">Contact Us</Link>
    </li>

   
  </ul>
  {/* Desktop:  Two-row layout */}


  <ul className="hidden lg:flex flex-col gap-4 text-[16px] font-nunito text-white">
  {/* First row */}
  <li>
    <ul className="flex gap-8">

        {/* Second row */}
  <li>
    <ul className="flex gap-8">
      <li>
        <Link href="#">Home</Link>
      </li>
      <li>
        <Link href="#">Products</Link>
      </li>
    </ul>
  </li>
      <li>
        <Link href="#">Cart</Link>
      </li>
   
     
    </ul>
  </li>
  <ul className="flex gap-8">
  <li>
        <Link href="#">{"Men's Wear"}</Link>
      </li>
  <li>
        <Link href="#">{"Women's Wear"}</Link>
      </li>
  <li className="">
    <Link href="#"> Jewelery</Link>
    </li>

  
  </ul>
 


  {/* Third row */}
  <li>
    <ul className="flex gap-8">
      <li>
        <Link href="#">Contact Us</Link>
      </li>
      <li className="">
      <Link   href="#">Electronics</Link>
    </li>
    <li className="">
      <Link  href="#">About Us</Link>
    </li>
    </ul>
  </li>
</ul>
          </div>

          {/* Copyright */}
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row mt-8 sm:mt-10 border-t border-gray-700 pt-4 justify-between items-start gap-6 text-xs text-white">
            <p className="text-[16px] font-nunito">SINCE 2025</p>
            <p className="text-[16px] font-nunito">
              © 2025 Blessedstore. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
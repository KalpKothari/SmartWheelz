import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { Heart, CarFront, Layout, ArrowLeft } from "lucide-react";
import { checkUser } from "@/lib/checkUser";


const Header = async ({ isAdminPage = false }) => {
const user = await checkUser();

  const isAdmin = user?.role === "ADMIN";

  return <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b"> 
      <nav className="mx-auto px-4 py-4 flex items-center justify-between">
        <Link href={isAdminPage ? "/admin" : "/"} className= "flex">
        <Image 
        src= "/logo1.png"
        alt="SmartWheelz Logo"
        width={200}
        height={60}
        className="h-16 w-auto object-contain"
        />
        {isAdminPage && (
          <span className="text-xs font-extralight">admin</span>
        )}
        </Link>

       {/* Action Buttons */}
       <div className="flex items-center space-x-4">
          {isAdminPage ? (
            
              <Link href="/">
                <Button variant="outline" className="flex items-center gap-2">
                  <ArrowLeft size={18} />
                  <span>Back to App</span>
                </Button>
              </Link>
    
          ) : (
                <SignedIn>
              <Link href="/saved-cars">
                <Button className="flex items-center gap-2">
                  <Heart size={18} />
                  <span className="hidden md:inline">Saved Cars</span>
                </Button>
              </Link>

              {!isAdmin ? (
                <Link
                  href="/reservations"
                  className="text-gray-600 hover:text-blue-600 flex items-center gap-2"
                >
                  <Button variant="outline">
                    <CarFront size={18} />
                    <span className="hidden md:inline">My Reservations</span>
                  </Button>
                </Link>
              ) : (
                <Link href="/admin">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Layout size={18} />
                    <span className="hidden md:inline">Admin Portal</span>
                  </Button>
                </Link>
              )}
            </SignedIn>
          )}

          <SignedOut>
              <SignInButton forceRedirectUrl="/">
                <Button variant="outline">Login</Button>
              </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            />
          </SignedIn>
        </div>
      </nav>
    </header>
};

export default Header;

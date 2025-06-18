import * as React from "react";
import HomeSearch from "@/components/home-search";
import "../app/globals.css";
import { Calendar, Car, ChevronRight, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { bodyTypes, carMakes, faqItems } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SignedOut } from "@clerk/nextjs";
import { getFeaturedCars } from "@/actions/home";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import FeaturedCars from "@/components/featured-cars";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default async function Home() {
  const featuredCars = await getFeaturedCars();

  return (
    <div className="pt-20 flex flex-col">
      {/* Header */}
      <section className="relative dotted-background py-16 md:py-28 ">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-8xl mb-4 gradient font-extrabold tracking-tighter pr-2 pb-2 text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-green-500">
              Find Your Dream Car with AIxCAR
            </h1>
            <p className="text-xl text-gray-500 mb-8 max-w-2xl mx-auto">
              Advanced AI Car Search and test drive from thousands of vehicles
            </p>
          </div>
          {/* Search */}
          <HomeSearch />
        </div>
      </section>

      {/* Featured */}
      <section className="py-12">
        <div className="container mx-auto px-4 cursor-pointer">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold ">Featured Cars</h2>
            <Button className="flex items-center " variant="ghost" asChild>
              <Link href="/cars">
                View All <ChevronRight className="ml-1 h-4 w-4 cursor-pointer" />
              </Link>
            </Button>
          </div>

          <FeaturedCars featuredCars={featuredCars} />
        </div>
      </section>

      {/* Browse Brands */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Browse by Make</h2>
            <Button className="flex items-center" variant="ghost" asChild>
              <Link href="/cars" className=" ">
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
 
          {/* Carousel Area */}   ``
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="hidden lg:block"
          >
            <CarouselContent className="space-x-4">
              {carMakes.map((make) => {
                return (
                  <CarouselItem key={make.name} className="max-w-[200px] bg-white rounded-lg shadow p-4 text-center hover:shadow-md transition">
                    <Link
                      href={`/cars?make=${make.name}`}
                      key={make.name}
                      className=""
                    >
                      <div className="min-h-16 min-w-[150px] mx-auto mb-2 relative">
                        <Image
                          src={make.image}
                          fill
                          alt={make.image}
                          className="object-contain"
                        />
                      </div>
                      <h3 className="font-medium">{make.name}</h3>
                    </Link>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="cursor-pointer"/>
            <CarouselNext />
          </Carousel>

          {/* Scroll Area */}
          <ScrollArea className="lg:hidden w-full whitespace-nowrap rounded-md ">
            {/* <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4"> */}
            <div className="w-full flex space-x-4">
              {carMakes.map((make) => {
                return (
                  <Link
                    href={`/cars?make=${make.name}`}
                    key={make.name}
                    className="bg-white rounded-lg shadow p-4 text-center hover:shadow-md transition"
                  >
                    <div className="min-h-16 min-w-[150px] mx-auto mb-2 relative">
                      <Image
                        src={make.image}
                        fill
                        alt={make.image}
                        className="object-contain"
                      />
                    </div>
                    <h3 className="font-medium">{make.name}</h3>
                  </Link>
                );
              })}
            </div>
            <ScrollBar orientation="horizontal" className={`hidden`} />
          </ScrollArea>
        </div>
      </section>

      {/* Why Choose Our Platform */}
      <section className="py-16">
        <div>
          <h2 className="text-2xl font-bold text-center mb-12">
            Why Choose Our Platform?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 text-blue-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Car className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Wide Selection</h3>
              <p className="text-gray-600">
                Thousands of verified vehicles from trusted dealerships and
                private sellers.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 text-blue-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Easy Test Drive</h3>
              <p className="text-gray-600">
                Book a test drive online in minutes, with flexible schedulin{" "}
                options.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 text-blue-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Secure Process</h3>
              <p className="text-gray-600">
                Verified listings and secure booking process for peace of mind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Browse by Body Type */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Browse by Body Type</h2>
            <Button className="flex items-center" variant="ghost" asChild>
              <Link href="/cars" className=" ">
                View All <ChevronRight className="ml-1 h-4 w-4 cursor-pointer" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4  gap-4">
            {bodyTypes.map((type) => {
              return (
                <Link
                  href={`/cars?bodyType=${type.name}`}
                  key={type.name}
                  className="cursor-pointer relative group"
                >
                  <div className="overflow-hidden rounded-lg flex justify-end h-36 mb-4 relative text-black/90">
                    <Image
                      src={type.image}
                      fill
                      alt={type.image}
                      className="object-cover group-hover:scale-105 transition duration-300 cursor-pointer "
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/20  rounded-lg flex items-end">
                    <h3 className="text-white text-xl font-bold pl-4 pb-2 drop-shadow-[0_0_5px_rgba(255,255,255,0.6)] tracking-wide">
                      {type.name}
                    </h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full cursor-pointer">
            {faqItems.map((item, i) => {
              return (
                <AccordionItem value={`item-${i}`} key={i}>
                  <AccordionTrigger className="hover:no-underline ">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent>{item.answer} </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </section>

      {/* Second Hero  */}
      <section className="py-16 dotted-background text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold capitalize mb-4">
            Ready to find your Dream car?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who found their perfect
            vehicle through our platform
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" asChild variant="secondary">
              <Link href="/cars">View All Cars</Link>
            </Button>
            <SignedOut>
              <Button size="lg" asChild>
                <Link href="/sign-up">Sign Up Now</Link>
              </Button>
            </SignedOut>
          </div>
        </div>
      </section>
    </div>
  );
}

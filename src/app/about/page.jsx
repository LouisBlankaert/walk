"use client"

import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20 sm:pt-24">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section images */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-8 sm:mb-16">
          <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] lg:aspect-auto lg:h-[600px] border border-black">
            <Image
              src="/images/image1.jpg"
              alt="Notre atelier"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="flex flex-col items-start justify-center w-full h-full border border-black p-6 sm:p-8 lg:p-16 xl:p-32">
            <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8">Notre Histoire</h1>
            <p className="text-sm sm:text-base mb-4">
                Fondée en 2020 à Bruxelles, WALK est née de la passion pour la mode éthique et durable. 
                Notre vision était simple : créer des vêtements qui allient style, confort et responsabilité 
                environnementale.
              </p>

              <p className="text-sm sm:text-base">
                Chaque pièce WALK est conçue et fabriquée en Belgique, dans nos ateliers où le savoir-faire 
                artisanal se mêle à l'innovation. Nous travaillons en étroite collaboration avec des artisans 
                locaux qui partagent notre engagement pour la qualité et l'excellence.
              </p>
          </div>
        </div>

        {/* Section histoire */}
        <div className="max-w-3xl mx-auto mb-16 sm:mb-24 px-0 sm:px-8">
          <div className="space-y-8 text-gray-600">
            <h2 className="text-base sm:text-lg font-bold">
              Notre approche de la mode est minimaliste et intemporelle. Nous créons des collections 
              limitées, privilégiant la qualité à la quantité. Chaque vêtement est pensé pour durer et 
              s'intégrer parfaitement dans une garde-robe consciente et réfléchie.
            </h2>

            <p className="text-sm sm:text-base">
              Aujourd'hui, WALK continue de grandir tout en restant fidèle à ses valeurs fondatrices : 
              l'authenticité, la durabilité et l'élégance simple. Notre communauté grandissante partage 
              cette vision d'une mode plus responsable et plus personnelle.
            </p>

            <div className="pt-6 sm:pt-8 text-xs sm:text-sm italic text-center">
              "La vraie élégance est durable" - Notre philosophie depuis 2020
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

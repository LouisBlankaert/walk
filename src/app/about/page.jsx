"use client"

import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24">
      <div className="container mx-auto px-4">
        {/* Section images */}
        <div className="h-[75vh] grid grid-cols-2 gap-4 mb-16">
          <div className="relative w-full h-full border border-black">
            <Image
              src="/images/image1.jpg"
              alt="Notre atelier"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="flex flex-col items-start justify-center w-full h-full border border-black px-32">
            <h1 className="text-4xl font-bold mb-8">Notre Histoire</h1>
            <p>
                Fondée en 2020 à Bruxelles, WALK est née de la passion pour la mode éthique et durable. 
                Notre vision était simple : créer des vêtements qui allient style, confort et responsabilité 
                environnementale.
              </p>

              <p>
                Chaque pièce WALK est conçue et fabriquée en Belgique, dans nos ateliers où le savoir-faire 
                artisanal se mêle à l'innovation. Nous travaillons en étroite collaboration avec des artisans 
                locaux qui partagent notre engagement pour la qualité et l'excellence.
              </p>
          </div>
        </div>

        {/* Section histoire */}
        <div className="w-3xl mx-auto mb-24">
          <div className="space-y-8 text-gray-600">
            <h2 className="font-bold">
              Notre approche de la mode est minimaliste et intemporelle. Nous créons des collections 
              limitées, privilégiant la qualité à la quantité. Chaque vêtement est pensé pour durer et 
              s'intégrer parfaitement dans une garde-robe consciente et réfléchie.
            </h2>

            <p>
              Aujourd'hui, WALK continue de grandir tout en restant fidèle à ses valeurs fondatrices : 
              l'authenticité, la durabilité et l'élégance simple. Notre communauté grandissante partage 
              cette vision d'une mode plus responsable et plus personnelle.
            </p>

            <div className="pt-8 text-sm italic text-center">
              "La vraie élégance est durable" - Notre philosophie depuis 2020
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

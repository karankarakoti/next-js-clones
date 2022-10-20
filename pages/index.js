import Head from "next/head";

import { Banner, Footer, Header, LargeCard, MediumCard, SmallCard } from "components";

export default function Home({ 
  exploreData, 
  cardsData 
}) {
  return (
    <div>
      <Head>
        <title>Airbnb</title>
        <meta name="description" content="Airbnb Clone NextJS App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <Banner/>
      <main className="max-w-7xl mx-auto px-8 sm:px-16">
        <section className="pt-6">
          <h2 className="text-3xl font-semibold pb-5">
            Explore Nearby
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {exploreData?.map((item, index) => (
              <SmallCard
                key={index}
                img={item.img}
                location={item.location}
                distance={item.distance}
              />
            ))}   
          </div>       
        </section>
        <section className="pt-6">
          <h2 className="text-3xl font-semibold pb-5">
            Live Anywhere
          </h2>
          <div className="flex overflow-scroll space-x-3 scrollbar-hide p-3 ml-3">
            {cardsData?.map((item, index) => (
              <MediumCard
                key={index}
                img={item.img}
                title={item.title}
              />
            ))}
          </div>
        </section>
        <LargeCard
          img="https://links.papareact.com/4cj"
          title="The Greatest Outdoors"
          description="Wishlists curated by Airbnb."
          buttonText="Get Inspired"          
        />
      </main>
      <Footer/>
    </div>
  )
}

export async function getStaticProps(){
  const exploreData = await fetch("https://www.jsonkeeper.com/b/4G1G")
    .then(response => response.json());

  const cardsData = await fetch("https://www.jsonkeeper.com/b/VHHT")
    .then(response => response.json());

  return{
    props: {
      exploreData,
      cardsData,
    }
  }
}
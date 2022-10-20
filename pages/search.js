import Head from "next/head";
import { useRouter } from "next/router";
import { format } from "date-fns";

import { Footer, Header, InfoCard, Map } from "components";

const filter = [
  "Cancellation flexibility",
  "Type of place",
  "Property type",
  "Room type",
  "Accommodates",
  "Bedrooms",  
]

export default function search({
  searchResults
}) {

  const router = useRouter();
  const { location, startDate, endDate, guests } = router.query;

  const formattedStartDate = format(new Date(startDate), "dd MMMM yy");
  const formattedEndDate = format(new Date(endDate), "dd MMMM yy");
  const range = `${formattedStartDate} - ${formattedEndDate}`;

  return (
    <div>
      <Head>
        <title>Search - Airbnb</title>
        <meta name="description" content="Airbnb Clone NextJS App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header
        placeholder={`${location} | ${range} | ${guests} guest(s)`}
        location={location}
      />      
      <main className="flex">
        <section className="flex-[1] pt-14 px-6">
          <p className="text-xs">
            300+ Stays - {range} - {guests} Guests
          </p>
          <h1 className="text-3xl font-semibold mt-2 mb-6">
            Stays in {location}
          </h1>
          <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
            {filter?.map((item, index) => (
              <p key={index} className="filter-button">
                {item}
              </p>
            ))}            
          </div>
          <div className="flex flex-col">
            {searchResults?.map((item, index) => (
              <InfoCard
                key={index}
                img={item.img}
                title={item.title}
                description={item.description}
                location={item.location}
                star={item.star}
                price={item.price}
                total={item.total}                
              />
            ))}
          </div>
        </section>
        <section className="hidden xl:inline-flex flex-[0.6]">
          <Map searchResults={searchResults} />
        </section>
      </main>
      <Footer/>
    </div>
  )
}

export async function getServerSideProps(){
  const searchResults = await fetch("https://www.jsonkeeper.com/b/5NPS")
    .then(res => res.json());
  return {
    props: {
      searchResults
    }
  }
}
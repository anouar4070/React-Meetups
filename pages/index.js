import { MongoClient } from "mongodb";

//import { useEffect, useState } from "react";
import MeetupList from "../components/meetups/MeetupList";
import { Fragment } from "react";
import Head from "next/head";

// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     title: "A First Meetup",
//     image:
//       "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     address: "Habib Bourguiba avenue, 4081 Sousse",
//     description: "This is a first meetup!",
//   },
//   {
//     id: "m2",
//     title: "A second Meetup",
//     image:
//       "https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     address: "Freedom avenue, 4000 Tunis",
//     description: "This is a second meetup!",
//   },
// ];

function HomePage(props) {
  //   const [loadedMeetups, setLoadedMeetups] = useState([]);
  // useEffect(() => {
  //  //send http req & fetch data
  //   setLoadedMeetups(DUMMY_MEETUPS);
  // }, [])
  // return <MeetupList meetups={loadedMeetups} />;

  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

//* ** Server-side Rendering with "getServerSideProps" **
/// this func runs for every incoming requests anyways
// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   //fetch data from an API
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

//* ** Data fetching for static Pages **
/// This only works in your Page component files
///we take advantage of the caching & we're not regenerating the page multiple times unnecessarily
export async function getStaticProps() {
  //fetch data from an API
  //   return {
  //     props: {
  //       meetups: DUMMY_MEETUPS,
  //     },
  //     revalidate: 10 ///the page will be regenerated on the server (after deployment) at least every 10s if there's a request coming in for this page
  //   };
  //fetch('/api/meetups');/// we don't need it because the code in getStaticProps() will only run on the server.

  const client = await MongoClient.connect(
    "mongodb+srv://ahmed:ahmedanouar@cluster0.yixb9.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;

//* ** Data fetching for static Pages **
//getStaticProps() prepare props for the HomePage
//this code is executing during the build process not on the server & not on the client
//with that our DUMMY_MEETUPS will be loaded and prepared in getStaticProps and they will be set as props for HomePage component
//we move the data fetching away from the client to the server-side (to the during built process side)
//& if we view the page source (inspect element) we see that we no longer have an empty unordered list (the case that we saw using useEffect())
//& now this is pre-rendered, and it now contains the full HTML code (it's great for search engine)
//data is not fetched in  a second component render cycle on the client, but initially.

//our-domain.com/new-meetup

import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { Fragment } from "react";
import Head from "next/head";

function NewMeetupPage() {
  const router = useRouter();

  async function addMeetupHandler(enteredMeetupData) {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);

    //to navigate away
    router.push("/");
    //replace() method to make sure tha we can't go back with the back button
    //router.replace()
  }

  return <Fragment>
    <Head>
        <title>Add a new Meetup</title>
        <meta
          name="description"
          content="Add your own meetups."
        />
      </Head>
  <NewMeetupForm onAddMeetup={addMeetupHandler} />
  </Fragment>
}

export default NewMeetupPage;

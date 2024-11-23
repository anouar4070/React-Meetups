import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails() {
  return (
    <MeetupDetail
      title="A First Meetup"
      image="https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      address="Habib Bourguiba avenue, 4081 Sousse"
      description="This is a first meetup!"
    />
  );
}

export async function getStaticPaths() {
  return {
    fallback: false,
    paths: [
      {
        params: {
          meetupId: "m1",
        },
      },
      {
        params: {
          meetupId: "m2",
        },
      },
    ],
  };
}

export function getStaticProps(context) {
  //fetch data for a single meetup

  const meetupId = context.params.meetupId;
  console.log(meetupId); //you will see it on the terminal.

  return {
    props: {
      meetupData: {
        title: "A First Meetup",
        id: meetupId,
        image:
          "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        address: "Habib Bourguiba avenue, 4081 Sousse",
        description: "This is a first meetup!",
      },
    },
    revalidate: 10,
  };
}

export default MeetupDetails;

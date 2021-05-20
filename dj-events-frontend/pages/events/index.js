import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import { API_URL, PER_PAGE } from "@/config/index";
import Pagination from "@/components/Pagination";

export default function EventPage({ events, page, total }) {
    return (
        <Layout>
            <h1>Upcoming Events</h1>
            {events.length === 0 && <h3>No events to show</h3>}
            {events.map((evt) => (
                <EventItem key={evt.id} evt={evt} />
            ))}

            <Pagination page={page} total={total} perPage={PER_PAGE} />
        </Layout>
    );
}

export async function getServerSideProps({ query: { page = 1 } }) {
    const startPage = +page === 1 ? 0 : (+page - 1) * PER_PAGE;
    const eventRes = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${startPage}`);
    const events = await eventRes.json();

    const countRes = await fetch(`${API_URL}/events/count`);
    const count = await countRes.json();

    return {
        props: { events, page: +page, total: count },
    };
}
import {notFound} from "next/navigation";
import {validate as isUUID} from "uuid";
import CustomerNew from "@/features/people/CustomerNew";

export default async function CustomerPage({
                                               params,
                                           }: {
    params: Promise<{ id: string }>;
}) {
    const {id} = await params;

    if (id === "new") {
        return <CustomerNew/>;
    }

    if (!isUUID(id)) {
        notFound();
    }

    // TODO: Fetch customer data using the id

    return <>Page for ID: {id}</>;
}

import Link from 'next/link';

function ClientsPage() {
    const clients = [
        {id: "max", name: "Maximilian"},
        {id: "sam", name: "Samuel"},
        {id: "manu", name: "Manuel"},
        {id: "will", name: "Wiliam"},
    ]
    return (
        <div>
            <h1>The clients page</h1>
            <ul>
                {
                    clients.map(client => {
                        return (
                            <li key={client.id}>
                                {/*<Link href={`/clients/${client.id}`}>{client.name}</Link>*/}
                                <Link href={{
                                    pathname: 'clients/[id]',
                                    query: {id: client.id}
                                }}>{client.name}</Link>
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
}

export default ClientsPage;
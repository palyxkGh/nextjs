import {useRouter} from "next/router";

function ClientProjectsPage() {
    const router = useRouter();

    console.log("-> ", );
    function loadProjectHandler() {
        router.push('/clients/max/projectA');
    }

    return <div>
        <h1>The projects of given client</h1>
        <button onClick={loadProjectHandler}>Load Project A</button>
    </div>
}

export default ClientProjectsPage;
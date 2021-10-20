import {useRouter} from "next/router";

function SelectedClientProjectPage() {
    const router = useRouter();

    console.log("-> router.query", router.query);
    return <div>
        <h1>Selected project page for client</h1>
    </div>
}

export default SelectedClientProjectPage;
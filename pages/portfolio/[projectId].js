import {useRouter} from 'next/router';

function PortfolioProjectPage() {
    const router =  useRouter();
    console.log("-> router.pathname", router.pathname);
    console.log("-> router.query", router.query);
    return (
        <div>
            <h1>The Portfolio Page with projectID {router.pathname}</h1>
        </div>
    );
}

export default PortfolioProjectPage;
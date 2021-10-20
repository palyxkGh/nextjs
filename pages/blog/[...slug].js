import {useRouter} from 'next/router';

function BlogPostsPage() {
    const router = useRouter();
    //allow to use custom dynamic path data
    console.log("-> router.query", router.query);
    return (
        <div>
            <h1>The blogposts page</h1>
        </div>
    );
}

export default BlogPostsPage;
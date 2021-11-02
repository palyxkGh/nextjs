import styles from '../styles/Home.module.css'
import Link from 'next/link';
import path from 'path';
import fs from 'fs/promises';

export default function Home(props) {
    const { products } = props;
    return (
        <ul>
            {products.map(product => <li key={product.id}><Link href={`/${product.id}`} key={product.id}>{product.title}</Link></li>)}
        </ul>
    )
}

export async function getStaticProps() {
    console.log('-> regenerating here ...');
    const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
    const jsonData = await fs.readFile(filePath);
    const data = JSON.parse(jsonData);

    if(!data){
        return {
            redirect: {
                destination: '/no-data'
            }
        }
    }

    if(data.products.length === 0){
        return {notFound: true}
    }
    return {
        props: {
            products: data.products
        },
        //ISR
        revalidate: 10,
    };
}

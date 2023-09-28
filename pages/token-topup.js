import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { AppLayout } from "../components/AppLayout";
import { getAppProps } from "../utils/getAppProps";


export default  function TokenTopup(){


    const handleClick = async () => {

        await fetch(`/api/addTokens`,{
            method: "POST",
        });

    }

    return (
        <div>
            <h1>this is the token topup page.</h1>
            <button className = "btn" onClick={handleClick}>Add Tokens</button>
        </div>
    )
}


TokenTopup.getLayout = function getLayout(page,pageProps){
    return <AppLayout {...pageProps}>{page}</AppLayout>
 }
 

export const getServerSideProps = withPageAuthRequired({
    async getServerSideProps(ctx){
        const props = await getAppProps(ctx);
        return {
            props
        }
    }
});
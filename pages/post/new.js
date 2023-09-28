import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import { useState } from "react";
import { AppLayout } from "../../components/AppLayout";
import { getAppProps } from "../../utils/getAppProps";

export default function NewPost(props) {
  const router = useRouter();

  const [topic, setTopic] = useState('');
  const [keywords, setKeywords] = useState('');

  

  const handleSubmit = async (e) => {

    e.preventDefault();
    const response = await fetch("/api/generatePost", {
      method: "POST",
      headers: {
         'content-type': 'application/json'
      },
      body: JSON.stringify({topic, keywords})
    });
    const json = await response.json();
    console.log("Result", json);
    if(json?.postId){
        router.push(`/post/${json.postId}`)
    }


   
    
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form onSubmit={handleSubmit} style={{ width: '80%' }}>
        <div>
          <label>
            <strong>Generate a blog post on the topic of:</strong>
          </label>
          <textarea
            className="resize-none w-full block my-2 px-4 py-2 rounded-sm"
            style={{
              border: '3px solid',
           
              color: '#333',
            }}
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>
        <div>
          <label>
            <strong>Targeting the following keywords:</strong>
          </label>
          <textarea
            className="resize-none w-full block my-2 px-4 py-2 rounded-sm"
            style={{
              border: '3px solid',
              color: '#333',
            }}
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          />
        </div>
        <button type="submit" className="btn">
          Generate
        </button>
      </form>
    </div>
  );
  
}

NewPost.getLayout = function getLayout(page, pageProps) {
  return <AppLayout {...pageProps}>{page}</AppLayout>;
};

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx){
      const props = await getAppProps(ctx);
      return {
          props,
      }
  }
});
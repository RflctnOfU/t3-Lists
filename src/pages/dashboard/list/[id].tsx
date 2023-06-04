import Layout from "@/components/Layout";
import { useRouter } from "next/router";

function List() {
  const router = useRouter();

  return (
    <Layout>
      <div className="flex items-center justify-center">
        List {router.query.id}
      </div>
    </Layout>
  );
}

export default List;

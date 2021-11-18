import type { NextPage } from "next";
import { useSelector } from "react-redux";
import AppLayout from "../components/AppLayout";
import PostCard from "../components/PostCard";
import TweetForm from "../components/TweetForm";
import { RootState } from "../reducer";

const Home: NextPage = () => {
  const { mainPosts } = useSelector((state: RootState) => state.post);
  const { isLoggedIn } = useSelector((state: RootState) => state.user);

  return (
    <AppLayout>
      {isLoggedIn && <TweetForm />}
      {mainPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </AppLayout>
  );
};

export default Home;

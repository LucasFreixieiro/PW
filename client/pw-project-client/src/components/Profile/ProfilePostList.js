import Post from "./Post";

export default function ProfilePostList({ posts }) {
  return (
    <div>
      <div className="title_card">Posts</div>
      {posts.length > 0 ? (
        posts.map((post) => <Post props={post} key={post.id} />)
      ) : (
        <div>This user has made no posts.</div>
      )}
    </div>
  );
}

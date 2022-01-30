import Post from "./Post"

export default function ProfilePostList({ props }) {

    return (
        <div>
            <div className="title_card">Posts</div>
            {props.posts.length > 0 ?
                props.posts.map((post) =>
                    <Post props={post} key={post.id} />
                ) :
                <div>
                    This user has made no posts.
                </div>
            }
        </div>
    )
}
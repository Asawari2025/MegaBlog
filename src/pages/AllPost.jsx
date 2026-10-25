import {useState, useEffect} from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config";

function AllPosts() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        appwriteService.getPosts([]).then((response) => {
            if (response) setPosts(response.documents)
        })
    }, [])

  return (
    <div className="home-page">
        <Container>
            <section className="stories-section all-posts-section">
                <div className="section-heading">
                    <div>
                        <p className="eyebrow">The reading room</p>
                        <h2>All stories</h2>
                    </div>
                    <span className="story-count">{posts.length.toString().padStart(2, '0')} stories</span>
                </div>
                {posts.length > 0 ? (
                    <div className="post-grid">
                        {posts.map((post) => <PostCard key={post.$id} {...post} />)}
                    </div>
                ) : (
                    <div className="empty-stories">
                        <span className="empty-icon" aria-hidden="true">✳</span>
                        <h3>No stories to show yet.</h3>
                        <p>Once you publish a post, it will appear here.</p>
                    </div>
                )}
            </section>
        </Container>
    </div>
  )
}

export default AllPosts
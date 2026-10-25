import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import appwriteService from "../appwrite/config"
import { Container, PostCard } from '../components'

function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        appwriteService.getPosts().then((response) => {
            if (response) setPosts(response.documents)
        })
    }, [])

    return (
        <div className="home-page">
            <Container>
                <section className="home-hero">
                    <p className="eyebrow"><span className="eyebrow-dot" /> Independent ideas, thoughtfully shared</p>
                    <h1>Stories for the <span>curious mind.</span></h1>
                    <p className="hero-description">A little inspiration for wherever your curiosity takes you. Read something new, or share an idea of your own.</p>
                    <div className="hero-actions">
                        <a href="#latest-stories" className="button-primary">Explore stories <span aria-hidden="true">↓</span></a>
                        <Link to="/signup" className="hero-text-link">Start writing <span aria-hidden="true">↗</span></Link>
                    </div>
                    <div className="hero-decoration" aria-hidden="true">
                        <span className="decoration-spark">✳</span>
                        <span className="decoration-note">A good story<br />stays with you.</span>
                    </div>
                </section>

                <section className="stories-section" id="latest-stories">
                    <div className="section-heading">
                        <div>
                            <p className="eyebrow">The reading room</p>
                            <h2>Latest stories</h2>
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
                            <h3>The first story is waiting to be written.</h3>
                            <p>Check back soon for fresh ideas and perspectives.</p>
                        </div>
                    )}
                </section>
            </Container>
        </div>
    )
}

export default Home
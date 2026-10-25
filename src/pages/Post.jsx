import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const [failedImageFor, setFailedImageFor] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.user_id === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="post-detail">
            <Container>
                <div className="post-detail-image">
                    {post.featuredImage && failedImageFor !== post.$id ? (
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            onError={() => setFailedImageFor(post.$id)}
                        />
                    ) : (
                        <div className="post-detail-art" aria-hidden="true">
                            <span>✳</span>
                            <span>A story worth sharing</span>
                        </div>
                    )}

                    {isAuthor && (
                        <div className="post-detail-actions">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500">Edit</Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="post-detail-heading">
                    <h1 className="post-detail-title">{post.title}</h1>
                </div>
                <div className="post-content">
                    {post.content}
                </div>
            </Container>
        </div>
    ) : null;
}
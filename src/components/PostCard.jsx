import { useState } from "react";
import appwriteService from "../appwrite/config"
import {Link} from 'react-router-dom'

function PostCard({$id, title, featuredImage}) {
  const [imageFailed, setImageFailed] = useState(!featuredImage);
    
  return (
    <Link to={`/post/${$id}`} className="post-card">
        <div className="post-card-image">
                {featuredImage && !imageFailed ? (
                    <img
                        src={appwriteService.getFilePreview(featuredImage)}
                        alt={title}
                        onError={() => setImageFailed(true)}
                    />
                ) : (
                    <div className="post-card-art" aria-hidden="true">
                        <span>✳</span>
                        <span>Ideas grow here</span>
                    </div>
                )}
                <span className="post-card-arrow" aria-hidden="true">↗</span>
        </div>
        <div className="post-card-copy">
                <span className="post-card-category">From the community</span>
                <h2>{title}</h2>
                <span className="post-card-read">Read story <span aria-hidden="true">→</span></span>
        </div>
    </Link>
  )
}


export default PostCard
import React from 'react'

export default function SuggestedUser({ isFollowed }) {
    const [followed, setFollowed] = useState(isFollowed)

    return (
        <div className="suggested-friend">
            {e.name} Followers:{e.followers} Follows : {e.follows}
            {e.isFollowed ? <button onClick={() => handleUnfollow(e.id)}>
                Unfollow
                </button> : <button onClick={() => handleFollow(e.id)}>
                    Follow
                </button>}
        </div>

    )
}

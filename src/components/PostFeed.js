import React from "react";

export default function PostFeed(props) {
    if (props.allPostsData) {
        const data = props.allPostsData;
        return (
            <div className="feed">
                {data.map((item) => (
                    <div className="post" key={item.key}>
                        <div className="userProfileDisplay">
                            <span style={{ backgroundColor: item.color }} className="profile">{item.username.charAt(0).toUpperCase()}</span>
                            <span className="usernameDisplay">{item.username}</span>
                        </div>
                        <br />
                        <p className="postDisplay">{item.post}</p>
                        <p className="timeDisplay">{item.timestamp}</p>
                        <button className="btn btn-outline-danger btn-sm" onClick={() => props.deleteThis(item.key)}>Delete</button>
                    </div>
                )).reverse()
                }
            </div >
        );
    } else {
        return <p>No posts here.</p>;
    }
}

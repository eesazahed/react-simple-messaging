import React from "react";

export default function PostForm(props) {
    return (
        <div id="postForm">
            <p>Username: </p>
            <input type="text" placeholder="Username" onChange={props.setUsernameValue} value={props.username} />
            <br />
            <br />
            <p>Message: </p>
            <select onChange={props.setPostValue}>
                <option value="">---Please select a message---</option>
                <option value="I am testing this new app!">I am testing this new app!</option>
                <option value="This is a cool site.">This is a cool site.</option>
                <option value="Hello.">Hello.</option>
                <option value="What's up people?">What's up people?</option>
                <option value="All good!">All good.</option>
                <option value="Not bad.">Not bad.</option>
                <option value="Same.">Same.</option>
                <option value="OK">OK</option>
                <option value="Just chilling.">Just chilling.</option>
                <option value="Follow @eesazahed on GithHub!">Follow @eesazahed on GithHub!</option>
                <option value="Thanks.">Thanks.</option>
                <option value="Goodbye.">Goodbye.</option>
            </select>
            <br />
            <br />
            <p>{props.errorLog}</p>

            <div id="btnContainer">
                <button className="btn btn-primary btn-lg" id="postButton" onClick={() => props.saveData()}>
                    Submit
                </button>
            </div>
        </div>
    );
}

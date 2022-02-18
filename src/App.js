import "./app.css";
import PostForm from "./components/PostForm";
import PostFeed from "./components/PostFeed";
import { useState } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, set, ref, child, get, } from "firebase/database";
import { firebaseConfig } from "./firebase";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const dbRef = ref(getDatabase());

function App() {
    const [username, setUsername] = useState("");
    const [post, setPost] = useState("");
    const [errorLog, setErrorLog] = useState("");
    const [allPostsData, setAllPostsData] = useState(() => {
        let initialValue;
        get(child(dbRef, 'allposts')).then((snapshot) => {
            if (snapshot.exists()) {
                initialValue = snapshot.val().postfeed;
                setAllPostsData(initialValue)
            }
        }).catch((error) => {
            set(ref(db, 'allposts'), {
                postfeed: ""
            });
            console.error(error);
        });
        return initialValue || "";
    });

    function saveData() {
        if (username.length < 4 || username.length > 20) {
            setErrorLog("Username must be 4-20 characters in length.");
        } else if (post === "") {
            setErrorLog("Please select a message to send.");
        } else {
            setErrorLog("");
            let today = new Date();
            let str = today.toString().substring(0, today.toString().length - 24);

            let localData = {
                username: username,
                post: post,
                timestamp: str,
                color: ['black', 'crimson', 'orange', 'mediumseagreen', 'blue', 'teal', 'purple'][Math.floor(7 * Math.random())],
            };

            get(child(dbRef, 'allposts')).then((snapshot) => {
                if (snapshot.exists()) {
                    const dataFromCloudInArrayFormat = snapshot.val().postfeed;
                    let preData = dataFromCloudInArrayFormat;
                    localData.key = dataFromCloudInArrayFormat.length
                    preData.push(localData);
                    set(ref(db, 'allposts'), {
                        postfeed: preData
                    });
                    setAllPostsData(preData);
                } else {
                    let preData = [];
                    localData.key = 0;
                    preData.push(localData);
                    set(ref(db, 'allposts'), {
                        postfeed: preData
                    });
                    setAllPostsData(preData);
                }
            }).catch((error) => {
                console.error(error);
            });
        }
    }

    function setUsernameValue(e) {
        let usernameValue = e.target.value;
        setUsername(usernameValue);
    }

    function setPostValue(e) {
        let postValue = e.target.value;
        setPost(postValue);
    }

    function deleteThis(specificPostToBeDeleted) {
        get(child(dbRef, 'allposts')).then((snapshot) => {
            if (snapshot.exists()) {
                let dataFromCloudInArrayFormat = snapshot.val().postfeed;
                delete dataFromCloudInArrayFormat[specificPostToBeDeleted]
                set(ref(db, 'allposts'), {
                    postfeed: dataFromCloudInArrayFormat
                });
                setAllPostsData(dataFromCloudInArrayFormat);
            } else {
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    return (
        <div className="App jumbotron">
            <header>
                <h1 className="display-4">Simple Messaging</h1>
            </header>
            <main id="mainfeed">
                <p className="lead">A simple site that lets you send messages over the cloud. Clear the feed when your conversation is done, but do not clear it while in a conversation. Also, please give your first name only, and no explicit language.</p>
                <h2 className="my-4">
                    <b>¯\_(ツ)_/¯</b>
                </h2>
                <br />
                <PostForm
                    username={username}
                    post={post}
                    errorLog={errorLog}
                    setUsernameValue={setUsernameValue}
                    setPostValue={setPostValue}
                    saveData={saveData}
                />
                <PostFeed
                    allPostsData={allPostsData}
                    deleteThis={deleteThis}
                />
            </main>
        </div>
    );
}

export default App;

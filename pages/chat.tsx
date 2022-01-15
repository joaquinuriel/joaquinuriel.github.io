import { onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { useState } from "react";
import { auth, store } from "src/app";
import Layout from "src/layout";

export default function SearchPage() {
  return (
    <Layout page="search">
      <h1>Chat</h1>
      <ChatBox />
      <InputBox />
    </Layout>
  );
}

function ChatBox() {
  const [user, setUser] = useState(auth.currentUser);
  onAuthStateChanged(auth, (user) => setUser(user));
  const [messages, setMessages] = useState<{ [key: string]: string }[]>([]);
  const col = collection(store, "messages");
  onSnapshot(col, (snap) => {
    const messages = snap.docs.map((doc) => doc.data());
    setMessages(messages);
  });
  return (
    <div
      style={{
        height: 360,
        overflow: "auto",
      }}
    >
      {messages.map((message, n) => {
        const sent = user && message.uid === user.uid;
        return (
          <div
            key={"message:" + n}
            className={"message " + sent ? "sent" : "received"}
          >
            <p>{message.text}</p>
          </div>
        );
      })}
    </div>
  );
}

function InputBox() {
  const col = collection(store, "chat");
  console.log(col);

  const [text, setValue] = useState("");
  const onChange = (e: any) => setValue(e.target.value);

  const submit = async (e: any) => {
    e.preventDefault();
    const date = Date.now();
    await addDoc(col, { date, text });
    setValue("");
    // return false;
  };
  return (
    <form onSubmit={submit}>
      <input type="text" placeholder="write here" value={text} onChange={onChange} />
      <input type="submit" />
    </form>
  );
}

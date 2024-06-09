import { useState } from "react"

export default function AddCommentForm({articleName, setArticleInfo}) {
  const [username, setUsername] = useState('');
  const [text, setText] = useState('');

  const addComments = async () => {
    const result = await fetch(`/api/articles/${articleName}/add-comments`, {
      method: 'post',
      body: JSON.stringify({username, text}),
      headers: {
        "Content-Type": "application/json"
      },
    });
    const body = await result.json();
    setArticleInfo(body);
    setUsername('');
    setText('');
  };

  return (
    <form action="" className="shadow rounded px-8 pt-6 pb-8 mb-4">
      <h3 className="text-xl font-bold mb-4 text-gray-900">Add a comment</h3>
      <label htmlFor="" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
      <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      <label htmlFor="" className="block text-gray-700 text-sm font-bold mb-2">Comment</label>
      <textarea value={text} onChange={(e) => setText(e.target.value)} name="" id="" rows="4" cols="50" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" /> 
      <button onClick={() => addComments()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Add Comment
      </button>
    </form>
  )
}
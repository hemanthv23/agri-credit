import { useEffect, useState } from "react";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Button, Textarea } from "flowbite-react";

export default function Comment({ comment, onLike, onEdit, onDelete }) {
  const [user, setUser] = useState({});
  const [post, setPost] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    const getPost = async () => {
      try {
        const res = await fetch(`/api/post/${comment.postId}`);
        const data = await res.json();
        if (res.ok) {
          setPost(data);
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    getUser();
    getPost();
  }, [comment]);
  //console.log({ user, comment, post })
  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent(comment.content);
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/comment/editcomment/${comment._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: editedContent,
        }),
      });
      if (res.ok) {
        setIsEditing(false);
        onEdit(comment, editedContent);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="flex p-4 border-b dark:border-gray-600 text-sm">
      <div className="flex-shrink-0 mr-3">
        <img
          src={user.profilePicture}
          alt={user.username}
          className="w-10 h-10 rounded-full bg-green-200"
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-1">
          <span className="font-bold mr-1 text-xs truncate">
            {user ? `@${user.username}` : `anonymous user`}
          </span>
          <span className="text-gray-500 text-xs">
            {moment(comment.createdAt).fromNow()}
          </span>
          {comment.userId === post.userId && (
            <span className="inline-flex items-center px-2 py-1 text-xs font-semibold  bg-green-300 dark:bg-green-600 rounded-full ml-2 ">
              Author
            </span>
          )}
        </div>
        {isEditing ? (
          <>
            <Textarea
              className="mb-2"
              row="3"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <div className="flex justify-end gap-2 text-sm">
              <Button
                type="button"
                size="sm"
                gradientDuoTone="purpleToBlue"
                onClick={handleSave}
              >
                Save
              </Button>
              <Button
                type="button"
                size="sm"
                gradientDuoTone="purpleToBlue"
                outline
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <p className="text-gray-500 pb-2">{comment.content}</p>
        )}
        <div className="flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2">
          <button
            type="button"
            onClick={() => onLike(comment._id)}
            className={`text-gray-400 hover:text-blue-500 ${
              currentUser &&
              comment.likes.includes(currentUser._id) &&
              "!text-blue-500"
            }`}
          >
            <FaThumbsUp className="text-sm" />
          </button>
          <p className="text-gray-400">
            {comment.numberOfLikes > 0 &&
              comment.numberOfLikes +
                " " +
                (comment.numberOfLikes === 1 ? "like" : "likes")}
          </p>
          {currentUser && currentUser._id === comment.userId && (
            <>
              <button
                type="button"
                onClick={handleEdit}
                className="text-gray-400 hover:text-blue-500"
              >
                edit
              </button>
            </>
          )}
          <button
            type="button"
            onClick={() => onDelete(comment._id)}
            className="text-gray-400 hover:text-red-500"
          >
            delete
          </button>
        </div>
      </div>
    </div>
  );
}
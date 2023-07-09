/* eslint-disable react/prop-types */
import { Sidebar } from "../Sidebar";
import { OpenConversation } from "../OpenConversation";
import { useConversations } from "../../contexts/ConversationsProvider";
import { Button } from "react-bootstrap";
import { PREFIX } from "../../hooks/useLocalStorage";
import { useDispatch } from "react-redux";
import { updateUserAsync } from "../../../../Redux/features/user/userSlice";
import { useEffect } from "react";

function ChatDashboard({ id }) {
  const { selectedConversation } = useConversations();
  const dispatch = useDispatch();

  const chatBackup = () => {
    const conversationsLS = JSON.parse(
      localStorage.getItem(`${PREFIX}-conversations`)
    );
    const contactsLS = JSON.parse(localStorage.getItem(`${PREFIX}-contacts`));

    const reqBody = {
      chat: {
        conversations: conversationsLS,
        contacts: contactsLS,
      },
    };

    dispatch(updateUserAsync(reqBody));
  };

  // save chat data when components unmounts
  useEffect(() => {
    return () => {
      chatBackup();
    };
  }, []);

  return (
    <>
      <div className="d-flex justify-content-end">
        <Button
          style={{ marginLeft: "200px" }}
          variant="outline-secondary"
          size="sm"
          onClick={chatBackup}
        >
          save chat
        </Button>
      </div>
      <div className="d-flex" style={{ height: "70vh" }}>
        <Sidebar id={id} />
        {selectedConversation && <OpenConversation />}
      </div>
    </>
  );
}
export default ChatDashboard;

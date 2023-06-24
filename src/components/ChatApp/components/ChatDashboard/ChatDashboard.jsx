/* eslint-disable react/prop-types */
import { Sidebar } from "../Sidebar";
import { OpenConversation } from "../OpenConversation";
import { useConversations } from "../../contexts/ConversationsProvider";

function ChatDashboard({ id }) {
  const { selectedConversation } = useConversations();

  return (
    <div className="d-flex" style={{ height: "70vh" }}>
      <Sidebar id={id} />
      {selectedConversation && <OpenConversation />}
    </div>
  );
}
export default ChatDashboard;

import { ChatLogin } from "./components/ChatLogin";
import useLocalStorage from "./hooks/useLocalStorage";
import { ChatDashboard } from "./components/ChatDashboard";
import { ContactsProvider } from "./contexts/ContactsProvider";
import { ConversationsProvider } from "./contexts/ConversationsProvider";
import { SocketProvider } from "./contexts/SocketProvider";
import { useSelector } from "react-redux";

function ChatApp() {
  const { userId } = useSelector((store) => store.user);
  const [id, setId] = useLocalStorage("id", userId);

  const chatDashboard = (
    <SocketProvider id={id}>
      <ContactsProvider>
        <ConversationsProvider id={id}>
          <ChatDashboard id={id} />
        </ConversationsProvider>
      </ContactsProvider>
    </SocketProvider>
  );

  return <>{id ? chatDashboard : <ChatLogin onIdSubmit={setId} />}</>;
}
export default ChatApp;

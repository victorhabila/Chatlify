import React from "react";
import Conversation from "./Conversation";
import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../util/emojis.js";

function Conversations() {
  const { loading, conversations } = useGetConversations();

  console.log(conversations);
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((conversation, idx) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          emoji={getRandomEmoji()}
          lastIdx={idx === conversation.length - 1} //this prop will help us know when we reach the last conversation in order not to add divider after it
        />
      ))}
      {loading ? <span className="loading loading-spinner"></span> : null}
    </div>
  );
}

export default Conversations;

//STARTERB CODE FOR THIS PAGE
// import React from "react";
// import Conversation from "./Conversation";

// function Conversations() {
//   return (
//     <div className="py-2 flex flex-col overflow-auto">
//       <Conversation />
//       <Conversation />
//       <Conversation />
//       <Conversation />
//     </div>
//   );
// }

// export default Conversations;

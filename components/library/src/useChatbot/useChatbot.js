import { useEffect, useRef } from "react";
import { useChat } from "ai/react";
import { baseUrlTest } from "../../../../axios/baseUrl";

const useChatbot = ({
  model = "gpt-3.5-turbo",
  apiKey = "",
  outputLength = 512,
  temperature = 0.7,
  topP = 1.0,
  topK = 50,
  repetitionPenalty = 1.0,
}) => {
  const {
    messages: chatMessages,
    input: chatInput,
    handleInputChange,
    handleSubmit,
  } = useChat({
    api: `${baseUrlTest}/api/chat`,
    body: {
      model,
      outputLength,
      temperature,
      topP,
      topK,
      repetitionPenalty,
      apiKey,
    },
  });

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (chatMessages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages]);

  return {
    messages: chatMessages,
    input: chatInput,
    handleInputChange,
    handleSubmit,
    messagesEndRef,
  };
};

export default useChatbot;

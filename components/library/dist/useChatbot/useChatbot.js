import { useEffect, useRef } from "react";
import { useChat } from "ai/react";

const baseUrlStaging = "https://chakrava-dev.vercel.app"; // Staging/Production URL
const baseUrlTest = "http://localhost:3001"; // Local Development URL
const baseUrlProd = "https://www.chakrava.dev";

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
    api: `${baseUrlProd}/api/chat`, // Conditional URL based on environment
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

import { useEffect, useRef } from "react";
import { useChat } from "ai/react";

/**
 * Hook to use a chatbot with OpenAI GPT models.
 *
 * @param {object} config - Configuration object
 * @param {string} [config.model="gpt-3.5-turbo"] - The model to use
 * @param {string} [config.apiKey=""] - OpenAI API Key
 * @param {number} [config.outputLength=512] - Maximum length of the output
 * @param {number} [config.temperature=0.7] - Sampling temperature
 * @param {number} [config.topP=1.0] - Nucleus sampling rate
 * @param {number} [config.topK=50] - Top-K sampling rate
 * @param {number} [config.repetitionPenalty=1.0] - Repetition penalty
 * @returns {object} Hook state and functions
 * @returns {Array} hookState.messages - Array of messages
 * @returns {string} hookState.input - Current input
 * @returns {function} hookState.handleInputChange - Function to handle input change
 * @returns {function} hookState.handleSubmit - Function to submit the input
 * @returns {object} hookState.messagesEndRef - Ref to the end of the messages
 */
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
    api: "https://www.chakrava.dev/api/chat",
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

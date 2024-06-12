# Chakrava-Dev

A Generative AI-powered component library for React and Next.js, created by [Arka Lal Chakravarty](https://www.linkedin.com/in/arkalal/). Learn more about me and my development work on [LinkedIn](https://www.linkedin.com/in/arkalal/) and [Twitter](https://x.com/arka_codes).

## Installation

To install the `chakrava-dev` component library, use the following command:

```bash
npm install chakrava-dev
```

## Components and Hooks

### Box

The Box component is a flexible container component that allows you to control layout and styling with ease.

#### Usage

```bash
import { Box } from "chakrava-dev";
import React from "react";

const App = () => {
  return (
    <Box
      padding="20px"
      margin="20px"
      bgColor="lightgray"
      border="1px solid black"
      borderRadius="10px"
      boxShadow="2px 2px 10px rgba(0,0,0,0.1)"
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      width="60%"
      height="200px"
    >
      <div>Content 1</div>
      <div>Content 2</div>
    </Box>
  );
};

export default App;
```

#### Props

For understanding the props you can follow the code and my video tutorials as of now before I launch the website for the package.

Stay tuned 🧑🏻‍💻

### Button

The Button component allows you to create customizable buttons.

#### Usage

```bash
import { Button } from "chakrava-dev";
import React from "react";

const App = () => {
  return (
    <Button
      padding="10px 20px"
      margin="10px"
      bgColor="green"
      textColor="white"
      border="1px solid black"
      borderRadius="10px"
      hoverBgColor="darkgreen"
      hoverTextColor="white"
    >
      Click Me
    </Button>
  );
};

export default App;

```

### useChatbot

The useChatbot hook allows you to integrate a chatbot powered by OpenAI into your application with ease.

#### Usage

```bash
import React, { useState } from "react";
import { useChatbot } from "chakrava-dev";

const ChatWindow = () => {
  const [apiKey, setApiKey] = useState("");

  const { messages, input, handleInputChange, handleSubmit, messagesEndRef } =
    useChatbot({
      model: "gpt-3.5-turbo",
      apiKey: apiKey,
      outputLength: 512,
      temperature: 0.7,
      topP: 1.0,
      topK: 50,
      repetitionPenalty: 1.0,
    });

  return (
    <div>
      <input
        type="text"
        placeholder="Enter your API key"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
      />
      <div>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <input value={input} onChange={handleInputChange} />
      <button onClick={handleSubmit}>Send</button>
    </div>
  );
};

export default ChatWindow;

```

### Author

This component library is created by Arka Lal Chakravarty. Learn more about me and my development work on [LinkedIn](https://www.linkedin.com/in/arkalal/) and [Twitter](https://x.com/arka_codes).

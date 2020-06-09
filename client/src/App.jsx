import React, { useState } from 'react';
import { Box, Button, Heading, TextArea } from 'gestalt';
import 'gestalt/dist/gestalt.css';

function App() {
  const [text, setText] = useState('');

  const getSentiment = () => {};

  return (
    <Box margin={12}>
      <Box marginBottom={4} marginLeft={2}>
        <Heading size="md">Multilingual NLP</Heading>
      </Box>

      <Box display="flex" direction="row">
        <Box column={5} row={6}>
          <TextArea
            onChange={({ value }) => setText(value)}
            value={text}
            placeholder="Enter text for sentiment analysis"
          />

          <Box marginTop={4} column={4}>
            <Button
              text="Analyze"
              color="red"
              size="md"
              onClick={getSentiment}
            />
          </Box>
        </Box>

        <Box column={5} marginLeft={6}>
          <TextArea />
        </Box>
      </Box>
    </Box>
  );
}

export default App;

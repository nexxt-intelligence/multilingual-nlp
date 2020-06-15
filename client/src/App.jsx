import React, { useState } from 'react';
import { Box, Button, Heading, TextArea, Text } from 'gestalt';
import AnalysisContainer from './AnalysisContainer';
import axios from 'axios';
import 'gestalt/dist/gestalt.css';

const baseURL = 'http://localhost:8080';

function App() {
  const [text, setText] = useState('');
  const [overallScore, setOverallScore] = useState(null);
  const [sentences, setSentences] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getSentiment = () => {
    setIsLoading(true);

    axios.post(`${baseURL}/translate`, { text }).then(({ data }) => {
      axios
        .post(`${baseURL}/sentiment`, { text: data[0].translations[0].text })
        .then(({ data }) => {
          if (data.length > 0) {
            setOverallScore(data[0].confidenceScores);
            setSentences(data[0].sentences);
          } else {
            setOverallScore(null);
            setSentences(null);
          }
          setIsLoading(false);
        });
    });
  };

  return (
    <Box margin={12} minWidth={275}>
      <Box marginBottom={4}>
        <Heading size="md">Multilingual NLP</Heading>
      </Box>

      <Box display="flex" wrap minWidth={275} justifyContent="evenly">
        <Box column={5} minWidth={275} paddingY={6}>
          <TextArea
            id="gestalt-textarea"
            onChange={({ value }) => setText(value)}
            value={text}
            placeholder="Enter text for sentiment analysis"
            rows={20}
          />

          <Box marginTop={4} column={4}>
            <Button
              text="Analyze"
              color="red"
              size="md"
              onClick={getSentiment}
              padding={0}
            />
          </Box>
        </Box>

        <AnalysisContainer
          isLoading={isLoading}
          overallScore={overallScore}
          sentences={sentences}
        />
      </Box>

      <Box justifyContent="end">
        <Text align="right">powered by Nexxt Intelligence</Text>
      </Box>
    </Box>
  );
}

export default App;

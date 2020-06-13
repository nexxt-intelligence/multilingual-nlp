import React, { useState } from 'react';
import { Box, Button, Heading, SegmentedControl, TextArea } from 'gestalt';
import ScoreBar from './ScoreBar';
import axios from 'axios';
import 'gestalt/dist/gestalt.css';

const baseURL = 'http://localhost:8080';

function App() {
  const [itemIndex, setItemIndex] = useState(0);
  const [text, setText] = useState('');
  const [overallScore, setOverallScore] = useState(null);
  const [sentences, setSentences] = useState(null);

  const segmentItems = ['Overall', 'Positive', 'Neutral', 'Negative'];

  const getSentiment = () => {
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
        });
    });
  };

  return (
    <Box margin={12} minWidth={275}>
      <Box marginBottom={4} marginLeft={12}>
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

        <Box column={5} minWidth={365} paddingY={6}>
          <SegmentedControl
            items={segmentItems}
            selectedItemIndex={itemIndex}
            onChange={({ activeIndex }) => setItemIndex(activeIndex)}
          />
          {itemIndex === 0 && overallScore && <ScoreBar score={overallScore} />}
        </Box>
      </Box>
    </Box>
  );
}

export default App;

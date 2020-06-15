import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Heading,
  SegmentedControl,
  Spinner,
  Stack,
  Text,
  TextArea,
} from 'gestalt';
import ScoreBar from './ScoreBar';
import axios from 'axios';
import 'gestalt/dist/gestalt.css';

const baseURL = 'http://localhost:8080';

function App() {
  const [itemIndex, setItemIndex] = useState(0);
  const [text, setText] = useState('');
  const [overallScore, setOverallScore] = useState(null);
  const [sentences, setSentences] = useState([]);
  const [filteredSentences, setFilteredSentences] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const segmentItems = ['overall', 'positive', 'neutral', 'negative'];
  const sentimentEmojis = ['😃', '😐', '😔'];

  useEffect(() => {
    if (itemIndex > 0) {
      setFilteredSentences(
        sentences.filter(
          (sentence) =>
            sentence.sentiment === segmentItems[itemIndex].toLowerCase()
        )
      );
    } else {
      setFilteredSentences(sentences);
    }
  }, [itemIndex, sentences]);

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
          {itemIndex === 0 && overallScore && !isLoading && (
            <Box marginTop={6}>
              <Heading size="sm">Text Sentiment</Heading>
              <ScoreBar score={overallScore} />
            </Box>
          )}
          <br />
          <Spinner show={isLoading} accessibilityLabel="Example spinner" />
          <Box
            display="flex"
            wrap
            justifyContent="evenly"
            maxHeight={375}
            overflow="scroll"
          >
            {!isLoading &&
              filteredSentences.map((sentence, index) => (
                <Box
                  key={index}
                  borderSize="sm"
                  paddingX={2}
                  paddingY={3}
                  rounding={3}
                  column={5}
                  minWidth={200}
                  marginBottom={3}
                >
                  <Heading size="md" align="center">
                    {
                      sentimentEmojis[
                        segmentItems.indexOf(sentence.sentiment) - 1
                      ]
                    }
                  </Heading>
                  <ScoreBar score={sentence.confidenceScores} />
                  <Stack alignItems="center" gap={2}>
                    <Text>{sentence.text}</Text>
                  </Stack>
                </Box>
              ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default App;

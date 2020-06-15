import React, { useEffect, useState } from 'react';
import { Box, Heading, SegmentedControl, Spinner, Text } from 'gestalt';
import ScoreBar from './ScoreBar';
import SentenceCard from './SentenceCard';

function AnalysisContainer({ isLoading, overallScore, sentences }) {
  const [itemIndex, setItemIndex] = useState(0);
  const [filteredSentences, setFilteredSentences] = useState([]);

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

  return (
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
            <SentenceCard
              key={index}
              sentence={sentence}
              emoji={
                sentimentEmojis[segmentItems.indexOf(sentence.sentiment) - 1]
              }
            />
          ))}
      </Box>

      {!isLoading && sentences.length === 0 && (
        <Text color="gray" align="center">
          <span role="img" aria-label="Backhand Pointing Left">
            👈 add some data for analysis first
          </span>
        </Text>
      )}
    </Box>
  );
}

export default AnalysisContainer;

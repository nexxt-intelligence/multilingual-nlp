import React from 'react';
import { Box, Heading, Stack, Text } from 'gestalt';
import ScoreBar from './ScoreBar';

function SentenceCard({ emoji, sentence }) {
  return (
    <Box
      borderSize="sm"
      paddingX={2}
      paddingY={3}
      rounding={3}
      column={5}
      minWidth={200}
      marginBottom={3}
    >
      <Heading size="md" align="center">
        {emoji}
      </Heading>
      <ScoreBar score={sentence.confidenceScores} />
      <Stack alignItems="center" gap={2}>
        <Text>{sentence.text}</Text>
      </Stack>
    </Box>
  );
}

export default SentenceCard;

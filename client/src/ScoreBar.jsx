import React from 'react';
import { Box, Heading, Text } from 'gestalt';

const Section = ({ children, title }) => (
  <Box padding={2}>
    <Box marginBottom={1}>
      <Heading size="sm">{title}</Heading>
    </Box>
    {children}
  </Box>
);

function ScoreBar(props) {
  const { positive, neutral, negative } = props.score;

  return (
    <Section title="Text Sentiment">
      <Box display="flex" justifyContent="center">
        {positive > 0 && (
          <Box column={Math.ceil(positive * 10)} color="green">
            <Text align="center" color="white">
              {Math.round(positive * 100)}%
            </Text>
          </Box>
        )}
        {neutral > 0 && (
          <Box column={Math.ceil(neutral * 10)} color="lightGray">
            <Text align="center">{Math.round(neutral * 100)}%</Text>
          </Box>
        )}
        {negative > 0 && (
          <Box column={Math.ceil(negative * 10)} color="red">
            <Text align="center" color="white">
              {Math.round(negative * 100)}%
            </Text>
          </Box>
        )}
      </Box>
    </Section>
  );
}

export default ScoreBar;

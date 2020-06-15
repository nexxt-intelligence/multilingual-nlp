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

const Bar = ({ color, column, value, textColor = 'white' }) => (
  <Box column={column} color={color} minWidth={50}>
    <Text align="center" color={textColor} size="sm">
      {value}%
    </Text>
  </Box>
);

function ScoreBar(props) {
  const { positive, neutral, negative } = props.score;

  return (
    <Section>
      <Box display="flex" justifyContent="center">
        {positive > 0 && (
          <Bar
            color="green"
            column={Math.ceil(positive * 10)}
            value={Math.round(positive * 100)}
          />
        )}
        {neutral > 0 && (
          <Bar
            color="lightGray"
            textColor="darkGray"
            column={Math.ceil(neutral * 10)}
            value={Math.round(neutral * 100)}
          />
        )}
        {negative > 0 && (
          <Bar
            color="red"
            column={Math.ceil(negative * 10)}
            value={Math.round(negative * 100)}
          />
        )}
      </Box>
    </Section>
  );
}

export default ScoreBar;

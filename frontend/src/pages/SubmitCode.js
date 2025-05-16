import React, { useState } from 'react';
import CodeEditor from '../components/CodeEditor';
import { Container, Typography, Button, TextField } from '@mui/material';

const SubmitCode = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [output, setOutput] = useState('');
  const [input, setInput] = useState('');

  const handleRunCode = () => {
    // Simulate running code (replace with actual API call)
    setOutput(`Output: Simulated result for input "${input}"`);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Submit Code
      </Typography>
      <CodeEditor value={code} onChange={setCode} />
      <TextField
        label="Input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <Button variant="contained" color="primary" onClick={handleRunCode}>
        Run Code
      </Button>
      <Typography variant="h6" sx={{ marginTop: 2 }}>
        Output:
      </Typography>
      <pre>{output}</pre>
    </Container>
  );
};

export default SubmitCode;
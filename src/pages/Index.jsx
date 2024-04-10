import React, { useState } from "react";
import { Box, Heading, Text, Textarea, Button, VStack, HStack, useToast, Image } from "@chakra-ui/react";
import { FaPaperPlane } from "react-icons/fa";

const examples = ["Write a React component that displays the current time", "Create a Python script to scrape data from a website", "Implement a RESTful API endpoint in Node.js"];

const Index = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = async () => {
    if (!inputText) {
      toast({
        title: "Please enter a prompt",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);
    try {
      // TODO: Integrate with LM Studios API to get response
      // Simulating API call with timeout for demo purposes
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const response = "Here is the code generated based on your prompt:\n\n" + "```js\nconst getCurrentTime = () => {\n" + "  const now = new Date();\n" + "  return `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;\n" + "};\n```";

      setOutputText(response);
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "An error occurred",
        description: "Please try again later.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
    setLoading(false);
  };

  const handleExampleClick = (example) => {
    setInputText(example);
  };

  return (
    <Box maxW="800px" mx="auto" p={8}>
      <VStack spacing={8} align="stretch">
        <Heading size="2xl" textAlign="center">
          GPT-Engineer
        </Heading>
        <Text fontSize="xl" textAlign="center">
          Generate code snippets using AI
        </Text>
        <Box>
          <Textarea value={inputText} onChange={handleInputChange} placeholder="Enter your prompt here..." size="lg" rows={6} />
          <Button mt={4} colorScheme="blue" size="lg" rightIcon={<FaPaperPlane />} onClick={handleSubmit} isLoading={loading} loadingText="Generating...">
            Generate Code
          </Button>
        </Box>
        <Box>
          <Heading size="lg" mb={4}>
            Examples
          </Heading>
          <VStack spacing={2} align="stretch">
            {examples.map((example, index) => (
              <Button key={index} onClick={() => handleExampleClick(example)} variant="outline">
                {example}
              </Button>
            ))}
          </VStack>
        </Box>
        {outputText && (
          <Box>
            <Heading size="lg" mb={4}>
              Generated Code
            </Heading>
            <Text whiteSpace="pre-wrap">{outputText}</Text>
          </Box>
        )}
        <HStack justify="center">
          <Text>Powered by</Text>
          <Image src="https://images.unsplash.com/photo-1620288627223-53302f4e8c74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxsbSUyMHN0dWRpb3MlMjBsb2dvfGVufDB8fHx8MTcxMjcyMzc3OHww&ixlib=rb-4.0.3&q=80&w=1080" alt="LM Studios" h="30px" />
        </HStack>
      </VStack>
    </Box>
  );
};

export default Index;

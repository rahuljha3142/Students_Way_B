const { CohereClient } = require("cohere-ai");

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

const generateQuestions = async (req, res) => {
  try {
    const { subject, classLevel, topic, numQuestions } = req.body;

    const prompt = `Generate exactly ${numQuestions} multiple-choice questions (with 4 options and the correct answer labeled) on the topic "${topic}" for class ${classLevel} students in the subject "${subject}". Return only the questions, options, and correct answers.`;


    const response = await cohere.generate({
      model: "command",
      prompt,
      maxTokens: 1000,
      temperature: 0.7,
    });

    const rawText = response.generations[0].text;
    const questions = rawText
      .split("\n")
      .filter((line) => line.trim().length > 0);

    res.status(200).json({ questions });
  } catch (error) {
    console.error("Error generating questions:", error);
    res.status(500).json({ error: "Failed to generate questions" });
  }
};

module.exports = { generateQuestions };

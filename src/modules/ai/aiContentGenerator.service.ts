import { Injectable, Logger } from '@nestjs/common';
import Groq from 'groq-sdk';
import { GenerateVocabularyInput } from '../auth/dto/ai.input';

export interface VocabularyItem {
  word: string;
  meaning: string;
  example: string;
}

@Injectable()
export class AIContentGeneratorService {
  private readonly logger = new Logger(AIContentGeneratorService.name);
  private client: Groq | null = null;

  private getClient(): Groq {
    if (!this.client) {
      const apiKey = process.env.GROQ_API_KEY;
      if (!apiKey) {
        throw new Error('GROQ_API_KEY not set');
      }
      this.client = new Groq({ apiKey });
    }
    return this.client;
  }

  async generateVocabulary(
    input: GenerateVocabularyInput,
  ): Promise<VocabularyItem[]> {
    const { topic, level, count = 5 } = input;
    const prompt = `
Generate ${count} German vocabulary words about "${topic}" 
for ${level} level learners.

Return ONLY valid JSON array like:
[
 { "word": "...", "meaning": "...", "example": "..." }
]
`;
    console.log(count, prompt);
    const completion = await this.getClient().chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [
        { role: 'system', content: 'You are a German teacher.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
    });
    console.log(completion, 'completion');
    const text = completion.choices[0]?.message?.content ?? '';
    console.log(text, 'text');
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    console.log(jsonMatch, 'jsonMatch');
    if (!jsonMatch) throw new Error('Invalid JSON response');

    return JSON.parse(jsonMatch[0]);
  }

  async generateExamples(input: {
    word: string;
    level: string;
  }): Promise<string[]> {
    const prompt = `
Generate 3 example sentences in German using the word "${input.word}".
Level: ${input.level}.
Return JSON array of sentences.
`;

    const completion = await this.getClient().chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [{ role: 'user', content: prompt }],
    });

    const text = completion.choices[0]?.message?.content ?? '';
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) throw new Error('Invalid JSON');

    return JSON.parse(jsonMatch[0]);
  }

  async generateLessonOutline(input: {
    topic: string;
    level: string;
    sections?: number;
  }): Promise<any> {
    const { topic, level, sections = 3 } = input;

    const prompt = `
Create a lesson outline in JSON for German learners.
Topic: ${topic}
Level: ${level}
Sections: ${sections}

Return ONLY valid JSON object like:
{
  "title": "...",
  "objectives": ["..."],
  "sections": [{ "title": "...", "content": "..." }]
}
`;

    const completion = await this.getClient().chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });

    const text = completion.choices[0]?.message?.content ?? '';
    const objMatch = text.match(/\{[\s\S]*\}/);
    if (!objMatch) throw new Error('Invalid JSON response for lesson outline');

    return JSON.parse(objMatch[0]);
  }

  async generateQuiz(input: {
    text: string;
    count: number;
    level: string;
  }): Promise<any[]> {
    const { text, count, level } = input;

    const prompt = `
Generate ${count} multiple-choice questions (with 4 options each) based on the following content for ${level} German learners.
Content: ${text}

Return ONLY a JSON array like:
[
  { "question": "...", "options": ["a","b","c","d"], "answer": "...", "explanation": "..." }
]
`;

    const completion = await this.getClient().chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });

    const textResp = completion.choices[0]?.message?.content ?? '';
    const jsonMatch = textResp.match(/\[[\s\S]*\]/);
    if (!jsonMatch) throw new Error('Invalid JSON response for quiz');

    return JSON.parse(jsonMatch[0]);
  }

  async explainGrammar(
    concept: string,
    level: string,
    targetLanguage: string,
    sourceLanguage: string,
  ): Promise<string> {
    const prompt = `
Explain the German grammar concept "${concept}" 
for ${level} learners.

Explain in ${sourceLanguage}.
Include examples in ${targetLanguage}.
`;

    const completion = await this.getClient().chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [{ role: 'user', content: prompt }],
    });

    return completion.choices[0]?.message?.content ?? '';
  }

  async translateWithExplanation(
    text: string,
    sourceLanguage: string,
    targetLanguage: string,
    level: string,
  ): Promise<string> {
    const prompt = `
Translate this text from ${sourceLanguage} to ${targetLanguage}:

"${text}"

Explain grammar decisions briefly for ${level} learner.
`;

    const completion = await this.getClient().chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [{ role: 'user', content: prompt }],
    });

    return completion.choices[0]?.message?.content ?? '';
  }

  async summarizeText(text: string, targetLanguage: string): Promise<string> {
    const prompt = `
Summarize the following text in ${targetLanguage} in a short paragraph suitable for learners:

"""
${text}
"""
`;

    const completion = await this.getClient().chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [{ role: 'user', content: prompt }],
    });

    return completion.choices[0]?.message?.content ?? '';
  }

  async paraphraseText(text: string, level: string): Promise<string> {
    const prompt = `
Paraphrase the following text to be appropriate for a ${level} German learner. Keep meaning but simplify vocabulary and sentence structure:

"""
${text}
"""
`;

    const completion = await this.getClient().chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [{ role: 'user', content: prompt }],
    });

    return completion.choices[0]?.message?.content ?? '';
  }

  async generateMultipleChoiceExercises(
    lessonContent: string,
    level: string,
    count: number,
  ): Promise<
    Array<{
      question: string;
      options: string[];
      correctIndex: number;
      explanation: string;
    }>
  > {
    const prompt = `
Based on the following German lesson content for ${level} learners, generate ${count} multiple-choice questions.

Lesson content:
"""
${lessonContent}
"""

Return ONLY valid JSON array:
[
  { "question": "...", "options": ["a","b","c","d"], "correctIndex": 0, "explanation": "..." }
]
correctIndex is the 0-based index of the correct option.
`;
    const completion = await this.getClient().chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.5,
    });

    const text = completion.choices[0]?.message?.content ?? '';
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) throw new Error('Invalid JSON for multiple choice');
    return JSON.parse(jsonMatch[0]);
  }

  async generateFillInBlankExercises(
    lessonContent: string,
    level: string,
    count: number,
  ): Promise<
    Array<{ sentence_with_blank: string; answer: string; hint: string }>
  > {
    const prompt = `
Based on the following German lesson content for ${level} learners, generate ${count} fill-in-the-blank exercises.

Lesson content:
"""
${lessonContent}
"""

Return ONLY valid JSON array:
[
  { "sentence_with_blank": "Ich ___ nach Hause.", "answer": "gehe", "hint": "verb for 'to go'" }
]
Replace the missing word with ___ (three underscores).
`;
    const completion = await this.getClient().chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.5,
    });

    const text = completion.choices[0]?.message?.content ?? '';
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) throw new Error('Invalid JSON for fill-in-blank');
    return JSON.parse(jsonMatch[0]);
  }

  async generateSentenceOrderingExercises(
    lessonContent: string,
    level: string,
    count: number,
  ): Promise<
    Array<{ parts: string[]; correctOrder: number[]; prompt: string }>
  > {
    const prompt = `
Based on the following German lesson content for ${level} learners, generate ${count} sentence ordering exercises.

Lesson content:
"""
${lessonContent}
"""

Return ONLY valid JSON array:
[
  {
    "prompt": "Arrange the words to form a correct German sentence.",
    "parts": ["Hause", "Ich", "nach", "gehe"],
    "correctOrder": [1, 3, 2, 0]
  }
]
correctOrder is the array of original indices forming the correct sentence.
`;
    const completion = await this.getClient().chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.5,
    });

    const text = completion.choices[0]?.message?.content ?? '';
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) throw new Error('Invalid JSON for sentence ordering');
    return JSON.parse(jsonMatch[0]);
  }

  async generateListeningExercises(
    lessonContent: string,
    level: string,
    count: number,
  ): Promise<
    Array<{
      text_to_read: string;
      question: string;
      answer: string;
      hint: string;
    }>
  > {
    const prompt = `
Based on the following German lesson content for ${level} learners, generate ${count} listening comprehension exercises.

Lesson content:
"""
${lessonContent}
"""

Return ONLY valid JSON array:
[
  {
    "text_to_read": "Ich wohne in Berlin. Die Stadt ist sehr schön.",
    "question": "Where does the speaker live?",
    "answer": "Berlin",
    "hint": "Listen for a city name."
  }
]
The text_to_read is what would be spoken aloud. The question tests comprehension.
`;
    const completion = await this.getClient().chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.5,
    });

    const text = completion.choices[0]?.message?.content ?? '';
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) throw new Error('Invalid JSON for listening exercises');
    return JSON.parse(jsonMatch[0]);
  }
}

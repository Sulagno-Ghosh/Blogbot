const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: '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', // defaults to process.env["OPENAI_API_KEY"]
});

async function main() {
  const stream = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: 'Say this is a test' }],
    stream: true,
  });
  for await (const part of stream) {
    process.stdout.write(part.choices[0]?.delta?.content || '');
  }
}

main();
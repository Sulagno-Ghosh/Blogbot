const OpenAI = require('openai');


const openai = new OpenAI({
  apiKey: "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", // defaults to process.env["OPENAI_API_KEY"]
});




async function main() {
  const stream = await openai.chat.completions.create({
    model: 'gpt-4-1106-preview',
    messages: [{ role: 'user', content: "write a poem for 5 lines"}],
    stream: true,
  });
  for await (const part of stream) {
    process.stdout.write(part.choices[0]?.delta?.content || '');
  }
}

main();
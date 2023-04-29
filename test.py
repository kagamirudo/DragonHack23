key = "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"
key_paid = "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"

import openai
openai.api_key = key_paid # Replace YOUR_API_KEY with your actual API key

# Define the function to generate text based on a prompt

def generate_text(prompt):
    response = openai.Completion.create(
      engine="text-davinci-003",
    #   model="gpt-3.5-turbo",
      prompt=prompt,
      max_tokens=1000,
      n=1,
      stop=None,
      temperature=0.5,
    )
    return response.choices[0].text.strip()

# Ask the user for a prompt
prompt = input("Enter a prompt: ")
rep = prompt.split(',')

res = f"Give me recipes with these ingredients: {prompt}"

# Generate text based on the prompt
output = generate_text(res)

# Print the output
print(output)
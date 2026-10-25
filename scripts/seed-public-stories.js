import process from 'node:process'

const requiredEnv = [
  'VITE_APPWRITE_URL',
  'VITE_APPWRITE_PROJECT_ID',
  'VITE_APPWRITE_DATABASE_ID',
  'VITE_APPWRITE_COLLECTION_ID',
  'APPWRITE_API_KEY',
]

const missingEnv = requiredEnv.filter((key) => !process.env[key]?.trim())

if (missingEnv.length > 0) {
  console.error(`Missing required environment variables: ${missingEnv.join(', ')}`)
  process.exitCode = 1
} else {
  const endpoint = process.env.VITE_APPWRITE_URL.replace(/\/+$/, '')
  const baseUrl = `${endpoint}/databases/${encodeURIComponent(process.env.VITE_APPWRITE_DATABASE_ID)}/collections/${encodeURIComponent(process.env.VITE_APPWRITE_COLLECTION_ID)}/documents`
  const headers = {
    'Content-Type': 'application/json',
    'X-Appwrite-Project': process.env.VITE_APPWRITE_PROJECT_ID,
    'X-Appwrite-Key': process.env.APPWRITE_API_KEY,
  }
  const permissions = ['read("any")']
  const stories = [
    {
      id: 'demo-small-rituals',
      title: 'The small rituals that make a day feel like yours',
      content: 'A small ritual can make a day feel like yours. Make tea before opening your inbox, take a slower walk, or write down one thing you want to notice. The ritual does not need to be impressive; it only needs to be repeatable.',
    },
    {
      id: 'demo-learning-to-pause',
      title: 'Learning to leave a little room in the day',
      content: 'A calendar without gaps can look productive, but it leaves little space for unexpected ideas, good conversations, or the rest that makes work possible. Leave ten minutes between commitments. Room is not wasted time; it helps us notice what matters.',
    },
    {
      id: 'demo-gardens-between-buildings',
      title: 'The overlooked gardens between buildings',
      content: 'A forgotten patch of green behind the bus stop held tiny white flowers. Since then, I notice herbs outside cafes and trees leaning into sunlight. Paying attention makes familiar streets feel alive.',
    },
  ]

  const seed = async () => {
    for (const story of stories) {
      const response = await fetch(baseUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          documentId: story.id,
          data: {
            title: story.title,
            content: story.content,
            user_id: 'megablog-demo-author',
            featuredImage: '',
            status: 'active',
          },
          permissions,
        }),
      })

      if (response.ok) {
        console.log(`Created public story: ${story.title}`)
        continue
      }

      const responseBody = await response.text()
      if (response.status === 409) {
        console.log(`Skipped existing story: ${story.title}`)
        continue
      }

      throw new Error(`Appwrite returned ${response.status}: ${responseBody}`)
    }
  }

  seed().catch((error) => {
    console.error(`Unable to seed public stories: ${error.message}`)
    process.exitCode = 1
  })
}

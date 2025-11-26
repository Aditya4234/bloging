import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Post from './models/Post.js';
import Comment from './models/Comment.js';

dotenv.config();

const samplePosts = [
  {
    title: "Getting Started with React 18",
    content: `<h2>Introduction to React 18</h2>
    <p>React 18 brings exciting new features that make building user interfaces even better. In this post, we'll explore the key improvements and how to get started.</p>
    
    <h3>Key Features</h3>
    <p>The most significant addition is <strong>Concurrent Rendering</strong>, which allows React to prepare multiple versions of the UI at the same time. This leads to smoother user experiences, especially in complex applications.</p>
    
    <h3>Automatic Batching</h3>
    <p>React 18 now batches all state updates automatically, even those inside promises, setTimeout, and native event handlers. This means better performance out of the box!</p>
    
    <h3>New Hooks</h3>
    <ul>
      <li><code>useId</code> - Generate unique IDs for accessibility</li>
      <li><code>useTransition</code> - Mark updates as non-urgent</li>
      <li><code>useDeferredValue</code> - Defer updating less important parts</li>
    </ul>
    
    <p>These features make React 18 a game-changer for modern web development!</p>`,
    excerpt: "Discover the amazing new features in React 18 and how they improve your development experience.",
    categories: ["Technology"],
    tags: ["react", "javascript", "web development"],
    status: "published",
    featuredImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop"
  },
  {
    title: "10 Tips for a Healthier Lifestyle",
    content: `<h2>Transform Your Life with These Simple Tips</h2>
    <p>Living a healthier lifestyle doesn't have to be complicated. Here are 10 practical tips you can start implementing today!</p>
    
    <h3>1. Stay Hydrated</h3>
    <p>Drink at least 8 glasses of water daily. Your body needs water for every cellular function.</p>
    
    <h3>2. Move Your Body</h3>
    <p>Aim for 30 minutes of physical activity each day. It doesn't have to be intense - even walking counts!</p>
    
    <h3>3. Prioritize Sleep</h3>
    <p>Get 7-9 hours of quality sleep. Your body repairs and regenerates during sleep.</p>
    
    <h3>4. Eat Whole Foods</h3>
    <p>Focus on fruits, vegetables, whole grains, and lean proteins. Minimize processed foods.</p>
    
    <h3>5. Practice Mindfulness</h3>
    <p>Take 10 minutes daily for meditation or deep breathing. Mental health is just as important as physical health.</p>
    
    <p>Remember, small consistent changes lead to big results over time!</p>`,
    excerpt: "Simple, actionable tips to help you live a healthier and happier life starting today.",
    categories: ["Health"],
    tags: ["wellness", "fitness", "lifestyle"],
    status: "published",
    featuredImage: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=400&fit=crop"
  },
  {
    title: "The Ultimate Guide to Remote Work",
    content: `<h2>Mastering Remote Work in 2025</h2>
    <p>Remote work is here to stay. Learn how to thrive in a distributed work environment with these proven strategies.</p>
    
    <h3>Create a Dedicated Workspace</h3>
    <p>Having a specific area for work helps maintain work-life boundaries. Invest in a comfortable chair and good lighting.</p>
    
    <h3>Establish a Routine</h3>
    <p>Start and end your workday at consistent times. This helps maintain structure and prevents burnout.</p>
    
    <h3>Communication is Key</h3>
    <p>Over-communicate with your team. Use video calls, instant messaging, and project management tools effectively.</p>
    
    <h3>Take Regular Breaks</h3>
    <p>Use the Pomodoro Technique: 25 minutes of focused work followed by a 5-minute break.</p>
    
    <h3>Stay Connected</h3>
    <p>Schedule virtual coffee chats with colleagues. Social interaction is important for mental health.</p>
    
    <blockquote>
      "The future of work is not about where you work, but how you work."
    </blockquote>`,
    excerpt: "Everything you need to know about succeeding in remote work, from setup to productivity tips.",
    categories: ["Business"],
    tags: ["remote work", "productivity", "career"],
    status: "published",
    featuredImage: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=800&h=400&fit=crop"
  },
  {
    title: "Exploring the Streets of Tokyo",
    content: `<h2>A Journey Through Japan's Capital</h2>
    <p>Tokyo is a city of contrasts - where ancient temples stand alongside futuristic skyscrapers. Join me as I explore this incredible metropolis!</p>
    
    <h3>Shibuya Crossing</h3>
    <p>The world's busiest pedestrian crossing is a sight to behold. Thousands of people cross simultaneously in a perfectly choreographed dance.</p>
    
    <h3>Senso-ji Temple</h3>
    <p>Tokyo's oldest temple in Asakusa offers a glimpse into Japan's rich spiritual heritage. The approach through Nakamise Shopping Street is filled with traditional crafts and snacks.</p>
    
    <h3>Tsukiji Outer Market</h3>
    <p>While the inner wholesale market has moved, the outer market still offers incredible fresh seafood and street food. Don't miss the tamagoyaki (Japanese omelet)!</p>
    
    <h3>Harajuku</h3>
    <p>The center of youth culture and fashion. Takeshita Street is a sensory overload of colors, sounds, and unique fashion.</p>
    
    <p>Tokyo is a city that never stops amazing you. Every corner reveals something new!</p>`,
    excerpt: "Discover the magic of Tokyo through its bustling streets, ancient temples, and vibrant culture.",
    categories: ["Travel"],
    tags: ["japan", "tokyo", "travel guide"],
    status: "published",
    featuredImage: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=400&fit=crop"
  },
  {
    title: "Mastering Italian Pasta from Scratch",
    content: `<h2>The Art of Homemade Pasta</h2>
    <p>There's nothing quite like fresh, homemade pasta. Let me show you how to make authentic Italian pasta from scratch!</p>
    
    <h3>Ingredients</h3>
    <ul>
      <li>2 cups all-purpose flour</li>
      <li>3 large eggs</li>
      <li>1 tablespoon olive oil</li>
      <li>Pinch of salt</li>
    </ul>
    
    <h3>The Process</h3>
    <p><strong>Step 1:</strong> Create a flour well on your work surface. Crack eggs into the center.</p>
    <p><strong>Step 2:</strong> Slowly incorporate flour into eggs using a fork, working from the inside out.</p>
    <p><strong>Step 3:</strong> Knead the dough for 10 minutes until smooth and elastic.</p>
    <p><strong>Step 4:</strong> Rest the dough for 30 minutes wrapped in plastic.</p>
    <p><strong>Step 5:</strong> Roll out and cut into your desired shape!</p>
    
    <h3>Pro Tips</h3>
    <p>Use "00" flour for the silkiest texture. Don't skip the resting time - it makes the dough easier to work with.</p>
    
    <p>Buon appetito! 🍝</p>`,
    excerpt: "Learn to make authentic Italian pasta from scratch with this step-by-step guide.",
    categories: ["Food"],
    tags: ["cooking", "italian", "pasta", "recipe"],
    status: "published",
    featuredImage: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&h=400&fit=crop"
  },
  {
    title: "Building a Successful Startup in 2025",
    content: `<h2>From Idea to Launch</h2>
    <p>Starting a business is challenging but rewarding. Here's what I learned building my startup from the ground up.</p>
    
    <h3>Validate Your Idea</h3>
    <p>Don't build in a vacuum. Talk to potential customers early and often. Their feedback is invaluable.</p>
    
    <h3>Build an MVP</h3>
    <p>Start with a Minimum Viable Product. Get something in users' hands quickly and iterate based on feedback.</p>
    
    <h3>Focus on One Thing</h3>
    <p>Do one thing exceptionally well before expanding. Trying to do everything leads to doing nothing well.</p>
    
    <h3>Build in Public</h3>
    <p>Share your journey on social media. It builds an audience and creates accountability.</p>
    
    <h3>Take Care of Yourself</h3>
    <p>Burnout is real. Make time for exercise, sleep, and relationships. You can't pour from an empty cup.</p>
    
    <p>The startup journey is a marathon, not a sprint. Enjoy the process!</p>`,
    excerpt: "Essential lessons and strategies for building a successful startup in today's competitive landscape.",
    categories: ["Business"],
    tags: ["startup", "entrepreneurship", "business"],
    status: "published",
    featuredImage: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=400&fit=crop"
  },
  {
    title: "Minimalist Living: Less is More",
    content: `<h2>Embracing Simplicity</h2>
    <p>Minimalism isn't about having nothing - it's about having exactly what you need and nothing more.</p>
    
    <h3>Why Minimalism?</h3>
    <p>Less clutter means less stress. When you own fewer things, you spend less time cleaning, organizing, and worrying about your possessions.</p>
    
    <h3>Getting Started</h3>
    <p>Start small. Pick one drawer or closet. Remove items you haven't used in a year.</p>
    
    <h3>The One-In-One-Out Rule</h3>
    <p>For every new item you bring in, remove one item. This maintains balance and prevents accumulation.</p>
    
    <h3>Quality Over Quantity</h3>
    <p>Invest in fewer, higher-quality items that last longer and bring you joy.</p>
    
    <h3>Digital Minimalism</h3>
    <p>Don't forget your digital life! Unsubscribe from emails, delete unused apps, organize your files.</p>
    
    <p>Minimalism is a journey, not a destination. Take it one step at a time.</p>`,
    excerpt: "Discover how minimalist living can reduce stress and increase happiness through intentional simplicity.",
    categories: ["Lifestyle"],
    tags: ["minimalism", "declutter", "simple living"],
    status: "published",
    featuredImage: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=400&fit=crop"
  },
  {
    title: "Introduction to Machine Learning",
    content: `<h2>Understanding AI and ML</h2>
    <p>Machine Learning is transforming every industry. Let's demystify this powerful technology!</p>
    
    <h3>What is Machine Learning?</h3>
    <p>ML is a subset of AI that enables computers to learn from data without being explicitly programmed.</p>
    
    <h3>Types of Machine Learning</h3>
    <p><strong>Supervised Learning:</strong> Learning from labeled data (e.g., spam detection)</p>
    <p><strong>Unsupervised Learning:</strong> Finding patterns in unlabeled data (e.g., customer segmentation)</p>
    <p><strong>Reinforcement Learning:</strong> Learning through trial and error (e.g., game AI)</p>
    
    <h3>Popular Algorithms</h3>
    <ul>
      <li>Linear Regression</li>
      <li>Decision Trees</li>
      <li>Neural Networks</li>
      <li>K-Means Clustering</li>
    </ul>
    
    <h3>Getting Started</h3>
    <p>Learn Python, study statistics, and practice with datasets from Kaggle. Start with simple projects!</p>
    
    <p>The future is intelligent - and you can be part of building it!</p>`,
    excerpt: "A beginner-friendly introduction to machine learning concepts and how to get started.",
    categories: ["Technology"],
    tags: ["machine learning", "AI", "data science"],
    status: "published",
    featuredImage: "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&h=400&fit=crop"
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Post.deleteMany({});
    await Comment.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create sample users
    const users = await User.create([
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        bio: 'Tech enthusiast and full-stack developer. Love sharing knowledge about web development.',
        avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=667eea&color=fff&size=200'
      },
      {
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        password: 'password123',
        bio: 'Health and wellness coach. Passionate about helping people live their best lives.',
        avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=f093fb&color=fff&size=200'
      },
      {
        name: 'Mike Chen',
        email: 'mike@example.com',
        password: 'password123',
        bio: 'Travel blogger and photographer. Exploring the world one city at a time.',
        avatar: 'https://ui-avatars.com/api/?name=Mike+Chen&background=4facfe&color=fff&size=200'
      },
      {
        name: 'Emma Wilson',
        email: 'emma@example.com',
        password: 'password123',
        bio: 'Food lover and recipe creator. Making cooking accessible and fun for everyone.',
        avatar: 'https://ui-avatars.com/api/?name=Emma+Wilson&background=43e97b&color=fff&size=200'
      }
    ]);
    console.log('✅ Created sample users');

    // Create posts with different authors
    const posts = [];
    for (let i = 0; i < samplePosts.length; i++) {
      const post = await Post.create({
        ...samplePosts[i],
        author: users[i % users.length]._id
      });
      posts.push(post);
    }
    console.log('✅ Created sample posts');

    // Create sample comments
    const comments = [
      {
        content: 'Great article! Really helpful information.',
        author: users[1]._id,
        post: posts[0]._id
      },
      {
        content: 'Thanks for sharing this. I learned a lot!',
        author: users[2]._id,
        post: posts[0]._id
      },
      {
        content: 'These tips are amazing! Already implementing them.',
        author: users[0]._id,
        post: posts[1]._id
      },
      {
        content: 'I needed this. Working from home has been challenging.',
        author: users[3]._id,
        post: posts[2]._id
      },
      {
        content: 'Tokyo is on my bucket list! This makes me want to go even more.',
        author: users[1]._id,
        post: posts[3]._id
      }
    ];

    await Comment.create(comments);
    console.log('✅ Created sample comments');

    // Add some likes to posts
    posts[0].likes.push(users[1]._id, users[2]._id, users[3]._id);
    posts[1].likes.push(users[0]._id, users[2]._id);
    posts[2].likes.push(users[1]._id, users[3]._id);
    posts[3].likes.push(users[0]._id, users[1]._id, users[2]._id);

    await Promise.all(posts.map(post => post.save()));
    console.log('✅ Added likes to posts');

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📝 Sample Users Created:');
    users.forEach(user => {
      console.log(`   - ${user.name} (${user.email}) - Password: password123`);
    });
    console.log(`\n📚 Created ${posts.length} blog posts`);
    console.log(`💬 Created ${comments.length} comments`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();

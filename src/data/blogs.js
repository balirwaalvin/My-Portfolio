export const blogsData = [
  {
    id: 'getting-started-with-react',
    title: 'Getting Started with React: A Comprehensive Guide',
    excerpt: 'Learn the fundamentals of React and build your first modern web application with this beginner-friendly guide.',
    content: `
## Introduction

React has revolutionized the way we build user interfaces. In this comprehensive guide, we'll explore the fundamental concepts that make React such a powerful library for building web applications.

## What is React?

React is a JavaScript library for building user interfaces, particularly single-page applications. It allows developers to create reusable UI components and manage application state efficiently.

## Key Concepts

### Components
Components are the building blocks of React applications. They can be functional or class-based, though modern React favors functional components with hooks.

### State Management
React's state management allows components to maintain and update data that changes over time, triggering re-renders when necessary.

### Props
Props enable data flow between components, creating a unidirectional data flow that makes applications more predictable and easier to debug.

## Getting Started

To create a new React application, you can use Create React App or modern alternatives like Vite for faster development experience.

## Conclusion

React's component-based architecture and powerful ecosystem make it an excellent choice for modern web development. Start building today!
    `,
    date: '2026-01-15',
    author: 'Balirwa Alvin Daniel',
    tags: ['React', 'JavaScript', 'Web Development'],
    coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
    readTime: '5 min read'
  },
  {
    id: 'mastering-tailwind-css',
    title: 'Mastering Tailwind CSS: Tips and Tricks',
    excerpt: 'Discover advanced techniques and best practices for building beautiful, responsive UIs with Tailwind CSS.',
    content: `
## Why Tailwind CSS?

Tailwind CSS is a utility-first CSS framework that enables rapid UI development without leaving your HTML.

## Core Principles

### Utility-First Approach
Instead of writing custom CSS, Tailwind provides low-level utility classes that can be composed to create any design.

### Responsive Design
Tailwind makes responsive design incredibly easy with its mobile-first breakpoint system.

### Customization
While Tailwind comes with sensible defaults, it's fully customizable through the configuration file.

## Advanced Techniques

### Custom Themes
Learn how to create custom color palettes and extend Tailwind's default theme to match your brand.

### Performance Optimization
Use PurgeCSS (now built-in) to remove unused styles and keep your production bundle small.

## Best Practices

- Use @apply sparingly
- Leverage Tailwind's built-in design system
- Create reusable components

## Conclusion

Tailwind CSS streamlines the styling process and helps maintain consistency across your applications.
    `,
    date: '2026-01-20',
    author: 'Balirwa Alvin Daniel',
    tags: ['CSS', 'Tailwind', 'Design', 'Frontend'],
    coverImage: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&q=80',
    readTime: '7 min read'
  },
  {
    id: 'building-rest-apis-nodejs',
    title: 'Building Scalable REST APIs with Node.js',
    excerpt: 'A deep dive into creating robust, scalable REST APIs using Node.js, Express, and modern best practices.',
    content: `
## Introduction to REST APIs

REST (Representational State Transfer) is an architectural style for designing networked applications.

## Setting Up Your Environment

Start by initializing a Node.js project and installing necessary dependencies like Express, middleware, and database drivers.

## Project Structure

\`\`\`
src/
├── routes/
├── controllers/
├── models/
├── middleware/
└── config/
\`\`\`

## Best Practices

### Error Handling
Implement centralized error handling middleware to manage errors consistently across your API.

### Authentication & Authorization
Use JWT tokens or session-based authentication to secure your endpoints.

### Validation
Validate incoming data using libraries like Joi or express-validator.

### Rate Limiting
Protect your API from abuse by implementing rate limiting.

## Database Integration

Choose between SQL (PostgreSQL, MySQL) or NoSQL (MongoDB) based on your application requirements.

## Testing

Write comprehensive tests using Jest or Mocha to ensure API reliability.

## Deployment

Deploy your API to platforms like Heroku, AWS, or DigitalOcean for production use.

## Conclusion

Building a well-structured REST API requires attention to detail, but following these patterns will set you up for success.
    `,
    date: '2026-01-25',
    author: 'Balirwa Alvin Daniel',
    tags: ['Node.js', 'API', 'Backend', 'Express'],
    coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
    readTime: '10 min read'
  },
  {
    id: 'modern-javascript-features',
    title: 'Modern JavaScript Features You Should Know',
    excerpt: 'Explore the latest JavaScript features that will make your code cleaner, more efficient, and easier to maintain.',
    content: `
## Evolution of JavaScript

JavaScript has evolved significantly with ES6+ introducing powerful features that modernize the language.

## Essential Modern Features

### Arrow Functions
Concise syntax for function expressions with lexical \`this\` binding.

### Destructuring
Extract values from arrays or objects into distinct variables elegantly.

### Spread & Rest Operators
Easily work with arrays and objects using the spread (...) operator.

### Template Literals
Create strings with embedded expressions using backticks.

### Promises & Async/Await
Handle asynchronous operations with cleaner, more readable code.

### Modules
Organize code into reusable modules with import/export syntax.

## Advanced Features

### Optional Chaining (?.)
Safely access nested properties without verbose null checks.

### Nullish Coalescing (??)
Provide default values only for null or undefined.

### Array Methods
Master map, filter, reduce, and other powerful array methods.

## Conclusion

Staying current with modern JavaScript features will make you a more effective developer.
    `,
    date: '2026-01-28',
    author: 'Balirwa Alvin Daniel',
    tags: ['JavaScript', 'ES6+', 'Programming'],
    coverImage: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&q=80',
    readTime: '6 min read'
  }
];

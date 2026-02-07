import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../.env.local") });

import Course from "../src/lib/courses.js";
import Lesson from "../src/lib/lessons.js";

const seedCourses = [
  {
    title: "JavaScript Fundamentals",
    description: "Master the core concepts of JavaScript including variables, functions, objects, and asynchronous programming. Perfect for beginners starting their coding journey.",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    points: 150,
    tags: ["Beginner", "Frontend", "JavaScript"],
    duration: "20 hours",
    rating: 4.8,
    instructor: "John Developer",
    lessons: 20
  },
  {
    title: "HTML & CSS Mastery",
    description: "Learn web fundamentals with HTML5 and modern CSS3. Create beautiful, responsive designs and master layouts with flexbox, grid, and animations. Build professional-looking websites from scratch.",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    points: 120,
    tags: ["Beginner", "Frontend", "HTML", "CSS"],
    duration: "18 hours",
    rating: 4.7,
    instructor: "Emma Design",
    lessons: 18
  },
  {
    title: "React Complete Course",
    description: "Learn React from the ground up to advanced level. Master components, hooks, state management, and build interactive web applications. Create real-world projects with React best practices.",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    points: 200,
    tags: ["Intermediate", "Frontend", "React"],
    duration: "24 hours",
    rating: 4.9,
    instructor: "Sarah React Master",
    lessons: 20
  },
  {
    title: "Advanced JavaScript & ES6+",
    description: "Deep dive into advanced JavaScript concepts including closures, prototypes, async/await, generators, and modern ES6+ features. Become a JavaScript expert with real-world project examples.",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    points: 180,
    tags: ["Advanced", "Frontend", "JavaScript"],
    duration: "22 hours",
    rating: 4.8,
    instructor: "John Developer",
    lessons: 18
  }
];

const lessonsData = {
  0: [ 
    {
      title: "What is JavaScript?",
      content: "Understand JavaScript's role in web development, its history, and why it's essential for building interactive websites. Learn about the JavaScript ecosystem and what makes it unique among programming languages.",
      duration: 40
    },
    {
      title: "Setting Up Your Environment",
      content: "Install Node.js, npm, and your first code editor. Learn how to run JavaScript code in the browser console and create your first JavaScript file. Understand the tools you'll need for the entire course.",
      duration: 35
    },
    {
      title: "Variables and Data Types",
      content: "Learn about let, const, and var declarations. Understand primitive data types: strings, numbers, booleans, null, undefined, and symbols. Practice declaring variables and checking their types with typeof operator.",
      duration: 50
    },
    {
      title: "Operators and Expressions",
      content: "Master arithmetic, comparison, logical, and assignment operators. Learn about operator precedence and how to write complex expressions. Practice solving problems with different operators.",
      duration: 45
    },
    {
      title: "Control Flow: If Statements",
      content: "Learn conditional statements with if, else if, and else blocks. Understand how to make decisions in your code based on conditions. Create programs that behave differently based on user input.",
      duration: 50
    },
    {
      title: "Loops: For, While, Do-While",
      content: "Master different types of loops to repeat code multiple times. Learn for loops, while loops, and do-while loops. Understand break and continue statements. Practice iterating through data.",
      duration: 55
    },
    {
      title: "Functions Basics",
      content: "Learn how to write and call functions. Understand parameters, arguments, and return values. Create reusable code blocks that solve specific problems. Master function scope and variable accessibility.",
      duration: 60
    },
    {
      title: "Arrow Functions and Modern Syntax",
      content: "Learn modern arrow function syntax using the => operator. Understand implicit returns and concise function writing. Compare arrow functions with traditional function declarations.",
      duration: 50
    },
    {
      title: "Objects and Properties",
      content: "Create and manipulate objects to organize related data. Learn about object properties and methods. Use dot notation and bracket notation to access properties. Build structured data with objects.",
      duration: 55
    },
    {
      title: "Arrays and Methods",
      content: "Work with arrays to store lists of data. Learn essential array methods: push, pop, shift, unshift, slice, splice, and more. Practice manipulating arrays in different ways.",
      duration: 60
    },
    {
      title: "Destructuring Assignment",
      content: "Learn object and array destructuring to extract values more efficiently. Write cleaner code using destructuring syntax. Apply destructuring in real-world scenarios.",
      duration: 45
    },
    {
      title: "Spread and Rest Operators",
      content: "Master the spread operator (...) to expand arrays and objects. Learn rest parameters in functions. Combine data efficiently using spread and rest syntax.",
      duration: 50
    },
    {
      title: "String Manipulation",
      content: "Work with strings using methods like charAt, substring, slice, split, and join. Learn template literals for string interpolation. Master string manipulation for text processing.",
      duration: 45
    },
    {
      title: "Scope and Closures",
      content: "Understand global, function, and block scope. Learn about closure and how functions can access variables from outer scopes. Master scope chains and scope isolation.",
      duration: 60
    },
    {
      title: "Higher Order Functions",
      content: "Learn functions that take other functions as arguments or return functions. Master callbacks, map, filter, and reduce methods. Apply functional programming patterns.",
      duration: 55
    },
    {
      title: "Promises Explained",
      content: "Understand promises as objects representing asynchronous operations. Learn how to create promises and handle them with .then() and .catch(). Handle multiple promises with Promise.all() and Promise.race().",
      duration: 65
    },
    {
      title: "Async and Await",
      content: "Learn modern async/await syntax for handling asynchronous code. Write cleaner code compared to promise chains. Handle errors in async functions with try/catch blocks.",
      duration: 60
    },
    {
      title: "Working with APIs and Fetch",
      content: "Learn how to make HTTP requests using the Fetch API. Understand JSON format for data exchange. Build applications that communicate with external services and APIs.",
      duration: 55
    },
    {
      title: "Debugging and Error Handling",
      content: "Master debugging techniques using browser DevTools. Learn error types and how to handle them with try/catch. Write defensive code that handles errors gracefully.",
      duration: 50
    },
    {
      title: "Project: Build a Todo App",
      content: "Apply everything you've learned by building a complete todo application. Implement add, edit, delete, and mark as complete features. Store data in browser local storage. Deploy your first project.",
      duration: 120
    }
  ],
  1: [
    {
      title: "HTML Basics and Semantic Tags",
      content: "Learn HTML5 structure and semantic elements. Understand DOCTYPE, head, body, and important tags. Write semantic HTML for better accessibility and SEO. Create well-structured web pages.",
      duration: 50
    },
    {
      title: "Text and Headings",
      content: "Master heading hierarchy (h1-h6) for proper document structure. Learn paragraph, span, and text formatting tags. Understand when to use each semantic element for better code quality.",
      duration: 40
    },
    {
      title: "Links and Navigation",
      content: "Create hyperlinks with anchor tags. Learn absolute and relative URLs. Build navigation menus and understand link best practices. Create site structure with proper linking.",
      duration: 45
    },
    {
      title: "Images and Media",
      content: "Insert images, videos, and audio in HTML. Learn responsive image techniques. Optimize media for web performance. Add alternative text for accessibility.",
      duration: 50
    },
    {
      title: "Forms and Input Elements",
      content: "Create interactive forms with various input types. Learn text fields, checkboxes, radio buttons, select dropdowns, and textarea. Understand form validation and submission.",
      duration: 55
    },
    {
      title: "CSS Selectors Mastery",
      content: "Master element, class, ID, attribute, and combinators selectors. Learn specificity and selector performance. Write efficient CSS with proper selector choices.",
      duration: 50
    },
    {
      title: "CSS Box Model",
      content: "Understand margin, border, padding, and content areas. Learn how browsers calculate element dimensions. Debug layout issues using box model concepts.",
      duration: 45
    },
    {
      title: "Flexbox Layout",
      content: "Master one-dimensional flexible layouts with Flexbox. Learn flex container and flex item properties. Create responsive, flexible designs without media queries for simple layouts.",
      duration: 60
    },
    {
      title: "CSS Grid Layout",
      content: "Create two-dimensional grid layouts with CSS Grid. Learn grid templates, gaps, and areas. Build complex layouts with grid. Combine Grid with Flexbox effectively.",
      duration: 65
    },
    {
      title: "Responsive Design and Media Queries",
      content: "Learn mobile-first approach to responsive design. Write media queries for different screen sizes. Test responsiveness on various devices. Master breakpoints and relative units.",
      duration: 55
    },
    {
      title: "Typography and Text Styling",
      content: "Learn font properties, web fonts, and Google Fonts. Master text alignment, line height, and letter spacing. Create beautiful typography for readability and aesthetics.",
      duration: 50
    },
    {
      title: "Colors and Backgrounds",
      content: "Work with color formats: hex, RGB, HSL. Learn background properties and gradients. Create visual depth with colors. Understand color contrast for accessibility.",
      duration: 45
    },
    {
      title: "Transitions and Transforms",
      content: "Add smooth animations with CSS transitions. Apply 2D transformations: rotate, scale, skew, translate. Create interactive effects without JavaScript.",
      duration: 55
    },
    {
      title: "Keyframe Animations",
      content: "Create complex animations with @keyframes. Control animation timing and iteration. Build engaging animations for user interaction. Optimize animations for performance.",
      duration: 60
    },
    {
      title: "Positioning and Stacking",
      content: "Master position properties: static, relative, absolute, fixed, sticky. Understand z-index and stacking context. Create complex layouts with positioning.",
      duration: 50
    },
    {
      title: "CSS Best Practices",
      content: "Learn CSS organization and naming conventions (BEM, SMACSS). Write maintainable and scalable CSS. Avoid common CSS mistakes. Document your styles.",
      duration: 45
    },
    {
      title: "Debugging CSS",
      content: "Use browser DevTools to inspect and debug CSS. Understand specificity conflicts. Fix layout issues systematically. Master CSS debugging techniques.",
      duration: 40
    },
    {
      title: "Project: Build a Responsive Website",
      content: "Create a complete responsive website with HTML and CSS. Apply all learned concepts: semantic HTML, flexbox, grid, media queries, animations. Make it mobile-friendly and visually appealing.",
      duration: 120
    }
  ],
  2: [ 
    {
      title: "React Fundamentals and JSX",
      content: "Understand React library and its philosophy. Learn JSX syntax and how it translates to JavaScript. Create your first React component. Understand the React ecosystem.",
      duration: 60
    },
    {
      title: "Components and Props",
      content: "Build functional components with props. Pass data from parent to child components. Create reusable component patterns. Understand component composition.",
      duration: 55
    },
    {
      title: "State with useState Hook",
      content: "Manage component state with useState hook. Update state correctly. Handle form inputs with state. Create interactive components with state management.",
      duration: 60
    },
    {
      title: "Effects and useEffect Hook",
      content: "Perform side effects in components with useEffect. Clean up effects properly. Manage dependencies array. Handle component lifecycle with hooks.",
      duration: 60
    },
    {
      title: "Conditional Rendering",
      content: "Render different content based on conditions. Use ternary operators and logical operators. Implement conditional CSS classes. Create dynamic component behavior.",
      duration: 45
    },
    {
      title: "Lists and Keys",
      content: "Render lists with map() function. Understand the importance of keys. Avoid common key mistakes. Create dynamic lists with conditional rendering.",
      duration: 50
    },
    {
      title: "Form Handling",
      content: "Create controlled components for forms. Handle input events and updates. Build complex forms with multiple fields. Validate form data in React.",
      duration: 55
    },
    {
      title: "Context API",
      content: "Share state across multiple components with Context. Create context providers and consumers. Avoid prop drilling with Context. Manage global state.",
      duration: 60
    },
    {
      title: "Custom Hooks",
      content: "Extract component logic into custom hooks. Create reusable stateful logic. Combine multiple hooks effectively. Build a library of custom hooks.",
      duration: 60
    },
    {
      title: "Performance Optimization",
      content: "Optimize rendering with React.memo and useMemo. Use useCallback for function optimization. Identify performance bottlenecks. Improve component performance.",
      duration: 55
    },
    {
      title: "React Router",
      content: "Set up routing in React applications. Create multi-page applications. Handle navigation and URL parameters. Build nested routes and layouts.",
      duration: 65
    },
    {
      title: "State Management with useReducer",
      content: "Manage complex state with useReducer. Dispatch actions to update state. Handle multiple related state values. Scale state management.",
      duration: 55
    },
    {
      title: "API Integration",
      content: "Fetch data from APIs in React components. Handle loading and error states. Display data in components. Manage asynchronous operations.",
      duration: 60
    },
    {
      title: "Component Libraries and Styling",
      content: "Style React components with CSS, CSS-in-JS, and Tailwind. Use component libraries like Material-UI. Apply consistent styling across components.",
      duration: 50
    },
    {
      title: "Error Boundaries",
      content: "Create error boundaries to catch errors. Handle component errors gracefully. Display fallback UI. Debug errors in production.",
      duration: 45
    },
    {
      title: "Testing React Components",
      content: "Write unit tests for React components. Test hooks and context. Use React Testing Library effectively. Achieve good test coverage.",
      duration: 60
    },
    {
      title: "React Best Practices",
      content: "Follow React best practices and patterns. Write clean and maintainable React code. Avoid anti-patterns. Implement performance and accessibility best practices.",
      duration: 50
    },
    {
      title: "Deployment and Production",
      content: "Prepare React apps for production. Build and optimize bundles. Deploy to hosting platforms. Monitor and debug in production.",
      duration: 55
    },
    {
      title: "Advanced Patterns",
      content: "Learn render props, compound components, and higher-order components. Apply advanced React patterns. Solve complex component communication.",
      duration: 60
    },
    {
      title: "Project: Build a Complete React App",
      content: "Create a full-featured React application. Apply routing, state management, API integration, and styling. Build a portfolio-ready project. Deploy your application.",
      duration: 150
    }
  ],
  3: [ 
    {
      title: "Prototypes and Prototype Chain",
      content: "Understand JavaScript's prototypal inheritance model. Learn prototype delegation and property lookup. Master constructor functions. Create objects using prototypes.",
      duration: 60
    },
    {
      title: "Object-Oriented Programming",
      content: "Learn OOP principles in JavaScript. Create classes and objects. Implement inheritance and polymorphism. Build object-oriented applications.",
      duration: 65
    },
    {
      title: "This Keyword and Binding",
      content: "Master the 'this' keyword in different contexts. Learn function binding with call, apply, and bind. Understand arrow functions and 'this'. Avoid common 'this' mistakes.",
      duration: 55
    },
    {
      title: "Closures Deep Dive",
      content: "Understand closure mechanics and use cases. Create factory functions with closures. Implement private variables. Master closure patterns.",
      duration: 60
    },
    {
      title: "Scope and Hoisting",
      content: "Learn execution context and scope chain. Understand variable and function hoisting. Master temporal dead zone. Debug scope-related issues.",
      duration: 50
    },
    {
      title: "Advanced Functions",
      content: "Create higher-order functions. Implement currying and partial application. Master function composition. Apply functional programming techniques.",
      duration: 60
    },
    {
      title: "Generators and Iterators",
      content: "Create generator functions with yield. Understand iterators and the iteration protocol. Use generators for lazy evaluation. Implement custom iterables.",
      duration: 60
    },
    {
      title: "Promises Advanced",
      content: "Master promise resolution and rejection. Chain multiple promises. Handle promise errors. Create promise utilities and helpers.",
      duration: 55
    },
    {
      title: "Async/Await Mastery",
      content: "Master async/await for cleaner asynchronous code. Handle errors in async functions. Work with multiple async operations. Parallelize async tasks.",
      duration: 60
    },
    {
      title: "Event Loop and Concurrency",
      content: "Understand JavaScript event loop. Learn call stack and task queue. Understand microtasks and macrotasks. Debug asynchronous behavior.",
      duration: 55
    },
    {
      title: "Module Systems",
      content: "Learn ES6 modules: import and export. Understand CommonJS require/module.exports. Work with module bundlers. Organize code with modules.",
      duration: 50
    },
    {
      title: "Regular Expressions",
      content: "Master regex patterns for text matching. Learn regex methods in JavaScript. Create and validate patterns. Apply regex in real-world scenarios.",
      duration: 50
    },
    {
      title: "Metaprogramming",
      content: "Use Reflect API for object manipulation. Work with Proxy objects. Create dynamic objects. Implement advanced metaprogramming patterns.",
      duration: 60
    },
    {
      title: "Performance and Optimization",
      content: "Profile and optimize JavaScript performance. Minimize memory leaks. Optimize algorithms. Monitor and improve code execution.",
      duration: 55
    },
    {
      title: "Design Patterns",
      content: "Implement common design patterns: singleton, factory, observer. Create architectural patterns. Apply patterns to solve design problems.",
      duration: 60
    },
    {
      title: "Testing Advanced JavaScript",
      content: "Write advanced unit tests. Mock and stub functions. Test asynchronous code. Achieve high test coverage for complex code.",
      duration: 55
    },
    {
      title: "Security and Best Practices",
      content: "Understand JavaScript security issues. Prevent common vulnerabilities. Write secure code. Follow security best practices.",
      duration: 50
    },
    {
      title: "Project: Build an Advanced Library",
      content: "Create a JavaScript library with advanced concepts. Implement design patterns and best practices. Write comprehensive tests. Publish your library.",
      duration: 150
    }
  ]
};

async function seed() {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error("MONGODB_URI environment variable is not defined");
    }

    await mongoose.connect(mongoUri, {
      dbName: "codemaster",
    });
    console.log("✓ Connected to MongoDB");
    
    await Course.deleteMany({});
    await Lesson.deleteMany({});
    console.log("✓ Cleared existing courses and lessons");
    
    const insertedCourses = await Course.insertMany(seedCourses);
    console.log(`✅ Successfully seeded ${insertedCourses.length} courses!`);
    
    let totalLessons = 0;
    for (let i = 0; i < insertedCourses.length; i++) {
      const courseId = insertedCourses[i]._id;
      const courseLessons = lessonsData[i] || [];
      
      const lessonsWithCourseId = courseLessons.map(lesson => ({
        ...lesson,
        courseId: courseId
      }));
      
      const insertedLessons = await Lesson.insertMany(lessonsWithCourseId);
      totalLessons += insertedLessons.length;
      console.log(`  ✓ Added ${insertedLessons.length} lessons to ${seedCourses[i].title}`);
    }
    
    console.log(`✅ Successfully seeded ${totalLessons} lessons!`);
    console.log("\n✨ Database seeding completed successfully! 🎉");
    
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error.message);
    process.exit(1);
  }
}

seed();

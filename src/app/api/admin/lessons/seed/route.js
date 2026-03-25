import { NextResponse } from "next/server";
import { requireDb } from "@/lib/db";
import { isAdminRequest } from "@/lib/api/admin";

const COURSE_LESSONS = {
  "Frontend": [
    {
      title: "HTML & CSS Fundamentals",
      content: "Learn the basics of HTML structure and CSS styling. This lesson covers semantic HTML, CSS selectors, and basic layout techniques.",
      videoId: "kUMe1FH4CHE",
      duration: 45
    },
    {
      title: "JavaScript Basics",
      content: "Introduction to JavaScript programming language. Learn variables, functions, loops, and basic DOM manipulation.",
      videoId: "W6NZfCO5SIk",
      duration: 50
    },
    {
      title: "Responsive Design with Flexbox",
      content: "Master CSS Flexbox for creating responsive layouts. Understand flex containers, flex items, and common layout patterns.",
      videoId: "3YW65K6LcIA",
      duration: 40
    },
    {
      title: "CSS Grid Layout",
      content: "Deep dive into CSS Grid for complex layouts. Learn grid template areas, auto-placement, and responsive grid design.",
      videoId: "Vg4h8o2ZrKg",
      duration: 45
    },
    {
      title: "JavaScript ES6+ Features",
      content: "Modern JavaScript features including arrow functions, destructuring, template literals, and async/await.",
      videoId: "NCwa_xi0Uuc",
      duration: 55
    },
    {
      title: "DOM Manipulation & Events",
      content: "Learn how to manipulate HTML elements with JavaScript and handle user events effectively.",
      videoId: "y17RuWkWdn8",
      duration: 40
    },
    {
      title: "Fetch API & AJAX",
      content: "Making HTTP requests with JavaScript. Learn fetch, promises, and handling API responses.",
      videoId: "cuEtnrL9-H0",
      duration: 35
    },
    {
      title: "React Fundamentals",
      content: "Introduction to React library. Learn components, props, state, and basic React concepts.",
      videoId: "Ke90Tje7VS0",
      duration: 60
    },
    {
      title: "React Hooks Deep Dive",
      content: "Master React Hooks including useState, useEffect, useContext, and custom hooks.",
      videoId: "TNhaISOUy6Q",
      duration: 50
    },
    {
      title: "React Router",
      content: "Client-side routing in React applications. Learn navigation, route parameters, and protected routes.",
      videoId: "Ul3y1L8X_0U",
      duration: 40
    },
    {
      title: "State Management with Redux",
      content: "Managing application state with Redux. Learn actions, reducers, store, and React-Redux integration.",
      videoId: "CVpUuw9XSjY",
      duration: 55
    },
    {
      title: "Styling in React",
      content: "Different approaches to styling React components including CSS modules, styled-components, and Tailwind CSS.",
      videoId: "FJD5h2y0KsQ",
      duration: 45
    },
    {
      title: "React Forms & Validation",
      content: "Building forms in React with controlled components and form validation techniques.",
      videoId: "IkMND33x0qQ",
      duration: 40
    },
    {
      title: "React Performance Optimization",
      content: "Optimizing React applications with memo, useMemo, useCallback, and code splitting.",
      videoId: "C-ga1x5Kz8Q",
      duration: 45
    },
    {
      title: "Testing React Applications",
      content: "Testing React components with Jest and React Testing Library. Learn unit testing and integration testing.",
      videoId: "8hG2mLJh8tQ",
      duration: 50
    }
  ],
  "Backend": [
    {
      title: "Node.js Fundamentals",
      content: "Introduction to Node.js runtime. Learn modules, npm, file system, and basic server creation.",
      videoId: "TlB_eWDSMt4",
      duration: 50
    },
    {
      title: "Express.js Basics",
      content: "Building web servers with Express.js. Learn routing, middleware, and handling HTTP requests.",
      videoId: "L72fh2mTbf4",
      duration: 45
    },
    {
      title: "RESTful API Design",
      content: "Principles of REST API design. Learn HTTP methods, status codes, and best practices.",
      videoId: "SLpUKAGnm-g",
      duration: 40
    },
    {
      title: "Database Fundamentals",
      content: "Introduction to databases. Learn SQL basics, database design, and relationships.",
      videoId: "FR4QIeZaPeM",
      duration: 55
    },
    {
      title: "MongoDB & Mongoose",
      content: "Working with NoSQL databases. Learn MongoDB basics and Mongoose ODM for Node.js.",
      videoId: "ExcRbA7F2GA",
      duration: 50
    },
    {
      title: "Authentication & Authorization",
      content: "Implementing authentication in Node.js. Learn JWT, password hashing, and session management.",
      videoId: "Ud5xKCYQTjM",
      duration: 45
    },
    {
      title: "API Security Best Practices",
      content: "Securing your API endpoints. Learn CORS, rate limiting, input validation, and security headers.",
      videoId: "BysNXJioCE4",
      duration: 40
    },
    {
      title: "Error Handling & Logging",
      content: "Proper error handling and logging in Node.js applications. Learn try-catch, error middleware, and logging strategies.",
      videoId: "A03c_5k_9SM",
      duration: 35
    },
    {
      title: "Testing Node.js Applications",
      content: "Testing backend applications with Jest and Supertest. Learn unit testing and API testing.",
      videoId: "m3Vb_2d7p3c",
      duration: 45
    },
    {
      title: "WebSockets & Real-time Apps",
      content: "Building real-time applications with WebSockets. Learn Socket.io and real-time communication.",
      videoId: "1BfC5rHCBFE",
      duration: 50
    },
    {
      title: "Microservices Architecture",
      content: "Introduction to microservices. Learn service communication, API gateways, and distributed systems.",
      videoId: "q2w2Dt_6C4I",
      duration: 55
    },
    {
      title: "Docker for Node.js",
      content: "Containerizing Node.js applications with Docker. Learn Dockerfile, docker-compose, and best practices.",
      videoId: "pJti3n0P2ks",
      duration: 45
    },
    {
      title: "GraphQL Fundamentals",
      content: "Introduction to GraphQL. Learn schemas, queries, mutations, and GraphQL with Node.js.",
      videoId: "ed8SzALp1AM",
      duration: 50
    },
    {
      title: "Performance Optimization",
      content: "Optimizing Node.js application performance. Learn caching, clustering, and monitoring.",
      videoId: "fP2_yjT_7Bk",
      duration: 40
    },
    {
      title: "Deployment & DevOps",
      content: "Deploying Node.js applications. Learn CI/CD, environment variables, and production best practices.",
      videoId: "B_wU2zG6B2Q",
      duration: 45
    }
  ],
  "Data Science": [
    {
      title: "Python for Data Science",
      content: "Python fundamentals for data science. Learn NumPy, Pandas, and basic data manipulation.",
      videoId: "rfscVS0vtbw",
      duration: 60
    },
    {
      title: "Data Visualization with Matplotlib",
      content: "Creating data visualizations with Matplotlib and Seaborn. Learn charts, plots, and statistical graphics.",
      videoId: "DAQNHzOcO5A",
      duration: 50
    },
    {
      title: "Statistical Analysis Basics",
      content: "Fundamental statistics for data science. Learn descriptive statistics, probability, and hypothesis testing.",
      videoId: "Vfo5le26IhY",
      duration: 55
    },
    {
      title: "Machine Learning Fundamentals",
      content: "Introduction to machine learning. Learn supervised vs unsupervised learning and basic algorithms.",
      videoId: "ukzFI9rgwfU",
      duration: 60
    },
    {
      title: "Linear Regression",
      content: "Understanding linear regression. Learn simple and multiple regression with practical examples.",
      videoId: "nk2CQITm_eo",
      duration: 45
    },
    {
      title: "Classification Algorithms",
      content: "Classification techniques in machine learning. Learn logistic regression, decision trees, and random forests.",
      videoId: "7VeUPuFGJHk",
      duration: 55
    },
    {
      title: "Clustering Algorithms",
      content: "Unsupervised learning with clustering. Learn K-means, hierarchical clustering, and DBSCAN.",
      videoId: "XvWT7GxS5iI",
      duration: 50
    },
    {
      title: "Feature Engineering",
      content: "Techniques for feature selection and engineering. Learn preprocessing, scaling, and dimensionality reduction.",
      videoId: "3X0fNtM4-6k",
      duration: 45
    },
    {
      title: "Deep Learning Introduction",
      content: "Basics of neural networks and deep learning. Learn perceptrons, backpropagation, and activation functions.",
      videoId: "aircAruvnKk",
      duration: 60
    },
    {
      title: "TensorFlow Fundamentals",
      content: "Building neural networks with TensorFlow. Learn Keras API, model building, and training.",
      videoId: "tPYj3fFJGjk",
      duration: 55
    },
    {
      title: "Natural Language Processing",
      content: "Introduction to NLP. Learn text preprocessing, sentiment analysis, and language models.",
      videoId: "fOzmkrpOy7I",
      duration: 50
    },
    {
      title: "Computer Vision Basics",
      content: "Introduction to computer vision. Learn image processing, feature extraction, and object detection.",
      videoId: "oXlwWbU8l2o",
      duration: 55
    },
    {
      title: "Time Series Analysis",
      content: "Analyzing time series data. Learn trends, seasonality, and forecasting techniques.",
      videoId: "e8Yw4alG16Q",
      duration: 45
    },
    {
      title: "Model Evaluation & Validation",
      content: "Evaluating machine learning models. Learn cross-validation, metrics, and hyperparameter tuning.",
      videoId: "w_bLGK4P8qU",
      duration: 40
    },
    {
      title: "Data Science Project Workflow",
      content: "End-to-end data science projects. Learn data collection, cleaning, modeling, and deployment.",
      videoId: "SGIjdAm5rGQ",
      duration: 50
    }
  ],
  "Cloud": [
    {
      title: "Cloud Computing Fundamentals",
      content: "Introduction to cloud computing. Learn IaaS, PaaS, SaaS, and cloud service models.",
      videoId: "MFi8jJ5mKcM",
      duration: 45
    },
    {
      title: "AWS Basics",
      content: "Getting started with Amazon Web Services. Learn EC2, S3, and basic AWS services.",
      videoId: "a9__D53Wsus",
      duration: 50
    },
    {
      title: "AWS Lambda & Serverless",
      content: "Serverless computing with AWS Lambda. Learn functions, triggers, and serverless architecture.",
      videoId: "e4rWC5SO_20",
      duration: 40
    },
    {
      title: "Docker Containers",
      content: "Containerization with Docker. Learn images, containers, Dockerfile, and docker-compose.",
      videoId: "3c-iBn73dDE",
      duration: 45
    },
    {
      title: "Kubernetes Fundamentals",
      content: "Container orchestration with Kubernetes. Learn pods, services, deployments, and scaling.",
      videoId: "s_oqdw5Wz_0",
      duration: 55
    },
    {
      title: "CI/CD Pipelines",
      content: "Building continuous integration and deployment pipelines. Learn GitHub Actions and automation.",
      videoId: "xVf1LlR9C3s",
      duration: 50
    },
    {
      title: "Cloud Security Best Practices",
      content: "Securing cloud infrastructure. Learn IAM, network security, and compliance.",
      videoId: "YQsK4MtsELU",
      duration: 45
    },
    {
      title: "Monitoring & Logging",
      content: "Monitoring cloud applications. Learn CloudWatch, logging strategies, and alerting.",
      videoId: "Rr-s8vJpKL8",
      duration: 40
    },
    {
      title: "Google Cloud Platform",
      content: "Introduction to Google Cloud. Learn Compute Engine, Cloud Storage, and GCP services.",
      videoId: "XVQ5nS-2F_E",
      duration: 50
    },
    {
      title: "Azure Fundamentals",
      content: "Getting started with Microsoft Azure. Learn VMs, App Service, and Azure basics.",
      videoId: "G7EITzS0KFI",
      duration: 45
    },
    {
      title: "Infrastructure as Code",
      content: "Managing infrastructure with code. Learn Terraform, CloudFormation, and IaC principles.",
      videoId: "SLpUKAGnm-g",
      duration: 55
    },
    {
      title: "Microservices on Cloud",
      content: "Deploying microservices in the cloud. Learn service mesh, API gateway, and distributed systems.",
      videoId: "q2w2Dt_6C4I",
      duration: 50
    },
    {
      title: "Cloud Cost Optimization",
      content: "Optimizing cloud costs. Learn resource management, monitoring, and cost-saving strategies.",
      videoId: "h8gHHy0p0RQ",
      duration: 40
    },
    {
      title: "Serverless Architecture",
      content: "Designing serverless applications. Learn event-driven architecture and serverless patterns.",
      videoId: "e4rWC5SO_20",
      duration: 45
    },
    {
      title: "Multi-Cloud Strategy",
      content: "Working with multiple cloud providers. Learn hybrid cloud and multi-cloud approaches.",
      videoId: "dQW4l9XcQG4",
      duration: 50
    }
  ],
  "Full-Stack": [
    {
      title: "Full-Stack Development Overview",
      content: "Understanding full-stack development. Learn frontend, backend, and integration concepts.",
      videoId: "CvCiNeLnZ0g",
      duration: 50
    },
    {
      title: "MERN Stack Introduction",
      content: "Building applications with MongoDB, Express, React, and Node.js. Learn the complete MERN stack.",
      videoId: "7CqJlxBYj-M",
      duration: 60
    },
    {
      title: "Building REST APIs with Express",
      content: "Creating robust REST APIs. Learn routing, middleware, validation, and error handling.",
      videoId: "L72fh2mTbf4",
      duration: 55
    },
    {
      title: "Connecting React to Backend",
      content: "Integrating React frontend with backend APIs. Learn fetch, axios, and state management.",
      videoId: "m7z6p_3yiNs",
      duration: 50
    },
    {
      title: "Authentication in Full-Stack Apps",
      content: "Implementing authentication across frontend and backend. Learn JWT, sessions, and auth flows.",
      videoId: "Ud5xKCYQTjM",
      duration: 45
    },
    {
      title: "Database Design for Apps",
      content: "Designing databases for full-stack applications. Learn schema design, relationships, and normalization.",
      videoId: "FR4QIeZaPeM",
      duration: 55
    },
    {
      title: "File Upload & Storage",
      content: "Handling file uploads in full-stack apps. Learn multipart forms, cloud storage, and image processing.",
      videoId: "9QZriAH5C4I",
      duration: 40
    },
    {
      title: "Real-time Features with WebSockets",
      content: "Adding real-time functionality. Learn Socket.io, events, and real-time communication.",
      videoId: "1BfC5rHCBFE",
      duration: 50
    },
    {
      title: "Pagination & Filtering",
      content: "Implementing pagination and filtering. Learn backend pagination and frontend infinite scroll.",
      videoId: "2k8NwhfJdfk",
      duration: 35
    },
    {
      title: "Search Functionality",
      content: "Adding search to applications. Learn text search, filtering, and search optimization.",
      videoId: "B5sW7kj_c78",
      duration: 45
    },
    {
      title: "Email Integration",
      content: "Sending emails from applications. Learn email services, templates, and notifications.",
      videoId: "l3Aq3TBZ-p4",
      duration: 40
    },
    {
      title: "Payment Integration",
      content: "Integrating payment systems. Learn Stripe, webhooks, and payment processing.",
      videoId: "J6lFcoR5y_A",
      duration: 50
    },
    {
      title: "Testing Full-Stack Apps",
      content: "Testing frontend and backend. Learn integration testing, E2E testing, and test strategies.",
      videoId: "8hG2mLJh8tQ",
      duration: 55
    },
    {
      title: "Deployment Strategies",
      content: "Deploying full-stack applications. Learn hosting, CI/CD, and production deployment.",
      videoId: "B_wU2zG6B2Q",
      duration: 45
    },
    {
      title: "Performance Optimization",
      content: "Optimizing full-stack application performance. Learn caching, lazy loading, and optimization techniques.",
      videoId: "C-ga1x5Kz8Q",
      duration: 50
    }
  ]
};

export async function POST() {
  try {
    if (!(await isAdminRequest())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const db = await requireDb();
    const coursesCol = db.collection("courses");
    const lessonsCol = db.collection("lessons");
    const courses = await coursesCol.find({}).toArray();
    
    if (courses.length === 0) {
      return NextResponse.json({ error: "No courses found. Please create courses first." }, { status: 400 });
    }

    let totalLessonsCreated = 0;
    const courseMap = {};

    courses.forEach(course => {
      const normalizedTitle = course.title.toLowerCase().trim();
      COURSE_LESSONS.forEach(([category]) => {
        if (normalizedTitle.includes(category.toLowerCase())) {
          courseMap[category] = course._id.toString();
        }
      });
    });


    for (const [category, lessons] of Object.entries(COURSE_LESSONS)) {
      const courseId = courseMap[category];
      
      if (!courseId) {
        console.log(`No course found for category: ${category}`);
        continue;
      }

    
      const existingLessonsCount = await lessonsCol.countDocuments({ courseId });
      if (existingLessonsCount > 0) {
        console.log(`Lessons already exist for course ${category} (${existingLessonsCount} lessons)`);
        totalLessonsCreated += existingLessonsCount;
        continue;
      }

     
      for (let i = 0; i < lessons.length; i++) {
        const lessonData = lessons[i];
        
        const result = await lessonsCol.insertOne({
          courseId,
          title: lessonData.title,
          content: lessonData.content,
          durationMinutes: lessonData.duration,
          videoId: lessonData.videoId,
          sortOrder: i + 1,
          createdAt: new Date(),
        });

        totalLessonsCreated++;
        console.log(`Created lesson: ${lessonData.title} for course: ${category}`);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Successfully created ${totalLessonsCreated} lessons across all courses`,
      totalLessons: totalLessonsCreated,
      coursesProcessed: Object.keys(courseMap).length
    });

  } catch (error) {
    console.error("Error seeding lessons:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

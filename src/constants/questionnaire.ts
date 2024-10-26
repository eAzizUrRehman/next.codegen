const steps = [
  {
    number: 0,
    title: 'Introduction',
    description: [
      "Welcome! We're excited to help you with your project.",
      'To get started, please tell us a bit about yourself by filling out the form below.',
    ],
    questions: [
      {
        label: 'First Name *',
        placeholder: 'e.g., Nayab',
      },
      {
        label: 'Last Name',
        placeholder: 'e.g., Noor',
      },
      {
        label: 'Email Address',
        placeholder: 'e.g., contact@nayab.com',
      },
      {
        label: 'What would you like to name your project?',
        placeholder: 'e.g., CodeGen, Workflow',
      },
    ],
  },
  {
    number: 1,
    title: 'Project Overview',
    description: [
      "Let's dive into your project details!",
      "This will help us understand what you're aiming to achieve.",
    ],
    questions: [
      {
        label: 'What type of application are you looking to create?',
        placeholder: 'e.g., web app, mobile app, desktop app',
      },
      {
        label: 'What is the primary purpose of the application?',
        placeholder: 'e.g., social networking, e-commerce, data management',
      },
      {
        label: 'What problem are you trying to solve with this code?',
        placeholder: 'Describe the problem',
      },
      {
        label:
          'What is the main objective or goal you want this code to achieve?',
        placeholder: 'Describe the main objective',
      },
    ],
  },
  {
    number: 2,
    title: 'Target Audience',
    description: [
      "Identifying your target audience is crucial for your application's success.",
      'Please describe who will be using your application.',
    ],
    questions: [
      {
        label: 'Describe the target audience or users of this code.',
        placeholder: 'e.g., developers, businesses, general public',
      },
      {
        label:
          'What problem does your application aim to solve for this audience?',
        placeholder: 'Describe the problem for the audience',
      },
    ],
  },
  {
    number: 3,
    title: 'Features and Functionality',
    description: [
      "Now, let's discuss the features you want your application to have.",
      'Please specify the key functionalities that are important to you.',
    ],
    questions: [
      {
        label: 'What are the key features you want to include?',
        placeholder:
          'e.g., user authentication, notifications, data visualization',
      },
      {
        label:
          'Are there any specific technologies or frameworks you want to use or avoid?',
        placeholder: 'e.g., React, Node.js, Flutter',
      },
      {
        label:
          'Is the code intended for a specific industry or domain? If so, which one?',
        placeholder: 'e.g., healthcare, finance, education',
      },
    ],
  },
  {
    number: 4,
    title: 'Design and User Experience',
    description: [
      'A great user experience is vital for engagement.',
      'Share your design preferences and thoughts on user experience.',
    ],
    questions: [
      {
        label: 'Do you have any design preferences or themes in mind?',
        placeholder: 'e.g., minimalist, colorful, professional',
      },
      {
        label: 'What kind of user interface do you have in mind?',
        placeholder: 'e.g., simple, complex, mobile-friendly',
      },
      {
        label:
          'Should the code format align with a specific development style guide?',
        placeholder: 'e.g., Airbnb JavaScript Style Guide',
      },
    ],
  },
  {
    number: 5,
    title: 'Performance and Constraints',
    description: [
      'Understanding performance requirements is essential.',
      'Please specify any constraints or performance expectations you have.',
    ],
    questions: [
      {
        label:
          'Are there any constraints or limitations the code should be aware of?',
        placeholder: 'e.g., limited memory, specific hardware requirements',
      },
      {
        label: 'Should the code be optimized for a specific type of workload?',
        placeholder: 'e.g., CPU, I/O',
      },
      {
        label:
          'Do you expect the code to handle large datasets or high-traffic scenarios?',
        placeholder: 'e.g., millions of records, thousands of concurrent users',
      },
    ],
  },
  {
    number: 6,
    title: 'Integration and Compatibility',
    description: [
      'Integration with existing systems can enhance functionality.',
      'Let us know what integrations are necessary for your application.',
    ],
    questions: [
      {
        label:
          'Will your application need to integrate with any existing systems or APIs?',
        placeholder: 'e.g., payment gateways, social media',
      },
      {
        label: 'What platforms should the application be compatible with?',
        placeholder: 'e.g., iOS, Android, web browsers',
      },
    ],
  },
  {
    number: 7,
    title: 'Additional Information',
    description: [
      'Your insights are invaluable to us!',
      'Please share any additional information that might help us understand your project better.',
    ],
    questions: [
      {
        label:
          'Do you have any examples of similar applications that you like?',
        placeholder: 'e.g., similar apps or websites',
      },
      {
        label:
          'Is there anything else you would like to share that might help us understand your project better?',
        placeholder: 'Additional information',
      },
    ],
  },
];

export default steps;

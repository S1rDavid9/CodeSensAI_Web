const modules = [
  // --- HTML module remains unchanged ---
  {
    id: "html-intro",
    title: "Introduction to HTML",
    description: "Learn the basics of HTML, the language of the web!",
    estimatedTime: "45 minutes",
    level: "Beginner",
    prerequisites: [],
    badge: "HTML Novice",
    completed: false,
    content: [
      { type: "mascot", value: "Hi! I'm Sensai 🥋. Ready to build your first web page? Let's go!" },
      { type: "text", value: "HTML is like the building blocks of a web page. It's super easy and fun!" },
      { type: "image", value: "/assets/images/html_blocks.png", alt: "HTML blocks illustration" },
      { type: "mascot", value: "Let's see what a heading looks like!" },
      { type: "code", value: "<h1>Hello, world!</h1>", playground: true, prompt: "Try changing the text inside the heading!" },
      { type: "image", value: "/assets/images/heading_example.png", alt: "Browser showing Hello, world! heading" },
      { type: "mascot", value: "Great! Now, what do you think <h1> does?" },
      { type: "quiz", question: "What does <h1> do?", options: ["Makes text big", "Adds a picture", "Makes text blue"], correct: 0, mascotCorrect: "You got it! <h1> makes big headings!", mascotIncorrect: "Oops! <h1> is for big headings. Try again!" },
      { type: "mascot", value: "Awesome! Can you drag the right tag to the box below?" },
      { type: "image", value: "/assets/images/drag_h1.png", alt: "Drag the h1 tag activity" },
      { type: "interactive", interaction: "drag-drop", prompt: "Drag the <h1> tag to the box", items: ["<h1>", "<p>", "<img>"], answer: "<h1>", mascotCorrect: "Perfect! <h1> is the heading tag!", mascotIncorrect: "Try again! Look for the heading tag." },
      { type: "mascot", value: "Let's try a fill-in-the-blank!" },
      { type: "interactive", interaction: "fill-blank", prompt: "Fill in the blank: <____>Hello!</____>", answer: "h1", mascotCorrect: "Yay! You remembered the tag!", mascotIncorrect: "Almost! Remember, it's the heading tag." },
      // --- New extended content below ---
      { type: "mascot", value: "Did you know? HTML stands for Hyper Text Markup Language!" },
      { type: "text", value: "Let's look at paragraphs. Paragraphs are for regular text." },
      { type: "code", value: "<p>This is a paragraph.</p>", playground: true, prompt: "Try writing your own paragraph!" },
      { type: "image", value: "/assets/images/paragraph_example.png", alt: "HTML paragraph example" },
      { type: "quiz", question: "Which tag is used for paragraphs?", options: ["<h1>", "<p>", "<img>"], correct: 1, mascotCorrect: "Correct! <p> is for paragraphs!", mascotIncorrect: "Try again! It's <p>." },
      { type: "mascot", value: "Let's add an image to your page!" },
      { type: "code", value: "<img src=\"/assets/images/html_example.png\" alt=\"A cool HTML example\">", playground: true, prompt: "Try changing the image or alt text!" },
      { type: "quiz", question: "What does the alt attribute do?", options: ["Makes the image bigger", "Describes the image", "Changes the color"], correct: 1, mascotCorrect: "That's right! Alt describes the image.", mascotIncorrect: "Try again! Alt is for description." },
      { type: "mascot", value: "Tip: Always use alt text for images!" },
      { type: "text", value: "Now let's make a list. Lists are great for showing steps or items." },
      { type: "code", value: "<ul>\n  <li>Apples</li>\n  <li>Bananas</li>\n  <li>Cherries</li>\n</ul>", playground: true, prompt: "Try adding your favorite fruits!" },
      { type: "quiz", question: "Which tag makes a list item?", options: ["<ul>", "<li>", "<ol>"], correct: 1, mascotCorrect: "Correct! <li> is for list items!", mascotIncorrect: "Try again! It's <li>." },
      { type: "mascot", value: "Checkpoint! Let's see what you've learned so far." },
      { type: "quiz", question: "Which tag is used for the biggest heading?", options: ["<h1>", "<h3>", "<p>"], correct: 0, mascotCorrect: "Great job! <h1> is the biggest heading!", mascotIncorrect: "Try again! <h1> is the biggest." },
      { type: "quiz", question: "Which tag is used for paragraphs?", options: ["<p>", "<img>", "<ul>"], correct: 0, mascotCorrect: "Correct! <p> is for paragraphs!", mascotIncorrect: "Try again! It's <p>." },
      { type: "mascot", value: "Let's build a mini web page together!" },
      { type: "mini-project", prompt: "Create a web page with a heading, a paragraph, and a list of your 3 favorite things. Use <h1>, <p>, and <ul>/<li>. Try it in the playground!" },
      { type: "mascot", value: "Did you know? You can nest tags inside other tags!" },
      { type: "code", value: "<div>\n  <h1>My Web Page</h1>\n  <p>Welcome to my page!</p>\n  <ul>\n    <li>HTML</li>\n    <li>CSS</li>\n    <li>JavaScript</li>\n  </ul>\n</div>", playground: true, prompt: "Try changing the content!" },
      { type: "mascot", value: "Let's try a drag-and-drop challenge!" },
      { type: "interactive", interaction: "drag-drop", prompt: "Drag the correct tag to complete the code: <____>My Title</____>", items: ["h1", "p", "ul"], answer: "h1", mascotCorrect: "Awesome! <h1> is for titles!", mascotIncorrect: "Try again! It's <h1>." },
      { type: "mascot", value: "Tip: Practice makes perfect! Try building your own page." },
      { type: "mascot", value: "You're doing amazing! Let's earn your first badge!" },
      { type: "image", value: "/assets/images/badge_html_starter.png", alt: "HTML Starter badge" },
      { type: "reward", value: "badge", badge: "HTML Starter", mascot: "You earned the HTML Starter badge! 🏅" }
    ],
    quiz: [
      {
        question: "What does HTML stand for?",
        options: [
          "Hyper Text Markup Language",
          "High Tech Modern Language",
          "Home Tool Markup Language",
          "Hyperlink and Text Markup Language"
        ],
        correct: 0,
        explanation: "HTML stands for Hyper Text Markup Language.",
        points: 10,
        feedback: ["Great!", "Nice work!", "You got it!"]
      },
      {
        question: "Which tag creates a main heading?",
        options: ["<h1>", "<p>", "<div>", "<title>"],
        correct: 0,
        explanation: "<h1> is used for main headings.",
        points: 10,
        feedback: ["Correct!", "Awesome!", "Well done!"]
      }
    ],
    randomizeQuiz: true
  },
  // --- CSS Basics Module (NEW STYLE) ---
  {
    id: "css-basics",
    title: "CSS Basics",
    description: "Style your web pages with colors, fonts, and layouts!",
    estimatedTime: "12 minutes",
    level: "Beginner",
    prerequisites: ["html-intro"],
    badge: "CSS Starter",
    completed: false,
    content: [
      { type: "mascot", value: "Hi again! Sensai here. Ready to make your web page colorful? 🌈" },
      { type: "text", value: "CSS stands for Cascading Style Sheets. It makes your web pages look beautiful!" },
      { type: "image", value: "/assets/images/css_example.png", alt: "CSS styling example" },
      { type: "mascot", value: "Let's try changing a heading's color!" },
      { type: "code", value: "h1 { color: blue; font-size: 2em; }", playground: true, prompt: "Try changing the color or font size!" },
      { type: "mascot", value: "Which property changes the text color?" },
      { type: "quiz", question: "Which property changes text color?", options: ["color", "font-size", "background", "margin"], correct: 0, mascotCorrect: "Correct! 'color' changes the text color!", mascotIncorrect: "Try again! It's the property named 'color'." },
      { type: "mascot", value: "Can you drag the right color value to the box?" },
      { type: "interactive", interaction: "drag-drop", prompt: "Drag the color value to the box", items: ["blue", "2em", "#fff"], answer: "blue", mascotCorrect: "Awesome! 'blue' is a color value!", mascotIncorrect: "Try again! Look for a color name." },
      { type: "mascot", value: "Let's try a fill-in-the-blank!" },
      { type: "interactive", interaction: "fill-blank", prompt: "Fill in the blank: h1 { color: ____; }", answer: "red", mascotCorrect: "Yay! You picked a color!", mascotIncorrect: "Almost! Try a color name like 'red'." },
      { type: "mascot", value: "You did it! Time for your CSS badge!" },
      { type: "image", value: "/assets/images/badge_css_starter.png", alt: "CSS Starter badge" },
      { type: "reward", value: "badge", badge: "CSS Starter", mascot: "You earned the CSS Starter badge! 🎨" }
    ],
    quiz: [
      {
        question: "What does CSS stand for?",
        options: [
          "Cascading Style Sheets",
          "Creative Style Syntax",
          "Computer Styled Sections",
          "Colorful Style System"
        ],
        correct: 0,
        explanation: "CSS stands for Cascading Style Sheets.",
        points: 10,
        feedback: ["Nice!", "Correct!", "You rock!"]
      },
      {
        question: "Which property changes text color?",
        options: ["color", "font-size", "background", "margin"],
        correct: 0,
        explanation: "The 'color' property changes text color.",
        points: 10,
        feedback: ["Awesome!", "Great job!", "That's right!"]
      }
    ],
    randomizeQuiz: true
  },
  // --- JavaScript Variables Module (NEW STYLE) ---
  {
    id: "js-variables",
    title: "JavaScript Variables",
    description: "Learn how to store and use data in your code!",
    estimatedTime: "15 minutes",
    level: "Beginner",
    prerequisites: ["html-intro"],
    badge: "JS Explorer",
    completed: false,
    content: [
      { type: "mascot", value: "Sensai here! Let's learn how to store information in your code! 💾" },
      { type: "text", value: "Variables let you store information in your code. In JavaScript, you can use 'let', 'const', or 'var'." },
      { type: "image", value: "/assets/images/js_variables.png", alt: "JavaScript variables example" },
      { type: "mascot", value: "Try making your own variable!" },
      { type: "code", value: "let score = 10;\nconst name = 'Sensai';", playground: true, prompt: "Try changing the value of score or name!" },
      { type: "mascot", value: "Which keyword lets you change the value?" },
      { type: "quiz", question: "Which keyword is used to declare a variable that can change?", options: ["let", "const", "var", "static"], correct: 0, mascotCorrect: "Correct! 'let' is for variables that can change!", mascotIncorrect: "Try again! It's 'let'." },
      { type: "mascot", value: "Can you drag the right keyword to the box?" },
      { type: "interactive", interaction: "drag-drop", prompt: "Drag the keyword to the box", items: ["let", "const", "static"], answer: "let", mascotCorrect: "Awesome! 'let' is correct!", mascotIncorrect: "Try again! It's 'let'." },
      { type: "mascot", value: "Let's try a fill-in-the-blank!" },
      { type: "interactive", interaction: "fill-blank", prompt: "Fill in the blank: ____ score = 10;", answer: "let", mascotCorrect: "Yay! You remembered the keyword!", mascotIncorrect: "Almost! It's 'let'." },
      { type: "mascot", value: "You did it! Time for your JS badge!" },
      { type: "image", value: "/assets/images/badge_js_explorer.png", alt: "JS Explorer badge" },
      { type: "reward", value: "badge", badge: "JS Explorer", mascot: "You earned the JS Explorer badge! 🚀" }
    ],
    quiz: [
      {
        question: "Which keyword is used to declare a variable that can change?",
        options: ["let", "const", "var", "static"],
        correct: 0,
        explanation: "'let' is used for variables that can change.",
        points: 10,
        feedback: ["Correct!", "Nice!", "Good job!"]
      },
      {
        question: "What is the value of 'name' after this code? const name = 'Sensai';",
        options: ["Sensai", "name", "const", "undefined"],
        correct: 0,
        explanation: "The variable 'name' is set to 'Sensai'.",
        points: 10,
        feedback: ["Awesome!", "That's right!", "You got it!"]
      }
    ],
    randomizeQuiz: true
  },
  // --- Python Print Module (NEW STYLE) ---
  {
    id: "python-print",
    title: "Python Print Statement",
    description: "Learn how to display messages in Python!",
    estimatedTime: "8 minutes",
    level: "Beginner",
    prerequisites: [],
    badge: "Python Starter",
    completed: false,
    content: [
      { type: "mascot", value: "Hi! Sensai here. Let's make Python talk! 🐍" },
      { type: "text", value: "In Python, you use the print() function to show messages on the screen." },
      { type: "image", value: "/assets/images/python_print_example.png", alt: "Python print example" },
      { type: "mascot", value: "Try printing your own message!" },
      { type: "code", value: "print('Hello, world!')", playground: true, prompt: "Try changing the message!" },
      { type: "mascot", value: "Which function shows a message on the screen?" },
      { type: "quiz", question: "What does the print() function do?", options: ["Displays a message on the screen", "Saves data to a file", "Starts a new program", "Creates a variable"], correct: 0, mascotCorrect: "Correct! print() shows a message!", mascotIncorrect: "Try again! It's print()." },
      { type: "mascot", value: "Can you drag the right function to the box?" },
      { type: "interactive", interaction: "drag-drop", prompt: "Drag the function to the box", items: ["print()", "echo()", "console.log()"], answer: "print()", mascotCorrect: "Awesome! print() is correct!", mascotIncorrect: "Try again! It's print()." },
      { type: "mascot", value: "Let's try a fill-in-the-blank!" },
      { type: "interactive", interaction: "fill-blank", prompt: "Fill in the blank: print(____)", answer: "'Hello'", mascotCorrect: "Yay! You filled in the message!", mascotIncorrect: "Almost! Try a message like 'Hello'." },
      { type: "mascot", value: "You did it! Time for your Python badge!" },
      { type: "image", value: "/assets/images/badge_python_starter.png", alt: "Python Starter badge" },
      { type: "reward", value: "badge", badge: "Python Starter", mascot: "You earned the Python Starter badge! 🐍" }
    ],
    quiz: [
      {
        question: "What does the print() function do?",
        options: [
          "Displays a message on the screen",
          "Saves data to a file",
          "Starts a new program",
          "Creates a variable"
        ],
        correct: 0,
        explanation: "print() shows a message on the screen.",
        points: 10,
        feedback: ["Correct!", "Great!", "Nice work!"]
      },
      {
        question: "Which of these is the correct way to print in Python?",
        options: [
          "print('Hello!')",
          "echo 'Hello!'",
          "console.log('Hello!')",
          "printf('Hello!')"
        ],
        correct: 0,
        explanation: "print('Hello!') is the correct Python syntax.",
        points: 10,
        feedback: ["Awesome!", "That's right!", "You got it!"]
      }
    ],
    randomizeQuiz: true
  }
];

export default modules; 
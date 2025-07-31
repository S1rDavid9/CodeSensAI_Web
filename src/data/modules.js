const modules = [
  {
    id: "html-intro",
    title: "Introduction to HTML",
    description: "Learn the basics of HTML, the language of the web! Discover how to create headings, paragraphs, images, and lists to build your first web page.",
    estimatedTime: "45 minutes",
    level: "Beginner",
    prerequisites: [],
    badge: "HTML Novice",
    completed: false,
    content: [
      { type: "mascot", value: "Hi! I'm Sensai 🥋. Ready to build your first web page? Let's go!" },
      { type: "text", value: "HTML is like the building blocks of a web page. It's super easy and fun! Think of it as the skeleton that holds everything together on the internet." },
      { type: "text", value: "Every website you visit - from social media to games to news sites - is built with HTML. It's the foundation of the web!" },
      { type: "image", value: "/assets/images/html_blocks.png", alt: "HTML blocks illustration" },
      { type: "mascot", value: "Let's start with headings! Headings are like titles for your web page." },
      { type: "text", value: "Headings come in different sizes: <h1> is the biggest (like a main title), <h2> is smaller, and so on up to <h6>." },
      { type: "code", value: "<h1>Hello, world!</h1>", playground: true, prompt: "Try changing the text inside the heading!" },
      { type: "image", value: "/assets/images/heading_example.png", alt: "Browser showing Hello, world! heading" },
      { type: "mascot", value: "Great! Now let's test what you learned about headings!" },
      { type: "quiz", question: "What does <h1> do?", options: ["Makes text big", "Adds a picture", "Makes text blue"], correct: 0, mascotCorrect: "You got it! <h1> makes big headings!", mascotIncorrect: "Oops! <h1> is for big headings. Try again!" },
      { type: "mascot", value: "Awesome! Can you drag the right tag to the box below?" },
      { type: "image", value: "/assets/images/drag_h1.png", alt: "Drag the h1 tag activity" },
      { type: "interactive", interaction: "drag-drop", prompt: "Drag the header tag to the box", items: ["<h1>", "<p>", "<img>"], answer: "<h1>", mascotCorrect: "Perfect! <h1> is the heading tag!", mascotIncorrect: "Try again! Look for the heading tag." },
      { type: "mascot", value: "Let's try a fill-in-the-blank!" },
      { type: "interactive", interaction: "fill-blank", prompt: "Fill in the blank: <____>Hello!</____>", answer: "h1", mascotCorrect: "Yay! You remembered the tag!", mascotIncorrect: "Almost! Remember, it's the heading tag." },
      // --- New extended content below ---
      { type: "mascot", value: "Did you know? HTML stands for Hyper Text Markup Language! The 'H' stands for Hyper, 'T' for Text, 'M' for Markup, and 'L' for Language!" },
      { type: "text", value: "Now let's learn about paragraphs! Paragraphs are for regular text - like the text you're reading right now." },
      { type: "text", value: "Paragraphs help organize your content and make it easy to read. They're like the body text of your web page." },
      { type: "code", value: "<p>This is a paragraph.</p>", playground: true, prompt: "Try writing your own paragraph!" },
      { type: "image", value: "/assets/images/paragraph_example.png", alt: "HTML paragraph example" },
      { type: "quiz", question: "Which tag is used for paragraphs?", options: ["<h1>", "<p>", "<img>"], correct: 1, mascotCorrect: "Correct! <p> is for paragraphs!", mascotIncorrect: "Try again! It's <p>." },
      { type: "mascot", value: "Now let's add some pictures! Images make web pages much more interesting and fun!" },
      { type: "text", value: "Images are added using the <img> tag. You need to tell the browser where to find the image (src) and what the image shows (alt text for accessibility)." },
      { type: "code", value: "<img src=\"/assets/images/html_example.png\" alt=\"A cool HTML example\">", playground: true, prompt: "Try changing the image or alt text!" },
      { type: "quiz", question: "What does the alt attribute do?", options: ["Makes the image bigger", "Describes the image", "Changes the color"], correct: 1, mascotCorrect: "That's right! Alt describes the image.", mascotIncorrect: "Try again! Alt is for description." },
      { type: "mascot", value: "Tip: Always use alt text for images! It helps people who can't see the image understand what it shows." },
      { type: "text", value: "Now let's learn about lists! Lists are great for showing steps, items, or organizing information." },
      { type: "text", value: "There are two types of lists: <ul> for unordered lists (with bullet points) and <ol> for ordered lists (with numbers)." },
      { type: "code", value: "<ul>\n  <li>Apples</li>\n  <li>Bananas</li>\n  <li>Cherries</li>\n</ul>", playground: true, prompt: "Try adding your favorite fruits!" },
      { type: "quiz", question: "Which tag makes a list item?", options: ["<ul>", "<li>", "<ol>"], correct: 1, mascotCorrect: "Correct! <li> is for list items!", mascotIncorrect: "Try again! It's <li>." },
      { type: "mascot", value: "Checkpoint! Let's see what you've learned so far." },
      { type: "quiz", question: "Which tag is used for the biggest heading?", options: ["<h1>", "<h3>", "<p>"], correct: 0, mascotCorrect: "Great job! <h1> is the biggest heading!", mascotIncorrect: "Try again! <h1> is the biggest." },
      { type: "quiz", question: "Which tag is used for paragraphs?", options: ["<p>", "<img>", "<ul>"], correct: 0, mascotCorrect: "Correct! <p> is for paragraphs!", mascotIncorrect: "Try again! It's <p>." },
      { type: "mascot", value: "Now let's put it all together! You're going to build your very first web page!" },
      { type: "text", value: "You've learned about headings, paragraphs, images, and lists. Now let's combine them to create something amazing!" },
      { type: "mini-project", prompt: "Create a web page with a heading, a paragraph, and a list of your 3 favorite things. Use <h1>, <p>, and <ul>/<li>. Try it in the playground!" },
      { type: "mascot", value: "Did you know? You can nest tags inside other tags! This means you can put one tag inside another tag." },
      { type: "text", value: "The <div> tag is like a container that can hold other tags. It helps organize your code and group related content together." },
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
  // --- CSS Mastery Module (ENHANCED) ---
  {
    id: "css-basics",
    title: "CSS Mastery",
    description: "Transform your web pages with colors, layouts, animations, and responsive design! Create stunning, modern websites.",
    estimatedTime: "45 minutes",
    level: "Beginner",
    prerequisites: ["html-intro"],
    badge: "CSS Master",
    completed: false,
    content: [
      { type: "mascot", value: "Welcome to CSS Mastery! I'm Sensai, and I'm going to teach you how to make your web pages absolutely beautiful! 🌈✨" },
      { type: "text", value: "CSS (Cascading Style Sheets) is the magic that transforms plain HTML into stunning, interactive websites. Think of HTML as the skeleton and CSS as the skin, clothes, and makeup!" },
      { type: "text", value: "In this module, you'll learn colors, typography, layouts, animations, and responsive design. By the end, you'll be able to create websites that look professional and modern!" },
      { type: "image", value: "/assets/images/css_example.png", alt: "CSS styling example" },
      
      { type: "mascot", value: "Let's start with the rainbow of possibilities - COLORS! 🎨" },
      { type: "text", value: "Colors in CSS can be specified in many ways: color names, hex codes, RGB values, and HSL. Each method gives you different levels of control and creativity." },
      { type: "code", value: "/* Color Examples */\nh1 { color: red; }\np { color: #0066cc; }\nspan { color: rgb(255, 0, 128); }\ndiv { color: hsl(240, 100%, 50%); }", playground: true, prompt: "Try different color values and see how they look!" },
      { type: "mascot", value: "Which color format gives you the most control?" },
      { type: "quiz", question: "Which color format offers the most control and precision?", options: ["Color names", "Hex codes", "RGB values", "HSL values"], correct: 3, mascotCorrect: "Excellent! HSL gives you hue, saturation, and lightness control!", mascotIncorrect: "HSL values give you the most control with hue, saturation, and lightness!" },
      
      { type: "mascot", value: "Now let's make text beautiful with TYPOGRAPHY! 📝" },
      { type: "text", value: "Typography is the art of arranging text. CSS gives you control over font families, sizes, weights, and spacing to create readable and attractive text." },
      { type: "code", value: "h1 {\n  font-family: 'Arial', sans-serif;\n  font-size: 2.5rem;\n  font-weight: bold;\n  text-align: center;\n  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);\n}", playground: true, prompt: "Experiment with different font properties!" },
      { type: "mascot", value: "What property controls how thick the text appears?" },
      { type: "quiz", question: "Which CSS property controls text thickness?", options: ["font-size", "font-weight", "font-style", "text-decoration"], correct: 1, mascotCorrect: "Perfect! font-weight controls text thickness!", mascotIncorrect: "font-weight controls how bold or thin the text appears!" },
      
      { type: "mascot", value: "Time for some SPACING and LAYOUT magic! 📐" },
      { type: "text", value: "Box model is fundamental to CSS layout. Every element has margin (outside), border, padding (inside), and content. Understanding this helps you create perfect spacing!" },
      { type: "code", value: ".box {\n  margin: 20px;\n  padding: 15px;\n  border: 2px solid #333;\n  border-radius: 10px;\n  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);\n}", playground: true, prompt: "Try adjusting margins, padding, and borders!" },
      { type: "mascot", value: "Which property creates space inside an element?" },
      { type: "quiz", question: "Which property creates space inside an element?", options: ["margin", "padding", "border", "spacing"], correct: 1, mascotCorrect: "Exactly! Padding creates space inside the element!", mascotIncorrect: "Padding creates space inside, margin creates space outside!" },
      
      { type: "mascot", value: "Let's make things MOVE with ANIMATIONS! 🎭" },
      { type: "text", value: "CSS animations bring your websites to life! You can animate colors, sizes, positions, and more. Let's create some smooth, eye-catching effects!" },
      { type: "code", value: "@keyframes bounce {\n  0%, 100% { transform: translateY(0); }\n  50% { transform: translateY(-20px); }\n}\n\n.bouncing-element {\n  animation: bounce 2s infinite;\n  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);\n  padding: 20px;\n  border-radius: 10px;\n}", playground: true, prompt: "Create your own animations!" },
      { type: "mascot", value: "What makes animations smooth and professional?" },
      { type: "quiz", question: "What property makes animations smooth and natural?", options: ["animation-duration", "animation-timing-function", "animation-iteration-count", "animation-delay"], correct: 1, mascotCorrect: "Great! Timing functions like 'ease' make animations smooth!", mascotIncorrect: "Timing functions control how the animation progresses over time!" },
      
      { type: "mascot", value: "Now for the magic of FLEXBOX! 🎪" },
      { type: "text", value: "Flexbox is a powerful layout system that makes it easy to create responsive, flexible layouts. It's perfect for navigation bars, cards, and complex page structures!" },
      { type: "code", value: ".flex-container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 20px;\n  padding: 20px;\n  background: #f8f9fa;\n}\n\n.flex-item {\n  flex: 1;\n  min-width: 200px;\n  padding: 15px;\n  background: white;\n  border-radius: 8px;\n  box-shadow: 0 2px 10px rgba(0,0,0,0.1);\n}", playground: true, prompt: "Experiment with flex properties!" },
      { type: "mascot", value: "Which property controls how flex items are distributed?" },
      { type: "quiz", question: "Which flexbox property controls item distribution?", options: ["align-items", "justify-content", "flex-direction", "flex-wrap"], correct: 1, mascotCorrect: "Perfect! justify-content controls horizontal distribution!", mascotIncorrect: "justify-content controls how items are distributed along the main axis!" },
      
      { type: "mascot", value: "Let's make it RESPONSIVE! 📱💻" },
      { type: "text", value: "Responsive design ensures your website looks great on all devices - phones, tablets, and computers. Media queries let you adapt your design for different screen sizes!" },
      { type: "code", value: "/* Mobile First Design */\n.container {\n  width: 100%;\n  padding: 10px;\n}\n\n/* Tablet */\n@media (min-width: 768px) {\n  .container {\n    width: 80%;\n    margin: 0 auto;\n    padding: 20px;\n  }\n}\n\n/* Desktop */\n@media (min-width: 1024px) {\n  .container {\n    width: 1200px;\n    padding: 30px;\n  }\n}", playground: true, prompt: "Try different screen sizes!" },
      { type: "mascot", value: "What's the best approach for responsive design?" },
      { type: "quiz", question: "What's the recommended approach for responsive design?", options: ["Desktop first", "Mobile first", "Tablet first", "Any order"], correct: 1, mascotCorrect: "Excellent! Mobile-first design is the best practice!", mascotIncorrect: "Mobile-first design ensures better performance and user experience!" },
      
      { type: "mascot", value: "Time for a creative challenge! Let's build something amazing! 🎨" },
      { type: "mini-project", prompt: "Create a beautiful card component with hover effects, gradients, and animations. Include a title, description, and a button. Use flexbox for layout and add smooth transitions!" },
      
      { type: "mascot", value: "Let's test your CSS knowledge with some interactive challenges!" },
      { type: "interactive", interaction: "drag-drop", prompt: "Drag the correct CSS property to complete the code: .button { ____: center; }", items: ["text-align", "margin", "padding", "display"], answer: "text-align", mascotCorrect: "Perfect! text-align centers the text!", mascotIncorrect: "text-align centers text content!" },
      { type: "interactive", interaction: "fill-blank", prompt: "Fill in the blank: .element { animation: ____ 2s infinite; }", answer: "bounce", mascotCorrect: "Great! You remembered the animation name!", mascotIncorrect: "The animation name goes after the colon!" },
      
      { type: "mascot", value: "Checkpoint! Let's see what you've learned about CSS! 🎯" },
      { type: "quiz", question: "Which CSS property creates rounded corners?", options: ["border-radius", "border-style", "border-width", "border-color"], correct: 0, mascotCorrect: "Excellent! border-radius creates rounded corners!", mascotIncorrect: "border-radius controls corner roundness!" },
      { type: "quiz", question: "What does 'flex: 1' do in flexbox?", options: ["Makes item grow to fill space", "Makes item shrink", "Centers the item", "Changes direction"], correct: 0, mascotCorrect: "Perfect! flex: 1 makes items grow to fill available space!", mascotIncorrect: "flex: 1 is shorthand for flex-grow: 1!" },
      
      { type: "mascot", value: "You're doing amazing! Let's create something spectacular! 🌟" },
      { type: "mini-project", prompt: "Build a responsive navigation bar with a logo, menu items, and a mobile hamburger menu. Use flexbox, media queries, and smooth transitions. Make it look professional!" },
      
      { type: "mascot", value: "Congratulations! You've mastered CSS fundamentals! 🎉" },
      { type: "image", value: "/assets/images/badge_css_master.png", alt: "CSS Master badge" },
      { type: "reward", value: "badge", badge: "CSS Master", mascot: "You earned the CSS Master badge! You can now create stunning, responsive websites! 🎨✨" }
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
        feedback: ["Excellent!", "Perfect!", "You're a CSS pro!"]
      },
      {
        question: "Which property controls text color?",
        options: ["color", "font-size", "background", "margin"],
        correct: 0,
        explanation: "The 'color' property controls text color.",
        points: 10,
        feedback: ["Awesome!", "Great job!", "That's right!"]
      },
      {
        question: "What does 'flex: 1' do in flexbox?",
        options: [
          "Makes item grow to fill space",
          "Centers the item",
          "Makes item shrink",
          "Changes flex direction"
        ],
        correct: 0,
        explanation: "flex: 1 makes items grow to fill available space.",
        points: 15,
        feedback: ["Perfect!", "Excellent!", "You understand flexbox!"]
      },
      {
        question: "Which media query targets mobile devices?",
        options: [
          "@media (max-width: 768px)",
          "@media (min-width: 1024px)",
          "@media (orientation: landscape)",
          "@media (color)"
        ],
        correct: 0,
        explanation: "@media (max-width: 768px) targets mobile devices.",
        points: 15,
        feedback: ["Great!", "Correct!", "You know responsive design!"]
      }
    ],
    randomizeQuiz: true
  },
  // --- JavaScript Fundamentals Module (ENHANCED) ---
  {
    id: "js-variables",
    title: "JavaScript Fundamentals",
    description: "Master JavaScript programming! Learn variables, functions, arrays, objects, and DOM manipulation to create interactive web applications.",
    estimatedTime: "60 minutes",
    level: "Beginner",
    prerequisites: ["html-intro", "css-basics"],
    badge: "JavaScript Developer",
    completed: false,
    content: [
      { type: "mascot", value: "Welcome to JavaScript Fundamentals! I'm Sensai, and I'm going to teach you how to make your websites come alive with interactivity! 🚀✨" },
      { type: "text", value: "JavaScript is the programming language that powers the modern web. It lets you create dynamic, interactive websites that respond to user actions, process data, and create amazing user experiences!" },
      { type: "text", value: "In this comprehensive module, you'll learn variables, functions, arrays, objects, DOM manipulation, and event handling. By the end, you'll be able to build interactive web applications!" },
      { type: "image", value: "/assets/images/js_variables.png", alt: "JavaScript variables example" },
      
      { type: "mascot", value: "Let's start with the building blocks - VARIABLES! 💾" },
      { type: "text", value: "Variables are containers that store data in your program. JavaScript has three ways to declare variables: 'let' (changeable), 'const' (constant), and 'var' (old way). Understanding when to use each is crucial!" },
      { type: "code", value: "// Variable Declaration Examples\nlet playerScore = 100;        // Can be changed\nconst playerName = 'Sensai';  // Cannot be changed\nvar oldWay = 'not recommended';\n\n// Different data types\nlet isGameActive = true;      // Boolean\nlet playerLevel = 5;          // Number\nlet specialMoves = ['kick', 'punch', 'block']; // Array", playground: true, prompt: "Try creating different types of variables!" },
      { type: "mascot", value: "Which variable type should you use for values that won't change?" },
      { type: "quiz", question: "Which keyword should you use for values that won't change?", options: ["let", "const", "var", "static"], correct: 1, mascotCorrect: "Perfect! Use 'const' for values that won't change!", mascotIncorrect: "Use 'const' for constant values that won't be reassigned!" },
      
      { type: "mascot", value: "Now let's learn about DATA TYPES! 🎯" },
      { type: "text", value: "JavaScript has several data types: strings (text), numbers, booleans (true/false), arrays (lists), objects (collections), and more. Understanding these helps you work with data effectively!" },
      { type: "code", value: "// Data Types in JavaScript\nlet text = 'Hello, World!';           // String\nlet number = 42;                      // Number\nlet isTrue = true;                    // Boolean\nlet fruits = ['apple', 'banana'];     // Array\nlet person = {                        // Object\n  name: 'Sensai',\n  age: 25,\n  skills: ['JavaScript', 'CSS', 'HTML']\n};\n\nconsole.log(typeof text);    // 'string'\nconsole.log(typeof number);  // 'number'\nconsole.log(typeof isTrue);  // 'boolean'", playground: true, prompt: "Experiment with different data types!" },
      { type: "mascot", value: "What data type is used for true/false values?" },
      { type: "quiz", question: "What data type represents true/false values?", options: ["String", "Number", "Boolean", "Array"], correct: 2, mascotCorrect: "Excellent! Boolean represents true/false values!", mascotIncorrect: "Boolean is the data type for true/false values!" },
      
      { type: "mascot", value: "Time for FUNCTIONS - the powerhouses of JavaScript! ⚡" },
      { type: "text", value: "Functions are reusable blocks of code that perform specific tasks. They can take inputs (parameters), process them, and return outputs. Functions make your code organized and reusable!" },
      { type: "code", value: "// Function Declaration\nfunction greetPlayer(name) {\n  return `Hello, ${name}! Welcome to the game!`;\n}\n\n// Function Expression\nconst calculateScore = (hits, misses) => {\n  return (hits * 10) - (misses * 5);\n};\n\n// Arrow Function (ES6)\nconst isWinner = (score) => score >= 100;\n\n// Using functions\nconsole.log(greetPlayer('Sensai'));\nconsole.log(calculateScore(15, 3));\nconsole.log(isWinner(120));", playground: true, prompt: "Create your own functions!" },
      { type: "mascot", value: "What's the modern way to write functions in JavaScript?" },
      { type: "quiz", question: "What's the modern ES6 way to write functions?", options: ["function keyword", "Arrow functions", "var functions", "const functions"], correct: 1, mascotCorrect: "Great! Arrow functions are the modern ES6 syntax!", mascotIncorrect: "Arrow functions (=>) are the modern ES6 way to write functions!" },
      
      { type: "mascot", value: "Let's explore ARRAYS - powerful lists! 📋" },
      { type: "text", value: "Arrays are ordered collections of data. They can store multiple values of any type and provide powerful methods for manipulating data. Arrays are essential for working with lists of items!" },
      { type: "code", value: "// Array Creation and Manipulation\nlet gameLevels = ['Beginner', 'Intermediate', 'Advanced'];\nlet playerScores = [85, 92, 78, 96, 88];\n\n// Adding elements\ngameLevels.push('Expert');\nplayerScores.unshift(100);\n\n// Removing elements\nlet lastScore = playerScores.pop();\nlet firstScore = playerScores.shift();\n\n// Array methods\nlet highScores = playerScores.filter(score => score > 90);\nlet averageScore = playerScores.reduce((sum, score) => sum + score, 0) / playerScores.length;\n\nconsole.log('High scores:', highScores);\nconsole.log('Average score:', averageScore);", playground: true, prompt: "Try array methods and manipulations!" },
      { type: "mascot", value: "Which method adds an element to the end of an array?" },
      { type: "quiz", question: "Which array method adds an element to the end?", options: ["push()", "pop()", "shift()", "unshift()"], correct: 0, mascotCorrect: "Perfect! push() adds elements to the end of an array!", mascotIncorrect: "push() adds elements to the end, pop() removes from the end!" },
      
      { type: "mascot", value: "Now for OBJECTS - structured data containers! 📦" },
      { type: "text", value: "Objects are collections of key-value pairs that represent real-world entities. They're perfect for organizing related data and creating complex data structures!" },
      { type: "code", value: "// Object Creation and Manipulation\nlet player = {\n  name: 'Sensai',\n  level: 5,\n  health: 100,\n  inventory: ['sword', 'shield', 'potion'],\n  attack: function() {\n    return `${this.name} attacks with ${this.inventory[0]}!`;\n  }\n};\n\n// Accessing properties\nconsole.log(player.name);\nconsole.log(player['level']);\n\n// Adding new properties\nplayer.experience = 1250;\nplayer.specialAbility = 'Double Strike';\n\n// Using object methods\nconsole.log(player.attack());\n\n// Object destructuring (ES6)\nlet { name, level, health } = player;\nconsole.log(`${name} is level ${level} with ${health} health`);", playground: true, prompt: "Create and manipulate objects!" },
      { type: "mascot", value: "How do you access object properties?" },
      { type: "quiz", question: "How do you access object properties?", options: ["Only with dot notation", "Only with bracket notation", "Both dot and bracket notation", "Only with parentheses"], correct: 2, mascotCorrect: "Excellent! You can use both dot notation and bracket notation!", mascotIncorrect: "You can use both dot notation (obj.property) and bracket notation (obj['property'])!" },
      
      { type: "mascot", value: "Time for CONDITIONAL LOGIC! 🎲" },
      { type: "text", value: "Conditional statements let your code make decisions based on different conditions. They're essential for creating interactive and responsive applications!" },
      { type: "code", value: "// Conditional Statements\nlet playerHealth = 75;\nlet playerLevel = 8;\nlet hasSpecialWeapon = true;\n\n// if-else statements\nif (playerHealth > 50) {\n  console.log('Player is healthy!');\n} else if (playerHealth > 25) {\n  console.log('Player needs healing!');\n} else {\n  console.log('Player is in critical condition!');\n}\n\n// Switch statement\nswitch(playerLevel) {\n  case 1:\n  case 2:\n  case 3:\n    console.log('Beginner level');\n    break;\n  case 4:\n  case 5:\n  case 6:\n    console.log('Intermediate level');\n    break;\n  default:\n    console.log('Advanced level');\n}\n\n// Ternary operator\nlet status = playerHealth > 50 ? 'Healthy' : 'Needs healing';\nconsole.log(`Player status: ${status}`);", playground: true, prompt: "Write conditional logic!" },
      { type: "mascot", value: "What's the shorthand way to write simple if-else statements?" },
      { type: "quiz", question: "What's the shorthand for simple if-else statements?", options: ["Switch statement", "Ternary operator", "For loop", "While loop"], correct: 1, mascotCorrect: "Great! The ternary operator (condition ? value1 : value2) is the shorthand!", mascotIncorrect: "The ternary operator (condition ? value1 : value2) is the shorthand for simple if-else!" },
      
      { type: "mascot", value: "Let's learn about LOOPS - repeating actions! 🔄" },
      { type: "text", value: "Loops let you repeat code multiple times. They're perfect for processing arrays, counting, and automating repetitive tasks!" },
      { type: "code", value: "// Different Types of Loops\nlet enemies = ['Goblin', 'Orc', 'Troll', 'Dragon'];\nlet playerDamage = [25, 30, 15, 45];\n\n// For loop\nfor (let i = 0; i < enemies.length; i++) {\n  console.log(`Attacking ${enemies[i]} for ${playerDamage[i]} damage!`);\n}\n\n// ForEach loop (array method)\nenemies.forEach((enemy, index) => {\n  console.log(`${enemy} takes ${playerDamage[index]} damage!`);\n});\n\n// For...of loop (ES6)\nfor (let enemy of enemies) {\n  console.log(`Defeated ${enemy}!`);\n}\n\n// While loop\nlet health = 100;\nwhile (health > 0) {\n  console.log(`Health: ${health}`);\n  health -= 10;\n}\nconsole.log('Game Over!');", playground: true, prompt: "Practice different types of loops!" },
      { type: "mascot", value: "Which loop is best for processing arrays?" },
      { type: "quiz", question: "Which loop is best for processing arrays?", options: ["While loop", "ForEach loop", "Do-while loop", "Infinite loop"], correct: 1, mascotCorrect: "Excellent! ForEach is perfect for processing arrays!", mascotIncorrect: "ForEach is specifically designed for processing arrays!" },
      
      { type: "mascot", value: "Now for the exciting part - DOM MANIPULATION! 🌐" },
      { type: "text", value: "The Document Object Model (DOM) represents your HTML page as objects that JavaScript can manipulate. This is how you make websites interactive!" },
      { type: "code", value: "// DOM Manipulation Examples\n\n// Selecting elements\nlet title = document.getElementById('title');\nlet buttons = document.querySelectorAll('.btn');\nlet container = document.querySelector('.container');\n\n// Changing content\ntitle.textContent = 'New Title';\ntitle.innerHTML = '<span>Styled</span> Title';\n\n// Changing styles\ntitle.style.color = 'red';\ntitle.style.fontSize = '2rem';\n\n// Adding/removing classes\ntitle.classList.add('highlight');\ntitle.classList.remove('old-class');\ntitle.classList.toggle('active');\n\n// Creating new elements\nlet newButton = document.createElement('button');\nnewButton.textContent = 'Click Me!';\nnewButton.className = 'btn btn-primary';\ncontainer.appendChild(newButton);", playground: true, prompt: "Try DOM manipulation!" },
      { type: "mascot", value: "How do you select multiple elements with the same class?" },
      { type: "quiz", question: "How do you select multiple elements with the same class?", options: ["getElementById()", "querySelector()", "querySelectorAll()", "getElementsByTagName()"], correct: 2, mascotCorrect: "Perfect! querySelectorAll() selects all elements with the same selector!", mascotIncorrect: "querySelectorAll() returns all elements that match the selector!" },
      
      { type: "mascot", value: "Finally, let's handle EVENTS - user interactions! 🎮" },
      { type: "text", value: "Events are actions that happen on your webpage - clicks, key presses, form submissions, etc. Event listeners let you respond to these actions!" },
      { type: "code", value: "// Event Handling Examples\n\n// Click event\nlet button = document.querySelector('#myButton');\nbutton.addEventListener('click', function() {\n  console.log('Button clicked!');\n  this.style.backgroundColor = 'red';\n});\n\n// Form submission\nlet form = document.querySelector('#myForm');\nform.addEventListener('submit', function(event) {\n  event.preventDefault(); // Prevent form submission\n  let input = document.querySelector('#nameInput');\n  console.log('Form submitted with name:', input.value);\n});\n\n// Keyboard events\ndocument.addEventListener('keydown', function(event) {\n  if (event.key === 'Enter') {\n    console.log('Enter key pressed!');\n  }\n});\n\n// Mouse events\nlet element = document.querySelector('.hoverable');\nelement.addEventListener('mouseenter', function() {\n  this.style.transform = 'scale(1.1)';\n});\nelement.addEventListener('mouseleave', function() {\n  this.style.transform = 'scale(1)';\n});", playground: true, prompt: "Create event listeners!" },
      { type: "mascot", value: "What method prevents the default behavior of an event?" },
      { type: "quiz", question: "What method prevents default event behavior?", options: ["stopPropagation()", "preventDefault()", "stopImmediatePropagation()", "cancelBubble()"], correct: 1, mascotCorrect: "Excellent! preventDefault() stops the default behavior!", mascotIncorrect: "preventDefault() stops the default behavior of events!" },
      
      { type: "mascot", value: "Time for a creative coding challenge! Let's build something amazing! 🎨" },
      { type: "mini-project", prompt: "Create an interactive game! Build a simple number guessing game with a form input, submit button, and feedback messages. Use variables, functions, conditionals, and DOM manipulation!" },
      
      { type: "mascot", value: "Let's test your JavaScript knowledge with interactive challenges!" },
      { type: "interactive", interaction: "drag-drop", prompt: "Drag the correct keyword to declare a variable: ____ playerName = 'Sensai';", items: ["let", "const", "var", "function"], answer: "const", mascotCorrect: "Perfect! const is used for values that won't change!", mascotIncorrect: "const is used for constant values!" },
      { type: "interactive", interaction: "fill-blank", prompt: "Fill in the blank: function ____(name) { return 'Hello ' + name; }", answer: "greet", mascotCorrect: "Great! You created a function name!", mascotIncorrect: "The function name goes after the function keyword!" },
      
      { type: "mascot", value: "Checkpoint! Let's test your JavaScript knowledge! 🎯" },
      { type: "quiz", question: "Which keyword declares a constant variable?", options: ["let", "const", "var", "static"], correct: 1, mascotCorrect: "Perfect! const declares constant variables!", mascotIncorrect: "const is used for values that won't be reassigned!" },
      { type: "quiz", question: "What method adds an element to the end of an array?", options: ["push()", "pop()", "shift()", "unshift()"], correct: 0, mascotCorrect: "Excellent! push() adds elements to the end!", mascotIncorrect: "push() adds to the end, pop() removes from the end!" },
      
      { type: "mascot", value: "You're doing fantastic! Let's create something spectacular! 🌟" },
      { type: "mini-project", prompt: "Build a dynamic todo list! Create an app where users can add tasks, mark them complete, and delete them. Use arrays, objects, DOM manipulation, and event handling!" },
      
      { type: "mascot", value: "Congratulations! You've mastered JavaScript fundamentals! 🎉" },
      { type: "image", value: "/assets/images/badge_js_developer.png", alt: "JavaScript Developer badge" },
      { type: "reward", value: "badge", badge: "JavaScript Developer", mascot: "You earned the JavaScript Developer badge! You can now create interactive, dynamic web applications! 🚀✨" }
    ],
    quiz: [
      {
        question: "Which keyword declares a constant variable?",
        options: ["let", "const", "var", "static"],
        correct: 1,
        explanation: "const is used to declare variables that won't be reassigned.",
        points: 10,
        feedback: ["Excellent!", "Perfect!", "You understand variables!"]
      },
      {
        question: "What data type represents true/false values?",
        options: ["String", "Number", "Boolean", "Array"],
        correct: 2,
        explanation: "Boolean represents true/false values.",
        points: 10,
        feedback: ["Great job!", "Correct!", "You know data types!"]
      },
      {
        question: "Which array method adds an element to the end?",
        options: ["push()", "pop()", "shift()", "unshift()"],
        correct: 0,
        explanation: "push() adds elements to the end of an array.",
        points: 15,
        feedback: ["Perfect!", "Excellent!", "You understand arrays!"]
      },
      {
        question: "How do you select multiple elements with the same class?",
        options: [
          "getElementById()",
          "querySelector()", 
          "querySelectorAll()",
          "getElementsByTagName()"
        ],
        correct: 2,
        explanation: "querySelectorAll() selects all elements that match the selector.",
        points: 15,
        feedback: ["Awesome!", "Great!", "You know DOM manipulation!"]
      }
    ],
    randomizeQuiz: true
  },
  // --- Python Fundamentals Module (ENHANCED) ---
  {
    id: "python-print",
    title: "Python Fundamentals",
    description: "Master Python programming! Learn variables, functions, data structures, control flow, and file handling to build powerful applications.",
    estimatedTime: "75 minutes",
    level: "Beginner",
    prerequisites: [],
    badge: "Python Developer",
    completed: false,
    content: [
      { type: "mascot", value: "Welcome to Python Fundamentals! I'm Sensai, and I'm going to teach you one of the most powerful and beginner-friendly programming languages! 🐍✨" },
      { type: "text", value: "Python is a versatile programming language used for web development, data science, artificial intelligence, automation, and much more. It's known for its clean, readable syntax and powerful libraries!" },
      { type: "text", value: "In this comprehensive module, you'll learn variables, data types, functions, control structures, data structures, file handling, and more. By the end, you'll be able to build real Python applications!" },
      { type: "image", value: "/assets/images/python_print_example.png", alt: "Python programming example" },
      
      { type: "mascot", value: "Let's start with the basics - PRINTING and OUTPUT! 📝" },
      { type: "text", value: "The print() function is how you display information in Python. It's your first step in communicating with the computer and seeing the results of your code!" },
      { type: "code", value: "# Basic Printing\nprint('Hello, World!')\nprint('Welcome to Python!')\n\n# Printing multiple items\nname = 'Sensai'\nage = 25\nprint('My name is', name, 'and I am', age, 'years old')\n\n# Using f-strings (Python 3.6+)\nprint(f'My name is {name} and I am {age} years old')\n\n# Printing with different separators\nprint('Python', 'is', 'awesome', sep='-')\nprint('First line', end=' ')\nprint('Second line')", playground: true, prompt: "Try different ways to print messages!" },
      { type: "mascot", value: "What's the modern way to format strings in Python?" },
      { type: "quiz", question: "What's the modern way to format strings in Python?", options: ["% formatting", ".format()", "f-strings", "concatenation"], correct: 2, mascotCorrect: "Excellent! f-strings are the modern, readable way to format strings!", mascotIncorrect: "f-strings (f'text {variable}') are the modern Python way!" },
      
      { type: "mascot", value: "Now let's learn about VARIABLES and DATA TYPES! 💾" },
      { type: "text", value: "Variables are containers that store data. Python has several built-in data types: strings (text), integers (whole numbers), floats (decimal numbers), booleans (True/False), and more!" },
      { type: "code", value: "# Variable Declaration and Data Types\nname = 'Sensai'              # String\nage = 25                     # Integer\nheight = 5.9                 # Float\nis_student = True            # Boolean\nskills = ['Python', 'CSS']   # List\n\n# Type checking\nprint(f'Name: {name} (type: {type(name)})')\nprint(f'Age: {age} (type: {type(age)})')\nprint(f'Height: {height} (type: {type(height)})')\nprint(f'Is student: {is_student} (type: {type(is_student)})')\nprint(f'Skills: {skills} (type: {type(skills)})')\n\n# Type conversion\nage_string = str(age)\nheight_int = int(height)\nprint(f'Age as string: {age_string} (type: {type(age_string)})')\nprint(f'Height as int: {height_int} (type: {type(height_int)})')", playground: true, prompt: "Experiment with different data types and type conversions!" },
      { type: "mascot", value: "What data type represents whole numbers in Python?" },
      { type: "quiz", question: "What data type represents whole numbers in Python?", options: ["String", "Integer", "Float", "Boolean"], correct: 1, mascotCorrect: "Perfect! Integer represents whole numbers!", mascotIncorrect: "Integer (int) represents whole numbers in Python!" },
      
      { type: "mascot", value: "Time for STRING MANIPULATION! 📝" },
      { type: "text", value: "Strings are sequences of characters. Python provides many methods to manipulate strings - finding, replacing, splitting, joining, and formatting!" },
      { type: "code", value: "# String Manipulation\nmessage = 'Hello, Python World!'\n\n# String methods\nprint(f'Original: {message}')\nprint(f'Uppercase: {message.upper()}')\nprint(f'Lowercase: {message.lower()}')\nprint(f'Title case: {message.title()}')\nprint(f'Length: {len(message)}')\nprint(f'First word: {message.split()[0]}')\nprint(f'Contains Python: {message.find(\"Python\")}')\nprint(f'Replace World: {message.replace(\"World\", \"Sensai\")}')\n\n# String slicing\nprint(f'First 5 characters: {message[:5]}')\nprint(f'Last 6 characters: {message[-6:]}')\nprint(f'Characters 7-12: {message[7:12]}')\n\n# String concatenation\nfirst = 'Hello'\nsecond = 'Python'\nresult = first + ' ' + second + '!'\nprint(f'Concatenated: {result}')", playground: true, prompt: "Try different string methods and slicing!" },
      { type: "mascot", value: "How do you find the length of a string?" },
      { type: "quiz", question: "How do you find the length of a string?", options: ["string.length()", "len(string)", "string.count()", "string.size()"], correct: 1, mascotCorrect: "Great! len(string) returns the length of a string!", mascotIncorrect: "len(string) is the built-in function to get string length!" },
      
      { type: "mascot", value: "Let's explore LISTS - powerful collections! 📋" },
      { type: "text", value: "Lists are ordered collections that can store multiple items of any type. They're one of Python's most versatile data structures!" },
      { type: "code", value: "# List Creation and Manipulation\nfruits = ['apple', 'banana', 'orange']\nnumbers = [1, 2, 3, 4, 5]\nmixed = ['Python', 42, True, 3.14]\n\n# Adding elements\nfruits.append('grape')\nfruits.insert(1, 'mango')\nfruits.extend(['kiwi', 'pear'])\nprint(f'Fruits after adding: {fruits}')\n\n# Removing elements\nremoved = fruits.pop()\nprint(f'Removed: {removed}')\nfruits.remove('banana')\nprint(f'After removing banana: {fruits}')\n\n# List operations\nprint(f'First fruit: {fruits[0]}')\nprint(f'Last fruit: {fruits[-1]}')\nprint(f'First 3 fruits: {fruits[:3]}')\nprint(f'Number of fruits: {len(fruits)}')\nprint(f'Is apple in list: {\"apple\" in fruits}')\n\n# List comprehension (advanced)\nsquares = [x**2 for x in range(1, 6)]\nprint(f'Squares: {squares}')\n\neven_numbers = [x for x in range(10) if x % 2 == 0]\nprint(f'Even numbers: {even_numbers}')", playground: true, prompt: "Experiment with list operations and comprehensions!" },
      { type: "mascot", value: "Which method adds an element to the end of a list?" },
      { type: "quiz", question: "Which method adds an element to the end of a list?", options: ["append()", "insert()", "extend()", "add()"], correct: 0, mascotCorrect: "Perfect! append() adds an element to the end of a list!", mascotIncorrect: "append() adds a single element to the end of a list!" },
      
      { type: "mascot", value: "Now for DICTIONARIES - key-value pairs! 📚" },
      { type: "text", value: "Dictionaries store data as key-value pairs. They're perfect for representing real-world objects and creating lookup tables!" },
      { type: "code", value: "# Dictionary Creation and Manipulation\nstudent = {\n    'name': 'Sensai',\n    'age': 25,\n    'skills': ['Python', 'JavaScript', 'CSS'],\n    'grades': {'math': 95, 'science': 88, 'english': 92}\n}\n\n# Accessing values\nprint(f'Student name: {student[\"name\"]}')\nprint(f'Student age: {student.get(\"age\")}')\nprint(f'Skills: {student[\"skills\"]}')\nprint(f'Math grade: {student[\"grades\"][\"math\"]}')\n\n# Adding and modifying\nstudent['email'] = 'sensai@example.com'\nstudent['age'] = 26\nprint(f'Updated student: {student}')\n\n# Dictionary methods\nprint(f'Keys: {list(student.keys())}')\nprint(f'Values: {list(student.values())}')\nprint(f'Items: {list(student.items())}')\n\n# Dictionary comprehension\nsquares_dict = {x: x**2 for x in range(1, 6)}\nprint(f'Squares dictionary: {squares_dict}')\n\n# Checking if key exists\nif 'name' in student:\n    print('Name exists in student dictionary')\nelse:\n    print('Name not found')", playground: true, prompt: "Create and manipulate dictionaries!" },
      { type: "mascot", value: "How do you access a value in a dictionary?" },
      { type: "quiz", question: "How do you access a value in a dictionary?", options: ["dict.value(key)", "dict[key]", "dict.get(key)", "Both B and C"], correct: 3, mascotCorrect: "Excellent! You can use both dict[key] and dict.get(key)!", mascotIncorrect: "Both dict[key] and dict.get(key) can access dictionary values!" },
      
      { type: "mascot", value: "Time for FUNCTIONS - reusable code blocks! ⚡" },
      { type: "text", value: "Functions are reusable blocks of code that perform specific tasks. They help organize your code and make it more maintainable!" },
      { type: "code", value: "# Function Definition and Usage\n\ndef greet(name):\n    \"\"\"This function greets a person by name\"\"\"\n    return f'Hello, {name}! Welcome to Python!'\n\ndef calculate_area(length, width):\n    \"\"\"Calculate the area of a rectangle\"\"\"\n    area = length * width\n    return area\n\ndef get_student_info(name, age, skills=None):\n    \"\"\"Get student information with default parameter\"\"\"\n    if skills is None:\n        skills = []\n    return {\n        'name': name,\n        'age': age,\n        'skills': skills\n    }\n\n# Using functions\nprint(greet('Sensai'))\nprint(f'Area: {calculate_area(5, 3)}')\n\nstudent1 = get_student_info('Alice', 20, ['Python', 'Math'])\nstudent2 = get_student_info('Bob', 22)\nprint(f'Student 1: {student1}')\nprint(f'Student 2: {student2}')\n\n# Lambda functions (anonymous functions)\nsquare = lambda x: x**2\nadd = lambda x, y: x + y\n\nprint(f'Square of 5: {square(5)}')\nprint(f'Sum of 3 and 4: {add(3, 4)}')", playground: true, prompt: "Create and use different types of functions!" },
      { type: "mascot", value: "What keyword is used to define a function in Python?" },
      { type: "quiz", question: "What keyword is used to define a function in Python?", options: ["function", "def", "func", "define"], correct: 1, mascotCorrect: "Perfect! 'def' is used to define functions in Python!", mascotIncorrect: "'def' is the keyword used to define functions in Python!" },
      
      { type: "mascot", value: "Let's learn about CONTROL STRUCTURES! 🎲" },
      { type: "text", value: "Control structures let your program make decisions and repeat actions. They're essential for creating dynamic and interactive programs!" },
      { type: "code", value: "# Conditional Statements (if-elif-else)\nage = 18\n\nif age < 13:\n    print('You are a child')\nelif age < 20:\n    print('You are a teenager')\nelif age < 65:\n    print('You are an adult')\nelse:\n    print('You are a senior')\n\n# Comparison operators\nscore = 85\nif score >= 90:\n    grade = 'A'\nelif score >= 80:\n    grade = 'B'\nelif score >= 70:\n    grade = 'C'\nelse:\n    grade = 'F'\nprint(f'Score: {score}, Grade: {grade}')\n\n# Logical operators\nis_student = True\nhas_permission = False\n\nif is_student and has_permission:\n    print('Access granted')\nelif is_student or has_permission:\n    print('Partial access')\nelse:\n    print('Access denied')\n\n# Ternary operator (conditional expression)\nstatus = 'adult' if age >= 18 else 'minor'\nprint(f'Status: {status}')", playground: true, prompt: "Write conditional logic with different scenarios!" },
      { type: "mascot", value: "What's the Python equivalent of 'else if'?" },
      { type: "quiz", question: "What's the Python equivalent of 'else if'?", options: ["elseif", "elif", "else if", "if else"], correct: 1, mascotCorrect: "Great! 'elif' is Python's equivalent of 'else if'!", mascotIncorrect: "'elif' is the Python keyword for 'else if'!" },
      
      { type: "mascot", value: "Now for LOOPS - repeating actions! 🔄" },
      { type: "text", value: "Loops let you repeat code multiple times. Python has 'for' loops for iterating over sequences and 'while' loops for conditional repetition!" },
      { type: "code", value: "# For Loops\nfruits = ['apple', 'banana', 'orange', 'grape']\n\n# Iterating over a list\nfor fruit in fruits:\n    print(f'I like {fruit}')\n\n# Using range()\nfor i in range(5):\n    print(f'Count: {i}')\n\nfor i in range(1, 6):\n    print(f'Number: {i}')\n\n# Enumerate to get index and value\nfor index, fruit in enumerate(fruits):\n    print(f'{index + 1}. {fruit}')\n\n# While Loops\ncount = 0\nwhile count < 3:\n    print(f'While loop count: {count}')\n    count += 1\n\n# Loop control\nfor i in range(10):\n    if i == 3:\n        continue  # Skip this iteration\n    if i == 7:\n        break     # Exit the loop\n    print(f'Loop value: {i}')\n\n# List comprehension with loops\nsquares = [i**2 for i in range(1, 6)]\nprint(f'Squares: {squares}')\n\nfiltered_fruits = [fruit for fruit in fruits if len(fruit) > 5]\nprint(f'Long fruits: {filtered_fruits}')", playground: true, prompt: "Practice different types of loops and comprehensions!" },
      { type: "mascot", value: "Which loop is best for iterating over a sequence?" },
      { type: "quiz", question: "Which loop is best for iterating over a sequence?", options: ["While loop", "For loop", "Do-while loop", "Repeat loop"], correct: 1, mascotCorrect: "Excellent! For loops are perfect for iterating over sequences!", mascotIncorrect: "For loops are specifically designed for iterating over sequences!" },
      
      { type: "mascot", value: "Let's handle FILES - reading and writing data! 📁" },
      { type: "text", value: "File handling lets your programs read from and write to files. This is essential for data persistence and working with external data!" },
      { type: "code", value: "# File Handling Examples\n\n# Writing to a file\nwith open('sample.txt', 'w') as file:\n    file.write('Hello, Python!\\n')\n    file.write('This is a sample file.\\n')\n    file.write('Learning file handling is fun!\\n')\nprint('File written successfully!')\n\n# Reading from a file\nwith open('sample.txt', 'r') as file:\n    content = file.read()\n    print('File content:')\n    print(content)\n\n# Reading line by line\nwith open('sample.txt', 'r') as file:\n    print('Reading line by line:')\n    for line_num, line in enumerate(file, 1):\n        print(f'Line {line_num}: {line.strip()}')\n\n# Appending to a file\nwith open('sample.txt', 'a') as file:\n    file.write('\\nThis line was appended!\\n')\n    file.write('File handling is powerful!\\n')\nprint('Content appended successfully!')\n\n# Working with CSV-like data\nstudents = [\n    ['Name', 'Age', 'Grade'],\n    ['Alice', '20', 'A'],\n    ['Bob', '22', 'B'],\n    ['Charlie', '21', 'A-']\n]\n\nwith open('students.csv', 'w') as file:\n    for student in students:\n        file.write(','.join(student) + '\\n')\nprint('CSV file created!')", playground: true, prompt: "Try reading and writing different types of files!" },
      { type: "mascot", value: "What mode opens a file for both reading and writing?" },
      { type: "quiz", question: "What mode opens a file for both reading and writing?", options: ["'r'", "'w'", "'a'", "'r+'"], correct: 3, mascotCorrect: "Great! 'r+' opens a file for both reading and writing!", mascotIncorrect: "'r+' mode allows both reading and writing to a file!" },
      
      { type: "mascot", value: "Time for ERROR HANDLING - making robust programs! 🛡️" },
      { type: "text", value: "Error handling helps your programs deal with unexpected situations gracefully. It's essential for creating reliable applications!" },
      { type: "code", value: "# Error Handling with try-except\n\n# Basic error handling\ntry:\n    number = int(input('Enter a number: '))\n    result = 10 / number\n    print(f'Result: {result}')\nexcept ValueError:\n    print('Error: Please enter a valid number!')\nexcept ZeroDivisionError:\n    print('Error: Cannot divide by zero!')\nexcept Exception as e:\n    print(f'An unexpected error occurred: {e}')\nelse:\n    print('No errors occurred!')\nfinally:\n    print('This always runs!')\n\n# Working with files safely\ntry:\n    with open('nonexistent.txt', 'r') as file:\n        content = file.read()\nexcept FileNotFoundError:\n    print('File not found! Creating a new one...')\n    with open('nonexistent.txt', 'w') as file:\n        file.write('This is a new file!')\n    print('File created successfully!')\n\n# Custom exceptions\nclass AgeError(Exception):\n    pass\n\ndef check_age(age):\n    if age < 0:\n        raise AgeError('Age cannot be negative!')\n    elif age > 150:\n        raise AgeError('Age seems unrealistic!')\n    return f'Valid age: {age}'\n\ntry:\n    print(check_age(25))\n    print(check_age(-5))\nexcept AgeError as e:\n    print(f'Age error: {e}')", playground: true, prompt: "Practice error handling with different scenarios!" },
      { type: "mascot", value: "What keyword is used to handle exceptions in Python?" },
      { type: "quiz", question: "What keyword is used to handle exceptions in Python?", options: ["catch", "except", "handle", "error"], correct: 1, mascotCorrect: "Perfect! 'except' is used to handle exceptions in Python!", mascotIncorrect: "'except' is the keyword used to catch and handle exceptions!" },
      
      { type: "mascot", value: "Let's explore MODULES and IMPORTS! 📦" },
      { type: "text", value: "Modules are Python files that contain functions, classes, and variables. They help organize code and provide reusable functionality!" },
      { type: "code", value: "# Working with Modules\n\n# Importing entire modules\nimport math\nimport random\nimport datetime\n\n# Using math module\nprint(f'Square root of 16: {math.sqrt(16)}')\nprint(f'Pi: {math.pi}')\nprint(f'Ceiling of 3.7: {math.ceil(3.7)}')\nprint(f'Floor of 3.7: {math.floor(3.7)}')\n\n# Using random module\nprint(f'Random number (1-10): {random.randint(1, 10)}')\nprint(f'Random choice from list: {random.choice([\"apple\", \"banana\", \"orange\"])}')\nprint(f'Random float (0-1): {random.random()}')\n\n# Using datetime module\nnow = datetime.datetime.now()\nprint(f'Current date and time: {now}')\nprint(f'Current year: {now.year}')\nprint(f'Current month: {now.month}')\nprint(f'Formatted date: {now.strftime(\"%Y-%m-%d %H:%M:%S\")}')\n\n# Importing specific functions\nfrom math import sqrt, pi\nfrom random import choice, randint\n\nprint(f'Square root of 25: {sqrt(25)}')\nprint(f'Pi value: {pi}')\nprint(f'Random choice: {choice([\"red\", \"green\", \"blue\"])}')\nprint(f'Random integer: {randint(1, 100)}')\n\n# Creating your own module (concept)\n# Save this as 'my_module.py':\n# def greet(name):\n#     return f'Hello, {name}!'\n# \n# def add(a, b):\n#     return a + b\n\n# Then import it:\n# import my_module\n# print(my_module.greet('Sensai'))\n# print(my_module.add(5, 3))", playground: true, prompt: "Experiment with different Python modules!" },
      { type: "mascot", value: "How do you import a specific function from a module?" },
      { type: "quiz", question: "How do you import a specific function from a module?", options: ["import function from module", "from module import function", "import module.function", "load function from module"], correct: 1, mascotCorrect: "Excellent! 'from module import function' imports specific functions!", mascotIncorrect: "'from module import function' is the correct syntax!" },
      
      { type: "mascot", value: "Time for a creative coding challenge! Let's build something amazing! 🎨" },
      { type: "mini-project", prompt: "Create a simple calculator! Build a program that can perform basic arithmetic operations (add, subtract, multiply, divide). Use functions, error handling, and user input. Make it interactive!" },
      
      { type: "mascot", value: "Let's test your Python knowledge with interactive challenges!" },
      { type: "interactive", interaction: "drag-drop", prompt: "Drag the correct function to print a message: ____('Hello World')", items: ["print", "echo", "display", "show"], answer: "print", mascotCorrect: "Perfect! print() is the correct Python function!", mascotIncorrect: "print() is the Python function for displaying output!" },
      { type: "interactive", interaction: "fill-blank", prompt: "Fill in the blank: def ____(name): return 'Hello ' + name", answer: "greet", mascotCorrect: "Great! You created a function name!", mascotIncorrect: "The function name goes after the def keyword!" },
      
      { type: "mascot", value: "Checkpoint! Let's test your Python knowledge! 🎯" },
      { type: "quiz", question: "What keyword defines a function in Python?", options: ["function", "def", "func", "define"], correct: 1, mascotCorrect: "Perfect! 'def' defines functions in Python!", mascotIncorrect: "'def' is the keyword used to define functions!" },
      { type: "quiz", question: "Which method adds an element to the end of a list?", options: ["append()", "add()", "insert()", "push()"], correct: 0, mascotCorrect: "Excellent! append() adds elements to the end of a list!", mascotIncorrect: "append() adds elements to the end of a list!" },
      
      { type: "mascot", value: "You're doing fantastic! Let's create something spectacular! 🌟" },
      { type: "mini-project", prompt: "Build a simple file manager! Create a program that can create, read, update, and delete text files. Include error handling, user menus, and file operations. Make it user-friendly!" },
      
      { type: "mascot", value: "Congratulations! You've mastered Python fundamentals! 🎉" },
      { type: "image", value: "/assets/images/badge_python_developer.png", alt: "Python Developer badge" },
      { type: "reward", value: "badge", badge: "Python Developer", mascot: "You earned the Python Developer badge! You can now build powerful Python applications! 🐍✨" }
    ],
    quiz: [
      {
        question: "What keyword defines a function in Python?",
        options: ["function", "def", "func", "define"],
        correct: 1,
        explanation: "'def' is used to define functions in Python.",
        points: 10,
        feedback: ["Excellent!", "Perfect!", "You understand functions!"]
      },
      {
        question: "Which data type represents whole numbers in Python?",
        options: ["String", "Integer", "Float", "Boolean"],
        correct: 1,
        explanation: "Integer (int) represents whole numbers in Python.",
        points: 10,
        feedback: ["Great job!", "Correct!", "You know data types!"]
      },
      {
        question: "Which method adds an element to the end of a list?",
        options: ["append()", "add()", "insert()", "push()"],
        correct: 0,
        explanation: "append() adds elements to the end of a list.",
        points: 15,
        feedback: ["Perfect!", "Excellent!", "You understand lists!"]
      },
      {
        question: "How do you access a value in a dictionary?",
        options: [
          "dict.value(key)",
          "dict[key]",
          "dict.get(key)",
          "Both B and C"
        ],
        correct: 3,
        explanation: "Both dict[key] and dict.get(key) can access dictionary values.",
        points: 15,
        feedback: ["Awesome!", "Great!", "You know dictionaries!"]
      }
    ],
    randomizeQuiz: true
  }
];

export default modules; 
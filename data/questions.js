/* Nonu's Computer Study App - Question Bank
   Class III Computer, Half-Yearly (Chapters 2 & 3)
   Nirmal Hrudaya E.M. School (ICSE) - KIPS Logix 2.0 - Session 2026-27

   Types: mcq | fill | tf | short | brief | long
   chapter: 2 = Introduction to GUI Operating System (Windows 10)
            3 = Microsoft Word
   paper: true = belongs to the 25-mark Practice Test
*/

window.APP_META = {
  title: "Class III Computer - Half-Yearly Question Bank",
  subtitle: "Chapters 2 & 3",
  school: "Nirmal Hrudaya E.M. School (ICSE)",
  book: "KIPS Logix 2.0",
  session: "Session 2026-27",
  pattern: "Question pattern based on the school's First Mid-Semester Examination 2026-27 (Computer, 25 marks). Every answer is given below its question.",
  totalMarks: 25,
  chapters: [
    { n: 2, name: "Introduction to GUI Operating System (Windows 10)", pages: "pp. 18-29" },
    { n: 3, name: "Microsoft Word", pages: "pp. 32-40" }
  ]
};

window.SECTIONS = [
  { id: "A", name: "Choose the Correct Answer", short: "Section A", type: "mcq",    marks: 1, chapter: 2, desc: "Pick one option out of three." },
  { id: "B", name: "Fill in the Blanks",           short: "Section B", type: "fill",   marks: 1, chapter: 2, desc: "Type the missing word." },
  { id: "C", name: "True or False",                short: "Section C", type: "tf",     marks: 1, chapter: 2, desc: "True or False - with reason." },
  { id: "D", name: "Answer in One Word",          short: "Section D", type: "short",  marks: 1, chapter: 2, desc: "One word or one sentence only." },
  { id: "E", name: "Answer Briefly",               short: "Section E", type: "brief",  marks: 2, chapter: 2, desc: "Write a few sentences." },
  { id: "F", name: "Long Questions",               short: "Section F", type: "long",   marks: 5, chapter: 3, desc: "Full answers - read them twice." },
  { id: "P", name: "Practice Test (25 Marks)",     short: "Mock Test", type: "paper", marks: 0, chapter: 0, desc: "The full mid-semester paper, same pattern." }
];

window.QUESTIONS = [
  /* ============================ SECTION A - MCQ ============================ */
  { id: "A1", section: "A", chapter: 2, q: "The operating system acts as an interface between",
    options: ["the user and the hardware", "the keyboard and the monitor", "the mouse and the printer"],
    a: 0, note: "The OS connects the user with the hardware and runs all jobs." },
  { id: "A2", section: "A", chapter: 2, q: "Booting means",
    options: ["switching off the computer", "loading the operating system into main memory", "cleaning the desktop"],
    a: 1, note: "Loading the operating system into main memory when the computer is switched on." },
  { id: "A3", section: "A", chapter: 2, q: "Which of these is a system software?",
    options: ["MS Word", "Paint", "Windows 10"],
    a: 2, note: "it is an operating system, which is a system software." },
  { id: "A4", section: "A", chapter: 2, q: "The bar that contains the Start button and shows open applications is the",
    options: ["Ribbon", "Taskbar", "Title Bar"],
    a: 1, note: "it is at the bottom of the desktop." },
  { id: "A5", section: "A", chapter: 2, q: "The clock and status icons are displayed in the",
    options: ["Notification Area", "Ribbon", "Work Area"],
    a: 0, note: "on the right side of the taskbar." },
  { id: "A6", section: "A", chapter: 2, q: "To select non-adjacent icons we press",
    options: ["Shift", "Ctrl", "Enter"],
    a: 1, note: "Ctrl + click selects non-adjacent items." },
  { id: "A7", section: "A", chapter: 2, q: "To select adjacent (next to each other) icons we press",
    options: ["Shift", "Ctrl", "Alt"],
    a: 0, note: "Shift + click selects adjacent items." },
  { id: "A8", section: "A", chapter: 2, q: "The picture used as a desktop background is called",
    options: ["an icon", "wallpaper", "a shortcut menu"],
    a: 1, note: "also called desktop background." },
  { id: "A9", section: "A", chapter: 2, q: "To change the desktop background we right-click the desktop and choose",
    options: ["Sort by", "Personalise", "View"],
    a: 1, note: "Then choose Background: Picture / Solid Colour / Slideshow." },
  { id: "A10", section: "A", chapter: 2, q: "The Start button is located at the",
    options: ["right end of the taskbar", "left end of the taskbar", "top of the screen"],
    a: 1, note: "The Start button is on the left end of the taskbar." },
  { id: "A11", section: "A", chapter: 2, q: "Cortana is",
    options: ["a search tool that understands voice commands", "a game", "a file manager"],
    a: 0, note: "a feature of Windows 10." },
  { id: "A12", section: "A", chapter: 2, q: "The Task View button helps to",
    options: ["change the wallpaper", "switch between open applications", "shut down the computer"],
    a: 1, note: "and work on multiple desktops." },
  { id: "A13", section: "A", chapter: 3, q: "The bar at the top of the Word window that shows the document name is the",
    options: ["Title Bar", "Ribbon", "Status Bar"],
    a: 0, note: "It shows the document name and the program name." },
  { id: "A14", section: "A", chapter: 3, q: "The Save, Undo and Redo buttons are on the",
    options: ["Quick Access Toolbar", "Ribbon", "Ruler"],
    a: 0, note: "at the top-left of the Word window." },
  { id: "A15", section: "A", chapter: 3, q: "The extension of a Microsoft Word document is",
    options: [".docx", ".jpg", ".mp3"],
    a: 0, note: "A Word document is saved as .docx" },
  { id: "A16", section: "A", chapter: 3, q: "The blinking line that shows where the text will appear is the",
    options: ["cursor", "icon", "tab"],
    a: 0, note: "Text is typed at the cursor." },
  { id: "A17", section: "A", chapter: 3, q: "To save a document we press",
    options: ["Ctrl + O", "Ctrl + S", "Ctrl + N"],
    a: 1, note: "or File tab > Save." },
  { id: "A18", section: "A", chapter: 3, q: "The large blank area in the Word window where we type text is the",
    options: ["Work Area", "Ribbon", "Groups"],
    a: 0, note: "The Work Area is where we type the text." },

  /* ========================= SECTION B - FILL IN THE BLANKS ========================= */
  { id: "B1",  section: "B", chapter: 2, q: "A set of programs that manages all the jobs of a computer is the __________.", a: "Operating System (OS)" },
  { id: "B2",  section: "B", chapter: 2, q: "Loading the operating system into main memory when the computer is switched on is called __________.", a: "booting" },
  { id: "B3",  section: "B", chapter: 2, q: "The main screen that appears after booting and logging in is called the __________.", a: "desktop" },
  { id: "B4",  section: "B", chapter: 2, q: "Small labelled pictures or symbols on the desktop are called __________.", a: "icons", note: "We double-click them to open programs or documents." },
  { id: "B5",  section: "B", chapter: 2, q: "The bar that contains the Start button, search box and open applications is the __________.", a: "taskbar", note: "at the bottom of the desktop." },
  { id: "B6",  section: "B", chapter: 2, q: "The area on the right side of the taskbar that shows the clock and status icons is the __________.", a: "Notification Area" },
  { id: "B7",  section: "B", chapter: 2, q: "The picture set as the desktop background is called the __________.", a: "wallpaper (desktop background)" },
  { id: "B8",  section: "B", chapter: 2, q: "Right-clicking on the desktop opens the __________ menu.", a: "shortcut menu" },
  { id: "B9",  section: "B", chapter: 2, q: "__________ is a search tool of Windows 10 that understands voice commands.", a: "Cortana" },
  { id: "B10", section: "B", chapter: 2, q: "The button that minimises all open applications at one go is the __________ button.", a: "Show Desktop button", note: "at the extreme right of the taskbar." },
  { id: "B11", section: "B", chapter: 2, q: "__________ is the method of giving instructions by typing text commands.", a: "CLI - Command Line Interface", note: "Example: DOS." },
  { id: "B12", section: "B", chapter: 2, q: "Windows 10 was released on __________.", a: "29 July 2015" },
  { id: "B13", section: "B", chapter: 3, q: "The __________ bar displays the name of the current document and the program.", a: "Title Bar" },
  { id: "B14", section: "B", chapter: 3, q: "The __________ Toolbar contains the Save, Undo and Redo buttons.", a: "Quick Access Toolbar (QAT)", note: "at the top-left of the window." },
  { id: "B15", section: "B", chapter: 3, q: "The blinking line at the place where text is typed is called the __________.", a: "cursor" },
  { id: "B16", section: "B", chapter: 3, q: "The first document made in Word is named __________ by default.", a: "Document1" },
  { id: "B17", section: "B", chapter: 3, q: "Word documents are saved with the file extension __________.", a: ".docx" },
  { id: "B18", section: "B", chapter: 3, q: "__________ is used to save an existing document with a new name without removing the old one.", a: "Save As", note: "File > Save As." },
  { id: "B19", section: "B", chapter: 3, q: "In Word, commands are arranged in tabs and __________.", a: "groups", note: "Together they form the Ribbon." },
  { id: "B20", section: "B", chapter: 3, q: "The first tab of the Ribbon, which has the New, Open, Save and Print commands, is the __________ tab.", a: "File tab" },

  /* ============================= SECTION C - TRUE / FALSE ============================= */
  { id: "C1",  section: "C", chapter: 2, q: "The operating system is an application software.", a: false, note: "the Operating System is a SYSTEM software." },
  { id: "C2",  section: "C", chapter: 2, q: "Booting loads the operating system into the main memory.", a: true },
  { id: "C3",  section: "C", chapter: 2, q: "The Start button is on the right side of the taskbar.", a: false, note: "the Start button is on the LEFT side of the taskbar." },
  { id: "C4",  section: "C", chapter: 2, q: "Ctrl + click is used to select non-adjacent icons.", a: true },
  { id: "C5",  section: "C", chapter: 2, q: "The Notification Area is on the left side of the taskbar.", a: false, note: "it is on the RIGHT side of the taskbar." },
  { id: "C6",  section: "C", chapter: 2, q: "Cortana can understand voice commands.", a: true },
  { id: "C7",  section: "C", chapter: 2, q: "In sleep mode, the computer uses no power at all.", a: false, note: "in sleep mode the computer uses a little power and the work is kept in memory so it starts quickly." },
  { id: "C8",  section: "C", chapter: 2, q: "A screen saver appears when the computer is idle for some time.", a: true },
  { id: "C9",  section: "C", chapter: 3, q: "The Title Bar displays the document name and the program name.", a: true },
  { id: "C10", section: "C", chapter: 3, q: "The Quick Access Toolbar is at the bottom of the Word window.", a: false, note: "it is at the TOP-LEFT of the Word window." },
  { id: "C11", section: "C", chapter: 3, q: "The Home tab contains the Open command.", a: false, note: "the Open command is in the File tab." },
  { id: "C12", section: "C", chapter: 3, q: "The status bar is at the bottom of the Word window.", a: true },
  { id: "C13", section: "C", chapter: 3, q: "Save As deletes the original document.", a: false, note: "Save As keeps the original and saves a copy with a new name." },
  { id: "C14", section: "C", chapter: 3, q: "The Ribbon contains tabs and groups of commands.", a: true },
  { id: "C15", section: "C", chapter: 2, q: "Windows 10 provides only a Command Line Interface.", a: false, note: "Windows 10 provides a Graphical User Interface (GUI)." },

  /* ========================== SECTION D - ONE WORD / ONE SENTENCE ========================== */
  { id: "D1",  section: "D", chapter: 2, q: "The main screen that appears after switching on and logging in to the computer.", a: "Desktop" },
  { id: "D2",  section: "D", chapter: 2, q: "Small labelled pictures on the desktop used to open programs.", a: "Icons" },
  { id: "D3",  section: "D", chapter: 2, q: "The process of loading the operating system into main memory.", a: "Booting" },
  { id: "D4",  section: "D", chapter: 2, q: "The bar that contains the Start button and shows open applications.", a: "Taskbar" },
  { id: "D5",  section: "D", chapter: 2, q: "The voice-recognising search tool of Windows 10.", a: "Cortana" },
  { id: "D6",  section: "D", chapter: 2, q: "The key used together with clicking to select non-adjacent icons.", a: "Ctrl key" },
  { id: "D7",  section: "D", chapter: 2, q: "The set of programs that manages all the jobs of a computer.", a: "Operating System", note: "system software." },
  { id: "D8",  section: "D", chapter: 2, q: "The button that shows all open windows at once so we can switch between them.", a: "Task View button" },
  { id: "D9",  section: "D", chapter: 3, q: "The bar that displays the name of the current document in Word.", a: "Title Bar" },
  { id: "D10", section: "D", chapter: 3, q: "The shortcut key to save a document in MS Word.", a: "Ctrl + S" },
  { id: "D11", section: "D", chapter: 3, q: "The blinking line at which text appears in the Word window.", a: "Cursor" },
  { id: "D12", section: "D", chapter: 3, q: "The file extension of a MS Word document.", a: ".docx", note: "Document1.docx." },

  /* ============================= SECTION E - ANSWER BRIEFLY ============================= */
  { id: "E1", section: "E", chapter: 2,
    q: "What is an operating system?",
    a: "An operating system (OS) is a special set of programs that manages all the jobs of a computer. It works as an interface between the user and the hardware. Windows 10 is an example." },
  { id: "E2", section: "E", chapter: 2,
    q: "Write any three functions of an operating system.",
    a: "1. It controls the input and output hardware devices. 2. It checks the user's identity (authentication with password). 3. It tracks the creation, deletion and copying of files. 4. It runs the applications we need (Paint 3D, MS Word, Scratch).",
    note: "Any three are correct." },
  { id: "E3", section: "E", chapter: 2,
    q: "What is booting?",
    a: "Booting is the process of loading the operating system into the main memory of the computer when the computer is switched on. After booting we see the desktop." },
  { id: "E4", section: "E", chapter: 2,
    q: "What is the desktop? Name any two components of it.",
    a: "The desktop is the main screen that appears after booting and logging in to the computer.",
    note: "Components: icons, taskbar (others: wallpaper, notification area, Start button, shortcut menu)." },
  { id: "E5", section: "E", chapter: 2,
    q: "What is an icon? Give an example.",
    a: "An icon is a small labelled picture or symbol on the desktop. We double-click an icon to open a program or document. Example: This PC, Recycle Bin." },
  { id: "E6", section: "E", chapter: 2,
    q: "What is the difference between Sleep and Shut down?",
    a: "Sleep: the computer goes to a low-power mode, the work is kept in memory and it starts again very quickly. Shut down: all programs are closed and the computer is completely switched off; it takes more time to start again." },
  { id: "E7", section: "E", chapter: 2,
    q: "How do you change the desktop background?",
    a: "Right-click on an empty place on the desktop > choose Personalise > under Background choose Picture, Solid Colour or Slideshow > select the picture/colour." },
  { id: "E8", section: "E", chapter: 2,
    q: "What is a screen saver? How is it set?",
    a: "A screen saver is an image or animation that appears when the computer is idle for some time.",
    note: "It is set through Right-click > Personalise > Lock screen > Screen saver settings." },
  { id: "E9", section: "E", chapter: 2,
    q: "What is the Notification Area? Where is it found?",
    a: "The Notification Area is on the right side of the taskbar. It shows the clock and status icons such as network, volume, battery and updates." },
  { id: "E10", section: "E", chapter: 2,
    q: "What is a Command Line Interface (CLI)? Give an example.",
    a: "CLI is a type of user interface in which the user types text-based commands on the keyboard to give instructions to the computer. Example: DOS (Disk Operating System)." },
  { id: "E11", section: "E", chapter: 2,
    q: "What is a Graphical User Interface (GUI)? Give an example.",
    a: "GUI is a picture-oriented way of working. It uses windows, menus, icons, pictures and buttons, and we work with a mouse in a few clicks. Example: Windows 10." },
  { id: "E12", section: "E", chapter: 2,
    q: "Write any two features of Windows 10.",
    a: "1. Cortana - a search tool that understands voice commands to search the system and the web. 2. Task View - a button on the taskbar to switch between open applications and use multiple desktops.",
    note: "(Other features: Microsoft Store; new pictures, themes and icons.)" },
  { id: "E13", section: "E", chapter: 3,
    q: "What is a word processor? Name one.",
    a: "A word processor is a software used to type, edit and format text and to save the work as documents. Microsoft Word is an example." },
  { id: "E14", section: "E", chapter: 3,
    q: "What is the Title Bar? What does it show?",
    a: "The Title Bar is the bar at the top of the Word window. It shows the name of the current document and the name of the program." },
  { id: "E15", section: "E", chapter: 3,
    q: "What is the Quick Access Toolbar? Which buttons does it have?",
    a: "The Quick Access Toolbar is a small toolbar at the top-left of the Word window. It has frequently used buttons: Save, Undo and Redo." },
  { id: "E16", section: "E", chapter: 3,
    q: "What is the Ribbon?",
    a: "The Ribbon is the area below the Title Bar in MS Word. It contains tabs (File, Home, Insert, Draw, Design, Layout...) and each tab has groups of related commands." },
  { id: "E17", section: "E", chapter: 3,
    q: "What is the Work Area? What is the cursor?",
    a: "The Work Area is the large blank area in the middle of the Word window where we type text. The cursor is the blinking line inside the Work Area that shows where the next typed text will appear." },
  { id: "E18", section: "E", chapter: 3,
    q: "How do you create a new document in MS Word?",
    a: "Click the File tab > New > Blank document > Create. A new document (Document1) opens in the Work Area." },
  { id: "E19", section: "E", chapter: 3,
    q: "How do you save a document in MS Word?",
    a: "Click the File tab > Save (or press Ctrl + S). The first time, the Save As box opens - give the file name and place and click Save. The file is stored with the extension .docx." },
  { id: "E20", section: "E", chapter: 3,
    q: "What is Save As? Why is it used?",
    a: "Save As saves the existing document with a NEW name (or new place) without deleting the original document. It is used when we want to keep two versions of the same file." },
  { id: "E21", section: "E", chapter: 3,
    q: "Write any two features of MS Word.",
    a: "1. We can type and edit text (add, delete, change). 2. We can format text (bold, italic, size, colour). 3. We can save, open and print documents. 4. The commands are neatly arranged in tabs and groups (Ribbon).",
    note: "Any two are correct." },

  /* ============================= SECTION F - LONG QUESTIONS ============================= */
  { id: "F1", section: "F", chapter: 2,
    q: "What is an operating system? Write any three of its functions.",
    a: "An operating system is a special set of programs that manages all the jobs of a computer; it works as an interface between the user and the hardware.",
    note: "Functions: (1) controls input and output hardware devices; (2) checks the user's identity with a password (authentication); (3) tracks the creation, deletion and copying of files; (4) runs the applications we use, such as Paint 3D, MS Word and Scratch. Windows 10 is a popular operating system made by Microsoft." },
  { id: "F2", section: "F", chapter: 2,
    q: "What is the desktop? Explain its components.",
    a: "The desktop is the main screen that appears after booting and logging in.",
    note: "Components: (1) Icons - small labelled pictures to open programs/documents; (2) Taskbar - bar at the bottom with the Start button, search box and open applications; (3) Notification Area - right side of the taskbar with clock and status icons; (4) Wallpaper - the picture used as desktop background; (5) Start button - opens the Start menu to start programs, change settings and shut down." },
  { id: "F3", section: "F", chapter: 2,
    q: "What is the difference between Command Line Interface and Graphical User Interface?",
    a: "CLI: the user types text commands on the keyboard to give instructions (text-based); example: DOS. GUI: the user works with pictures, windows, icons, menus and buttons using a mouse (picture-oriented); example: Windows 10.",
    note: "In CLI we must remember the commands; in GUI we only need to click pictures, so it is easier for a new user." },
  { id: "F4", section: "F", chapter: 2,
    q: "Write any two features of Windows 10 and explain them.",
    a: "(1) Cortana - an improved search tool that understands voice commands; we can search in the system and on the web by speaking. (2) Task View - a button on the taskbar (right of the search box) that shows all open windows so we can switch between applications quickly and even work on multiple desktops.",
    note: "(Other features: Microsoft Store to get free and paid apps, games and songs; new pictures, themes and icons.)" },
  { id: "F5", section: "F", chapter: 3,
    q: "What is a word processor? Write any three features of MS Word.",
    a: "A word processor is application software used to type, edit and format text and to save the work as documents. Microsoft Word is a part of the Microsoft Office Suite.",
    note: "Features: (1) type and edit text at the cursor; (2) format text with bold, italics, size and colour; (3) save, open, print and share documents (file extension .docx); (4) easy-to-use Ribbon interface with tabs and groups." },
  { id: "F6", section: "F", chapter: 3,
    q: "Describe the components of the Word window.",
    a: "(1) Title Bar - shows the document name and program name; (2) Quick Access Toolbar - top-left, has Save, Undo, Redo; (3) File Tab - first tab with New, Open, Save, Print; (4) Ribbon - tabs and groups of commands (Home, Insert, Draw, Design, Layout); (5) Rulers - show the margin measurements; (6) Work Area - the blank space where we type; (7) Zoom Slider - at the right of the status bar, to make the view bigger or smaller." },
  { id: "F7", section: "F", chapter: 3,
    q: "How do you create and save a document in MS Word? Write the steps.",
    a: "Create: File tab > New > Blank document > Create - a blank page opens and the cursor blinks at the top-left. Type the text; press Enter for a new paragraph.",
    note: "Save: File > Save (or Ctrl + S). The first time the Save As box appears - type the file name, choose the place and click Save; the file is saved with .docx extension. To keep the same file with a new name, use File > Save As." },
  { id: "F8", section: "F", chapter: 2,
    q: "What is booting? Explain the steps to switch on a computer.",
    a: "Booting is the process of loading the operating system into the main memory when the computer is switched on.",
    note: "Steps to switch on: 1. Switch on the main power. 2. Switch on the UPS. 3. Press the power button of the CPU. 4. Switch on the monitor. The computer boots, loads Windows and shows the desktop where we can start working." },

  /* ============================= PRACTICE TEST - 25 MARKS ============================= */
  { id: "P1",  section: "P", paper: true, chapter: 2, marks: 1, part: "I", q: "Booting means loading the", options: ["hardware", "operating system", "printer"], a: 1 },
  { id: "P2",  section: "P", paper: true, chapter: 2, marks: 1, part: "I", q: "To select adjacent icons we press", options: ["Ctrl", "Shift", "Enter"], a: 1 },
  { id: "P3",  section: "P", paper: true, chapter: 2, marks: 1, part: "I", q: "Cortana is", options: ["a voice search tool", "a game", "a monitor"], a: 0 },
  { id: "P4",  section: "P", paper: true, chapter: 3, marks: 1, part: "I", q: "The Save button is on the", options: ["Ribbon", "Quick Access Toolbar", "Ruler"], a: 1 },
  { id: "P5",  section: "P", paper: true, chapter: 3, marks: 1, part: "I", q: "The extension of a Word file is", options: [".docx", ".mp3", ".png"], a: 0 },

  { id: "P6",  section: "P", paper: true, chapter: 2, marks: 1, part: "II", q: "The main screen after booting is the __________.", a: "desktop" },
  { id: "P7",  section: "P", paper: true, chapter: 2, marks: 1, part: "II", q: "The picture set as desktop background is called __________.", a: "wallpaper" },
  { id: "P8",  section: "P", paper: true, chapter: 3, marks: 1, part: "II", q: "The bar at the top of the Word window showing the document name is the __________ bar.", a: "Title" },
  { id: "P9",  section: "P", paper: true, chapter: 3, marks: 1, part: "II", q: "The blinking line where text appears is the __________.", a: "cursor" },
  { id: "P10", section: "P", paper: true, chapter: 3, marks: 1, part: "II", q: "File > Save As is used to save a document with a __________.", a: "new name", note: "Without deleting the original." },

  { id: "P11", section: "P", paper: true, chapter: 2, marks: 1, part: "III", q: "The Start button is on the right side of the taskbar.", a: false, note: "it is on the left side." },
  { id: "P12", section: "P", paper: true, chapter: 2, marks: 1, part: "III", q: "In sleep mode the work is kept in memory and the computer starts quickly.", a: true },
  { id: "P13", section: "P", paper: true, chapter: 2, marks: 1, part: "III", q: "The Notification Area shows the clock and status icons.", a: true },
  { id: "P14", section: "P", paper: true, chapter: 3, marks: 1, part: "III", q: "The Home tab contains the Open command.", a: false, note: "the File tab contains the Open command." },
  { id: "P15", section: "P", paper: true, chapter: 3, marks: 1, part: "III", q: "The status bar is at the bottom of the Word window.", a: true },

  { id: "P16", section: "P", paper: true, chapter: 2, marks: 1, part: "IV", q: "The bar that contains the Start button.", a: "Taskbar" },
  { id: "P17", section: "P", paper: true, chapter: 2, marks: 1, part: "IV", q: "Key used to select non-adjacent icons.", a: "Ctrl" },
  { id: "P18", section: "P", paper: true, chapter: 2, marks: 1, part: "IV", q: "Type of user interface in which we type text commands.", a: "CLI", note: "Command Line Interface." },
  { id: "P19", section: "P", paper: true, chapter: 3, marks: 1, part: "IV", q: "Software used to type and format text.", a: "Word processor", note: "MS Word." },
  { id: "P20", section: "P", paper: true, chapter: 3, marks: 1, part: "IV", q: "Shortcut key to save a document.", a: "Ctrl + S" },

  { id: "P21", section: "P", paper: true, chapter: 2, marks: 2, part: "V", q: "What is booting?",
    a: "Booting is the process of loading the operating system into the main memory of the computer when it is switched on." },
  { id: "P22", section: "P", paper: true, chapter: 2, marks: 3, part: "V", q: "What is an operating system? Write any two functions.",
    a: "A special set of programs that manages all the jobs of a computer; it works as an interface between user and hardware.",
    note: "Functions: controls input/output hardware; runs applications (MS Word, Paint); tracks files; authenticates the user with a password. (Any two)" }
];

/* ------------------------------------------------------------------
   Normalise: give every question an explicit `kind`.
   kind = mcq | fill | tf | short | brief | long
   The Mock Exam mixes kinds inside one section, so derive from `part`.
   ------------------------------------------------------------------ */
(function () {
  var bySection = {};
  window.SECTIONS.forEach(function (s) { bySection[s.id] = s.type; });
  var paperKind = { II: "fill", IV: "fill", V: "long" };

  window.QUESTIONS.forEach(function (q) {
    var k = bySection[q.section];
    if (q.section === "P") k = paperKind[q.part] || k;
    if (q.options) k = "mcq";
    if (q.a === true || q.a === false) k = "tf";
    q.kind = k;
  });
})();
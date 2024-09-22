export const tableSchema = new Map<string, string>(
    [
        [
            "lessons", 
            `CREATE TABLE IF NOT EXISTS Lesson(
            lesson_id INTEGER PRIMARY KEY NOT NULL,
            lesson_num INTEGER,
            title TEXT,
            description TEXT,
            completed INTEGER
          );`
        ],
        [
            "lessonSlides", 
            ` CREATE TABLE IF NOT EXISTS LessonSlides(
                slide_id INTEGER PRIMARY KEY NOT NULL,
                lesson_id INTEGER,
                title TEXT,
                item1 TEXT,
                item2 TEXT,
                item3 TEXT,
                item4 TEXT,
                item5 TEXT,
                item6 TEXT,
                item7 TEXT,
                item8 TEXT,
                item9 TEXT,
                item10 TEXT
            );`
        ]
    ]
); 

export const seedData = new Map<string, string>(
    [
        [
            "lessons", 
            `INSERT INTO Lessons VALUES(1, 1, 'test lesson', 'a test lesson', false)`,
        ],
        [
            "lessonSlides", 
            `INSERT INTO LessonSlides 
            VALUES(1, 1, 'test slide', 'a test slide', 'more test text', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
            VALUES(2, 1, 'test slide2', 'second test slide', 'more test text', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),`
        ]
    ]
)
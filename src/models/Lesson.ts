export class Lesson {
    lesson_id: number;
    lessonNum: number;
    title: string;
    description: string;
    completed: boolean;

    constructor(lesson_id: number, lessonNum: number, title: string, description: string, completed: boolean) {
        this.lesson_id = lesson_id;
        this.lessonNum = lessonNum;
        this.title = title;
        this.description = description;
        this.completed = completed;
    }
}
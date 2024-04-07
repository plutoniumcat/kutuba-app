export class Lesson {
    id: number;
    lessonNum: number | null;
    title: string | null;
    description: string | null;
    completed: boolean;

    constructor(id: number, lessonNum: number | null, title: string | null, description: string | null, completed: boolean) {
        this.id = id;
        this.lessonNum = lessonNum;
        this.title = title;
        this.description = description;
        this.completed = completed;
    }
}
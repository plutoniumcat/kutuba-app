export class LessonSlide {
    id: number;
    lessonId: number | null;
    title: string | null;
    item1: string | null;
    item2: string | null;
    item3: string | null;
    item4: string | null;
    item5: string | null;
    item6: string | null;
    item7: string | null;
    item8: string | null;
    item9: string | null;
    item10: string | null;

    constructor(id: number, lessonId: number | null, title: string | null, item1: string | null, item2: string | null, 
        item3: string | null, item4: string | null, item5: string | null, item6: string | null, item7: string | null, 
        item8: string | null, item9: string | null, item10: string | null) {
            this.id = id;
            this.lessonId = lessonId;
            this.title = title;
            this.item1 = item1;
            this.item2 = item2;
            this.item3 = item3;
            this.item4 = item4;
            this.item5 = item5;
            this.item6 = item6;
            this.item7 = item7;
            this.item8 = item8;
            this.item9 = item9;
            this.item10 = item10;
    }
}
public class TextEditor {
    public static void main(String[] args) {
        File file = new File();
        file.insert("h");
        file.insert("e");
        file.insert("l");
        file.insert("l");
        file.insert("o");
        System.out.println(file.displayContent());
        file.navigate("left");
        file.navigate("left");
        file.insert("q");
        System.out.println(file.displayContent());
        file.navigate("left");
        file.backspace();
        System.out.println(file.displayContent());
        System.out.println("-------------------");
        file.undo();
        System.out.println(file.displayContent());
        file.undo();
        System.out.println(file.displayContent());
        file.undo();
        System.out.println(file.displayContent());
        file.undo();
        System.out.println(file.displayContent());
        System.out.println("-------------------");
        file.redo();
        System.out.println(file.displayContent());
        file.redo();
        System.out.println(file.displayContent());
        file.redo();
        System.out.println(file.displayContent());
        file.redo();
        System.out.println(file.displayContent());
    }
}

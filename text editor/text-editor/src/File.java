import dto.CharNode;
import dto.Operation;
import enums.OperationType;

import java.util.Stack;

public class File {
    private CharNode startOfFile;
    private CharNode cursor;
    private Stack<Operation> undoStack;
    private Stack<Operation> redoStack;

    public File() {
        startOfFile = new CharNode(null, null, null);
        cursor = startOfFile;
        undoStack = new Stack<>();
        redoStack = new Stack<>();
    }

    public CharNode insert(String content, boolean... optionalFlags) {
        boolean isUndoOperation = optionalFlags.length > 0 ? optionalFlags[0] :
                false;
        cursor.right = new CharNode(content, cursor, cursor.right);
        cursor = cursor.right;
        if (cursor.right != null) {
            cursor.right.left = cursor;
        }
        Operation operation = new Operation(OperationType.BACKSPACE, cursor);
        if (!isUndoOperation) undoStack.push(operation);
        return cursor;
    }

    public CharNode backspace(boolean... optionalFlags) {
        boolean isUndoOperation = optionalFlags.length > 0 ? optionalFlags[0] :
                false;
        if (cursor.val != null) {
            CharNode removedChar = cursor;
            if (cursor.right != null) {
                cursor.left.right = cursor.right;
                cursor.right.left = cursor.left;
            } else {
                cursor.left.right = null;
            }
            cursor = cursor.left;
            removedChar.left = null;
            removedChar.right = null;
            Operation operation = new Operation(OperationType.INSERT, removedChar);
            if (!isUndoOperation) undoStack.push(operation);
        }
        return cursor;
    }

    public CharNode navigate(String direction) {
        // refactor with json object
        if (direction.equalsIgnoreCase("left") && cursor.left != null) {
            cursor = cursor.left;
        } else if (direction.equalsIgnoreCase("right") && cursor.right != null) {
            cursor = cursor.right;
        }
        return cursor;
    }

    public CharNode undo() {
        Operation revertOperation = undoStack.pop();
        switch (revertOperation.getOperationType()) {
            case INSERT:
                Operation backspaceOperation =
                        new Operation(OperationType.BACKSPACE,
                        revertOperation.getContent());
                redoStack.push(backspaceOperation);
                return insert(revertOperation.getContent().val, true);
            case BACKSPACE:
                cursor = revertOperation.getContent();
                Operation insertOperation =
                        new Operation(OperationType.INSERT,
                        revertOperation.getContent());
                redoStack.push(insertOperation);
                return backspace(true);
        }
        return cursor;
    }

    public CharNode redo() {
        Operation revertOperation = redoStack.pop();
        switch (revertOperation.getOperationType()) {
            case INSERT:
                Operation backspaceOperation =
                        new Operation(OperationType.BACKSPACE,
                                revertOperation.getContent());
                undoStack.push(backspaceOperation);
                return insert(revertOperation.getContent().val);
            case BACKSPACE:
                Operation insertOperation =
                        new Operation(OperationType.INSERT,
                                revertOperation.getContent());
                undoStack.push(insertOperation);
                return backspace();
        }
        return cursor;
    }

    public String displayContent() {
        CharNode tmpCursor = startOfFile.right;
        String content = "";
        while (tmpCursor != null && tmpCursor.val != null) {
            content += tmpCursor.val;
            tmpCursor = tmpCursor.right;
        }
        return content;
    }
}

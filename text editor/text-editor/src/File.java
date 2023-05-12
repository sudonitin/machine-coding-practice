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
        if (!isUndoOperation) {
            Operation operation = new Operation(OperationType.BACKSPACE, cursor);
            undoStack.push(operation);
        }
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
            if (!isUndoOperation) {
                Operation operation = new Operation(OperationType.INSERT, removedChar);
                undoStack.push(operation);
            }
        }
        return cursor;
    }

    public CharNode navigate(String direction, boolean ...optionalFlags) {
        // refactor with json object
        boolean isUndoOperation = optionalFlags.length > 0 ? optionalFlags[0] :
                false;
        if (direction.equalsIgnoreCase("left") && cursor.left != null) {
            cursor = cursor.left;
            if (!isUndoOperation)
            undoStack.push(new Operation(OperationType.RIGHT, null));
        } else if (direction.equalsIgnoreCase("right") && cursor.right != null) {
            cursor = cursor.right;
            if (!isUndoOperation)
            undoStack.push(new Operation(OperationType.LEFT, null));
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
                Operation insertOperation =
                        new Operation(OperationType.INSERT,
                        revertOperation.getContent());
                redoStack.push(insertOperation);
                return backspace(true);
            case LEFT:
                redoStack.push(new Operation(OperationType.RIGHT, null));
                return navigate(OperationType.LEFT.getValue(), true);
            case RIGHT:
                redoStack.push(new Operation(OperationType.LEFT, null));
                return navigate(OperationType.RIGHT.getValue(), true);
        }
        return cursor;
    }

    public CharNode redo() {
        Operation revertOperation = redoStack.pop();
        switch (revertOperation.getOperationType()) {
            case INSERT:
                return insert(revertOperation.getContent().val);
            case BACKSPACE:
                return backspace();
            case LEFT:
                return navigate(OperationType.LEFT.getValue());
            case RIGHT:
                return navigate(OperationType.RIGHT.getValue());
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

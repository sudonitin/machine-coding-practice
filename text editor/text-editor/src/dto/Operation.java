package dto;

import enums.OperationType;

public class Operation {
    private OperationType operationType;
    private CharNode content;

    public Operation(OperationType operationType, CharNode content) {
        this.operationType = operationType;
        this.content = content;
    }

    public OperationType getOperationType() {
        return operationType;
    }

    public CharNode getContent() {
        return content;
    }
}

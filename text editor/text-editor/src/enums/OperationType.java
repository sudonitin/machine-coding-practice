package enums;

public enum OperationType {
    INSERT("insert"),
    BACKSPACE("delete"),
    LEFT("left"),
    RIGHT("right");
    private final String value;

    OperationType(String value) { this.value = value; }

    public String getValue() { return value; }
}

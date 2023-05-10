package dto;

public class CharNode {
    public CharNode left;
    public CharNode right;
    public String val;

    public CharNode(String character, CharNode left, CharNode right) {
        val = character;
        this.left = left;
        this.right = right;
    }
}

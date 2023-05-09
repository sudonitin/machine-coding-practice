## Features:
- Cursor and its actions such as navigate left / right.
- insert chars
- backspace chars
- undo chars

- Follow-up
  - Search and replace.
  - redo
  - Create multi-line content
  - navigate up and down

**All functions above should take O(1) time**

## Rough Work
### Possible Classes
1. class charNode
   - 2 directional LinkedList
2. class File
   - method - insert
   - method - backspace
   - method - undo
   - method - redo
   - method - navigate
   - variable - cursor (current charNode)
3. class Text Editor
   - method - new file
   - do all kind of operations here

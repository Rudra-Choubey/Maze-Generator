# Maze-Generator
This maze generator uses recursive backtracker algorithm
You can know more about this algorithm in wikipedia:
https://en.wikipedia.org/wiki/Maze_generation_algorithm#Recursive_backtracker
```python
Choose the initial cell, mark it as visited and push it to the stack
While the stack is not empty
Pop a cell from the stack and make it a current cell
If the current cell has any neighbours which have not been visited
Push the current cell to the stack
Choose one of the unvisited neighbours
Remove the wall between the current cell and the chosen cell
Mark the chosen cell as visited and push it to the stack

```

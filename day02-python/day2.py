def judge_line(line_values, can_remove_one, prev_dir=None, prev=None):
 prev_prev = None
 for i, val in enumerate(line_values):
  if prev == None:
   prev = val
   continue

  cur_dir = 1 if val > prev else -1

  if prev_dir == None:
   prev_dir = cur_dir

  if val == prev or abs(prev - val) > 3 or cur_dir != prev_dir:
   if not can_remove_one:
    return False

   return judge_line(line_values[i+1:], False, prev_dir, prev) or \
    judge_line(line_values[i:], False, prev_dir, prev_prev) or \
    i < 3 and ( # handle cases where removing element affects direction (start of the arr)
     judge_line(line_values[1:], False, prev_dir * -1) or 
     judge_line([line_values[0], *line_values[2:]], False, prev_dir * -1)
    )

  prev_prev = prev
  prev = val
 return True


def solve_task():
 with open("input.txt") as fp:
  working_count_1 = 0
  working_count_2 = 0
  while True:
   line = fp.readline()
   if not line:
    break

   line_values = [int(x) for x in line[0:-1].split(' ')]
   if judge_line(line_values, False):
    working_count_1 += 1
   if judge_line(line_values, True):
    working_count_2 += 1

  print(working_count_1, working_count_2)


solve_task()
def linear_search(arr, target):
    return next((i for i, v in enumerate(arr) if v == target), -1)

def linear_scan_registers(vars, num_regs):
    regs, alloc = [None] * num_regs, {}
    for var in vars:
        regs[regs.index(None) if None in regs else 0] = var
        alloc[var] = regs.index(var)
    return alloc

def linear_scan_max(arr):
    return max(arr)

arr = [3, 11, 9, 37, 7, 8, 1, 21, 5, 17, 31]
print(linear_search(arr, 37))
print(linear_scan_registers(["a", "b", "c", "d"], 2))
print(linear_scan_max(arr))

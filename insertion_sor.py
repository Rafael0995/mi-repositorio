def insertion_sort(arr):
    for i in range(1, len(arr)): 
        key = arr[i]  
        j = i - 1  
        
        gi
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        
        arr[j + 1] = key  
        
    return arr


array = [5, 1, 8, 9, 12]
sorted_array = insertion_sort(array)
print("Arreglo ordenado:", sorted_array)
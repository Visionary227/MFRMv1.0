import sys
import os.path
from pathlib import Path


# Split merged contract
if __name__ == '__main__':
    with open(sys.argv[1]) as f:
        files = f.read().split('File: ')[1:]

        for file in files:
            file_path, contents = file.split('\n\n', 1)
            dir_path = os.path.dirname(file_path)
            Path(dir_path).mkdir(parents=True, exist_ok=True)

            with open(file_path, 'w') as f:
                print('creating', file_path)
                f.write(contents)
